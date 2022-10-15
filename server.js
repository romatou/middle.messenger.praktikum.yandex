const express = require('express')
const fallback = require('express-history-api-fallback')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/dist'))
app.use(fallback('dist/index.html', { root: __dirname }))

app.use('*', (req, res) => {
  res.status(200).sendFile(__dirname + '/dist/index.html')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
