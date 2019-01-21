import {IObject} from "../objects/_iobject";
import {IFile} from "../_ifile";

export interface IOutput {
  output(object: IObject): IFile[];
}