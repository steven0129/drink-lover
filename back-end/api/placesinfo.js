var request=require('request');
module.exports = {
    "post": function(req, res, next) {
        request('https://maps.googleapis.com/maps/api/place/textsearch/json?location='+ req.body.location +'&query='+ encodeURIComponent('飲料店') +'&language=zh-TW&key=AIzaSyB1FeVNtCVEF6QKTquVuRYdX5IxInJZuYY', function (error, response, body) {
             if(error) res.json('{"error":"' + error + '"}');
             else res.send(body);
        });
    }
}
