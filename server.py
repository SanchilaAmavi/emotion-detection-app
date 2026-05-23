"""
Flask web server for Emotion Detection application.
Provides REST API endpoints for emotion detection.
"""

from flask import Flask, request, render_template
from flask_cors import CORS
from EmotionDetection.emotion_detection import emotion_detector

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app, resources={r"/emotionDetector": {"origins": "*"}})


@app.route("/")
def index():
    """Render the main HTML page"""
    return render_template("index.html")


@app.route("/emotionDetector", methods=["POST"])
def detect_emotion():
    """
    API endpoint for emotion detection.
    Expects JSON payload with 'text_to_analyze' field.
    
    Returns:
        JSON response with emotion scores or error message
    """
    request_data = request.get_json()
    
    if not request_data or "text_to_analyze" not in request_data:
        return {"error": "No text provided"}, 400
    
    text_to_analyze = request_data.get("text_to_analyze", "").strip()
    
    if not text_to_analyze:
        return {
            "error": "Invalid input! Text cannot be empty.",
            "status_code": 400
        }, 400
    
    result = emotion_detector(text_to_analyze)
    
    if result.get("status_code") == 400:
        return {"error": result.get("status_message", "Invalid input")}, 400
    
    return result, 200


@app.route("/test", methods=["GET"])
def test_endpoint():
    """Simple test endpoint to verify server is running"""
    test_text = "I love this so much!"
    result = emotion_detector(test_text)
    return {
        "message": "Test successful",
        "test_text": test_text,
        "result": result
    }, 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
