const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = require("./products.js")(mongoose);
db.portfolio = require("./portfolio.js")(mongoose);
db.symbol = require("./symbol.js")(mongoose);

module.exports = db;
