# Glaucoma Detection AI

A modern, responsive web application for detecting glaucoma using AI. This application uses a VGG19 deep learning model trained on the Kaggle Glaucoma Detection Dataset to analyze eye images and provide early detection of glaucoma.

![Glaucoma Detection AI](https://via.placeholder.com/800x400?text=Glaucoma+Detection+AI)

## Features

- 🧠 **AI-Powered Detection**: Uses a state-of-the-art VGG19 model for accurate glaucoma detection
- 🖼️ **Image Upload**: Simple drag-and-drop interface for uploading eye images
- 📊 **Real-time Analysis**: Get instant results with confidence scores
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🌈 **Modern UI**: Beautiful, intuitive interface with animations and visual feedback
- 🔒 **Privacy Focused**: Your images are processed securely and not stored permanently

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **UI Libraries**: Material UI, NextUI, Tailwind CSS
- **Animations**: Framer Motion
- **3D Effects**: Three.js
- **State Management**: Zustand
- **API**: Next.js API Routes
- **AI Model**: VGG19 (PyTorch)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.8+ (for the AI model)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/glaucoma-detection-ai.git
   cd glaucoma-detection-ai
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the Python environment for the AI model:
   ```bash
   # Create a virtual environment
   python -m venv venv
   
   # Activate the virtual environment
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   
   # Install Python dependencies
   pip install -r requirements.txt
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Upload an eye image using the drag-and-drop interface or by clicking to select a file
2. Click "Detect Glaucoma" to analyze the image
3. View the results, including the detection outcome and confidence score
4. Check the "Recent Analyses" section to see your detection history

## Model Information

The application uses the VGG19 model trained on the [Kaggle Glaucoma Detection Dataset](https://www.kaggle.com/datasets/sshikamaru/glaucoma-detection/). The model achieves an accuracy of approximately 76% on the test dataset.

## Model Configuration

The application is configured to use a pre-trained VGG19 model located at:
```
C:\Users\aravi\Downloads\vgg19_model_1_Epoch11_ACC=0.7619047619047619.pth
```

### Using the Setup Script

For Windows users, there's a PowerShell script that helps you set up the model:

```powershell
# In PowerShell
.\setup_model.ps1
```

This script:
1. Checks if Python and PyTorch are installed
2. Creates necessary directories
3. Verifies the model file exists and helps you update the path if needed
4. Provides guidance on testing the model

### Manual Configuration

You can also manually change the model path in the `model/predict.py` file by modifying the `MODEL_PATH` variable:

```python
# Define the path to the model file
MODEL_PATH = r"C:\Users\aravi\Downloads\vgg19_model_1_Epoch11_ACC=0.7619047619047619.pth"
```

### Testing the Model

You can test the model without running the full application using one of these methods:

#### Automatic Test with Sample Image

For Windows users, run the provided PowerShell script:

```powershell
.\test_with_sample.ps1
```

This will:
1. Download a sample eye image (or prompt you to provide one)
2. Run the model against the image
3. Display the prediction results

#### Manual Testing

You can also manually test with any image:

```bash
# On Windows
python test_model.py --image path/to/eye_image.jpg

# On macOS/Linux
python3 test_model.py --image path/to/eye_image.jpg
```

This will load the model and run a prediction on the specified image, displaying the results in the console.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Kaggle Glaucoma Detection Dataset](https://www.kaggle.com/datasets/sshikamaru/glaucoma-detection/)
- [VGG19 Paper](https://arxiv.org/abs/1409.1556)
- [Next.js](https://nextjs.org/)
- [Three.js](https://threejs.org/)
- [Material UI](https://mui.com/)
- [NextUI](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
