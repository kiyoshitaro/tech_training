export interface IStrategy {
  doAlgorithm(data: string[]): string[];
}
/**
* EN: Concrete Strategies implement the algorithm while following the base
* Strategy interface. The interface makes them interchangeable in the Context.
*/
export class ConcreteStrategyA implements IStrategy {
  public doAlgorithm(data: string[]): string[] {
    return data.sort();
  }
}
export class ConcreteStrategyB implements IStrategy {
  public doAlgorithm(data: string[]): string[] {
    return data.reverse();
  }
}