// Command: Create Account
const eventBus = require('../eventBus');
const eventStore = require('../eventStore');

function createAccount(id, owner, initialBalance = 0) {
  const event = { type: 'AccountCreated', payload: { id, owner, initialBalance } };
  eventStore.save(event);
  eventBus.emit('AccountCreated', event.payload);
}
module.exports = createAccount;
