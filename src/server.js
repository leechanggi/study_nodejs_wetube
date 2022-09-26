import express from 'express';

const PORT = 4000;

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

const handleListening = () => {
  console.log(`Server listenting on post http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
