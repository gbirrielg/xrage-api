import express from 'express';
import endpoints from './routes/endpoints.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(endpoints);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})