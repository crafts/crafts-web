#!/usr/bin/env python

from couchdb import Server
from flask import Flask
from flask import render_template
from flask import Response
import requests

app = Flask(__name__)
db = Server()['crafts']

@app.route('/')
def home():
    return

@app.route('/history')
def view_graphs():
    return render_template('history.html')

@app.route('/history.json')
def get_graph_data():
    res = requests.get("http://localhost:5984/crafts/_design/crafts/_list/history/summary")
    return Response(res.text, mimetype='application/json')

if __name__ == '__main__':
    app.run(debug=True)
