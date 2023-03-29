// const http = require('http');
// // eslint-disable-next-line import/order
// const dbConnect = require('./config/database');
// // eslint-disable-next-line import/no-extraneous-dependencies
// const bodyParser = require('body-parser');
// const express = require('express');
// // eslint-disable-next-line no-unused-vars
// const Sequelize = require('sequelize');
// const dotenv = require('dotenv');
// // eslint-disable-next-line import/order
// const { handleError } = require('./util/errorHandler/error');

// const app = express();
// const port = process.env.PORT || 7008;
// const jwt = require('jsonwebtoken');
// const indexroutes = require('./routes/index');

// dotenv.config();
// app.use(bodyParser.json());

// app.use(express.json());
// app.use('/index', indexroutes);

// app.use((err, req, res, next) => {
//   handleError(err, res);
// });

// const server = http.createServer(app);
// (async () => {
//   const sequelize = dbConnect.sequelize();

//   await sequelize.authenticate()
//     .then(() => {
//       server.listen(port, process.env.HOST, () => console.log(`Example app listening on port ${process.env.PORT} --${__filename}`));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })();
// module.exports = app;
const http = require('http');
// eslint-disable-next-line import/order
const dbConnect = require('./config/database');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const express = require('express');
// eslint-disable-next-line no-unused-vars
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
// eslint-disable-next-line import/order
const { handleError } = require('./util/errorHandler/error');

const app = express();
const port = process.env.PORT || 7008;
const jwt = require('jsonwebtoken');
const indexroutes = require('./routes/index');

dotenv.config();
app.use(bodyParser.json());

app.use(express.json());

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  res.header(
    'Access-Control-Allow-Credentials',
    'true',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/index', indexroutes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  handleError(err, res);
});

const server = http.createServer(app);
(async () => {
  const sequelize = dbConnect.sequelize();

  await sequelize.authenticate()
    .then(() => {
      server.listen(port, process.env.HOST, () => console.log(`Example app listening on port ${process.env.PORT} --${__filename}`));
    })
    .catch((err) => {
      console.log(err);
    });
})();
module.exports = app;
