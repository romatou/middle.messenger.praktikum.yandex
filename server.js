const express = require('express')

const app = express()
const port = 3000

app.use(express.static(__dirname + '/dist'))

app.use('/', (req, res) => {
	res.status(200).sendFile(__dirname + '/dist/index.html')
})

app.get('/:page', (req, res) => {
	res.status(200).sendFile(__dirname + '/dist/index.html')
})

app.get('*', (req, res) => {
	res.status(404).sendFile(__dirname + '/dist/index.html')
})

app.get((err, req, res, next) => {
	console.log(err.stack)
	res.status(500).sendFile(__dirname + '/dist/index.html')
})

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})
