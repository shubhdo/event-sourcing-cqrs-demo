// Event Store for Event Sourcing
class EventStore {
  constructor() {
    this.events = [];
  }
  save(event) {
    this.events.push(event);
  }
  getEvents() {
    return this.events;
  }
}
module.exports = new EventStore();
