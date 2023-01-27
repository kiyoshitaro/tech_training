/**
* EN: It makes sense to use the Builder pattern only when your products are
* quite complex and require extensive configuration.
*
* Unlike in other creational patterns, different concrete builders can produce
* unrelated products. In other words, results of various builders may not
* always follow the same interface.
*/
export class House {
  public parts: string[] = [];

  public listParts(): void {
    console.log(`House parts: ${this.parts.join(', ')}\n`);
  }
}
