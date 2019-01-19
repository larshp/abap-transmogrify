
export class File {
  private filename: string;
  private raw: string;

  constructor(filename: string, raw: string) {
    this.raw = raw;
    this.filename = filename;
  }

  public getRaw(): string {
    return this.raw;
  }

  public getFilename(): string {
    return this.filename;
  }
}