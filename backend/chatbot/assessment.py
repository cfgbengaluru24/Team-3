import os
import random
import aiohttp
import asyncio
from datetime import datetime
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
openai_endpoint = "https://api.openai.com/v1/chat/completions"

# MongoDB setup
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client.get_database()
users_collection = db.users
sessions_collection = db.sessions

# Read topics from a file
def read_topics_from_file(file_path):
    with open(file_path, 'r') as file:
        topics = file.read().splitlines()
    return [topic.strip().lower() for topic in topics]

# Load topics
topics_file_path = os.path.join(os.path.dirname(__file__), 'topics.txt')
topics = read_topics_from_file(topics_file_path)

# Function to generate questions
async def generate_questions(topic, asked_questions):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}',
    }
    while True:
        prompt = f"Generate a question on the topic: {topic}."
        data = {
            "model": "gpt-4",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ]
        }
        async with aiohttp.ClientSession() as session:
            async with session.post(openai_endpoint, headers=headers, json=data) as response:
                if response.status == 200:
                    response_json = await response.json()
                    question = response_json['choices'][0]['message']['content']
                    if question not in asked_questions:
                        asked_questions.add(question)
                        return question
                else:
                    return None

# Function to evaluate user's response
async def evaluate_response(question, user_response):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}',
    }
    prompt = f"Evaluate the user's response to the following question:\nQuestion: {question}\nResponse: {user_response}"
    data = {
        "model": "gpt-4",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ]
    }
    async with aiohttp.ClientSession() as session:
        async with session.post(openai_endpoint, headers=headers, json=data) as response:
            if response.status == 200:
                response_json = await response.json()
                return response_json['choices'][0]['message']['content']
            else:
                return None

# Pre-assessment function
async def pre_assessment(username, session_name):
    user = users_collection.find_one({"username": username})
    if not user:
        print("User not found.")
        return

    asked_questions = set()
    correct_answers = 0

    print(f"Starting pre-assessment for session: {session_name}...")

    for i in range(3):
        topic = random.choice(topics)
        question = await generate_questions(topic, asked_questions)
        if not question:
            print("Failed to generate question.")
            return

        print(f"Question {i + 1}: {question}")
        user_response = input("Your answer: ")

        evaluation = await evaluate_response(question, user_response)
        print(f"Evaluation: {evaluation}")

        if "correct" in evaluation.lower():
            correct_answers += 1

    users_collection.update_one(
        {"username": username},
        {"$set": {f"{session_name}_pre_assessment_score": correct_answers}}
    )

    print(f"Pre-assessment completed. You answered {correct_answers} questions correctly out of 3.")

# Post-assessment function
async def post_assessment(username, session_name):
    user = users_collection.find_one({"username": username})
    if not user:
        print("User not found.")
        return

    asked_questions = set()
    correct_answers = 0

    print(f"Starting post-assessment for session: {session_name}...")

    for i in range(3):
        topic = random.choice(topics)
        question = await generate_questions(topic, asked_questions)
        if not question:
            print("Failed to generate question.")
            return

        print(f"Question {i + 1}: {question}")
        user_response = input("Your answer: ")

        evaluation = await evaluate_response(question, user_response)
        print(f"Evaluation: {evaluation}")

        if "correct" in evaluation.lower():
            correct_answers += 1

    pre_assessment_score = user.get(f"{session_name}_pre_assessment_score", 0)
    improvement = correct_answers - pre_assessment_score

    # Update the user's post-assessment score and improvement
    users_collection.update_one(
        {"username": username},
        {"$set": {f"{session_name}_post_assessment_score": correct_answers}}
    )

    # Update the session's trainer rating based on improvement
    session_detail = sessions_collection.find_one({"session_name": session_name})
    if session_detail:
        trainer_id = session_detail.get("trainer_id")
        if trainer_id:
            trainer = users_collection.find_one({"_id": trainer_id})
            if trainer:
                new_rating = int(trainer.get("rating_for_trainer", 0)) + improvement
                users_collection.update_one(
                    {"_id": trainer_id},
                    {"$set": {"rating_for_trainer": new_rating}}
                )

    print(f"Post-assessment completed. You answered {correct_answers} questions correctly out of 3.")
    print(f"Your performance improved by {improvement} questions.")

# Run pre-assessment and post-assessment interactively
async def run_assessment():
    username = input("Enter your username: ")
    session_name = input("Enter the session name: ")

    await pre_assessment(username, session_name)
    input("Press Enter to start the post-assessment after the training session...")

    await post_assessment(username, session_name)

if __name__ == "__main__":
    asyncio.run(run_assessment())
