/**
 * EN: Factory Method Design Pattern
 *
 * Intent: Provides an interface for creating objects in a superclass, but
 * allows subclasses to alter the type of objects that will be created.
 */

import { ConcreteProduct1, ConcreteProduct2, ConcreteProduct3, IProduct } from "./Product";

/**
 * EN: The Creator class declares the factory method that is supposed to return
 * an object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 */
abstract class Creator {
  public abstract factoryMethod(): IProduct;
  public showSomeCreations(num: number = 0): void {
    for (let _ = 0; _ < num; _++) {
      const product = this.factoryMethod();
      console.log(`Creator: The same creator's code has just worked with ${product.operation()}`);
    }
  }
  public getRandomIntInclusive = (min: number = 0, max: number = 0): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

}

/**
* EN: Concrete Creators override the factory method in order to change the
* resulting product's type.
*/
class RandomCreator extends Creator {
  private _numProducts = 3;
  public factoryMethod(): IProduct {
    const pickProduct = this.getRandomIntInclusive(0, this._numProducts);
    switch (pickProduct) {
      case 0:
        return new ConcreteProduct1();
      case 1:
        return new ConcreteProduct2();
      case 2:
        return new ConcreteProduct3();
      default:
        return new ConcreteProduct1();
    }
  }
}

class RoundCreator extends Creator {
  private _currIndex = 0;
  public factoryMethod(): IProduct {
    this._currIndex += 1;
    switch (this._currIndex) {
      case 1:
        return new ConcreteProduct1();
      case 2:
        return new ConcreteProduct2();
      case 3:
        this._currIndex = 0;
        return new ConcreteProduct3();
      default:
        return new ConcreteProduct1();
    }
  }
}

function clientCode(creator: Creator) {
  // ...
  console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
  creator.showSomeCreations(6);
  // ...
}

/**
* EN: The Application picks a creator's type depending on the configuration or
* environment.
*/
(() => {
  console.log('App: Launched with the RandomCreator.');
  clientCode(new RandomCreator());
  console.log('');

  console.log('App: Launched with the RoundCreator.');
  clientCode(new RoundCreator());
})()