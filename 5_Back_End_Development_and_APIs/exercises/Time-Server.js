let express = require('express');
let app = express();

app.use("/", (req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

module.exports = app;