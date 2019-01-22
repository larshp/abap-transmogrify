import {ABAPGit} from "./formats/abapgit";
import {IFile} from "./_ifile";
import {IObject} from "./objects/_iobject";
import {DOMA} from "./objects/doma";
import {ObjectType} from "./object_types";
import {Format} from "./formats";
import {HTML} from "./formats/html";
import {IOutput} from "./formats/_ioutput";

export class Registry {
  private objects: IObject[];

  constructor() {
    this.objects = [];
  }

// assumption: all files are always in the same format and
// all files needed are in the input
  public add(files: IFile[]) {
    for (const file of files) {
      this.addFile(file);
    }
  }

  public addFile(file: IFile): Registry {
// todo, make this stuff dynamic so it works for all formats
    const abapgit = new ABAPGit();
    const git = abapgit.check(file);
    if (git) {
      abapgit.getParser(git.type).parse(file, this.findOrCreateObject(git.type, git.name));
    }

// todo, add the other input formats here?

    return this;
  }

  public remove(_filename: string) {
// todo
  }

  public findOrCreateObject(type: ObjectType, name: string): IObject {
    for (const obj of this.objects) {
      if (obj.getType() === type && obj.getName() === name) {
        return obj;
      }
    }

// todo, change this to some dynamic stuff
    switch (type) {
      case ObjectType.DOMA:
        const obj = new DOMA(name);
        this.objects.push(obj);
        return obj;
      default:
        throw new Error("Unknown object type");
    }
  }

  public output(format: Format): IFile[] {
    let ret: IFile[] = [];
    let output: IOutput;

    switch (format) {
      case Format.HTML:
        output = new HTML();
        break;
      case Format.abapGit:
        output = new ABAPGit();
        break;
      default:
        throw new Error("Registry output: unknown format");
    }

    for (const obj of this.objects) {
      ret = ret.concat(output.output(obj));
    }

    return ret;
  }

}