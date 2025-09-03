const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const { from } = require('form-data');
const app = require('../../app');
const transferService = require('../../services/transferService');

describe('Transfer Controller', () => {
  describe('POST /transfer', () => {
    it('Quando informo remetente e destinatario inexistentes recebo 400', async () => {
      const resposta = await request(app).post('/transfer').send({
        from: 'Maria',
        to: 'Neia',
        amount: 50,
      });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        'error',
        'Usuário remetente ou destinatário não encontrado',
      );
    });

    it('Usando Mocks: Quando informo remetente e destinatario inexistentes recebo 400', async () => {
      const transferServiceMock = sinon.stub(transferService, 'transfer');
      transferServiceMock.throws(
        new Error('Usuário remetente ou destinatário não encontrado'),
      );

      const resposta = await request(app).post('/transfer').send({
        from: 'Maria',
        to: 'Neia',
        amount: 50,
      });

      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property(
        'error',
        'Usuário remetente ou destinatário não encontrado',
      );

      sinon.restore();
    });

    it.only('Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
      const transferServiceMock = sinon.stub(transferService, 'transfer');
      transferServiceMock.returns({
        from: 'Neia Silva',
        to: 'Neia',
        amount: 100,
        date: new Date().toISOString(),
      });

      const resposta = await request(app).post('/transfer').send({
        from: 'Neia Silva',
        to: 'Neia',
        amount: 100,
      });

      expect(resposta.status).to.equal(201);

      const respostaEsperada = require('../fixture/respostas/Quando informo valores válidos eu tenho sucesso com 201 CREATED.json');
      delete resposta.body.date;
      delete respostaEsperada.date;
      expect(resposta.body).to.deep.equal(respostaEsperada);

      sinon.restore();
    });
  });

  describe('GET /transfers', () => {});
});
