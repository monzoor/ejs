var path = require('path');
var express = require('express');
var expressLayouts = require('..');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", require("./routes/view"));

var port = 3000;
app.listen(port, function() {
  console.log('Listening on http://localhost:%s/', port);
});
