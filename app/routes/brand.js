module.exports = app => {
  const brand = require("../controllers/brand.js");

  var router = require("express").Router();

  // Create a new Brand
  router.post("/", brand.create);

  // Retrieve all brand
  router.get("/", brand.findAll);

  // Retrieve all published brand
  router.get("/published", brand.findAllPublished);

  // Retrieve a single Brand with id
  router.get("/:id", brand.findOne);

  // Update a Brand with id
  router.put("/:id", brand.update);

  // Delete a Brand with id
  router.delete("/:id", brand.delete);

  // Create a new Brand
  router.delete("/", brand.deleteAll);

  app.use("/api/brand", router);
};
