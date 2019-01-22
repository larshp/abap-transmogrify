import {IObject} from "./_iobject";
import {ObjectType} from "../object_types";

export abstract class AObject implements IObject {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public abstract getType(): ObjectType;

  public getTypeAsString(): string {
    return ObjectType[this.getType()];
  }

  public getName() {
    return this.name;
  }

}