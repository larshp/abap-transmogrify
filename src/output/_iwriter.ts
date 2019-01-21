import {IObject} from "../objects/_iobject";
import {IFile} from "../_ifile";

export interface IWriter {
  write(obj: IObject): IFile[];
}