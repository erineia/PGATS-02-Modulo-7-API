const request = require('supertest');
const { expect } = require('chai');

describe('Transfer', () => {
  describe('POST /transfer', () => {
    it.only('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
      //1) Capturar o Token
      const respostaLogin = await request('http://localhost:3000')
        .post('/login')
        .send({
          username: 'Maria',
          password: '123456',
        });

      const token = respostaLogin.body.token;

      //2) Realizar Login
      const resposta = await request('http://localhost:3000')
        .post('/transfer')
        .set('authorization', 'Bearer ' + token)
        .send({
          from: 'Maria',
          to: 'Isabele',
          amount: 50,
        });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        'error',
        'Usuário remetente ou destinatário não encontrado',
      );
    });
  });
});
