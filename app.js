const express = require('express');
const nconf = require('nconf');
const MongoClient = require("mongodb").MongoClient;

nconf.argv()
    .env()
    .file("config.json");

uri = nconf.get("DB_URI");

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const db = client.db("userdb");
    const app = express();
    const port = 8080;

    app.use(express.static("public"));

    app.get("/count", async (req, res) => {
        db.collection("counter").insertOne({
            sender: req.ip
        });

        var count = await db.collection("counter").count();
        res.send("Count is: " + count);
    });

    app.listen(port, () => {
        console.log(`Application listening at http://localhost:${port}`)
    });
});


