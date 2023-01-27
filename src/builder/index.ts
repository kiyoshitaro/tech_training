/**
 * EN: Builder Design Pattern
 *
 * Intent: Lets you construct complex objects step by step. The pattern allows
 * you to produce different types and representations of an object using the
 * same construction code.
 */

import { ConcreteHouseBuilder, HouseBuilder } from "./ConcreteHouseBuilder";

/**
* EN: The Director is only responsible for executing the building steps in a
* particular sequence. It is helpful when producing products according to a
* specific order or configuration. Strictly speaking, the Director class is
* optional, since the client can control builders directly.
*/
class Director {
  private builder!: HouseBuilder;

  /**
   * EN: The Director works with any builder instance that the client code
   * passes to it. This way, the client code may alter the final type of the
   * newly assembled product.
   */
  public setBuilder(builder: HouseBuilder): void {
    this.builder = builder;
  }

  /**
   * EN: The Director can construct several product variations using the same
   * building steps.
   */
  public buildMinimalHouse(): void {
    this.builder.produceWall();
    this.builder.produceRoof();
    this.builder.produceDoor();
    this.builder.produceWindow();
  }

  public buildStandardHouse(): void {
    this.builder.produceWall();
    this.builder.produceRoof();
    this.builder.produceDoor();
    this.builder.produceWindow();
    this.builder.produceGarden();
    this.builder.produceGarage();
  }
}

/**
* EN: The client code creates a builder object, passes it to the director and
* then initiates the construction process. The end result is retrieved from the
* builder object.
*/
function clientCode(director: Director) {
  const builder = new ConcreteHouseBuilder();
  director.setBuilder(builder);

  console.log('Minimal house:');
  director.buildMinimalHouse();
  builder.getProduct().listParts();

  console.log('Standard house:');
  director.buildStandardHouse();
  builder.getProduct().listParts();

  // EN: Remember, the Builder pattern can be used without a Director class.
  //
  console.log('Custom product:');
  builder.produceWall();
  builder.produceRoof();
  builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);