var request=require('request');
var key='5a5597b7765740f9a2e64c63e2c089a0';
module.exports = {
    //"get": function (req, res, next) {
    //}
    "post": function(req, res, next) {
        // request('https://api.cognitive.microsoft.com/bing/v5.0/images/search?q='+ req.body.query +'&count=10&offset=0&mkt=en-us&safeSearch=Moderate', function (error, response, body) {
        //      if(error) res.json('{"error":"' + error + '"}');
        //      else res.send(body);
        // });
        
        request({
            url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q='+ encodeURIComponent(req.body.q)+'&count=10&offset=0&mkt=en-us&safeSearch=Moderate',
            headers: {
                'Ocp-Apim-Subscription-Key':key
            }
        }, function(error, response, body) {
            if(error) res.json('{"error":"' + error + '"}');
             else res.send(body);
        })
    }
}
