export interface AbstractChair {
  usefulChairFunction(): string;
}

export class VictorianChair implements AbstractChair {
  public usefulChairFunction(): string {
    return 'The result of the VictorianChair.';
  }
}

export class ModernChair implements AbstractChair {
  public usefulChairFunction(): string {
    return 'The result of the ModernChair.';
  }
}

export class DecoChair implements AbstractChair {
  public usefulChairFunction(): string {
    return 'The result of the DecoChair.';
  }
}
