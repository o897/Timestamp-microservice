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

app.get("/api/:date?", (req, res) => {
  let unix, utc;

  const date_string = new Date(req.params.date);
  const date = req.params.date;

  let timestamp = parseInt(date);

  console.log(timestamp);

  if (!date) {
    unix = new Date().getTime();
    utc = new Date().toUTCString();
    res.json({ unix, utc });
    return;
  }

  if (new Date(timestamp).toUTCString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
    return;
  }

  if (timestamp === new Date(parseInt(timestamp)).getTime() && !date.includes('-') && !date.includes(' ')) {
    unix = new Date(timestamp).getTime();
    utc = new Date(timestamp).toUTCString();
    console.log("within timestamp.");
    res.json({ unix, utc });
    return;
  }

  unix = date_string.getTime();
  utc = date_string.toUTCString();

  return res.json({ unix, utc });

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
