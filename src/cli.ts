import * as glob from "glob";
import * as fs from "fs";
import * as fsextra from "fs-extra";
import {Registry} from "./registry";
import {MemoryFile} from "./memory_file";
import {Format} from "./formats";

function listFiles(input: string): string[] {
  return glob.sync(input, {nosort: true, nodir: true});
}

// todo, is async needed?
async function run() {
  const argv = process.argv.slice(2);
  if (argv.length < 3) {
    return "atran [glob_input] [format] [output_folder]";
  }

  const reg = new Registry();

  for (const filename of listFiles(argv[0])) {
    const raw = fs.readFileSync(filename, "utf8");
    reg.addFile(new MemoryFile(filename, raw));
  }

  const files = reg.output(Format.HTML);
  fsextra.ensureDirSync(argv[2]);
  for (const file of files) {
    fs.writeFileSync(argv[2] + file.getFilename(), file.getRaw());
  }

  return "Done?";
}

run().then((output) => {
  process.stdout.write(output);
  process.exit();
}).catch((err) => {
  console.dir(err);
  process.exit(1);
});