import * as os from "os";
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

    const contents = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" + os.EOL +
      "<abapGit version=\"v1.0.0\" serializer=\"LCL_OBJECT_DOMA\" serializer_version=\"v1.0.0\">" + os.EOL +
      " <asx:abap xmlns:asx=\"http://www.sap.com/abapxml\" version=\"1.0\">" + os.EOL +
      "  <asx:values>" + os.EOL +
      "   <DD01V>" + os.EOL +
      "    <DOMNAME>ZABAPGIT_UNIT_TEST</DOMNAME>" + os.EOL +
      "    <DDLANGUAGE>E</DDLANGUAGE>" + os.EOL +
      "    <DATATYPE>" + doma.getDataType() + "</DATATYPE>" + os.EOL +
      "    <LENG>" + doma.getLength() + "</LENG>" + os.EOL +
      "    <OUTPUTLEN>" + doma.getOutputLength() + "</OUTPUTLEN>" + os.EOL +
      "    <DDTEXT>" + doma.getDescription() + "</DDTEXT>" + os.EOL +
      "   </DD01V>" + os.EOL +
      "  </asx:values>" + os.EOL +
      " </asx:abap>" + os.EOL +
      "</abapGit>";

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