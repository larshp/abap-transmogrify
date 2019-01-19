import {IObject} from "../objects/_iobject";

export interface IInput {
  parse(files: File[]): IObject[];
}