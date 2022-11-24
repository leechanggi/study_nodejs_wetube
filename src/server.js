import express from 'express';

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
  res.send('Hellow Node JS');
};

app.get('/', handleHome); // => get request

const handleListening = () => {
  console.log(`Server listenting on post http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
