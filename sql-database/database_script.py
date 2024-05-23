import sqlite3
import os

def create_tables():
    sql_statements = [ 
        """CREATE TABLE IF NOT EXISTS tea (
                id INTEGER PRIMARY KEY, 
                tea_name TEXT NOT NULL, 
                type TEXT,
                country TEXT, 
                region TEXT
        );"""]
    
    try:
        with sqlite3.connect('tea.db') as conn:
            cursor = conn.cursor()
            for statement in sql_statements:
                cursor.execute(statement)
            
            conn.commit()
    except sqlite3.Error as e:
        print(e)


if __name__ == '__main__':
    database_name = "tea.db"
    try:
        with open( database_name ) as f:
            pass
    except:
        os.system( f"touch {database_name}" )
    create_tables()