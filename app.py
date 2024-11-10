from flask import Flask, request, jsonify
import sqlite3
import hashlib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# Helper function to connect to the database
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    fullname = data.get('fullname')
    phone = data.get('phone')
    email = data.get('email')
    password = data.get('password')

    # Hash the password
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO users (username, fullname, phone, email, password)
            VALUES (?, ?, ?, ?, ?)
        ''', (username, fullname, phone, email, hashed_password))
        conn.commit()
        conn.close()
        return jsonify({"message": "User registered successfully!"}), 201
    except sqlite3.IntegrityError as e:
        print(f"Integrity error: {e}")  # Logs to console
        return jsonify({"error": "Username or email already exists!"}), 400
    except Exception as e:
        print(f"Error: {e}")  # Logs to console
        return jsonify({"error": "An error occurred while registering"}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT * FROM users WHERE email = ? AND password = ?
    ''', (email, hashed_password))

    user = cursor.fetchone()
    conn.close()

    if user:
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)

