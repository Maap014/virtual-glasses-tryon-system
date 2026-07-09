from models.glasses import init_glasses_table
import sqlite3
from utils.init_db import db_name

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
    
    print("\n Database initialized & seeded successfully!")
    print("(Future runs will skip seeding. Delete database to re-seed)")
