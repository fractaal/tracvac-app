const { exec, execSync } = require("child_process");
const args = process.argv.slice(2);

function noExeFlagIsPresent() {
  return args.indexOf("--noexe") !== -1;
}

function serverOnly() {
  return args.indexOf("--serverOnly") !== -1;
}

function noInstall() {
  return args.indexOf("--noInstall") !== -1;
}

const cmd = (command) => {
  /*
  return new Promise((resolve, reject) => {
    const thing = exec(command, (err, stdout) => {
      if (err) reject(err); else resolve(stdout)
    })
    thing.stdout.pipe(process.stdout)
  })
   */
  const child = exec(command);
  child.stdout.pipe(process.stdout);
  return new Promise((resolve, reject) => {
    child.addListener("error", reject);
    child.addListener("exit", resolve);
  });
};

(async () => {
  console.log(
    "noexe flag: ",
    noExeFlagIsPresent(),
    " server only: ",
    serverOnly(),
    " no install dependencies: ",
    noInstall()
  );

  // try {
  //   await cmd ("yarn -v")
  // } catch(err) {
  console.log("Installing Yarn...");
  await cmd("npm install --global yarn");
  // }

  // try {
  //   await cmd ("tsc -v")
  // } catch(err) {
  console.log("Installing TypeScript Compiler...");
  await cmd("npx yarn global add typescript");
  // }

  if (!noExeFlagIsPresent() || !serverOnly())
    // try {
    // await cmd ("pkg -v")
    // } catch(err) {
    console.log("Installing pkg (Executable bundler)");
  await cmd("npx yarn global add pkg");
  // }

  if (!serverOnly()) {
    // try {
    //   await cmd ("quasar -v")
    // } catch(err) {
    console.log("Installing Quasar ... ");
    await cmd("npx yarn global add @quasar/cli");
    // }
  }

  await install();
  await build();
})();

async function install() {
  if (!noInstall()) {
    console.log("Installing dependencies for server...");
    await cmd("cd server && npx yarn install --production=false");

    if (!serverOnly()) {
      console.log("Installing dependencies for client...");
      await cmd("cd client && npx yarn install --production=false");

      console.log("Installing dependencies for admin...");
      await cmd("cd admin && npx yarn install --production=false");
    }
  }
}

async function build() {
  console.log("Building server software...");
  console.log("Compiling TypeScript");
  await cmd("cd server && npx tsc");

  if (!serverOnly()) {
    console.log("Building front end application");
    await cmd("cd client && npx quasar build -m pwa");

    console.log("Building administrative interface");
    await cmd("cd admin && npx quasar build -m spa");
  }

  if (!noExeFlagIsPresent() || !serverOnly()) {
    console.log("Packaging into executable...");
    await cmd("cd server && npx yarn distributable-build");
  }
}
