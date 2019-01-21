import {AObject} from "./_aobject";
import {ObjectType} from "../object_types";

export class DOMA extends AObject {
  protected dataType: string | undefined = undefined;
  protected length: string | undefined = undefined;
  protected outputLength: string | undefined = undefined;
  protected description: string | undefined = undefined;

  public getType() {
    return ObjectType.DOMA;
  }

  public getDataType() {
    return this.dataType;
  }

  public getLength() {
    return this.length;
  }

  public getOutputLength() {
    return this.outputLength;
  }

  public getDescription() {
    return this.description;
  }

  public setDataType(value: string) {
    this.dataType = value;
  }

  public setLength(value: string) {
    this.length = value;
  }

  public setOutputLength(value: string) {
    this.outputLength = value;
  }

  public setDescription(value: string) {
    this.description = value;
  }

}