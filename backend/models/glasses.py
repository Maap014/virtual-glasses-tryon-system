import sqlite3
from utils.init_db import db_name

def init_glasses_table():
    
    conn = sqlite3.connect(db_name())
    cursor = conn.cursor()
    
    # Create the glasses table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS glasses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL NOT NULL,
            image_url TEXT NOT NULL
        )
    ''')
    
    conn.commit()
    conn.close()
    

class Glasses:
    
    def __init__(self, id, name, category, description, price, image_url):
        self.id = id
        self.name = name
        self.category = category
        self.description = description
        self.price = price
        self.image_url = image_url
        
    
    @staticmethod
    def get_glasses(category=None):
        conn = sqlite3.connect(db_name())
        cursor = conn.cursor()

        if category and category.lower() != "all":
            cursor.execute(
                "SELECT id, name, category, description, price, image_url FROM glasses WHERE category = ?",
                (category,),
            )
        else:
            cursor.execute(
                "SELECT id, name, category, description, price, image_url FROM glasses"
            )

        rows = cursor.fetchall()
        conn.close()
        return [
            Glasses(
                id=row[0],
                name=row[1],
                category=row[2],
                description=row[3],
                price=row[4],
                image_url=row[5],
            )
            for row in rows
        ]
       