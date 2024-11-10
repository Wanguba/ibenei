import sqlite3

# Connect to SQLite database (or create it if it doesn’t exist)
connection = sqlite3.connect('database.db')

# Create a cursor object to execute SQL commands
cursor = connection.cursor()

# Drop the old table if it exists (careful: this will delete all data in the table)
cursor.execute('DROP TABLE IF EXISTS users')

# Create a new table with the correct columns
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    fullname TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)
''')

# Commit changes and close the connection
connection.commit()
connection.close()

print("Database and table created.")

