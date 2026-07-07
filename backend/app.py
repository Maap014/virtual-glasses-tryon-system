
import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route("/", methods =["GET"])
def get_data():
    data = {"message": "Hello from Flask!"}
    return data



if __name__ == "__main__":
    app.run(debug=True)
    