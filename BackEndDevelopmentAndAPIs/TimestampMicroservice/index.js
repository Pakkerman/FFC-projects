// index.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})

app.get('/api/:date?', (req, res) => {
  const date = req.params.date
  if (!date) {
    const time = new Date()
    const unix = time.getTime()
    const utc = time.toUTCString()
    return res.json({ unix, utc })
  }

  const utc = new Date(date)
  const unix = new Date(+date)
  let object = { error: 'Invalid Date' }

  if (utc.toString() === 'Invalid Date' && unix.toString() === 'Invalid Date')
    return res.json(object)

  if (utc.toString() === 'Invalid Date') {
    object = {
      unix: unix.getTime(),
      utc: unix.toUTCString(),
    }
  } else if (unix.toString() === 'Invalid Date') {
    object = {
      unix: utc.getTime(),
      utc: utc.toUTCString(),
    }
  }

  return res.json(object)
})
