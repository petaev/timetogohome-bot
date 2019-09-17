const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const db = require('./db');
// const packageInfo = require('./package.json');


const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);

  const dbconnect = database.db('bztkze0jjgwxyft');
  
  require('./routes')(app, dbconnect);
  
  app.listen(port, "0.0.0.0", () => {
    console.log('Server run on ' + port);
  })
});



// app.use(bodyParser.json());

// app.get('/', function (req, res) {
//   res.json({ version: packageInfo.version });
// });

// var server = app.listen(process.env.PORT || 8080, "0.0.0.0", () => {
//   const host = server.address().address;
//   const port = server.address().port;
//   console.log('Web server started at http://%s:%s', host, port);
// });

module.exports = (bot) => {
  app.post('/' + bot.token, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });
};