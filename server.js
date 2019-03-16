const express = require('express')
const cors = require('cors')
const middleware = require('./utils/middleware')
const bodyParser = require('body-parser')
const router = require('./lib/routes/restapi')
const app = express()
const port = process.env.PORT || 3001;

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.logger)
if (process.env.NODE_ENV === 'production') {
  app.use(middleware.auth)
}
app.use('/api/elastic', router)
app.use(middleware.error)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})