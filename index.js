// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api', (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
});

app.get('/api/:timestamp', (req, res) => {
  let data = req.params.timestamp
  let date = new Date(data)
  if(!isNaN(Number(data)) && data.length == 13){
    return res.json({
        unix: Number(data),
        utc: new Date(Number(data)).toUTCString()
      })
    }

    if(new Date(data).toUTCString() !== 'Invalid Date'){
      return res.json({
        unix: new Date(data).getTime(),
        utc: date.toUTCString()
      })
    }
    res.json({error : 'Invalid Date'})
  })



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 4000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
