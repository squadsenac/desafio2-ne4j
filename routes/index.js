var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Crud - Neo4j - Fábio e Kaiky' });
});

module.exports = router;
