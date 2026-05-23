"""Test script for Flask deployment"""
from server import app

print("Flask server imported successfully!")
print("\nAvailable Routes:")
for rule in app.url_map.iter_rules():
    print(f"  {rule.rule} -> {rule.endpoint}")

# Test the test endpoint
print("\n\nTesting /test endpoint...")
with app.test_client() as client:
    response = client.get('/test')
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json}")

# Test the emotion detector endpoint
print("\n\nTesting /emotionDetector endpoint with valid input...")
with app.test_client() as client:
    response = client.post('/emotionDetector', 
                          json={"text_to_analyze": "I am so happy!"})
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json}")

# Test error handling with blank input
print("\n\nTesting /emotionDetector endpoint with blank input (error handling)...")
with app.test_client() as client:
    response = client.post('/emotionDetector', 
                          json={"text_to_analyze": ""})
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json}")
