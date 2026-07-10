from models.glasses import init_glasses_table
import sqlite3
from utils.init_db import db_name
import os
import json

# INIT DATABASE
def init_database():
    """
    Initialize database tables and seed initial data.
    Only runs full seeding once - checks for flag file.
    """

    # Always create glasses table if it doesn't exist
    init_glasses_table()

    # SQLite Connection
    conn = sqlite3.connect(db_name())
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM glasses")
    
    count = cursor.fetchone()[0]
    # check if database row is greater than 0, if so skip seeding
    if count > 0:
        print("Database already seeded. Skipping seeding.")
        conn.close()
        return
    
    print("Seeding database with initial glasses data...")
    
    base_path = os.path.dirname(os.path.abspath(__file__))
    glasses_data_path = os.path.join(base_path, 'glasses_seed.json')
    
    with open(glasses_data_path, "r", encoding="utf-8") as file:
            glasses_data = json.load(file)
            
    # Convert each JSON dictionary into a tuple
    glasses_records = [
        (
            glasses["name"],
            glasses["category"],
            glasses["description"],
            glasses["price"],
            glasses["image_url"],
        )
        for glasses in glasses_data
    ]

 
    # Insert seed data into the glasses table
    cursor.executemany(
        """INSERT INTO glasses (name, category, description, price, image_url) VALUES (?, ?, ?, ?, ?)""",
        glasses_records
    )
    
    print("Database seeded successfully.")
    
    # Commit changes and close connection
    conn.commit()
    conn.close()
    
    print("\n Database initialized & seeded successfully!")
    print("(Future runs will skip seeding. Delete database to re-seed)")
