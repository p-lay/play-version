var app = require("express")()
var bodyParser = require("body-parser")
var util = require("./util")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/mp-version", (req, res) => {
  var version = util.getVersion()
  res.json({
    version: {
      dev: version.dev,
      prod: version.prod
    },
    isSuccess: !version.hasError
  })
})

/**
 * @param { dev: string; prod: string }
 */
app.post("/mp-version/update", (req, res) => {
  var response = {
    version: {
      dev: "",
      prod: ""
    },
    message: "",
    isSuccess: false
  }
  try {
    var version = util.updateVersion(req.body.dev, req.body.prod)
    response.version = {
      dev: version.dev,
      prod: version.prod
    }
    response.isSuccess = !version.hasError
  } catch (err) {
    console.error(err)
    response.message = err
  }
  res.json(response)
})

var port = 3100
app.listen(port, () => {
  console.log("listening on " + port)
})
