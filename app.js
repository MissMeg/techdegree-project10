const
        express         = require("express"),
        app             = express(),
        path            = require("path"),
        cookieParser    = require("cookie-parser"),
        bodyParser      = require("body-parser"),
        routes          = require("./routes/index");

//Setting Up
//  Pug as the view engine, bodyParser, and cookieParser
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static('public'));

//use the set up routes in the routes folder
app.use('/', routes);

//catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
