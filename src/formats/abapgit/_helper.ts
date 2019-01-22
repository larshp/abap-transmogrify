import {IObject} from "../../objects/_iobject";
import {ObjectType} from "../../object_types";

export class ABAPGitHelper {
  public static getObjectFilename(obj: IObject) {
    return obj.getName() + "." + ObjectType[obj.getType()].toLowerCase() + ".xml";
  }
}