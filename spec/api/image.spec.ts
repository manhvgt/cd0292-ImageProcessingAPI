import { resizeImage } from '../../src/handlers/imageResizer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

describe('Image Processing', () => {
  const inputImagePath = path.join(__dirname, '../../../images/icelandwaterfall.jpg');
  const outputDir = path.join(__dirname, '../../../output');
  const imagesDir = path.join(__dirname, '../../../images');

  // Ensure the input image exists for testing
  beforeAll(() => {
    if (!fs.existsSync(inputImagePath)) {
      throw new Error(`Input image not found: ${inputImagePath}`);
    }
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
  });

  // Clean up before each test to ensure no interference from previous tests
  beforeEach(() => {
    fs.readdirSync(outputDir).forEach(file => {
      fs.unlinkSync(path.join(outputDir, file));
    });
  });

  it('should resize the image without throwing an error', async () => {
    const width = '100';
    const height = '100';
    const outputPath = path.join(outputDir, `resized_test.jpg`);

    await expect(async () => {
      const result = await resizeImage('icelandwaterfall.jpg', width, height);
      const hash = crypto.createHash('md5').update(`${path.join(imagesDir, 'icelandwaterfall.jpg')}-${width}-${height}`).digest('hex');
      const expectedOutputPath = path.join(outputDir, `resized_${hash}.jpg`);

      // Ensure the file paths match
      expect(result).toEqual(expectedOutputPath);
    }).not.toThrow();
  });

  it('should throw an error if the input image does not exist', async () => {
    const width = '100';
    const height = '100';
    const nonExistentPath = 'nonexistent.jpg';

    try {
      await resizeImage(nonExistentPath, width, height);
      fail('Expected function to throw an error');
    } catch (error) {
      expect(error).toEqual(new Error('Image file not found'));
    }
  });
});
