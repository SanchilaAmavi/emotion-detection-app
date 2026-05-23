# Emotion Detection Mobile App

This is a professional mobile client for the Emotion Detection application.
It is built with Expo and connects to the Flask backend API to analyze text emotions.

## Setup

1. Install Expo CLI if needed:
```bash
npm install -g expo-cli
```

2. Install dependencies:
```bash
cd mobile-app
npm install
```

3. Start the mobile app:
```bash
npm start
```

## Backend Configuration

By default, the app uses:
```
http://localhost:5000
```

If you run the backend on a mobile device or emulator, update the backend URL in the app entry screen to the correct local network address.

## Usage

1. Enter the text to analyze.
2. Tap **Analyze Emotion**.
3. Review the emotion scores and dominant emotion.

## Notes

- Use `http://10.0.2.2:5000` for Android emulator to reach a local development backend.
- Use `http://<your-machine-ip>:5000` for testing on a physical mobile device connected to the same network.
