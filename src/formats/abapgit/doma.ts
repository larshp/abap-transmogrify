import * as xml from "../../xml";
import {IFile} from "../../_ifile";
import {IParser} from "../_iparser";
import {IObject} from "../../objects/_iobject";
import {DOMA} from "../../objects/doma";
import {IWriter} from "../_iwriter";

export class ABAPGitDOMA implements IParser, IWriter {

  public write(_obj: IObject): IFile[] {
    throw new Error("Method not implemented.");
  }

  public parse(file: IFile, object: IObject) {
    const parsed = xml.parse(file).abapGit["asx:abap"]["asx:values"].DD01V;

    const doma = object as DOMA;
    doma.setDataType(parsed.DATATYPE._text);
    doma.setLength(parsed.LENG._text);
    doma.setOutputLength(parsed.OUTPUTLEN._text);
    doma.setDescription(parsed.DDTEXT._text);
  }

}