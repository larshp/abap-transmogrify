import * as xml from "../../xml";
import {IFile} from "../../_ifile";
import {IParser} from "../_iparser";
import {IObject} from "../../objects/_iobject";
import {DOMA} from "../../objects/doma";
import {IWriter} from "../_iwriter";
import {MemoryFile} from "../../memory_file";
import {ABAPGitHelper} from "./_helper";

export class ABAPGitDOMA implements IParser, IWriter {

  public write(obj: IObject): IFile[] {
    const doma = obj as DOMA;

    let contents = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" +
      "<abapGit version=\"v1.0.0\" serializer=\"LCL_OBJECT_DOMA\" serializer_version=\"v1.0.0\">\n" +
      " <asx:abap xmlns:asx=\"http://www.sap.com/abapxml\" version=\"1.0\">\n" +
      "  <asx:values>\n" +
      "   <DD01V>\n" +
      "    <DOMNAME>ZABAPGIT_UNIT_TEST</DOMNAME>\n" +
      "    <DDLANGUAGE>E</DDLANGUAGE>\n" +
      "    <DATATYPE>" + doma.getDataType() + "</DATATYPE>\n" +
      "    <LENG>" + doma.getLength() + "</LENG>\n" +
      "    <OUTPUTLEN>" + doma.getOutputLength() + "</OUTPUTLEN>\n" +
      "    <DDTEXT>" + doma.getDescription() + "</DDTEXT>\n" +
      "   </DD01V>\n" +
      "  </asx:values>\n" +
      " </asx:abap>\n" +
      "</abapGit>";

    contents = contents.replace(/\n/g, "\r\n");

    return [new MemoryFile(ABAPGitHelper.getObjectFilename(obj), contents)];
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