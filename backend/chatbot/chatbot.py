import os
import random
import aiohttp
import asyncio
from datetime import datetime, timedelta
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

# Read topics from a file
def read_topics_from_file(file_path):
    with open(file_path, 'r') as file:
        topics = file.read().splitlines()
    return [topic.strip().lower() for topic in topics]

# Load topics
topics_file_path = os.path.join(os.path.dirname(__file__), 'topics.txt')
topics = read_topics_from_file(topics_file_path)

# Function to generate questions
async def generate_questions(topic, level, asked_questions):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}',
    }
    while True:
        prompt = f"Generate a level {level} question on the topic: {topic}. The difficulty should increase with the level."
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

async def interview(username):
    user = users_collection.find_one({"username": username})
    if not user:
        print("User not found.")
        return

    level = int(user['level'])
    level_passed_timestamp = user.get('level_passed_timestamp')

    if level_passed_timestamp:
        time_since_last_pass = datetime.now() - level_passed_timestamp
        if time_since_last_pass < timedelta(weeks=1):
            print("You need to wait a week before attempting the next level.")
            return

    for current_level in range(level, 6):
        print(f"Starting level {current_level}...")

        correct_answers = 0
        asked_questions = set()

        for i in range(5):
            topic = random.choice(topics)
            question = await generate_questions(topic, current_level, asked_questions)
            if not question:
                print("Failed to generate question.")
                return

            print(f"Question {i + 1}: {question}")
            user_response = input("Your answer: ")

            evaluation = await evaluate_response(question, user_response)
            print(f"Evaluation: {evaluation}")

            if "correct" in evaluation.lower():
                correct_answers += 1

        print(f"You answered {correct_answers} questions correctly out of 5.")

        if correct_answers >= 3:
            print(f"Congratulations! You passed level {current_level}.")
            # Update level and timestamp
            users_collection.update_one(
                {"username": username},
                {
                    "$set": {
                        "level": str(current_level + 1),
                        "level_passed_timestamp": datetime.now()
                    }
                }
            )
            # Exit after updating the level and timestamp
            print("You have passed the level. Please come back next week to attempt the next level.")
            return
        else:
            print(f"You failed to pass level {current_level}. Try again later.")
            break

if __name__ == "__main__":
    username = input("Enter your username: ")
    asyncio.run(interview(username))
