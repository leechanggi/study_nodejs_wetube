import data from '../config.json';

/** global */
const globalJoin = (req, res) => {
  res.send('Join global');
};
const globalLogin = (req, res) => {
  res.send('Login global');
};

/** user */
const userEdit = (req, res) => {
  res.send('Edit user');
};
const userRemove = (req, res) => {
  res.send('Remove user');
};
const userLogout = (req, res) => {
  res.send('Logout user');
};
const userWatch = (req, res) => {
  res.send('Watch user');
};

export { globalJoin, globalLogin, userEdit, userRemove, userLogout, userWatch };
