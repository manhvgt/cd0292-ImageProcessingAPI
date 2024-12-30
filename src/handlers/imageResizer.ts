import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const outputDir = path.join(__dirname, '../../../output');
const imagesDir = path.join(__dirname, '../../../images');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}
// Ensure default images folder exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

export const resizeImage = async (inputPath: string, width: string, height: string): Promise<string> => {
  // If inputPath is a filename, redirect to the images directory
  if (!path.isAbsolute(inputPath)) {
    inputPath = path.join(imagesDir, inputPath);
  }

  if (!fs.existsSync(inputPath)) {
    throw new Error('Image file not found');
  }

  // Validate width and height parameters
  const widthNum = parseInt(width);
  const heightNum = parseInt(height);
  if (isNaN(widthNum) || isNaN(heightNum) || widthNum <= 0 || heightNum <= 0) {
    throw new Error('Invalid width or height value. Must be positive numbers.');
  }

  // Generate a hash based on the input parameters
  const hash = crypto.createHash('md5').update(`${inputPath}-${width}-${height}`).digest('hex');
  const outputFileName = `resized_${hash}.jpg`;
  const outputPath = path.join(outputDir, outputFileName);

  // Check if the resized image already exists
  if (fs.existsSync(outputPath)) {
    return outputPath;
  }

  // Resize the image and save it locally
  await sharp(inputPath)
    .resize(widthNum, heightNum)
    .toFile(outputPath);

  return outputPath;
};

export const validateDimensions = (width: string, height: string): { valid: boolean, error?: string } => {
  const widthInt = parseInt(width);
  const heightInt = parseInt(height);

  if (isNaN(widthInt) || isNaN(heightInt) || !/^\d+$/.test(width) || !/^\d+$/.test(height) || widthInt <= 0 || heightInt <= 0) {
    return { valid: false, error: 'Width and height must be positive numbers.' };
  }

  return { valid: true };
};
