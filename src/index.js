
// Entry point: Banking use case with Event-Driven Architecture, Event Sourcing, and CQRS
const eventBus = require('./eventBus');
const createAccount = require('./commands/createAccountCommand');
const transferMoney = require('./commands/transferMoneyCommand');
const getAccountBalance = require('./queries/getAccountBalanceQuery');

// Listen for events
eventBus.on('AccountCreated', (payload) => {
  console.log(`Event: AccountCreated for ${payload.owner} (ID: ${payload.id}), Initial Balance: $${payload.initialBalance}`);
});
eventBus.on('MoneyTransferred', (payload) => {
  console.log(`Event: MoneyTransferred - $${payload.amount} from Account ${payload.fromId} to Account ${payload.toId}`);
});

// Commands: Create accounts
createAccount(101, 'Alice', 500);
createAccount(102, 'Bob', 300);

// Command: Transfer money
transferMoney(101, 102, 150);

// Queries: Get account balances
const aliceAccount = getAccountBalance(101);
const bobAccount = getAccountBalance(102);
console.log('Query result:', aliceAccount);
console.log('Query result:', bobAccount);
