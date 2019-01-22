import * as os from "os";
import * as xml from "../../xml";
import {IFile} from "../../_ifile";
import {IParser} from "../_iparser";
import {IObject} from "../../objects/_iobject";
import {DTEL} from "../../objects/";
import {IWriter} from "../_iwriter";
import {MemoryFile} from "../../memory_file";
import {ABAPGitHelper} from "./_helper";

export class ABAPGitDTEL implements IParser, IWriter {

  public write(obj: IObject): IFile[] {
    const dtel = obj as DTEL;

// todo
    const contents = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" + os.EOL +
    "<abapGit version=\"v1.0.0\" serializer=\"LCL_OBJECT_DTEL\" serializer_version=\"v1.0.0\">" + os.EOL +
    " <asx:abap xmlns:asx=\"http://www.sap.com/abapxml\" version=\"1.0\">" + os.EOL +
    "  <asx:values>" + os.EOL +
    "   <DD04V>" + os.EOL +
    "    <ROLLNAME>" + dtel.getName().toUpperCase() + "</ROLLNAME>" + os.EOL +
    "    <DDLANGUAGE>" + dtel.getMasterLanguage() + "</DDLANGUAGE>" + os.EOL +
    "    <HEADLEN>55</HEADLEN>" + os.EOL +
    "    <SCRLEN1>10</SCRLEN1>" + os.EOL +
    "    <SCRLEN2>20</SCRLEN2>" + os.EOL +
    "    <SCRLEN3>40</SCRLEN3>" + os.EOL +
    "    <DDTEXT>testing</DDTEXT>" + os.EOL +
    "    <REPTEXT>testing</REPTEXT>" + os.EOL +
    "    <SCRTEXT_S>testing</SCRTEXT_S>" + os.EOL +
    "    <SCRTEXT_M>testing</SCRTEXT_M>" + os.EOL +
    "    <SCRTEXT_L>testing</SCRTEXT_L>" + os.EOL +
    "    <DTELMASTER>E</DTELMASTER>" + os.EOL +
    "    <DATATYPE>CHAR</DATATYPE>" + os.EOL +
    "    <LENG>000001</LENG>" + os.EOL +
    "    <OUTPUTLEN>000001</OUTPUTLEN>" + os.EOL +
    "   </DD04V>" + os.EOL +
    "  </asx:values>" + os.EOL +
    " </asx:abap>" + os.EOL +
    "</abapGit>";

    return [new MemoryFile(ABAPGitHelper.getObjectFilename(obj), contents)];
  }

  public parse(file: IFile, object: IObject) {
    const parsed = xml.parse(file).abapGit["asx:abap"]["asx:values"].DD04V;

    const dtel = object as DTEL;
    dtel.setMasterLanguage(parsed.DDLANGUAGE._text);
// todo
    /*
    doma.setDataType(parsed.DATATYPE._text);
    doma.setLength(parsed.LENG._text);
    doma.setOutputLength(parsed.OUTPUTLEN._text);
    doma.setDescription(parsed.DDTEXT._text);
    */
  }

}