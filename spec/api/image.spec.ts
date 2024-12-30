import request from 'supertest';
import express from 'express';
import imageRoute from '../../src/api/image';
import fs from 'fs';
import path from 'path';

const app = express();
app.use('/api', imageRoute);

describe('GET /api/image', () => {
  const inputImagePath = path.join(__dirname, '../../../images/icelandwaterfall.jpg');
  const outputDir = path.join(__dirname, '../../output');

  // Ensure the input image exists for testing
  beforeAll(() => {
    if (!fs.existsSync(inputImagePath)) {
      throw new Error(`Input image not found: ${inputImagePath}`);
    }
  });

  it('should resize the image and return it', (done) => {
    request(app)
      .get('/api/image')
      .query({ inputPath: inputImagePath, width: '100', height: '100' })
      .expect('Content-Type', /image\/jpeg/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done.fail(err);
        }
        // Check that the resized image was saved
        const hash = require('crypto').createHash('md5').update(`${inputImagePath}-100-100`).digest('hex');
        const outputFilePath = path.join(outputDir, `resized_${hash}.jpg`);

        if (!fs.existsSync(outputFilePath)) {
          return done.fail(new Error('Resized image not found'));
        }

        // Verify the response contains the image data
        expect(res.body).toBeDefined();
        done();
      });
  });

  it('should return a 404 error if the input image does not exist', (done) => {
    const nonExistentPath = path.join(__dirname, '../../../input/nonexistent.jpg');

    request(app)
      .get('/api/image')
      .query({ inputPath: nonExistentPath, width: '100', height: '100' })
      .expect(404)
      .expect({ error: 'Image file not found' }, done);
  });

  it('should return a 400 error if query parameters are missing', (done) => {
    request(app)
      .get('/api/image')
      .query({ width: '100', height: '100' })
      .expect(400)
      .expect({ error: 'Missing required query parameters: inputPath, width, height' }, done);
  });
});
