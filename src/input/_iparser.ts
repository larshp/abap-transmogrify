import {IFile} from "../_ifile";
import {IObject} from "../objects/_iobject";

export interface IParser {
  parse(file: IFile, object: IObject): void;
}