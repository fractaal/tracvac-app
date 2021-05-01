import { execSync } from 'child_process'

const cmd = command => execSync(command, (err, stdout, stderr) => console.log(err, stdout, stderr));

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
  cmd ("cd server")
  
  console.log("Compiling TypeScript")
  cmd ("tsc")

  console.log("Building front end application")
  cmd("cd ../client")
  cmd("quasar build -m pwa") 
  
  console.log("Building administrative interface")
  cmd("cd ../admin")
  cmd("quasar build -m spa")
  
  console.log("Packaging into executable...")
  cmd ("yarn distributable-build") 
}