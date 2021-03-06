"use strict";
var express = require('express')
var cors = require('cors')
var app = express();
app.use(cors());

var passport = require('passport');

var server = require('http').Server(app);
var https = require('https');


var safe = express.Router();
var unSafeRouteur = express.Router();

var bodyParser = require("body-parser");
app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({
  limit: '5mb',
  extended: true
}));
safe.use(bodyParser.json()); // used to parse JSON object given in the request body
var env = process.env;



var httpGet = require('./webServices/workSpaceComponentDirectory/restGetJson.js');
var fs = require('fs');
const configUrl=env.CONFIG_URL||'http://app-30be695d-93b7-4c25-9078-8d2006c44aff.cleverapps.io/file/master';
//console.log("before http config",configUrl);
httpGet.makeRequest('GET', configUrl).then(result => {
  console.log('~~ remote config | ', result);

  const content = 'module.exports = ' + JSON.stringify(result.data);

  fs.writeFile("configuration.js", content, 'utf8', function(err) {
    if (err) {
      return console.log(err);
    } else {
      //console.log("~~ remote configuration saved");
      require('./lib/core/Oauth/google_auth_strategy')(passport);

      var jwtService = require('./webServices/jwtService')

      //Sécurisation des route de data
      safe.use(function(req, res, next) {
        // ensureSec(req,res,next)
        jwtService.securityAPI(req, res, next);
      })

      app.disable('etag'); //what is that?

      unSafeRouteur.use(cors());

      require('./webServices/initialiseHTTPS')(unSafeRouteur);
      require('./webServices/authWebService')(unSafeRouteur);
      require('./webServices/workspaceWebService')(safe);
      require('./webServices/workspaceComponentWebService')(safe);
      require('./webServices/technicalComponentWebService')(safe, unSafeRouteur);
      require('./webServices/userWebservices')(safe);
      require('./webServices/rightsManagementWebService')(safe);

      ///OTHER APP COMPONENT
      ///SECURISATION DES REQUETES

      app.use('/auth', express.static('static'));
      app.use('/auth', unSafeRouteur);
      app.use('/configuration', unSafeRouteur);
      app.use('/data/specific', unSafeRouteur);
      app.use('/data/api', unSafeRouteur);
      app.use('/data/core', safe);
      app.use('/ihm', express.static('static'));
      app.use('/browserify', express.static('browserify'));
      app.use('/npm', express.static('node_modules'));

      server.listen(process.env.PORT || process.env.port || process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0', function() {
        console.log('~~ server started at ',this.address().address,':',this.address().port)
        // console.log('Listening on port  ');
        // console.log(this.address().port);
        //console.log('new message from master 18');
        //console.log(this.address());
      })

      // Lets encrypt response

      app.get('/.well-known/acme-challenge/:challengeHash', function(req, res) {
        var params = req.params.challengeHash.substr(0, req.params.challengeHash.length - 1)
        var hash = params + ".rCIAnB6OZN-jvB1XIOagkbUTKQQmQ1ogeb5DUVFNUko";
        res.send(hash)
      });

      /// Nous Securisons desormais IHM par un appel AJAX
      /// à lentrée sur la page application.html

      server.on('error', function(err) {
        console.log(err)
      })
    }
  });
})
