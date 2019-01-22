import {DOMA, DTEL} from "./objects/";
import {ABAPGit} from "./formats/abapgit";
import {IFile} from "./_ifile";
import {IObject} from "./objects/_iobject";
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

    if (git === undefined) {
      throw new Error("No parser found for file: " + file.getFilename());
    }

    return this;
  }

  public remove(_filename: string) {
// todo
  }

  public findObject(type: ObjectType, name: string): IObject | undefined {
    for (const objj of this.objects) {
      if (objj.getType() === type && objj.getName() === name) {
        return objj;
      }
    }
    return undefined;
  }

  public findOrCreateObject(type: ObjectType, name: string): IObject {
    let obj = this.findObject(type, name);
    if (obj !== undefined) {
      return obj;
    }

// todo, change this to some dynamic stuff
    switch (type) {
      case ObjectType.DOMA:
        obj = new DOMA(name);
        break;
      case ObjectType.DTEL:
        obj = new DTEL(name);
        break;
      default:
        throw new Error("Registry, unknown object type");
    }

    this.objects.push(obj);
    return obj;
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