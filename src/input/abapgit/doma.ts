import * as xml from "../../xml";
import {IFile} from "../../_ifile";
import {IParser} from "../_iparser";
import {IObject} from "../../objects/_iobject";
import {DOMA} from "../../objects/doma";

export class ABAPGitDOMAParser implements IParser {

  public parse(file: IFile, object: IObject) {
    const parsed = xml.parse(file).abapGit["asx:abap"]["asx:values"].DD01V;

    const doma = object as DOMA;
    doma.setDataType(parsed.DATATYPE._text);
    doma.setLength(parsed.LENG._text);
    doma.setOutputLength(parsed.OUTPUTLEN._text);
    doma.setDescription(parsed.DDTEXT._text);
  }

}