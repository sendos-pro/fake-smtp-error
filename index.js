var mailin = require('./lib/mailin');

options = {
    host: 'inmail.sendbulls.com',
    port: 25,
    webhook: 'http://localhost:3000/webhook',
    disableWebhook: false,
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

  let err = new Error('NASHA HERNYA S TEKSTOM OSHIBKI');

  if(num == 5) {
    err.responseCode = 550;
    done(err, false);
  } else if(num == 3 || num == 7) {
    err.responseCode = 451;
    done(err, false);
  } else {
    done(null, true);
  }

});

mailin.on('startMessage', function (connection) {
  // console.log(connection);
});
 
mailin.on('message', function (connection, data, content) {
  console.log(data);
});


