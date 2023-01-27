/**
 * EN: Abstract Factory Design Pattern
 *
 * Intent: Lets you produce families of related objects without specifying their
 * concrete classes.
 */

import { AbstractChair, ModernChair, VictorianChair } from "./Chair";
import { AbstractSofa, VictorianSofa } from "./Sofa";
import { AbstractTable, ModernTable, VictorianTable } from "./Table";

/**
 * EN: The Abstract Factory interface declares a set of methods that return
 * different abstract products. These products are called a family and are
 * related by a high-level theme or concept. Products of one family are usually
 * able to collaborate among themselves. A family of products may have several
 * variants, but the products of one variant are incompatible with products of
 * another.
 */
interface AbstractFactory {
  createChair(): AbstractChair;
  createTable(): AbstractTable;
  createSofa(): AbstractSofa;
}

/**
* EN: Concrete Factories produce a family of products that belong to a single
* variant. The factory guarantees that resulting products are compatible. Note
* that signatures of the Concrete Factory's methods return an abstract product,
* while inside the method a concrete product is instantiated.
*/
class SemiModernFactory implements AbstractFactory {
  public createChair(): AbstractChair {
    return new ModernChair();
  }
  public createTable(): AbstractTable {
    return new ModernTable();
  }
  public createSofa(): AbstractSofa {
    return new VictorianSofa();
  }
}
class VictorianFactory implements AbstractFactory {
  public createChair(): AbstractChair {
    return new VictorianChair();
  }
  public createTable(): AbstractTable {
    return new VictorianTable();
  }
  public createSofa(): AbstractSofa {
    return new VictorianSofa();
  }
}

/**
* EN: The client code works with factories and products only through abstract
* types: AbstractFactory and AbstractProduct. This lets you pass any factory or
* product subclass to the client code without breaking it.
*/
function clientCode(factory: AbstractFactory) {
  const chair = factory.createChair();
  const table = factory.createTable();
  const sofa = factory.createSofa();

  console.log(sofa.usefulSofaFunction());
  console.log(table.usefulTableFunction());
  console.log(table.anotherUsefulFunction(chair));
}

/**
* EN: The client code can work with any concrete factory class.
*/
console.log('Client: Testing client code with the semi modern factory type...');
clientCode(new SemiModernFactory());

console.log('');

console.log('Client: Testing the same client code with the victorian factory type...');
clientCode(new VictorianFactory());
