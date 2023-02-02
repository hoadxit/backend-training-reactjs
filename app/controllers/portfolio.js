const db = require("../models");
const Portfolio = db.portfolio;

// Create and Save a new Portfolio
exports.create = (req, res) => {
  // Validate request
  if (!req.body.account_id) {
    res.status(400).send({ message: "account_id can not be empty!" });
    return;
  }

  // Create a Portfolio
  const portfolios = new Portfolio({
    account_id: req.body.account_id,
    account_name: req.body.account_name,
    cash_balance: req.body.cash_balance
  });

  // Save Portfolio in the database
  portfolios
    .save(portfolios)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Portfolio."
      });
    });
};

// Retrieve all Portfolios from the database.
exports.findAll = (req, res) => {
  const query = req.query;
  var condition = {};
  Object.keys(query).forEach(param => {
    condition[param] = { $regex: new RegExp(query[param]), $options: "i" }
  })

  Portfolio.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving portfolioss."
      });
    });
};

// Find a single Portfolio with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Portfolio.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Portfolio with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Portfolio with id=" + id });
    });
};

// Update a Portfolio by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Portfolio.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Portfolio with id=${id}. Maybe Portfolio was not found!`
        });
      } else res.send({ message: "Portfolio was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Portfolio with id=" + id
      });
    });
};

// Delete a Portfolio with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Portfolio.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Portfolio with id=${id}. Maybe Portfolio was not found!`
        });
      } else {
        res.send({
          message: "Portfolio was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Portfolio with id=" + id
      });
    });
};

// Delete all Portfolios from the database.
exports.deleteAll = (req, res) => {
  Portfolio.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Portfolios were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all portfolioss."
      });
    });
};

// Find all published Portfolios
exports.findAllPublished = (req, res) => {
  Portfolio.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving portfolioss."
      });
    });
};
