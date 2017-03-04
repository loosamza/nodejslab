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

function getImagePath() {
  return 'http://wallpaper-gallery.net/images/image/image-13.jpg';
}

function getPostIt() {
  var data = [];
  var isColor = ['is-primary','is-info','is-success','is-warning','is-danger'];
  var isColorIdx = 0;
  for (var i = 0; i < 6; i++) {
    if(isColorIdx > 4){
      isColorIdx = 0;
    }
    data.push({
      actName: 'First NodeJS Day ' + (i + 1),
      actContent: 'เขียน NodeJS ครั้งแรก',
      actDate: formatDate(d),
      actTime: d.toLocaleTimeString(),
      actColor: '<p class="notification '+ isColor[isColorIdx] +' has-text-centered">'
    });
    isColorIdx++;
  }
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
app.post('/horoscope', function (req, res) {

  res.render('horoscope', {
    text: req.body.pass
  });
})
var d = new Date();


var actArr = getPostIt();
console.log(actArr);
app.get('/mypage', function (req, res) {
  res.render('mypage', {
    items: actArr
  });
})
app.listen(3000);
console.log('Server Running...');