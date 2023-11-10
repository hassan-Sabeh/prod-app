var express = require('express');
var router = express.Router();
var redis = require('redis')
var process = require('process')

var client = redis.createClient({
  host: 'redis-server'
});
client.set('vsisits', 0);

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  client.get('visits', (err, visits) => {
    res.send('number of visits is '+ visits);
    client.set('visits', parseInt(visits) + 1);
  })
});

router.get('/stop', function(req, res, next) {
  res.send({'Message':'stopping the server'});
  process.exit(0)
});
module.exports = router;
