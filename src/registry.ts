import {File} from "./file";

export enum Format {
  abapGit,
  ADT,
  gitCTS,
  SAPLink,
}

export class Registry {

// assumption: all files are always in the same format
  public add(_files: File[]) {
// todo
  }

  public remove(_filename: string) {
// todo
  }

  public output(_format: Format): File[] {
    return [];
  }

}