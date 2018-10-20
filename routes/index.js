var express = require('express');
var router = express.Router();
var mysql = require('mysql');



/* GET home page. */
router.post('/add', function (req, res) {
  var product = req.body.product;
  var price = req.body.price;

  var con = mysql.createConnection({
    host: "localhost",
    database: "store",
    user: "root",
    password: "root"
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = `INSERT INTO products (name, price) VALUES ("${product}", ${price})`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  });


  res.send(`Added: ${product}, price: ${price}<br><a href="getall.html">show all</a>`);
});

router.get('/getall', function (req, res, next) {

  var con = mysql.createConnection({
    host: "localhost",
    database: "store",
    user: "root",
    password: "root"
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = `SELECT* FROM products`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
      res.json(result);
    });
  });
})

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;