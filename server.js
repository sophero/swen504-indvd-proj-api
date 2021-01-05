const express = require("express");
const server = express();
const body_parser = require("body-parser");

server.use(body_parser.json());

const port = process.env.PORT || 4000;

// connect to db
const db = require("./db");
const dbName = "gratitudedb";
const collectionName = "gratitude_posts";
db.initialise(
    dbName,
    collectionName,
    // success cb
    function(dbCollection) {
        dbCollection.find().toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
        });
    },
    // failure cb
    function(err) {
        throw err;
    }
);

server.listen(port, () => {
   console.log(`Server listening at ${port}`);
});
