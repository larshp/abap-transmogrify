import {IObject} from "./_iobject";

export abstract class AObject implements IObject {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public abstract getType(): string;

  public getName() {
    return this.name;
  }
}