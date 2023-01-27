/**
 * EN: Adapter Design Pattern
 *
 * Intent: Provides a unified interface that allows objects with incompatible
 * interfaces to collaborate.
 */
interface ITarget {
  request(): string;
}
class Target implements ITarget {
  public request(): string {
    return 'Target: The default target\'s behavior.';
  }
}

/**
* EN: The InCompatibleTarget contains some useful behavior, but its interface is
* incompatible with the existing client code. The InCompatibleTarget needs some adaptation
* before the client code can use it.
*/
class InCompatibleTarget implements ITarget {
  public request(): string {
    return '.eetpadA eht fo roivaheb laicepS';
  }
}

/**
* EN: The Adapter makes the InCompatibleTarget's interface compatible with the Target's
* interface.
*/
class Adapter extends Target {
  private inCompatibleTarget: InCompatibleTarget;

  constructor(inCompatibleTarget: InCompatibleTarget) {
    super();
    this.inCompatibleTarget = inCompatibleTarget;
  }

  public request(): string {
    const result = this.inCompatibleTarget.request().split('').reverse().join('');
    return `Adapter: (TRANSLATED) ${result}`;
  }
}

function clientCode(target: ITarget) {
  console.log(target.request());
  console.log("");
}

const target = new Target();
clientCode(target);

console.log('InCompatible Target class has a weird interface');
const inCompatibleTarget = new InCompatibleTarget();
clientCode(inCompatibleTarget);

const adapter = new Adapter(inCompatibleTarget);
clientCode(adapter);
