const { writeFileSync } = require('fs')
const { execSync } = require('child_process')
const package = require('./package.json')

const getLatestTag = () => {
  return execSync('git describe --tags $(git rev-list --tags --max-count=1)', {encoding: "utf-8"}).trim().substring(1, 999)
}

if (package.version == getLatestTag()) {
  console.log("Not changing version - already the same.")
} else {
  package.version = getLatestTag()
  writeFileSync("./package.json", JSON.stringify(package, null, 2))
  console.log(execSync('git add package.json', {encoding: 'utf-8'}))
  console.log(execSync('git commit -m "bump version"', {encoding: 'utf-8'}))
}