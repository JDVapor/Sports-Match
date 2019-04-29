var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Event.findAll({}).then(function(dbEvents) {
      res.render("index", {
        msg: "Welcomet to Sports Match!"
      });
    });
  });

  app.get("/newAcc", function(req, res) {
    db.Event.findAll({}).then(function(dbEvents) {
      res.render("newAccount", {
        msg: "Create a new account by filling out the form below:"
      });
    });
  });

  // Load football events page
  app.get("/football", function(req, res) {
    db.Event.findAll({
      where: {
        category: "football"
      }
    }).then(function(dbEvents) {
      res.render("football", {
        msg: "Current Football Events:",
        events: dbEvents
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/event/:id", function(req, res) {
    db.Event.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbEvent) {
      res.render("eventView", {
        event: dbEvent
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
