module.exports = app => {
  const symbol = require("../controllers/symbol.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/all", symbol.creates);
  router.post("/", symbol.create);

  // Retrieve all symbol
  router.get("/", symbol.findAll);

  // Retrieve all published symbol
  router.get("/published", symbol.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", symbol.findOne);

  // Update a Tutorial with id
  router.put("/:id", symbol.update);

  // Delete a Tutorial with id
  router.delete("/:id", symbol.delete);

  // Create a new Tutorial
  router.delete("/", symbol.deleteAll);

  app.use("/api/symbol", router);
};
