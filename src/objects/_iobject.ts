import {ObjectType} from "../object_types";

export interface IObject {
  getName(): string;
  getType(): ObjectType;
  getTypeAsString(): string;
}