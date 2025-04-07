# PowerShell script to test the glaucoma detection model with a sample image
Write-Host "Testing Glaucoma Detection Model with Sample Image" -ForegroundColor Cyan

# Create sample directory if it doesn't exist
if (-not (Test-Path "samples")) {
    New-Item -Path "samples" -ItemType Directory | Out-Null
    Write-Host "Created samples directory" -ForegroundColor Green
}

# Sample image URL - this is a publicly available eye image for testing
$sampleImageUrl = "https://static.wikia.nocookie.net/psychology/images/8/8c/Eye-1.jpg"
$sampleImagePath = "samples\sample_eye.jpg"

# Download the sample image if it doesn't exist
if (-not (Test-Path $sampleImagePath)) {
    Write-Host "Downloading sample eye image..." -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri $sampleImageUrl -OutFile $sampleImagePath
        Write-Host "Sample image downloaded to $sampleImagePath" -ForegroundColor Green
    } catch {
        Write-Host "Failed to download sample image: $_" -ForegroundColor Red
        
        # Alternative: Let user provide an image
        Write-Host "Please provide the path to an eye image to test with:" -ForegroundColor Yellow
        $userImagePath = Read-Host
        if (Test-Path $userImagePath) {
            $sampleImagePath = $userImagePath
            Write-Host "Using user-provided image: $sampleImagePath" -ForegroundColor Green
        } else {
            Write-Host "Image not found. Exiting test." -ForegroundColor Red
            exit
        }
    }
} else {
    Write-Host "Using existing sample image: $sampleImagePath" -ForegroundColor Green
}

# Check if the test script exists
if (-not (Test-Path "test_model.py")) {
    Write-Host "test_model.py not found. Please make sure the application is properly downloaded." -ForegroundColor Red
    exit
}

# Run the test
Write-Host "Running model test with sample image..." -ForegroundColor Yellow
try {
    python test_model.py --image $sampleImagePath
    
    Write-Host "Test completed successfully!" -ForegroundColor Green
    Write-Host "You can now run the full application with 'npm run dev'" -ForegroundColor Cyan
} catch {
    Write-Host "Test failed: $_" -ForegroundColor Red
    Write-Host "Please check model configuration and dependencies." -ForegroundColor Red
} 