// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const getTimestamp = (date) => ({
  unix: date.getTime(),
  utc: date.toUTCString(),
});

// your API endpoint...
app.get("/api/:dateString?", (req, res) => {
  const { dateString } = req.params;
  let timestamp;

  if (dateString === undefined || dateString.trim() === "") {
    timestamp = getTimestamp(new Date());
  } else {
    const date = !isNaN(dateString)
      ? new Date(parseInt(dateString))
      : new Date(dateString);

    if (!isNaN(date.getTime())) {
      timestamp = getTimestamp(date);
    } else {
      timestamp = {
        error: "invalid date",
      };
    }
  }

  res.json(timestamp);
});

// 404 page
app.use((req, res) => {
  	res.status(404).sendFile(__dirname + "/views/404.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 4100, () => {
  	console.log(`Your app is listening on port ${listener.address().port}`);
});
