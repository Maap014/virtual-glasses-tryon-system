import os

def clear_database():
    """
    Clear the database by deleting the database file and the seed flag file.
    """
    db_file = os.path.join('instance', 'virtualGlassess.db')

    # Delete the database file if it exists
    if os.path.exists(db_file):
        os.remove(db_file)
        print(f"Deleted database file: {db_file}")
    else:
        print(f"No database file found at: {db_file}")

        
if __name__ == "__main__":
    clear_database()