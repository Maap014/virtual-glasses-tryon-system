from flask import Blueprint, jsonify
from models.glasses import Glasses

api = Blueprint("vto", __name__)


@api.route("/glasses", methods=["GET"])
def get_all_glasses():
    try:
        glasses = Glasses.get_all_glasses()
        return jsonify({
            "success": True,
            "data":[g.__dict__ for g in glasses],
            }),200
    except Exception as e:
        return jsonify({
            "success": False,
            "message": "Failed to retrieve glasses.",
            "error": str(e)
        }), 500
  