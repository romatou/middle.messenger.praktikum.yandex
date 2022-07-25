const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/dist'))

app.use('*', (req, res) => {
	res.status(200).sendFile(__dirname + '/dist/index.html')
})

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})
