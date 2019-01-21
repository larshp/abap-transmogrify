import {IWriter} from "../_iwriter";
import {IObject} from "../../objects/_iobject";
import {IFile} from "../../_ifile";
import {MemoryFile} from "../../memory_file";
import {ObjectType} from "../../object_types";
import {DOMA} from "../../objects/doma";

export class HTMLDOMA implements IWriter {
  public write(obj: IObject): IFile[] {
    const name = obj.getName() + "." + ObjectType[obj.getType()].toLowerCase() + ".html";

    const doma = obj as DOMA;

    const contents = "<b>" + ObjectType[obj.getType()] + " " + obj.getName().toUpperCase() + "</b>\n" +
      "Data Type: " + doma.getDataType() + "<br>\n" +
      "Length: " + doma.getLength() + "<br>\n" +
      "Output Length: " + doma.getOutputLength() + "<br>\n" +
      "Description: " + doma.getDescription();

    const file = new MemoryFile(name, contents);
    return [file];
  }
}