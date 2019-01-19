import {IFile} from "../_ifile";
import {ObjectType} from "../object_types";
import {IParser} from "./_iparser";

export interface IInput {
  check(file: IFile): {type: ObjectType, name: string} | undefined;
  getParser(type: ObjectType): IParser;
}