# PowerShell script to set up the glaucoma detection model environment
Write-Host "Setting up Glaucoma Detection Model Environment" -ForegroundColor Cyan

# Check if Python is installed
try {
    $pythonVersion = python --version
    Write-Host "Found Python: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "Python not found. Please install Python 3.8+ before continuing." -ForegroundColor Red
    exit
}

# Check if PyTorch is installed
try {
    $torchStatus = python -c "import torch; print(f'PyTorch version: {torch.__version__}')"
    Write-Host $torchStatus -ForegroundColor Green
} catch {
    Write-Host "PyTorch not installed. Installing required packages..." -ForegroundColor Yellow
    python -m pip install torch torchvision pillow
}

# Create necessary directories
Write-Host "Creating necessary directories..." -ForegroundColor Yellow
if (-not (Test-Path "model")) {
    New-Item -Path "model" -ItemType Directory | Out-Null
}
if (-not (Test-Path "temp")) {
    New-Item -Path "temp" -ItemType Directory | Out-Null
}

# Check for the model file
$defaultModelPath = "C:\Users\aravi\Downloads\vgg19_model_1_Epoch11_ACC=0.7619047619047619.pth"
$modelExists = Test-Path $defaultModelPath

if ($modelExists) {
    Write-Host "Model file found at: $defaultModelPath" -ForegroundColor Green
} else {
    Write-Host "Model file not found at default location. Please provide the path to your model file:" -ForegroundColor Yellow
    $userModelPath = Read-Host
    if (Test-Path $userModelPath) {
        Write-Host "Model file found at: $userModelPath" -ForegroundColor Green
        
        # Update model path in predict.py
        Write-Host "Updating model path in predict.py..." -ForegroundColor Yellow
        $predictPyPath = "model/predict.py"
        if (Test-Path $predictPyPath) {
            $content = Get-Content $predictPyPath -Raw
            $escapedPath = $userModelPath -replace '\\', '\\'
            $newContent = $content -replace 'MODEL_PATH = r".*"', "MODEL_PATH = r`"$escapedPath`""
            Set-Content $predictPyPath $newContent
            Write-Host "Updated model path in $predictPyPath" -ForegroundColor Green
        } else {
            Write-Host "predict.py not found. Please make sure the application is properly downloaded." -ForegroundColor Red
        }
    } else {
        Write-Host "Model file not found at: $userModelPath" -ForegroundColor Red
        Write-Host "Please download or locate your model file and update the path in 'model/predict.py'" -ForegroundColor Red
    }
}

# Test the model setup
Write-Host "Testing model setup..." -ForegroundColor Yellow
if (Test-Path "test_model.py") {
    Write-Host "You can test your model with an example image by running:" -ForegroundColor Cyan
    Write-Host "python test_model.py --image path/to/your/eye_image.jpg" -ForegroundColor Cyan
} else {
    Write-Host "test_model.py not found. Please make sure the application is properly downloaded." -ForegroundColor Red
}

Write-Host "Setup complete!" -ForegroundColor Green 