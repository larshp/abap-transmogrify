import {IOutput} from "./_ioutput";
import {IObject} from "../objects/_iobject";
import {ObjectType} from "../object_types";
import {IFile} from "../_ifile";
import {HTMLDOMA} from "./html/doma";

export class HTML implements IOutput {
  public output(object: IObject): IFile[] {
    switch (object.getType()) {
      case ObjectType.DOMA:
        return new HTMLDOMA().write(object);
      default:
        throw new Error("HTMLOutput: Unsupported object type " + object.getType());
    }
  }
}