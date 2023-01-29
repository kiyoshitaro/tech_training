export class MailChecker {
  private _email: string;
  constructor(email: string) {
    this._email = email;
  }
  public isValid(email: string): boolean {
    return this._email == email;
  }
}
