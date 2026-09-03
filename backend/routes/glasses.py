from flask import Blueprint, jsonify, request
from models.glasses import Glasses

api = Blueprint("vto", __name__)


@api.route("/all_glasses", methods=["GET"])
def get_glasses():
    try:
           # Read and normalise the optional category filter from the request.
        category = request.args.get("category", "").strip().lower()
        glasses = Glasses.get_glasses(category)

        # Return the retrieved products as JSON.
        return jsonify({
            "success": True,
            "data": [g.__dict__ for g in glasses],
        }), 200
    except Exception:
          # Return a safe error message 
        return jsonify({
            "success": False,
            "message": "Failed to retrieve glasses.",
        }), 500