#!/usr/bin/env python

from couchdb import Server
from crafts.common.metrics import AggregateCollection
from crafts.common.metrics import PredictionCollection
from flask import Flask
from flask import render_template
from flask import request
from flask import Response
import json
import time

app = Flask(__name__)
db = Server()['crafts']

@app.route('/')
def home():
    return

@app.route('/history')
def view_graphs():
    return render_template('history.html')

@app.route('/aggregates')
def get_aggregate_data():
    role = request.args.get('role')
    data = AggregateCollection(db, role)
    data.get()

    result = [(time.mktime(timestamp.timetuple()) * 1000, value['requests']['sum'])
            for (timestamp, value) in sorted(data.items())]
    return Response(json.dumps(result), mimetype='application/json')

@app.route('/predictions')
def get_predictions_data():
    role = request.args.get('role')
    data = PredictionCollection(db, role)
    data.get()

    result = [(time.mktime(timestamp.timetuple()) * 1000, value['requests']['sum'])
            for (timestamp, value) in sorted(data.items())]
    return Response(json.dumps(result), mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=True)
