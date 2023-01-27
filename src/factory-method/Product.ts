/**
* EN: The Product interface declares the operations that all concrete products
* must implement.
*/
export interface IProduct {
  operation(): string;
}

/**
* EN: Concrete Products provide various implementations of the Product
* interface.
*/
export class ConcreteProduct1 implements IProduct {
  public operation(): string {
    return '{Result of the ConcreteProduct1}';
  }
}

export class ConcreteProduct2 implements IProduct {
  public operation(): string {
    return '{Result of the ConcreteProduct2}';
  }
}

export class ConcreteProduct3 implements IProduct {
  public operation(): string {
    return '{Result of the ConcreteProduct3}';
  }
}
