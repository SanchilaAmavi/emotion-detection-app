"""
Emotion Detection Module using Watson NLP Library
This module provides functions to detect emotions from text input.
"""

import requests
import json

def emotion_detector(text_to_analyze):
    """
    Analyzes the emotion of the given text using Watson NLP API.
    
    Args:
        text_to_analyze (str): The text to analyze for emotions
        
    Returns:
        dict: A dictionary containing emotion scores and the dominant emotion,
              or a dictionary with error status for invalid input
    """
    
    # Check for blank input
    if not text_to_analyze or text_to_analyze.strip() == "":
        return {
            "anger": None,
            "disgust": None,
            "fear": None,
            "joy": None,
            "sadness": None,
            "dominant_emotion": None,
            "status_code": 400,
            "status_message": "Invalid input! Text cannot be empty."
        }
    
    # Watson NLP API endpoint and authentication
    url = "https://sn-watson-emotion.labs.skills.network/v1/watson.runtime.nlp.v1/NlpService/EmotionPredict"
    headers = {"grpc-metadata-mm-model-id": "emotion_aggregated-workflow_lang_en_stock@1.0.0"}
    input_data = {"raw_document": {"text": text_to_analyze}}
    
    try:
        # Make request to Watson API
        response = requests.post(url, json=input_data, headers=headers, timeout=10)
        
        # Check for HTTP errors
        if response.status_code == 400:
            return {
                "anger": None,
                "disgust": None,
                "fear": None,
                "joy": None,
                "sadness": None,
                "dominant_emotion": None,
                "status_code": 400,
                "status_message": "Invalid input! Text cannot be empty."
            }
        
        if response.status_code != 200:
            return {
                "anger": None,
                "disgust": None,
                "fear": None,
                "joy": None,
                "sadness": None,
                "dominant_emotion": None,
                "status_code": response.status_code,
                "status_message": f"Error {response.status_code}: {response.text}"
            }
        
        # Parse response
        response_json = response.json()
        
        # Extract emotion scores from Watson response
        emotions_data = response_json.get("emotionPredictions", [{}])[0].get("emotion", {})
        
        # Prepare output with emotion scores
        emotions = {
            "anger": emotions_data.get("anger", 0),
            "disgust": emotions_data.get("disgust", 0),
            "fear": emotions_data.get("fear", 0),
            "joy": emotions_data.get("joy", 0),
            "sadness": emotions_data.get("sadness", 0)
        }
        
        # Find dominant emotion
        dominant_emotion = max(emotions, key=emotions.get)
        
        return {
            "anger": emotions["anger"],
            "disgust": emotions["disgust"],
            "fear": emotions["fear"],
            "joy": emotions["joy"],
            "sadness": emotions["sadness"],
            "dominant_emotion": dominant_emotion
        }
    
    except requests.exceptions.Timeout:
        return {
            "anger": None,
            "disgust": None,
            "fear": None,
            "joy": None,
            "sadness": None,
            "dominant_emotion": None,
            "status_code": 500,
            "status_message": "Request timeout"
        }
    except requests.exceptions.RequestException as e:
        return {
            "anger": None,
            "disgust": None,
            "fear": None,
            "joy": None,
            "sadness": None,
            "dominant_emotion": None,
            "status_code": 500,
            "status_message": f"Error: {str(e)}"
        }
