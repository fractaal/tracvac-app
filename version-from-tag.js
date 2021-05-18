const { writeFileSync } = require('fs')
const { execSync } = require('child_process')
const package = require('./package.json')

const getLatestTag = () => {
  return execSync('git describe --tags $(git rev-list --tags --max-count=1)', {encoding: "utf-8"}).trim()
}

package.version = getLatestTag()

writeFileSync("./package.json", JSON.stringify(package, null, 2))