import psycopg2
import bcrypt
from datetime import datetime




# Database connection parameters
#localhost if its same mechine or the ip or address to server
server = 'localhost'
#db name in postgres
database = 'flask_db'
#username in prostgres
user = 'postgres'
#password in postgres
password = 'postgres'
#port number configured for postgres,5432 is default port for postgres
port = 5432

# Data to be inserted

username_input = 'admin@company.com'
password_input = "admin"
role_input = "ADMIN"

# Hash the password
hashed_password = bcrypt.hashpw(password_input.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def username_exists(connection, username):
    cursor = connection.cursor()
    query = "SELECT 1 FROM credential WHERE username = %s"
    cursor.execute(query, (username,))
    exists = cursor.fetchone() is not None
    cursor.close()
    return exists

try:
    # Connect to the PostgreSQL database
    connection = psycopg2.connect(
        host=server,
        database=database,
        user=user,
        password=password,
        port=port
    )

    cursor = connection.cursor()

    if username_exists(connection, username_input):
        print(f"Username '{username_input}' already exists.")
    else:
        

        # Insert data into the table
        insert_query = """
        INSERT INTO Credential (username, _password,role)
        VALUES (%s, %s, %s)
        """
        cursor.execute(insert_query, ( username_input, hashed_password,role_input))

        # Commit the transaction
        connection.commit()
        print("Data inserted successfully.")

except Exception as error:
    print(f"Error: {error}")

finally:
    # Close the database connection
    if connection:
        cursor.close()
        connection.close()
        print("Database connection closed.")
