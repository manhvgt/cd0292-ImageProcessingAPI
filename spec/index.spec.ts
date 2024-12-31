import request from 'supertest';
import express from 'express';

const app = express();
app.get('/', (req, res) => {
  res.send('Server is running.');
});

describe('GET /', () => {
  it('should return a message', (done) => {
    request(app).get('/').expect('Server is running.', done);
  });
});
