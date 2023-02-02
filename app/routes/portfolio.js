module.exports = app => {
  const portfolio = require("../controllers/portfolio.js");

  var router = require("express").Router();

  // Create a new portfolio
  router.post("/", portfolio.create);

  // Retrieve all portfolio
  router.get("/", portfolio.findAll);

  // Retrieve all published portfolio
  router.get("/published", portfolio.findAllPublished);

  // Retrieve a single portfolio with id
  router.get("/:id", portfolio.findOne);

  // Update a portfolio with id
  router.put("/:id", portfolio.update);

  // Delete a portfolio with id
  // router.delete("/:id", portfolio.delete);

  // Create a new portfolio
  // router.delete("/", portfolio.deleteAll);

  app.use("/api/portfolio", router);
};
