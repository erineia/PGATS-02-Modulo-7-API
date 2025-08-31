const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');
const { from } = require('form-data');
const app = require('../../app');
const transferService = require('../../services/transferService')

describe('Transfer Controller', () =>{
  describe('POST /transfer', () =>{
    it('Quando informo remetente e destinatario inexistentes recebo 400', async () =>{
      const resposta = await request(app)
        .post('/transfer')
        .send({
          from: "Maria",
          to: "Neia",
          amount: 50
       });
      expect(resposta.status).to.equal(400);
      expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
    });


    it('Usando Mocks: Quando informo remetente e destinatario inexistentes recebo 400', async () =>{
      const transferServiceMock = sinon.stub(transferService, 'transfer');
      transferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado'));

      const resposta = await request(app)
           .post('/transfer')
           .send({
               from: "Maria",
               to: "Neia",
               amount: 50
           });

        expect(resposta.status).to.equal(400);
        expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');

        sinon.restore();
    });
});
  describe('GET /transfers', ()=>{

  });
});

