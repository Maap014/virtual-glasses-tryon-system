
import os
from models.glasses import init_glasses_table
import sqlite3
from utils.init_db import db_name
from datetime import datetime, date

# INIT DATABASE
def init_database():
    """
    Initialize database tables and seed initial data.
    Only runs full seeding once - checks for flag file.
    """
    # Check if database has already been seeded
    seed_flag_file = os.path.join('instance', '.db_seeded')
    
    # Always create glasses table if it doesn't exist
    init_glasses_table()
    
    # check if the seed flag file exists
    if os.path.exists(seed_flag_file):
        print("Database already seeded. Skipping seeding.")
        return
    
    print("Seeding database with initial glasses data...")
    
    # SQLite Connection
    conn = sqlite3.connect(db_name())
    cursor = conn.cursor()
    
    # seed data fro glasses
    glasses_data = [
        ("Aviator", "Sunglasses", "Classic aviator sunglasses with metal frame.", 99.99, "https://example.com/images/aviator.jpg"),
        ("Wayfarer", "Sunglasses", "Stylish wayfarer sunglasses with plastic frame.", 79.99, "https://example.com/images/wayfarer.jpg"),
        ("Round Metal", "Sunglasses", "Trendy round metal sunglasses with thin frame.", 89.99, "https://example.com/images/round_metal.jpg"),
        ("Cat Eye", "Sunglasses", "Elegant cat eye sunglasses with acetate frame.", 109.99, "https://example.com/images/cat_eye.jpg"),
        ("Clubmaster", "Sunglasses", "Retro clubmaster sunglasses with mixed materials.", 119.99, "https://example.com/images/clubmaster.jpg"),
    ]
    
    # Insert seed data into the glasses table
    cursor.executemany(
        """INSERT INTO glasses (name, category, description, price, image_url) VALUES (?, ?, ?, ?, ?)""",
        glasses_data
    )
    
    print("Database seeded successfully.")
    
    # Commit changes and close connection
    conn.commit()
    conn.close()
    
    
        # Create flag file to indicate seeding is complete
    os.makedirs('instance', exist_ok=True)
    with open(seed_flag_file, 'w') as f:
        f.write(datetime.now().isoformat())

    print("\n Database initialized & seeded successfully!")
    print("(Future runs will skip seeding. Delete instance/.db_seeded to re-seed)")
