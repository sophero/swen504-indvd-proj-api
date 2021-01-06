const express = require("express");
const ObjectId = require("mongodb").ObjectID;
const cors = require("cors");
const body_parser = require("body-parser");

const server = express();
// enable cors for testing with local front-end
server.use(cors());
server.use(body_parser.json());

const port = process.env.PORT || 4000;

// connect to db
const db = require("./db");
const dbName = "gratitudedb";
const collectionName = "gratitude_posts";

db.initialise(
    dbName,
    collectionName,
    // success cb. define api within
    function(dbCollection) {

        // print posts collection to console
        dbCollection.find().toArray((err, result) => {
            if (err) throw err;
            console.log(result);
        });

        // ----------- posts API ----------- //

        // create post
        server.post("/posts", (request, response) => {
            const post = request.body;
            dbCollection.insertOne(post, (err, result) => {
                if (err) throw err;
                // if successful, return updated post list
                dbCollection.find().toArray((_err, _result) => {
                    if (_err) throw err;
                    response.json(_result);
                });
            });
        });

        // read post
        server.get("/posts/:id", (request, response) => {
            const postObjId = new ObjectId(request.params.id);
            dbCollection.findOne({ _id: postObjId }, (error, result) => {
                if (error) throw error;
                // return post
                response.json(result);
            });
        });

        // read all posts
        server.get("/posts", (request, response) => {
            dbCollection.find().toArray((error, result) => {
                if (error) throw error;
                response.json(result);
            });
        });

        // delete post
        server.delete("/posts/:id", (request, response) => {
            const postObjId = ObjectId(request.params.id);
            console.log("Delete item with id: ", request.params.id);

            dbCollection.deleteOne({ _id: postObjId }, (error, result) => {
                // return updated list if deletion successful
                dbCollection.find().toArray((_error, _result) => {
                    if (_error) throw _error;
                    response.json(_result);
                });

            });
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
