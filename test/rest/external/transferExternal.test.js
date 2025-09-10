const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('Transfer', () => {
  describe('POST /transfer', () => {
    beforeEach(async () => {
      const respostaLogin = await request(process.env.BASE_URL_REST)
        .post('/login')
        .send({
          username: 'Maria',
          password: '123456',
        });

      token = respostaLogin.body.token;
    });
    it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
      const resposta = await request(process.env.BASE_URL_REST)
        .post('/transfer')
        .set('Authorization', `Bearer ${token}`)
        .send({
          from: 'Maria',
          to: 'Rosa',
          amount: 100,
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        'error',
        'Usuário remetente ou destinatário não encontrado',
      );
    });

    it('Usando Mocks: Quando informo remetente e destinatario inexistentes recebo 400', async () => {
      const resposta = await request(process.env.BASE_URL_REST)
        .post('/transfer')
        .set('Authorization', `Bearer ${token}`)
        .send({
          from: 'Maria',
          to: 'isabelle',
          amount: 100,
        });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        'error',
        'Usuário remetente ou destinatário não encontrado',
      );
    });

    it('Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
      const resposta = await request(process.env.BASE_URL_REST)
        .post('/transfer')
        .set('Authorization', `Bearer ${token}`)
        .send({
          from: 'Maria',
          to: 'Neia',
          amount: 100,
        });

      expect(resposta.status).to.equal(201);

      const respostaEsperada = require('../fixture/respostas/Quando informo valores válidos eu tenho sucesso com 201 CREATED.json');
      delete resposta.body.date;
      delete respostaEsperada.date;
      expect(resposta.body).to.deep.equal(respostaEsperada);
    });
  });
});
