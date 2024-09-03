from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from nonogram_solver import *

app = Flask(__name__)
CORS(app)


@app.route("/solve-nonogram", methods=["POST"])
def solve_nonogram():
    data = request.get_json()
    print(data)
    rows = data["rows"]
    cols = data["cols"]
    row_data = list(data["row_data"])
    col_data = list(data["col_data"])
    nonogram = Nonogram(rows, cols, row_data, col_data)
    solution = nonogram.get_board()
    if solution:
        return make_response(jsonify({"solution": solution}), 200)
    else:
        return make_response(
            jsonify({"solution": None}), 400
        )


@app.route("/read_nonogram", methods=["POST"])
def read_nonogram():
    print("hi")

if __name__ == "__main__":
    app.run(host="localhost", port=5000)
