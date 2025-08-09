// Query: Get Account Balance
const eventStore = require('../eventStore');
const Account = require('../domain/account');

function getAccountBalance(id) {
  let balance = 0;
  let owner = null;
  eventStore.getEvents().forEach(event => {
    if (event.type === 'AccountCreated' && event.payload.id === id) {
      owner = event.payload.owner;
      balance = event.payload.initialBalance;
    }
    if (event.type === 'MoneyTransferred') {
      if (event.payload.fromId === id) balance -= event.payload.amount;
      if (event.payload.toId === id) balance += event.payload.amount;
    }
  });
  if (owner === null) return null;
  return new Account(id, owner, balance);
}
module.exports = getAccountBalance;
