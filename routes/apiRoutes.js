var db = require("../models");
const { validToken } = require('./../utilities/tokenService');

module.exports = function(app) {
  // Get all events
  app.get("/api/events", function(req, res) {
    db.Event.findAll({}).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  // Create a new event
  app.post("/api/events", function({
    signedCookies: {
      token
    },
    body
  }, res) {
    if (token){
          validToken(token).then(({user: {id, username}}) => {
            let payload = {...body, username};
            console.log(payload)
            db.Event.create(payload).then(function(dbEvents) {
              res.json(dbEvents);
            });
          }).catch(err => {
            if (err) throw err;
          })
    }


  });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
      res.redirect("/")
    });
  });

  // Delete an event by id
  app.delete("/api/events/:id", function(req, res) {
    db.Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });
};
