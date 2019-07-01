var fs = require("fs")

/**
 * @returns {{ prod: string; dev: string }}
 */
var getCurrentVersion = function() {
  try {
    var jsonStr = fs.readFileSync("./mp-version").toString()
    return JSON.parse(jsonStr)
  } catch (err) {
    console.error(err)
    return {
      prod: "",
      dev: "",
      hasError: true
    }
  }
}

var updateDevVersion = function(index, devVersion) {
  var versionNumbers = devVersion.split(".").map(function(item) {
    return parseInt(item)
  })
  if (index === "0") {
    versionNumbers = [versionNumbers[0] + 1, 0, 0]
  } else if (index === "1") {
    versionNumbers = [versionNumbers[0], versionNumbers[1] + 1, 0]
  } else {
    versionNumbers[2] += 1
  }
  return versionNumbers.join(".")
}

module.exports = {
  getVersion: function() {
    return getCurrentVersion()
  },
  updateVersion: function(dev, prod) {
    var newVersion = getCurrentVersion()
    try {
      if (prod) {
        newVersion.prod = prod
      } else if (dev) {
        newVersion.dev = dev
        //updateDevVersion(index, newVersion.dev)
      } else {
        throw "no valid param"
      }
      fs.writeFileSync("./mp-version", JSON.stringify(newVersion))
    } catch (err) {
      console.error(err)
      newVersion.hasError = true
    }
    return newVersion
  }
}
