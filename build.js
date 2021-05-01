const { execSync } = require('child_process')

const cmd = command => {
  try {
    console.log(execSync(command, {encoding: "utf-8"}).toString())
  } catch(err) {
    err.output.map(val => console.error(val))
    throw new Error("Command failed");
  }
}

try {
  cmd ("quasar -v")
} catch(err) {
  installQuasar();
}

build();

function installQuasar() {
  console.log("Installing Quasar ... ")
  cmd ("yarn global add @quasar/cli")
}

function build() {
  console.log ("Building server software...")
  console.log("Compiling TypeScript")
  cmd ("cd server && tsc")

  console.log("Building front end application")
  cmd("cd client && quasar build -m pwa") 
  
  console.log("Building administrative interface")
  cmd("cd admin && quasar build -m spa")
  
  console.log("Packaging into executable...")
  cmd ("yarn distributable-build") 
}