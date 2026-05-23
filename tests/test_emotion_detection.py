"""
Unit tests for the EmotionDetection module.
Tests the emotion_detector function with various inputs.
"""

import unittest
from EmotionDetection.emotion_detection import emotion_detector


class TestEmotionDetector(unittest.TestCase):
    """Test class for emotion_detector function"""
    
    def test_emotion_detector_joy(self):
        """Test for joy emotion detection"""
        result = emotion_detector("I love this so much!")
        self.assertEqual(result["dominant_emotion"], "joy")
    
    def test_emotion_detector_fear(self):
        """Test for fear emotion detection"""
        result = emotion_detector("I am really afraid!")
        self.assertEqual(result["dominant_emotion"], "fear")
    
    def test_emotion_detector_anger(self):
        """Test for anger emotion detection"""
        result = emotion_detector("This makes me so angry!")
        self.assertEqual(result["dominant_emotion"], "anger")
    
    def test_emotion_detector_sadness(self):
        """Test for sadness emotion detection"""
        result = emotion_detector("I am so sad about this")
        self.assertEqual(result["dominant_emotion"], "sadness")
    
    def test_emotion_detector_disgust(self):
        """Test for disgust emotion detection"""
        result = emotion_detector("This is disgusting!")
        self.assertEqual(result["dominant_emotion"], "disgust")
    
    def test_emotion_detector_blank_input(self):
        """Test for blank input error handling"""
        result = emotion_detector("")
        self.assertEqual(result["status_code"], 400)
        self.assertIsNone(result["dominant_emotion"])
    
    def test_emotion_detector_none_input(self):
        """Test for None input error handling"""
        result = emotion_detector(None)
        self.assertEqual(result["status_code"], 400)
        self.assertIsNone(result["dominant_emotion"])


if __name__ == '__main__':
    unittest.main()
