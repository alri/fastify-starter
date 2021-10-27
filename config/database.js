const mongoose = require("mongoose");

const server = process.env.DB_HOST + ":" + process.env.DB_PORT || '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = process.env.DB_NAME || 'expressdb'; // REPLACE WITH YOUR DB NAME

const dbHost = `mongodb://${server}/${database}`;
mongoose.connect(dbHost, {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", () => {
    console.log("> database is not ready ...");
});
db.once("open", () => {
    console.log("> successfully opene the database");
});

module.exports = mongoose;