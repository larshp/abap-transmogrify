import {IObject} from "../../objects/_iobject";

export class ABAPGitHelper {
  public static getObjectFilename(obj: IObject) {
    return obj.getName() + "." + obj.getTypeAsString().toLowerCase() + ".xml";
  }
}