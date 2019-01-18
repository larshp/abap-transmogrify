import * as minimist from "minimist";

async function run() {
  const argv = minimist(process.argv.slice(2));
  console.dir(argv);

  return "sdf";
}

run().then((output) => {
  process.stdout.write(output);
  process.exit();
}).catch((err) => {
  console.dir(err);
  process.exit(1);
});