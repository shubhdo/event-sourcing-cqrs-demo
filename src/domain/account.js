// Domain Model: Account
class Account {
  constructor(id, owner, balance = 0) {
    this.id = id;
    this.owner = owner;
    this.balance = balance;
  }
}
module.exports = Account;
