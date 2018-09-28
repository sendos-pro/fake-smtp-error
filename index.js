const mailin = require('./lib/mailin');

const util = require('util');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('view'))

app.head('/', function (req, res) {
    res.send(200);
});

options = {
    host: '0.0.0.0',
    port: 25,
    webhook: 'http://localhost:3000/webhook',
    disableWebhook: true,
    disableSpamScore: false,
    verbose: false,
    debug: false,
    logLevel: 'info',
    profile: false,
    disableDNSValidation: true,
    smtpOptions: {
        banner: 'SendBulls FAKE Smtp Server',
        logger: false,
        disabledCommands: ['AUTH']
    }
};

mailin.start(options);
 
/* Access simplesmtp server instance. 
mailin.on('authorizeUser', function(connection, username, password, done) {
  if (username == "johnsmith" && password == "mysecret") {
    done(null, true);
  } else {
    done(new Error("Unauthorized!"), false);
  }
});
 */

// mailin.on('validateSender', function (connection, email, done) {
//   done(null, true);
//   console.log(connection);
// });

mailin.on('validateRecipient', function (connection, email, done) {

  let min = 1;
  let max = 10;
  let num = Math.floor(Math.random() * (max - min + 1)) + min;

  let err = new Error('NASHA HUINYA S PRIMEROM OSHIBKI');
  
  // connection.rcptTo.push(email);

  if(num == 5) {
    err.responseCode = 550;
    done(err, false);
    connection.type = 'HARD';
    io.emit('eventClient', util.inspect(connection, { depth: 5 }));
  } else if(num == 3 || num == 7) {
    err.responseCode = 451;
    done(err, false);
    connection.type = 'SOFT';
    io.emit('eventClient', util.inspect(connection, { depth: 5 }));
  } else {
    done(null, true);
  }

});

mailin.on('startMessage', function (connection) {
  // console.log('CONNECTION FROM MX');
});
 
mailin.on('message', function (connection, data, content) {

  io.emit('eventClient', util.inspect(data, { depth: 5 }));

});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/view/index.html');
});


io.sockets.on('connection', function (socket) {

  io.on('disconnect', function () {
    console.log('user disconnected');
  });

});

http.listen(3000);