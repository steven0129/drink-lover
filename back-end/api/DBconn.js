
module.exports = {
    // "get": function (req, res, next) {
    // }
    "get": function(req, res, nest) {
        var date = { currentTime: Date.now() };
        res.status(200).type('application/json').send(date);
    }
}
