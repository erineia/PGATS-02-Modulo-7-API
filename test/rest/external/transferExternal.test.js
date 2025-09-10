const request = require('supertest');
const { expect, use } = require('chai');
const chaiExclude = require('chai-exclude');
use(chaiExclude);

require('dotenv').config();

describe('Transfer', () => {
  describe('POST /transfer', () => {
    before(async () => {
      const postLogin = require('../fixture/requisicoes/login/postLogin.json');
      const respostaLogin = await request(process.env.BASE_URL_REST)
        .post('/login')
        .send(postLogin);

      token = respostaLogin.body.token;
    });

    it('Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
      const postTransfer = require('../fixture/requisicoes/transferencias/postTransfer.json');
      const resposta = await request(process.env.BASE_URL_REST)
        .post('/transfer')
        .set('Authorization', `Bearer ${token}`)
        .send(postTransfer);

      expect(resposta.status).to.equal(201);

      const respostaEsperada = require('../fixture/respostas/Quando informo valores válidos eu tenho sucesso com 201 CREATED.json');
      delete resposta.body.date;
      delete respostaEsperada.date;
      expect(resposta.body).to.deep.equal(respostaEsperada);
    });

    const testesDeErrosDeNegocio = require('../fixture/requisicoes/transferencias/postTransferWithErrors.json');
    testesDeErrosDeNegocio.forEach((teste) => {
      it(`Testando a regra relacionada a ${teste.nomeDoTeste}`, async () => {
        const postTransfer = require('../fixture/requisicoes/transferencias/postTransfer.json');

        const resposta = await request(process.env.BASE_URL_REST)
          .post('/transfer')
          .set('Authorization', `Bearer ${token}`)
          .send(teste.postTransfer);

        expect(resposta.status).to.equal(teste.statusCode);
        expect(resposta.body).to.have.property('error', teste.mensagemEsperada);
      });
    });
  });
});
