import { AbstractChair } from "./Chair";

export interface AbstractTable {
  /**
   * EN: Product B is able to do its own thing...
   */
  usefulTableFunction(): string;

  /**
   * EN: ...but it also can collaborate with the ProductA.
   *
   * The Abstract Factory makes sure that all products it creates are of the
   * same variant and thus, compatible.
   */
  anotherUsefulFunction(collaborator: AbstractChair): string;
}

export class VictorianTable implements AbstractTable {
  public usefulTableFunction(): string {
    return 'The result of the VictorianTable.';
  }
  /**
 * EN: The variant, Product B1, is only able to work correctly with the
 * variant, Product A1. Nevertheless, it accepts any instance of
 * Chair as an argument.
 */
  public anotherUsefulFunction(collaborator: AbstractChair): string {
    const result = collaborator.usefulChairFunction();
    return `The result of the VictorianTable collaborating with the (${result})`;
  }
}

export class ModernTable implements AbstractTable {
  public usefulTableFunction(): string {
    return 'The result of the ModernTable.';
  }
  public anotherUsefulFunction(collaborator: AbstractChair): string {
    const result = collaborator.usefulChairFunction();
    return `The result of the ModernTable collaborating with the (${result})`;
  }
}

export class DecoTable implements AbstractTable {
  public usefulTableFunction(): string {
    return 'The result of the DecoTable.';
  }
  public anotherUsefulFunction(collaborator: AbstractChair): string {
    const result = collaborator.usefulChairFunction();
    return `The result of the DecoTable collaborating with the (${result})`;
  }
}
