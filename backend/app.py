
import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from database.seed_db import init_database
from routes.glasses import api


load_dotenv()

app = Flask(__name__)
CORS(app)

init_database()
app.register_blueprint(api, url_prefix="/vto")



if __name__ == "__main__":
    app.run(debug=True)
    