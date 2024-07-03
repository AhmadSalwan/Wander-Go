from flask import Flask
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

app.config['SECRET_KEY']=""
app.config['SQLALCHEMY_DATABASE_URI'] ="mysql://root:@localhost/final_web_lanjutan"
app.config['SQLALCHEMY_TRACK_MODIFICATONS'] ="False"

db=SQLAlchemy(app)