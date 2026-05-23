# Emotion Detection App

A professional emotion detection application delivered as both a web app and a mobile app.
This project uses IBM Watson NLP concepts to analyze text and identify five core emotions.

## Overview

Emotion Detection App evaluates input text and returns:
- **Anger**
- **Disgust**
- **Fear**
- **Joy**
- **Sadness**
- **Dominant emotion** based on the highest score

## Key Features

- **Responsive Web App**: Modern interface built for desktop and mobile browsers
- **Mobile App Client**: Expo-based React Native mobile application
- **REST API**: Flask backend with JSON emotion prediction endpoint
- **Error Handling**: Blank text validation and API error responses
- **Unit Tests**: 7 test cases covering core workflows and input validation
- **Static Analysis**: Pylint validation with a perfect score

## Project Structure

```
Emotion_Detector/
├── EmotionDetection/             # Core emotion detector package
│   ├── __init__.py
│   └── emotion_detection.py
├── mobile-app/                   # React Native Expo mobile app
│   ├── App.js
│   ├── app.json
│   ├── package.json
│   ├── babel.config.js
│   └── README.md
├── static/                       # Web client assets
│   ├── css/style.css
│   └── js/main.js
├── templates/                    # Web app template
│   └── index.html
├── tests/                        # Unit tests
│   └── test_emotion_detection.py
├── server.py                     # Flask backend API
├── requirements.txt              # Python dependencies
├── README.md                     # Project documentation
├── GRADING_SUMMARY.md            # Grading deliverables
├── FINAL_REPORT.md               # Final project report
├── PROJECT_INDEX.md              # Navigation guide
└── SUBMISSION.md                 # Assignment submission details
```

## Web App Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the Flask backend:
```bash
python server.py
```

3. Open your browser at:
```
http://localhost:5000
```

## Mobile App Setup

1. Install Expo CLI (if not already installed):
```bash
npm install -g expo-cli
```

2. Install mobile app dependencies:
```bash
cd mobile-app
npm install
```

3. Start the Expo mobile app:
```bash
npm start
```

4. Update the backend URL inside the mobile app if needed.

## Testing

Run the full test suite:
```bash
python -m unittest discover tests -v
```

## Static Code Analysis

Run Pylint on the primary modules:
```bash
pylint EmotionDetection/emotion_detection.py server.py
```

## Deployment Notes

- The web app is a responsive Flask front-end with professional styling.
- The mobile app is built using Expo and connects to the same Flask API.
- CORS is enabled for the `/emotionDetector` endpoint so mobile clients can reach the API.

## Contribution

This repository is configured for updates to `https://github.com/SanchilaAmavi/emotion-detection-app`.

---

Built for professional deployment and cross-platform experience.

