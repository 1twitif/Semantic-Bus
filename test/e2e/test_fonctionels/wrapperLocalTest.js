var userModel = require('../../../lib/core/models').user
var exec = require("child_process").exec;
exec('wdio test/wdio.conf.local.js',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        userModel.remove({
            'credentials.email': "alexfoot9@orange.fr"
        })
        .exec(function (err, userData) {
            console.log("user delete")
        });
        if (error !== null) {
        console.log('exec error: ' + error);
        }
}.bind(this));
