import {IObject} from "./_iobject";
import {ObjectType} from "../object_types";

export abstract class AObject implements IObject {
  private name: string;
  private masterLanguage: string;
// does all objects have a description?

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

  public setMasterLanguage(language: string) {
    this.masterLanguage = language;
  }

  public getMasterLanguage(): string {
    return this.masterLanguage;
  }
}