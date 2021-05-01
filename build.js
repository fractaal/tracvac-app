const { exec, execSync } = require('child_process')

/*
const cmd = command => {
  try {
    console.log(execSync(command, {encoding: "utf-8"}).toString())
  } catch(err) {
    err.output.map(val => console.error(val))
    throw new Error("Command failed");
  }
}
*/

const cmd = (command) => {
  return new Promise((resolve, reject) => {
    const thing = exec(command, (err, stdout) => {
      if (err) reject(err); else resolve(stdout)
    })
    thing.stdout.pipe(process.stdout)
  })
}

(async () => {
  try {
    await cmd ("yarn -v")
  } catch(err) {
    console.log("Installing Yarn...")
    await cmd ("npm install --global yarn")
  }

  try {
    await cmd ("tsc -v")
  } catch(err) {
    console.log("Installing TypeScript Compiler...")
    await cmd ("yarn global add typescript")
  }

  try {
    await cmd ("quasar -v")
  } catch(err) {
    console.log("Installing Quasar ... ")
    await cmd ("yarn global add @quasar/cli")
  }

  install();
  build();

})()

async function install() {
  console.log("Installing dependencies for client...")
  await cmd ("cd client && yarn install")
  console.log("Installing dependencies for server...")
  await cmd ("cd server && yarn install")
  console.log("Installing dependencies for admin...")
  await cmd ("cd admin && yarn install")
}

async function build() {
  console.log ("Building server software...")
  console.log("Compiling TypeScript")
  await cmd ("cd server && tsc")

  console.log("Building front end application")
  await cmd("cd client && quasar build -m pwa") 
  
  console.log("Building administrative interface")
  await cmd("cd admin && quasar build -m spa")
  
  console.log("Packaging into executable...")
  await cmd ("cd server && yarn distributable-build") 
}