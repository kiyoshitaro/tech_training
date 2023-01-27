export interface AbstractSofa {
  usefulSofaFunction(): string;
}

export class VictorianSofa implements AbstractSofa {
  public usefulSofaFunction(): string {
    return 'The result of the VictorianSofa.';
  }
}

export class ModernSofa implements AbstractSofa {
  public usefulSofaFunction(): string {
    return 'The result of the ModernSofa.';
  }
}

export class DecoSofa implements AbstractSofa {
  public usefulSofaFunction(): string {
    return 'The result of the DecoSofa.';
  }
}
