const MongoClient = require("mongodb").MongoClient;

// mongodb instance details
const dbUser = "db-user";
const dbPass = process.env.MONGODB_ATLAS_DB_PASS;
const dbName = "gratitudedb";
const dbConnectionUrl = `mongodb+srv://${dbUser}:${dbPass}@cluster0.5pwke.mongodb.net/${dbName}?retryWrites=true&w=majority`;

function initialise(dbName, dbCollectionName, successCallback, failureCallback) {
    MongoClient.connect(dbConnectionUrl, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err);

        } else {

            console.log("[MongoDB connection] SUCCESS");
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            successCallback(dbCollection);
        }
    });
}

module.exports = {
    initialise
};