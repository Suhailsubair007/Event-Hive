import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

// Remove or uncomment and provide a valid middleware function
// app.use('/api/users', someMiddlewareFunction);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});