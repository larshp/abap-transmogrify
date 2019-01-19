import {IInput} from "./_iinput";
import {IFile} from "../_ifile";
import {ObjectType} from "../object_types";
import {IParser} from "./_iparser";
import {ABAPGitDOMAParser} from "./abapgit/doma";

export class ABAPGitInput implements IInput {
  public check(file: IFile): {type: ObjectType, name: string} | undefined {
    const base = file.getFilename().split("/").reverse()[0];
    const name = base.split(".")[0];

    if (file.getFilename().match(/\.doma\.xml$/)) {
      return {type: ObjectType.DOMA, name};
    }

    return undefined;
  }

  public getParser(_type: ObjectType): IParser {
    return new ABAPGitDOMAParser();
  }

}