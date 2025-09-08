const request = require('supertest');
const { expect } = require('chai');
const { users } = require('../../models/userModel');

const graphqlUrl = 'http://localhost:4000/graphql';

describe('Mutation: createTransfer', () => {
  beforeEach(() => {
    users.forEach((u) => {
      if (u.username === 'Maria') u.amount = 100;
      if (u.username === 'Neia') u.amount = 100;
    });
  });

  let token;

  before(async () => {
    // Autentica usuário e obtém token JWT
    const res = await request(graphqlUrl)
      .post('')
      .send({
        query: `
          mutation {
            loginUser(username: "Maria", password: "123456") {
              token
            }
          }
        `,
      });
    token = res.body.data.loginUser.token;
  });

  it('a) Transferência com sucesso', async () => {
    const res = await request(graphqlUrl)
      .post('')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
          mutation {
            createTransfer(from: "Maria", to: "Neia", value: 50) {
              from
              to
              amount
              date
            }
          }
        `,
      });

    expect(res.status).to.equal(200);
    expect(res.body.data.createTransfer).to.include({
      from: 'Maria',
      to: 'Neia',
      amount: 50,
    });
    expect(res.body.data.createTransfer.date).to.be.a('string');
  });

  it('b) Sem saldo disponível para transferência', async () => {
    const res = await request(graphqlUrl)
      .post('')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
        mutation {
          createTransfer(from: "Maria", to: "Neia", value: 999999) {
            from
            to
            amount
            date
          }
        }
      `,
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('errors');
    expect(res.body.errors).to.be.an('array');
    expect(res.body.errors[0].message).to.match(/saldo/i);
    expect(res.body.data).to.be.null;
  });

  it('c) Token de autenticação não informado', async () => {
    const res = await request(graphqlUrl)
      .post('')
      .send({
        query: `
          mutation {
            createTransfer(from: "Maria", to: "Neia", value: 50) {
              from
              to
              amount
              date
            }
          }
        `,
      });

    expect(res.status).to.equal(200);
    expect(res.body.errors).to.be.an('array');
    expect(res.body.errors[0].message).to.match(/Autenticação obrigatória/i);
  });
});
