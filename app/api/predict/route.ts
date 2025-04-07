import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    if (!image) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }

    // Create a temporary file to store the image data
    const tempDir = path.join(process.cwd(), 'temp');
    await fs.mkdir(tempDir, { recursive: true });
    
    const tempFile = path.join(tempDir, `image_${Date.now()}.txt`);
    await fs.writeFile(tempFile, image);

    // Run the Python script
    return new Promise((resolve) => {
      const pythonProcess = spawn('python', [
        path.join(process.cwd(), 'model', 'predict.py'),
        tempFile
      ]);

      let result = '';
      let error = '';

      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
      });

      pythonProcess.on('close', async (code) => {
        // Clean up the temporary file
        try {
          await fs.unlink(tempFile);
        } catch (e) {
          console.error('Error deleting temporary file:', e);
        }

        if (code !== 0) {
          resolve(NextResponse.json(
            { error: `Python process failed: ${error}` },
            { status: 500 }
          ));
          return;
        }

        try {
          const prediction = JSON.parse(result);
          resolve(NextResponse.json(prediction));
        } catch (e) {
          resolve(NextResponse.json(
            { error: 'Failed to parse prediction result' },
            { status: 500 }
          ));
        }
      });
    });
  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { error: 'Failed to process prediction' },
      { status: 500 }
    );
  }
} 