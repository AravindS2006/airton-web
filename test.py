import sys
import json
import base64
from PIL import Image
import io

def encode_image(image_path):
    """Encode an image file as base64."""
    with open(image_path, 'rb') as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def test_prediction(image_path):
    """Test the prediction functionality with a sample image."""
    try:
        # Encode the image
        image_data = encode_image(image_path)
        
        # Create a temporary file with the image data
        with open('temp/test_image.txt', 'w') as f:
            f.write(image_data)
        
        # Run the prediction script
        import subprocess
        result = subprocess.run(['python', 'model/predict.py', 'temp/test_image.txt'],
                              capture_output=True, text=True)
        
        # Parse the result
        prediction = json.loads(result.stdout)
        
        # Print the results
        print("\nTest Results:")
        print("-" * 50)
        print(f"Image: {image_path}")
        print(f"Prediction: {prediction['prediction']}")
        print(f"Confidence: {prediction['confidence']}%")
        print(f"Model: {prediction['model']}")
        print(f"Timestamp: {prediction['timestamp']}")
        print("-" * 50)
        
        return prediction['success']
    
    except Exception as e:
        print(f"Error during testing: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python test.py <path_to_image>")
        sys.exit(1)
    
    success = test_prediction(sys.argv[1])
    sys.exit(0 if success else 1) 