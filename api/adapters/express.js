const Express = require('express')
const app = Express()

const { system } = require('../config')

/**
 * cors
 */
const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(system.port || 3000, () => {
  console.log(`Listening on ${system.port || 3000}`)
})

module.exports = {
  app,
}
