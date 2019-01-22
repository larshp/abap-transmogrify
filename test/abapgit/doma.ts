import * as fs from "fs";
import {expect} from "chai";
import {Registry} from "../../src/registry";
import {MemoryFile} from "../../src/memory_file";
import {Format} from "../../src/formats";

function readFile(filename: string): MemoryFile {
  const raw = fs.readFileSync(filename, "utf-8");
  return new MemoryFile(filename, raw);
}

describe("DOMA", () => {
  it("identity 1", () => {
    const filename = "test_data/abapgit/doma/zabapgit_unit_test.doma.xml";
    const input = readFile(filename);
    const output = new Registry().addFile(input).output(Format.abapGit);

    expect(output.length).to.equal(1);
    const file = output[0];
    expect(filename).to.contain(file.getFilename());
    expect(file.getRaw()).to.equal(input.getRaw());
  });
});