var Gavpass = require('../models/gavpassModel');

module.exports = function (app) {

  app.get('/api/setupGavpass', function (req, res) {

    var starterGavpass = [
      {
        name: 'Email',
        attributes: [
          {
            site: "Libero",
            url: "https://www.libero.it/"
          },
          {
            site: "Gmail",
            url: "https://www.gmail.com/"
          }
        ]
      },
      {
        name: 'Business',
        attributes: [
          {
            site: "Trenitalia",
            url: "https://www.trenitalia.com/"
          },
          {
            site: "Trello",
            url: "httpss://www.trello.com/"
          }
        ]
      },
      {
        name: 'Education',
        attributes: [
          {
            site: "Coursera",
            url: "https://www.coursera.org/"
          },
          {
            site: "Udemy",
            url: "https://www.udemy.com/"
          }
        ]
      },
      {
        name: 'Games',
        attributes: [
          {
            site: "Hearthstone",
            url: "https://www.playhearthstone.com/"
          },
          {
            site: "Fifa",
            url: "https://www.fifa.com/"
          }
        ]
      },
      {
        name: 'Entertainment',
        attributes: [
          {
            site: "Netflix",
            url: "https://www.netflix.com/"
          },
          {
            site: "YouTube",
            url: "https://www.youtube.com/"
          }
        ]
      },
      {
        name: 'Shopping',
        attributes: [
          {
            site: "Zalando",
            url: "https://www.zalando.it/"
          },
          {
            site: "Amazon",
            url: "https://www.amazon.it/"
          }
        ]
      },
      {
        name: 'Social',
        attributes: [
          {
            site: "Facebook",
            url: "https://it-it.facebook.com/"
          },
          {
            site: "Instagram",
            url: "https://www.instagram.com/"
          }
        ]
      }
    ];
    Gavpass.create(starterGavpass, function (err, results) {
      res.send(results);
    });
  });

};
