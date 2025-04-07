import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import numpy as np
import io
import base64
import datetime
import sys
import json
import os

# Define the path to the model file
MODEL_PATH = r"C:\Users\aravi\Downloads\vgg19_model_1_Epoch11_ACC=0.7619047619047619.pth"

class GlaucomaDetector:
    def __init__(self):
        # Check if model file exists
        if not os.path.exists(MODEL_PATH):
            print(f"Warning: Model file not found at {MODEL_PATH}")
            print("Using pretrained VGG19 model without weights")
            use_pretrained = True
        else:
            use_pretrained = False
            
        # Load pre-trained VGG19 model
        self.model = models.vgg19(pretrained=use_pretrained)
        
        # Modify the classifier for binary classification (glaucoma/no glaucoma)
        self.model.classifier[6] = nn.Linear(4096, 2)
        
        # Load the trained weights
        if os.path.exists(MODEL_PATH):
            try:
                # Load model with map_location to handle model trained on different device
                state_dict = torch.load(MODEL_PATH, map_location=torch.device('cpu'))
                self.model.load_state_dict(state_dict)
                print(f"Successfully loaded model from {MODEL_PATH}")
            except Exception as e:
                print(f"Error loading model: {e}")
        
        self.model.eval()
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        print(f"Using device: {self.device}")
        self.model.to(self.device)
        
        # Define image transformations
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
    
    def preprocess_image(self, image_data):
        """Convert base64 image to PIL Image and preprocess it."""
        try:
            # Remove data URL prefix if present
            if ',' in image_data:
                image_data = image_data.split(',')[1]
            
            # Decode base64 image
            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
            
            # Apply transformations
            image_tensor = self.transform(image)
            return image_tensor.unsqueeze(0).to(self.device)
        except Exception as e:
            print(f"Error preprocessing image: {e}")
            return None
    
    def predict(self, image_data):
        """Make a prediction on the input image."""
        try:
            # Preprocess the image
            image_tensor = self.preprocess_image(image_data)
            if image_tensor is None:
                return {
                    "error": "Failed to preprocess image",
                    "success": False
                }
            
            # Make prediction
            with torch.no_grad():
                outputs = self.model(image_tensor)
                probabilities = torch.softmax(outputs, dim=1)
                prediction = torch.argmax(probabilities, dim=1).item()
                confidence = probabilities[0][prediction].item()
            
            # Return results
            return {
                "success": True,
                "prediction": "Glaucoma detected" if prediction == 1 else "No glaucoma detected",
                "confidence": confidence,
                "model": "VGG19",
                "model_path": MODEL_PATH,
                "timestamp": str(datetime.datetime.now())
            }
        
        except Exception as e:
            return {
                "error": str(e),
                "success": False
            }

def main():
    if len(sys.argv) != 2:
        print(json.dumps({
            "error": "Image file path is required",
            "success": False
        }))
        sys.exit(1)

    try:
        # Read the image data from the file
        with open(sys.argv[1], 'r') as f:
            image_data = f.read()

        # Create detector instance and make prediction
        detector = GlaucomaDetector()
        result = detector.predict(image_data)

        # Print the result as JSON
        print(json.dumps(result))
        sys.exit(0 if result["success"] else 1)

    except Exception as e:
        print(json.dumps({
            "error": str(e),
            "success": False
        }))
        sys.exit(1)

if __name__ == "__main__":
    main() 