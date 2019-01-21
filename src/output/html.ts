import {IOutput} from "./_ioutput";
import {IObject} from "../objects/_iobject";
import {ObjectType} from "../object_types";
import {IFile} from "../_ifile";
import {HTMLDOMAWriter} from "./html/doma";

export class HTMLOutput implements IOutput {
  public output(object: IObject): IFile[] {
    switch (object.getType()) {
      case ObjectType.DOMA:
        return new HTMLDOMAWriter().write(object);
      default:
        throw new Error("HTMLOutput: Unsupported object type " + object.getType());
    }
  }
}