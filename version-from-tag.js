/**
 * This handy script will get the latest tag, and then update the
 * package.json. It will also pull the version from the upper package.json
 * and sync the server version with it. Run this script every time
 * we want to build to ensure proper display of the server version.
 */

const { writeFileSync } = require('fs')
const { execSync } = require('child_process')
const package = require('./package.json')
const serverPackage = require("./server/package.json")

const getLatestTag = () => {
  return execSync('git describe --tags $(git rev-list --tags --max-count=1)', {encoding: "utf-8"}).trim().substring(1, 999)
}

// Updating version if different 
if (package.version == getLatestTag()) {
  console.log("Not changing version - already the same.")
} else {
  package.version = getLatestTag()
  writeFileSync("./package.json", JSON.stringify(package, null, 2))
  console.log(execSync('git add package.json', {encoding: 'utf-8'}))
  console.log(execSync('git commit -m "bump version"', {encoding: 'utf-8'}))
}

// Syncing server version with upper package.json version 
console.log("Syncing upper package.json version with server package.json version")
const changed = Object.assign({}, serverPackage, {version: package.version})
fs.writeFileSync("./server/package.json", JSON.stringify(changed, null, 2))  
console.log(execSync('git add ./server/package.json', {encoding: 'utf-8'}))
console.log(execSync('git commit -m "bump version"', {encoding: 'utf-8'}))