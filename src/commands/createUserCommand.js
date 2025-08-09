// Command: Create User
const eventBus = require('../eventBus');
const eventStore = require('../eventStore');

function createUser(id, name) {
  const event = { type: 'UserCreated', payload: { id, name } };
  eventStore.save(event);
  eventBus.emit('UserCreated', event.payload);
}
module.exports = createUser;
