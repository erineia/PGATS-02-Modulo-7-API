const request = require('supertest');
const { expect, use } = require('chai');
const chaiExclude = require('chai-exclude');
use(chaiExclude);
require('dotenv').config();

describe('Mutation: Transferencias', () => {
  before(async () => {
    const loginUser = require('../fixture/requisicoes/login/loginUser.json');
    const respostaLogin = await request(process.env.BASE_URL_GRAPHQL)
      .post('')
      .send(loginUser);

    token = respostaLogin.body.data.loginUser.token;
  });

  it('a) Transferência com sucesso', async () => {
    const respostaEsperada = require('../fixture/respostas/transferencia/validarTransferenciaComSucesso.json');
    const createTransfer = require('../fixture/requisicoes/transferencia/createTransfer.json');

    const res = await request(process.env.BASE_URL_GRAPHQL)
      .post('')
      .set('Authorization', `Bearer ${token}`)
      .send(createTransfer);

    expect(res.status).to.equal(200);
    expect(res.body.data.createTransfer)
      .excluding('date')
      .to.deep.equal(respostaEsperada.data.createTransfer);
  });

  it('b) Sem saldo disponível para transferência', async () => {
    const createTransfer = require('../fixture/requisicoes/transferencia/createTransfer.json');
    createTransfer.variables.amount = 5000;
    const res = await request(process.env.BASE_URL_GRAPHQL)
      .post('')
      .set('Authorization', `Bearer ${token}`)
      .send(createTransfer);

    expect(res.status).to.equal(200);
    expect(res.body.errors[0].message).to.equal(
      'Saldo insuficiente para transferência',
    );
  });

  it('c) Token de autenticação não informado', async () => {
    const createTransfer = require('../fixture/requisicoes/transferencia/createTransfer.json');
    const res = await request(process.env.BASE_URL_GRAPHQL)
      .post('')
      .send(createTransfer);

    expect(res.status).to.equal(200);
    expect(res.body.errors[0].message).to.equal('Autenticação obrigatória');
  });
});
