// Command: Transfer Money
const eventBus = require('../eventBus');
const eventStore = require('../eventStore');

function transferMoney(fromId, toId, amount) {
  const event = { type: 'MoneyTransferred', payload: { fromId, toId, amount } };
  eventStore.save(event);
  eventBus.emit('MoneyTransferred', event.payload);
}
module.exports = transferMoney;
