import { House } from "./House";

/**
 * EN: The Builder interface specifies methods for creating the different parts
 * of the House objects.
 */
export interface HouseBuilder {
  produceWall(): void;
  produceWindow(): void;
  produceDoor(): void;
  produceRoof(): void;
  produceGarage(): void;
  produceGarden(): void;
  producePool(): void;
}

/**
* EN: The Concrete Builder classes follow the Builder interface and provide
* specific implementations of the building steps. Your program may have several
* variations of Builders, implemented differently.
*/
export class ConcreteHouseBuilder implements HouseBuilder {
  private house!: House;

  /**
   * EN: A fresh builder instance should contain a blank House object, which
   * is used in further assembly.
   */
  constructor() {
    this.reset();
  }

  public reset(): void {
    this.house = new House();
  }

  public produceWall(): void {
    this.house.parts.push('Wall');
  }

  public produceWindow(): void {
    this.house.parts.push('Window');
  }

  public produceDoor(): void {
    this.house.parts.push('Door');
  }

  public produceRoof(): void {
    this.house.parts.push('Roof');
  }

  public produceGarage(): void {
    this.house.parts.push('Garage');
  }

  public produceGarden(): void {
    this.house.parts.push('Garden');
  }

  public producePool(): void {
    this.house.parts.push('Pool');
  }

  /**
   * EN: Concrete Builders are supposed to provide their own methods for
   * retrieving results. That's because various types of builders may create
   * entirely different products that don't follow the same interface.
   * Therefore, such methods cannot be declared in the base Builder interface
   * (at least in a statically typed programming language).
   *
   * Usually, after returning the end result to the client, a builder instance
   * is expected to be ready to start producing another product. That's why
   * it's a usual practice to call the reset method at the end of the
   * `getProduct` method body. However, this behavior is not mandatory, and
   * you can make your builders wait for an explicit reset call from the
   * client code before disposing of the previous result.
   */
  public getProduct(): House {
    const result = this.house;
    this.reset();
    return result;
  }
}
