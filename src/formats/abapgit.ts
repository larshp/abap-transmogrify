import {IInput} from "./_iinput";
import {IFile} from "../_ifile";
import {ObjectType} from "../object_types";
import {IParser} from "./_iparser";
import * as abapGit from "./abapgit/";
import {IOutput} from "./_ioutput";
import {IObject} from "../objects/_iobject";

export class ABAPGit implements IInput, IOutput {

  public output(object: IObject): IFile[] {
    switch (object.getType()) {
      case ObjectType.DOMA:
        return new abapGit.ABAPGitDOMA().write(object);
      case ObjectType.DTEL:
        return new abapGit.ABAPGitDTEL().write(object);
      default:
        throw new Error("ABAPGit: Unsupported object type " + object.getTypeAsString());
    }
  }

  public check(file: IFile): {type: ObjectType, name: string} | undefined {
    const base = file.getFilename().split("/").reverse()[0];
    const name = base.split(".")[0];

    if (file.getFilename().match(/\.doma\.xml$/)) {
      return {type: ObjectType.DOMA, name};
    } else if (file.getFilename().match(/\.dtel\.xml$/)) {
      return {type: ObjectType.DTEL, name};
    }

    return undefined;
  }

  public getParser(type: ObjectType): IParser {
    switch (type) {
      case ObjectType.DOMA:
        return new abapGit.ABAPGitDOMA();
      case ObjectType.DTEL:
        return new abapGit.ABAPGitDTEL();
      default:
        throw new Error("abapGit getParser: unknown object type");
    }
  }

}