from flask import Flask, request, jsonify, session
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
import os
import re
from werkzeug.security import generate_password_hash, check_password_hash
import logging
from bson import ObjectId 
import requests
import asyncio

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

#
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name=data.get('name')
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')
    email = data.get('email')
    phone = data.get('phone')
    level = '1'
    rating_for_trainer = '0'

    if not all([username, password, role, email, phone, name, level, rating_for_trainer]):
        return jsonify({"error": "All fields are required"}), 400

    if role not in ["trainer", "trainee"]:
        return jsonify({"error": "Invalid role"}), 400

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
        "rating_for_trainer": rating_for_trainer
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
    
@app.route('/trainerassess', methods=['GET'])
def trainerassess():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    
@app.route('/trainerreg', methods = ["GET"])
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


if __name__ == '__main__':
    app.run(debug=True)
