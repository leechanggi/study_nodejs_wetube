import express from 'express';
import morgan from 'morgan';

const PORT = 4000;
const app = express();

/** MiddleWare 미들웨어 : reqeust 와 response 사이에 존재, express next 매개변수 사용, request 에 응답하지 않음, request를 유지함 */
const logger = morgan('dev');

const handleHome = (req, res) => {
  res.send('Home');
};
const handleLogin = (req, res) => {
  res.send('Login');
};
const handleProtected = (req, res) => {
  res.send('Protected');
};

const handleListening = () => {
  console.log(`Server listenting on port http://localhost:${PORT}`);
};

/** use() 는 middleware를 모든 get 함수 이전에 적용, use() 와 get()의 위치가 바뀌면 실행이 되지 않는다. */
app.use(logger);

/** routes */
app.get('/', handleHome);
app.get('/login', handleLogin);
app.get('/protected', handleProtected);

app.listen(PORT, handleListening);
