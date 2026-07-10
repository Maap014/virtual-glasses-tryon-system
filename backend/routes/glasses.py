from flask import Blueprint, jsonify, request
from models.glasses import Glasses

api = Blueprint("vto", __name__)


@api.route("/all_glasses", methods=["GET"])
def get_glasses():
    try:
        category = request.args.get("category", "").strip().lower()
        glasses = Glasses.get_glasses(category)

        return jsonify({
            "success": True,
            "data": [g.__dict__ for g in glasses],
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "message": "Failed to retrieve glasses.",
            "error": str(e),
        }), 500