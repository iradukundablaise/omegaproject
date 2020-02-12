const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');

const adminRoute = require('./routes/admin');
const publicRoute = require('./routes/public');
const auth = require('./middlewares/auth');
const config = require('./config');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'omegasession0201',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}));

app.use('/', publicRoute);

app.use('/admin', auth);
app.use('/admin', adminRoute);

app.listen(config.PORT, () => {
    console.log("Server running on port : "+config.PORT);
})