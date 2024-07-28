import os
import re
import asyncio
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, session
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
import logging
from chatbot.chatbot import interview
from bson import ObjectId 
from chatbot.assessment import pre_assessment, post_assessment
from datetime import datetime

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
app.secret_key = os.getenv("SECRET_KEY", "supersecretkey")

mongo = PyMongo(app)

@app.route('/')
def index():
    return "Welcome to EXPA India!"

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')
    email = data.get('email')
    phone = data.get('phone')
    level = '1'
    rating_for_trainer = '0' if role == 'trainer' else None
    level_passed_timestamp = None

    if not all([username, password, role, email, phone, name]):
        return jsonify({"error": "All fields are required"}), 400

    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"error": "Invalid email format"}), 400

    existing_user = mongo.db.users.find_one({"username": username})
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400

    hashed_password = generate_password_hash(password)
    user_data = {
        "name": name,
        "username": username,
        "password": hashed_password,
        "role": role,
        "email": email,
        "phone": phone,
        "level": level,
        "rating_for_trainer": rating_for_trainer,
        "level_passed_timestamp": level_passed_timestamp
    }

    mongo.db.users.insert_one(user_data)

    return jsonify({"message": "User registered successfully"}), 201

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = mongo.db.users.find_one({"username": username})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid username or password"}), 400

    session['username'] = username
    session['role'] = user['role']

    print(f"role {user['role']}")

    return jsonify({
        "message": f"Welcome, {user['role']} {username}!",
        "username": username,
        "role": user['role']
    }), 200

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    session.pop('role', None)
    return jsonify({"message": "Logout successful"}), 200

@app.route('/check', methods=['GET'])
def profile():
    return jsonify("success"), 200

@app.route('/dashboard', methods=['GET'])
def dashboard():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify({"message": f"Hello, {session['role']} {session['username']}!"}), 200

@app.route('/progress', methods=['GET'])
def progress():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    user = mongo.db.users.find_one({"username": session['username']})
    return jsonify({"level": user['level'], "rating_for_trainer": user['rating_for_trainer']}), 200

@app.route('/resources', methods=['GET'])
def resources():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    resources = mongo.db.resources.find()
    return jsonify([{
        "title": resource["title"],
        "link": resource["link"]
    } for resource in resources]), 200

@app.route('/traineeassess', methods=['GET'])
def traineeassess():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify({"message": "Welcome, Trainee Assessment"}), 200

@app.route('/trainerassess', methods=['GET'])
def trainerassess():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify({"message": "Welcome, Trainer Assessment"}), 200

@app.route('/trainerreg', methods=['GET'])
def trainerreg():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify({"message": "Welcome, Trainer!"}), 200

@app.route('/contact', methods=['GET'])
def contact():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify({"message": "Contact Us"}), 200  

@app.route('/campreg', methods=['GET'])
def campreg():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify({"message": "Welcome, Camp Registration"}), 200   

@app.route('/interview', methods=['GET'])
def interview_route():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    username = session['username']
    response = asyncio.run(interview(username))
    print(response)
    return jsonify({"message": "Interview started"}), 200




@app.route('/sessiontrack', methods=['POST'])
def track_session():
    data = request.get_json()
    session_name = data.get('sessionName')
    camp_id = data.get('campId')
    session_date_str = data.get('date')
    trainer_email = data.get('trainerEmail')
    session_time = data.get('time')
    session_location = data.get('location')

    if not all([session_name, camp_id, session_time, session_location, trainer_email]):
        return jsonify({"error": "All fields are required"}), 400

    logging.debug(f"Received data: {data}")

    # Get current date and time
    current_datetime = datetime.now()

    # Ensure that the trainer exists
    trainer_detail = mongo.db.users.find_one({"email": trainer_email})
    if not trainer_detail:
        logging.debug(f"Trainer not found: trainer_email={trainer_email}")
        return jsonify({"error": "Trainer not found"}), 404

    # Insert a new session document with the trainer_id and other session details
    result = mongo.db.sessions.insert_one({
        "trainer_id": trainer_detail["_id"],
        "session_name": session_name,
        "camp_id": camp_id,
        "date": session_date_str,
        "time": session_time,
        "location": session_location,
        "created_at": current_datetime
    })

    if result.inserted_id:
        return jsonify({"message": "Session added successfully", "session_id": str(result.inserted_id)}), 201
    else:
        return jsonify({"error": "Failed to add session"}), 500
    
@app.route('/preassessment', methods=['POST'])
def start_pre_assessment():
    data = request.get_json()
    session_name = data.get('sessionName')
    username = session.get('username')

    if not username:
        return jsonify({"error": "Unauthorized"}), 401

    result = asyncio.run(pre_assessment(username, session_name))
    return jsonify({"message": "Pre-assessment started", "result": result}), 200

@app.route('/postassessment', methods=['POST'])
def start_post_assessment():
    data = request.get_json()
    session_name = data.get('sessionName')
    username = session.get('username')

    if not username:
        return jsonify({"error": "Unauthorized"}), 401

    result = asyncio.run(post_assessment(username, session_name))
    return jsonify({"message": "Post-assessment started", "result": result}), 200

def compare_assessments(pre_assessment, post_assessment):
    # Placeholder for actual comparison logic
    pre_score = pre_assessment.get('score', 0)
    post_score = post_assessment.get('score', 0)
    improvement = post_score - pre_score
    return improvement

@app.route('/rate_trainer', methods=['POST'])
def rate_trainer():
    data = request.get_json()
    session_id = data.get('sessionId')
    pre_assessment_data = mongo.db.assessments.find_one({"session_id": session_id, "type": "pre"})
    post_assessment_data = mongo.db.assessments.find_one({"session_id": session_id, "type": "post"})

    if not pre_assessment_data or not post_assessment_data:
        return jsonify({"error": "Assessments not found for the given session"}), 404

    improvement = compare_assessments(pre_assessment_data, post_assessment_data)
    trainer_id = pre_assessment_data['trainer_id']

    trainer = mongo.db.users.find_one({"_id": ObjectId(trainer_id)})
    if trainer:
        current_rating = float(trainer.get('rating_for_trainer', 0))
        new_rating = (current_rating + improvement) / 2
        mongo.db.users.update_one({"_id": ObjectId(trainer_id)}, {"$set": {"rating_for_trainer": new_rating}})
        return jsonify({"message": "Trainer rated successfully", "new_rating": new_rating}), 200
    else:
        return jsonify({"error": "Trainer not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)