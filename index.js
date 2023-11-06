// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date";

app.get("/api/:date?", (req, res) => {
  let unix, utc;

  const date_string = new Date(req.params.date);
  const date = req.params.date;

  let timestamp = parseInt(date);

  // correct
  if (new Date(timestamp).toUTCString() === "Invalid Date" && date) {
    res.json({ error: "Invalid Date" });
    return;
  }



  // correct
  if (timestamp == new Date(timestamp).getTime() && (date).indexOf("-") === -1 && (date).indexOf(" ") === -1) {
    unix = new Date(timestamp).getTime();
    console.log("unix within timestamp : " + unix)
    utc = new Date(timestamp).toUTCString();
    res.json({ unix, utc });
    return;
  }

  // Correct
  if (!date) {
    unix = new Date().getTime();
    utc = new Date().toUTCString();
    res.json({ unix, utc });
    return;
  }

  // Correct
  unix = date_string.getTime();
  utc = date_string.toUTCString();


  return res.json({ unix, utc });

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
