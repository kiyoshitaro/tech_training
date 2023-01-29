export class Casher {
  private _balance;
  public constructor(balance: number = 0) {
    this._balance = balance;
  }

  public deposit(amount: number): void {
    this._balance += amount;
    console.log("Cash in account: " + this._balance);
  }

  public haveEnoughMoney(amount: number): boolean {
    return this._balance > amount;
  }

  public withdraw(amount: number) {
    this._balance -= amount;
    console.log("Cash in account: " + this._balance);
  }
}
