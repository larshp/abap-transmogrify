import {IFile} from "./_ifile";
import * as xmljs from "xml-js";

export function parse(file: IFile): any {
  return xmljs.xml2js(file.getRaw(), {compact: true});
}