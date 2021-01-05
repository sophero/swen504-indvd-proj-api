const express = require("express");
const server = express();

const body_parser = require("body-parser");
// parse JSON
server.use(body_parser.json());

const port = process.env.PORT || 4000;

server.listen(port, () => {
   console.log(`Server listening at ${port}`);
});
