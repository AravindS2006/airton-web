@echo off
echo Creating Python virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing Python dependencies...
pip install -r requirements.txt

echo Installing Node.js dependencies...
npm install

echo Creating necessary directories...
mkdir temp 2>nul
mkdir model 2>nul

echo Setup complete! You can now run the application with:
echo 1. Activate the virtual environment: venv\Scripts\activate.bat
echo 2. Start the development server: npm run dev
echo 3. Open http://localhost:3000 in your browser

pause 