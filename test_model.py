import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import os
import argparse

MODEL_PATH = r"C:\Users\aravi\Downloads\vgg19_model_1_Epoch11_ACC=0.7619047619047619.pth"

def load_model():
    """Load the VGG19 model with trained weights"""
    print("Loading model...")
    
    # Check if model file exists
    if not os.path.exists(MODEL_PATH):
        print(f"Error: Model file not found at {MODEL_PATH}")
        return None
    
    # Load pre-trained VGG19 model
    model = models.vgg19(pretrained=False)
    
    # Modify the classifier for binary classification
    model.classifier[6] = nn.Linear(4096, 2)
    
    try:
        # Load model with map_location to handle model trained on different device
        state_dict = torch.load(MODEL_PATH, map_location=torch.device('cpu'))
        model.load_state_dict(state_dict)
        print(f"Successfully loaded model from {MODEL_PATH}")
        model.eval()  # Set model to evaluation mode
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

def preprocess_image(image_path):
    """Preprocess an image for the model"""
    if not os.path.exists(image_path):
        print(f"Error: Image file not found at {image_path}")
        return None
    
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    try:
        # Open and preprocess the image
        image = Image.open(image_path).convert('RGB')
        image_tensor = transform(image)
        return image_tensor.unsqueeze(0)  # Add batch dimension
    except Exception as e:
        print(f"Error preprocessing image: {e}")
        return None

def predict(model, image_tensor):
    """Make a prediction with the model"""
    if model is None or image_tensor is None:
        return None
    
    try:
        # Make prediction
        with torch.no_grad():
            outputs = model(image_tensor)
            probabilities = torch.softmax(outputs, dim=1)
            prediction = torch.argmax(probabilities, dim=1).item()
            confidence = probabilities[0][prediction].item()
        
        result = {
            "prediction": "Glaucoma detected" if prediction == 1 else "No glaucoma detected",
            "confidence": confidence,
            "confidence_percent": f"{confidence * 100:.2f}%",
            "class_index": prediction
        }
        
        return result
    except Exception as e:
        print(f"Error making prediction: {e}")
        return None

def main():
    parser = argparse.ArgumentParser(description="Test the glaucoma detection model")
    parser.add_argument('--image', type=str, required=True, help='Path to the image file')
    args = parser.parse_args()
    
    # Load model
    model = load_model()
    if model is None:
        return
    
    # Process image
    image_tensor = preprocess_image(args.image)
    if image_tensor is None:
        return
    
    # Make prediction
    result = predict(model, image_tensor)
    if result is None:
        return
    
    # Print results
    print("\n=== Prediction Results ===")
    print(f"Prediction: {result['prediction']}")
    print(f"Confidence: {result['confidence_percent']}")
    print(f"Class Index: {result['class_index']}")
    print("=========================\n")

if __name__ == "__main__":
    main() 