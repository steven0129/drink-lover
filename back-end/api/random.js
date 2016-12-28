var crypto = require('crypto');
module.exports = {
    "post":function(req, res, next) {
        var randString = crypto.randomBytes(32).toString('base64').substr(0, 5);
        res.send(randString);
    }
}
