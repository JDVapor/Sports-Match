var db = require("../models");
var {
  validToken
} = require('./../utilities/tokenService');

module.exports = function(app) {
  // Load index page
  app.get("/", function({
    signedCookies: {
      token
    }
  }, res) {
    if (token) {
      validToken(token).then(({
        user: {
          username,
          id
        }
      }) => {
        db.User.findOne({
          where: {
            username,
            id
          }
        }).then((user) => {
          // protected route
          if (user) {
            res.render('profile', {
              user: {
                username
              }
            });
          } else {
            res.render('login');
          }
        })


      })
    } else {
      res.render('login');
    }
  });

  app.get('/signup', (req, res) => res.render('signup'));

  app.get('/login', (req, res) => res.render('login'));

  // Load football events page
  app.get("/football", function(req, res) {
    db.Event.findAll({
      where: {
        category: "Football"
      }
    }).then(function(dbEvents) {
      res.render("eventList", {
        msg: "Current Football Events:",
        events: dbEvents
      });
    });
  });

  // Load baseball events page
  app.get("/baseball", function(req, res) {
    db.Event.findAll({
      where: {
        category: "Baseball"
      }
    }).then(function(dbEvents) {
      res.render("eventList", {
        msg: "Current Baseball Events:",
        events: dbEvents
      });
    });
  });

  // Load Soccer events page
  app.get("/soccer", function(req, res) {
    db.Event.findAll({
      where: {
        category: "Soccer"
      }
    }).then(function(dbEvents) {
      res.render("eventList", {
        msg: "Current Soccer Events:",
        events: dbEvents
      });
    });
  });

  // Load basketball events page
  app.get("/basketball", function(req, res) {
    db.Event.findAll({
      where: {
        category: "Basketball"
      }
    }).then(function(dbEvents) {
      res.render("eventList", {
        msg: "Current Basketball Events:",
        events: dbEvents
      });
    });
  });

  // Load golf events page
  app.get("/golf", function(req, res) {
    db.Event.findAll({
      where: {
        category: "Golf"
      }
    }).then(function(dbEvents) {
      res.render("eventList", {
        msg: "Current Golf Events:",
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
