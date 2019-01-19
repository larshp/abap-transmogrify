import {IObject} from "../objects/_iobject";

export interface IOutput {
  output(objects: IObject[]): File[];
}