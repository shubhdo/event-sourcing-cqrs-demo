// Simple Event Bus for Event-Driven Architecture
class EventBus {
  constructor() {
    this.listeners = {};
  }
  on(event, listener) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(listener);
  }
  emit(event, payload) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(listener => listener(payload));
    }
  }
}
module.exports = new EventBus();
