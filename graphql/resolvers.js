const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'segredo';

// Adapte estes requires para os caminhos corretos dos seus services!
const userService = require('../services/userService');
const transferService = require('../services/transferService');

module.exports = {
  Query: {
    user: () => userService.getUsers(), // Retorna lista de usuários
    transfers: () => transferService.getTransfers(), // Retorna lista de transferências
  },
  Mutation: {
    registerUser: async (_, { username, password, favorecidos }) => {
      return await userService.registerUser({
        username,
        password,
        favorecidos,
      });
    },
    loginUser: async (_, { username, password }) => {
      const user = await userService.loginUser({ username, password });
      if (!user) throw new Error('Credenciais inválidas');
      const token = jwt.sign({ username: user.username }, SECRET, {
        expiresIn: '1h',
      });
      return { token, user };
    },
    createTransfer: async (_, { from, to, value }, { user }) => {
      // Se quiser autenticação, verifique se user existe
      if (!user) throw new Error('Autenticação obrigatória');
      return await transferService.transfer({ from, to, amount: value });
    },
  },
};
