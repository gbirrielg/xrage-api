import express from 'express';
import { checkApiKey } from './middleware/checkApiKey.js';
import defaultEndpoint from './routes/default.js';
import users from './routes/users.js';
import scans from './routes/scans.js';


const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(checkApiKey);

app.use(defaultEndpoint);
app.use('/users', users);
app.use('/scans', scans);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})