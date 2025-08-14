const { users } = require('../models/userModel');

function registerUser({ username, password, favorecidos = [] }) {
  if (users.find(u => u.username === username)) {
    throw new Error('Usuário já registrado');
  }
  const user = { username, password, favorecidos };
  users.push(user);
  return user;
}

function loginUser({ username, password }) {
  if (!username || !password) throw new Error('Login e senha obrigatórios');
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) throw new Error('Credenciais inválidas');
  return user;
}

function getUsers() {
  return users;
}

module.exports = { registerUser, loginUser, getUsers };
