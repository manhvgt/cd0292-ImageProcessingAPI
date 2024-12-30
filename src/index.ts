import express from 'express';
import imageRoute from './api/image';

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', imageRoute);

app.get('/', (req, res) => {
  res.send('Server is running.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
