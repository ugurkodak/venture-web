// Node server for local development
let express = require("express");
let server = express();
server.use(express.static('public'));
server.listen(5000, function() {
    console.log("Venture is being served on port " + 5000);
});