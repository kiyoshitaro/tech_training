/**
 * EN: Facade Design Pattern
 *
 * Intent: Provides a simplified interface to a library, a framework, or any
 * other complex set of classes.
 */
import { Casher } from "./Casher";
import { CodeChecker } from "./CodeChecker";
import { MailChecker } from "./MailChecker";

class BankFacade {
  private _email: string;
  private _code: number;
  protected mailChecker: MailChecker;
  protected codeChecker: CodeChecker;
  protected casher: Casher;

  constructor(email: string, code: number) {
    this._email = email;
    this._code = code;
    this.mailChecker = new MailChecker(email);
    this.codeChecker = new CodeChecker(code);
    this.casher = new Casher(100);
  }

  public deposit(amount: number): void {
    if (this.mailChecker.isValid(this._email) && this.codeChecker.isValid(this._code)) {
      this.casher.deposit(amount);
      console.log("Done");
    } else {
      console.log("Fail");
    }
  }

  public withdraw(amount: number): void {
    if (this.mailChecker.isValid(this._email)
      && this.codeChecker.isValid(this._code)
      && this.casher.haveEnoughMoney(amount)) {
      this.casher.withdraw(amount);
      console.log("Done");
    } else {
      console.log("Fail");
    }
  }

}

/**
* EN: The client _code works with complex subsystems through a simple interface
* provided by the Facade. When a facade manages the lifecycle of the subsystem,
* the client might not even know about the existence of the subsystem. This
* approach lets you keep the complexity under control.
*/
function client_code(facade: BankFacade) {
  facade.deposit(1000000);
  facade.withdraw(800000);
}

function client_code1(facade: BankFacade) {
  facade.withdraw(800000);
  facade.deposit(1000000);
}


const facade = new BankFacade("test@email.com", 1234);
client_code(facade);
// const facade1 = new BankFacade("test@email.com", 1234);
// client_code1(facade1)