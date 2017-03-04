
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
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
var mustacheExpress = require('mustache-express');
app.engine('mustache',mustacheExpress());

app.set('view engine','mustache');
app.set('views',__dirname + '/views');

app.get('/', function (req, res) {
  res.send('Hello NodeJS');
})

function getImagePath(){
  return 'http://wallpaper-gallery.net/images/image/image-13.jpg';
}
app.post('/horoscope', function (req, res){
  
  res.render('horoscope',{text:req.body.pass});
})

app.get('/mypage', function (req, res){
  res.render('mypage',{imgPath: getImagePath()});
})
app.listen(3000);
console.log('Server Running...');
