/**
 * EN: Strategy Design Pattern
 *
 * Intent: Lets you define a family of algorithms, put each of them into a
 * separate class, and make their objects interchangeable.
 */

import { ConcreteStrategyA, ConcreteStrategyB, IStrategy } from "./Strategy";

class Context {
  /**
   * EN: @type {Strategy} The Context maintains a reference to one of the
   * Strategy objects. The Context does not know the concrete class of a
   * strategy. It should work with all strategies via the Strategy interface.
   */
  private strategy: IStrategy;

  constructor(strategy: IStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: IStrategy) {
    this.strategy = strategy;
  }

  public doSomeBusinessLogic(): void {
    console.log('Context: Sorting data using the strategy (not sure how it\'ll do it)');
    const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
    console.log(result.join(','));
  }
}

/**
* EN: The client code picks a concrete strategy and passes it to the context.
* The client should be aware of the differences between strategies in order to
* make the right choice.
*/
const context = new Context(new ConcreteStrategyA());
console.log('Client: Strategy is set to normal sorting.');
context.doSomeBusinessLogic();

console.log('');

console.log('Client: Strategy is set to reverse sorting.');
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();
