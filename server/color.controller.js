const colorService = require("./color.service");

module.exports = {
  colorScraper: colorScraper,
  read: read
};

function colorScraper(req, res) {
  colorService
    .colorScraper()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
}

function read(req, res) {
  colorService
    .read()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
}

function insert(req, res) {
  colorService
    .insert(req.body)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
}
