# Node.js Event-Driven Architecture, Event Sourcing, and CQRS Example

This project demonstrates the following concepts:
- **Event-Driven Architecture**: Decoupling components using events.
- **Event Sourcing**: Storing state changes as a sequence of events.
- **CQRS (Command Query Responsibility Segregation)**: Separating write (command) and read (query) operations.

## Structure
- `src/` contains the main code.
- `eventBus.js`: Simple event bus implementation.
- `eventStore.js`: Event store for event sourcing.
- `commands/` and `queries/`: Example command and query handlers.
- `domain/`: Example domain model.
- `index.js`: Entry point demonstrating all concepts.

## How to Run
1. Install dependencies: `npm install`
2. Run the demo: `node index.js`

## Concepts Reference
Based on: [Event-Driven Architecture, Event Sourcing, and CQRS: How They Work Together](https://dev.to/yasmine_ddec94f4d4/event-driven-architecture-event-sourcing-and-cqrs-how-they-work-together-1bp1)

Feel free to explore and extend!
