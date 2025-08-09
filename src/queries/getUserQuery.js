// Query: Get User by ID
const eventStore = require('../eventStore');
const User = require('../domain/user');

function getUser(id) {
  const events = eventStore.getEvents().filter(e => e.type === 'UserCreated' && e.payload.id === id);
  if (events.length === 0) return null;
  const { name } = events[events.length - 1].payload;
  return new User(id, name);
}
module.exports = getUser;
