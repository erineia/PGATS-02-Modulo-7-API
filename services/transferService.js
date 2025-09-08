const { transfers } = require('../models/transferModel');
const { users } = require('../models/userModel');

function transfer({ from, to, amount }) {
  const sender = users.find((u) => u.username === from);
  const recipient = users.find((u) => u.username === to);
  if (!sender || !recipient)
    throw new Error('Usuário remetente ou destinatário não encontrado');
  const isFavorecido = sender.favorecidos && sender.favorecidos.includes(to);
  if (!isFavorecido && amount >= 5000) {
    throw new Error(
      'Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos',
    );
  }
  const transferObj = { from, to, amount, date: new Date() };
  transfers.push(transferObj);
  return transferObj;
}

function getTransfers() {
  return transfers;
}

module.exports = { transfer, getTransfers };
