import os

from flask import Flask, json, current_app as app

app = Flask(__name__)

with open(os.path.dirname(__file__) + '/data/mock_search.json') as f:
    json_search = json.load(f)
with open(os.path.dirname(__file__) + '/data/mock_course_cs577.json') as f:
    json_course = json.load(f)
with open(os.path.dirname(__file__) + '/data/mock_professor_marc_renault.json') as f:
    json_instructor = json.load(f)

@app.route('/search')
def search():
    return json_search

@app.route('/course')
def course():
    return json_course

@app.route('/professor')
def professor():
    return json_instructor