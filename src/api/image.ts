import { Router, Request, Response } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const router = Router();
const outputDir = path.join(__dirname, '../../output');

// Output Dir
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Resize photos
router.get('/image', async (req: Request, res: Response) => {
  const { inputPath, width, height } = req.query;

  if (!inputPath || !width || !height) {
    return res.status(400).json({ error: 'Missing required query parameters: inputPath, width, height' });
  }
  if (typeof inputPath !== 'string' || typeof width !== 'string' || typeof height !== 'string') {
    return res.status(400).json({ error: 'Invalid query parameters. inputPath, width, and height must be strings.' });
  }
  
  try {
    // Check if the input file exists
    if (!fs.existsSync(inputPath)) {
      return res.status(404).json({ error: 'Image file not found' });
    }

    // Generate a hash based on the input parameters
    const hash = crypto.createHash('md5').update(`${inputPath}-${width}-${height}`).digest('hex');
    const outputFilename = `resized_${hash}.jpg`;
    const outputPath = path.join(outputDir, outputFilename);

    // Check if the resized image already exists
    if (fs.existsSync(outputPath)) {
      // Read the existing resized image send response
      const resizedImage = fs.readFileSync(outputPath);
      res.set('Content-Type', 'image/jpeg');
      return res.send(resizedImage);
    }

    // Resize the image and save it locally
    await sharp(inputPath)
      .resize(parseInt(width), parseInt(height))
      .toFile(outputPath);

    // Read the resized image and send response
    const resizedImage = fs.readFileSync(outputPath);
    res.set('Content-Type', 'image/jpeg');
    res.send(resizedImage);
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to resize image' });
  }
});

export default router;
