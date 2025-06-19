require('dotenv').config();
const express = require('express');
// const helmet = require("helmet");
const app = express();
const port = process.env.APP_PORT;
// const logger = require('./helpers/log.helper');
const path = require('path');

var cors = require('cors');

var whitelist = [
  'http://localhost:8001',
  'https://api-server.skybill.in',
  'http://api-server.skybill.in',
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  },
};
app.set('trust proxy', 1);
app.use(cors(corsOptions));

// app.use(logger.express);
// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       "default-src": helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
//       "img-src": ["'self'", "https: data:"]
//     },
//   })
// );
app.set('view engine', 'pug');
app.disable('view cache');
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/storage', express.static('storage'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.status(404).send('Not Found Done');
});

require('./routes/website/website.route')(app);
require('./routes/website/blog.route')(app);
// require("./routes/business.route")(app);
// require("./routes/product.route")(app);
// require("./routes/parties.route")(app);
// require("./routes/invoice.route")(app);
// require("./routes/payment.route")(app);
// require("./routes/expense.route")(app);
// require("./routes/dashboard.route")(app);
// require("./routes/admin/admin.route")(app);
