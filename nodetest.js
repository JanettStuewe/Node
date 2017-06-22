"use strict";
console.log("Server starting");
var Http = require("http");
var Url = require("url");
var port = process.env.PORT;
if (port == undefined)
    port = 8100;
var server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);
function handleListen() {
    console.log("Listening on port: " + port);
}
function handleRequest(_request, _response) {
    console.log("Request received");
    console.log(_request.url);
    var query = Url.parse(_request.url, true).query;
    console.log(query);
    var key;
    for (key in query)
        console.log(key + ":" + query[key]);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    for (key in query) {
        if (query[key] != "0") {
            _response.write(key + ":" + query[key] + "</br>");
        }
    }
    _response.end();
}
//# sourceMappingURL=nodetest.js.map