import { Router, Request, Response } from 'express';
import { resizeImage, validateDimensions } from '../handlers/imageResizer';
import fs from 'fs';

const router = Router();

// Resize photos
router.get('/image', async (req: Request, res: Response) => {
  const { inputPath, width, height } = req.query;

  if (!inputPath || !width || !height) {
    return res
      .status(400)
      .json({
        error: 'Missing required query parameters: inputPath, width, height',
      });
  }
  if (
    typeof inputPath !== 'string' ||
    typeof width !== 'string' ||
    typeof height !== 'string'
  ) {
    return res
      .status(400)
      .json({
        error:
          'Invalid query parameters. inputPath, width, and height must be strings.',
      });
  }

  // Validate width and height
  const { valid, error } = validateDimensions(width, height);
  if (!valid) {
    return res.status(400).json({ error });
  }

  // Call handlers
  try {
    const outputPath = await resizeImage(inputPath, width, height);
    const resizedImage = fs.readFileSync(outputPath);

    res.set('Content-Type', 'image/jpeg');
    res.send(resizedImage);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Image file not found') {
        return res.status(404).json({ error: 'Image file not found' });
      }
    }
    res.status(500).json({ error: 'Failed to resize image' });
  }
});

export default router;
