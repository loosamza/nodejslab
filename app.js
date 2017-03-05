/* 
var http = require('http');
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('Hello NodeJS');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
*/
var express = require('express');
// Convert body to format you need.
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.use('/bower_components', express.static('bower_components'));
var mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  res.send('Hello NodeJS');
})




function getPostIt(response) {

  var isColor = ['is-primary', 'is-info', 'is-success', 'is-warning', 'is-danger'];
  var isColorIdx = 0;
  for (var i = 0; i < response.length; i++) {
    if (isColorIdx > 4) {
      isColorIdx = 0;
    }
    response[i].actDate = formatDate(d);
    response[i].actTime = d.toLocaleTimeString();
    response[i].actColor = '<p class="notification ' + isColor[isColorIdx] + ' has-text-centered">'
    /*data[i].actDate = {
      actDate: formatDate(d),
      actTime: d.toLocaleTimeString(),
      actColor: '<p class="notification ' + isColor[isColorIdx] + ' has-text-centered">'
    };*/
    isColorIdx++;
  }
  return response;
}

function postIt(name, content) {
  var isColor = ['is-primary', 'is-info', 'is-success', 'is-warning', 'is-danger'];
  data.push({
    actName: name,
    actContent: content,
    actDate: formatDate(d),
    actTime: d.toLocaleTimeString(),
    actColor: '<p class="notification ' + isColor[0] + ' has-text-centered">'
  });
  return data;
}

function formatDate(date) {
  var monthNames = [
    "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/horoscope";
var ObjectID = require('mongodb').ObjectID;

function addData(value, callback) {
  MongoClient.connect(dbUrl, function (err, db) {
    if (err) callback(err);
    var id = new ObjectID();
    value["_id"] = id.toHexString();
    db.collection('data')
      .insert(value, function (err, result) {
        db.close();
        if (err) callback(err);
        callback(result);
      });

  });
}

function callData(callback) {
  MongoClient.connect(dbUrl, function (err, db) {
    db.collection('data').find().toArray(function (err, result) {
      db.close();
      if (err) callback(err);
      callback(result);
     
    });
  });
}



app.post('/data/add', function (req, res) {
  console.log('Activity Name : ', req.body.actName);
  console.log('Content : ', req.body.actContent);
  req.body.actDate = formatDate(d);
  req.body.actTime = d.toLocaleTimeString();
  addData(req.body, function (result) {
    res.send(req.body);
    console.log('done');
    
  });


})

app.get('/horoscope', function (req, res) {

  res.render('horoscope', {

  });

})
var d = new Date();



app.get('/mypage', function (req, res) {
  var data = [];
   callData(function (response) {

    var isColor = ['is-primary', 'is-info', 'is-success', 'is-warning', 'is-danger'];
    var isColorIdx = 0;
    for (var i = 0; i < response.length; i++) {
      if (isColorIdx > 4) {
        isColorIdx = 0;
      }
      //response[i].actDate = formatDate(d);
      //response[i].actTime = d.toLocaleTimeString();
      response[i].actColor = '<p class="notification ' + isColor[isColorIdx] + ' has-text-centered">'
      isColorIdx++;
    }
    //console.log('res',JSON.stringify(response));
    data = response;
    res.render('mypage', {items:response,count:response.length});
    return response;
     
  });


 
})

app.post('/call', function (req, res) {
  console.log('Activity Name : ', req.body.actName);
  console.log('Content : ', req.body.actContent);
  res.render('mypage', {
    items: postIt(req.body.actName, req.body.actContent)
  });
  //console.log(JSON.stringify(data));
});
app.listen(3000);
console.log('Server Running...');