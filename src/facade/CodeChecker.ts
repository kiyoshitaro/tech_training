export class CodeChecker {
  private _code: number;
  constructor(code: number) {
    this._code = code;
  }
  public isValid(code: number): boolean {
    return this._code == code;
  }
}
