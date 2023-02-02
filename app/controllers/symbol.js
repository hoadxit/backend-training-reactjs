const db = require("../models");
const Symbol = db.symbol;

// Create and Save a new Symbol
exports.create = (req, res) => {
  // Validate request
  if (!req.body.symbol) {
    res.status(400).send({ message: "symbol can not be empty!" });
    return;
  }

  // Create a Symbol
  const symbol = new Symbol({
    ...req.body
  });

  // Save Symbol in the database
  symbol
    .save(symbol)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Symbol."
      });
    });
};
exports.creates = async (req, res) => {
  // Validate request
  if (!req.body.data) {
    res.status(400).send({ message: "symbol can not be empty!" });
    return;
  }

  // Create a Symbol
  req.body.data.forEach((dt, index) => {
    const symbol = new Symbol({
      ...dt
    });
    symbol
      .save(symbol)
      .then(data => {
        if (index === req.body.data.length - 1) {
          res.send(data);
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Symbol."
        });
      });
  })


  // Save Symbol in the database
  // symbol
  //   .save(symbol)
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the Symbol."
  //     });
  //   });
};

// Retrieve all Symbols from the database.
exports.findAll = (req, res) => {
  const query = req.query;
  var condition = {};
  Object.keys(query).forEach(param => {
    condition[param] = { $regex: new RegExp(query[param]), $options: "i" }
  })

  Symbol.find(condition)
    .then(data => {
      if(data.length > 50) data.length = 50
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving symbols."
      });
    });
};

// Find a single Symbol with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Symbol.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Symbol with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Symbol with id=" + id });
    });
};

// Update a Symbol by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Symbol.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Symbol with id=${id}. Maybe Symbol was not found!`
        });
      } else res.send({ message: "Symbol was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Symbol with id=" + id
      });
    });
};

// Delete a Symbol with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Symbol.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Symbol with id=${id}. Maybe Symbol was not found!`
        });
      } else {
        res.send({
          message: "Symbol was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Symbol with id=" + id
      });
    });
};

// Delete all Symbols from the database.
exports.deleteAll = (req, res) => {
  Symbol.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Symbols were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all symbols."
      });
    });
};

// Find all published Symbols
exports.findAllPublished = (req, res) => {
  Symbol.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving symbols."
      });
    });
};
