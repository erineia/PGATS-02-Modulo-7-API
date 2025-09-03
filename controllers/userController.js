const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  try {
    const user = userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = (req, res) => {
  try {
    const user = userService.loginUser(req.body);
    // Gera o token JWT
    const token = jwt.sign({ username: user.username }, 'segredo', {
      expiresIn: '1h',
    });
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUsers = (req, res) => {
  res.json(userService.getUsers());
};
