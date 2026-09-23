from dotenv import load_dotenv
import psycopg
import os

load_dotenv()



def db_sync():
    connection = psycopg.connect(os.getenv("postgr_login"))
    cursor = connection.cursor()
    cursor.execute("""CREATE TABLE IF NOT EXISTS users (
                    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                    email TEXT NOT NULL UNIQUE CHECK(length(email) <=254),  
                    password TEXT NOT NULL,
                    firstName TEXT,
                    lastName TEXT)""") # checks if email is within internet legal limit and not duplicate or empty
    connection.commit()
    return cursor, connection

def check_login(email, password, cursor, connection):
    cursor.execute("""SELECT email FROM """)
