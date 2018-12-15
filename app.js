var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
  res.redirect('index.html');
});

app.listen(3001, function(){
  console.log("connected");
  console.log(matrix);
});

var Grass = require('./Modules/class.grass.js');
var matrix = require('./Modules/matrix.js')

var time = frameRate(5);

function frameRate( frameCount )
{
  return 1000 / frameCount;
}

function draw()
{
  // for (var y = 0; y < matrix.length; y++) {
  //   for (var x = 0; x < matrix[y].length; x++) {
  //       if (matrix[y][x].index == 1) {
  //           matrix[y][x].mul();
  //       }
  //       if (matrix[y][x].index == 2) {
  //           matrix[y][x].eat();
  //       }
  //       if (matrix[y][x].index == 3) {
  //           matrix[y][x].eat();
  //       }
  //       if (matrix[y][x].index == 4) {
  //           matrix[y][x].eat1();
  //       }
  //       if (matrix[y][x].index == 5) {
  //           matrix[y][x].eat();
  //       }
  //   }
//}



 // socket.emit("update matrix",matrix)
}

setInterval(draw,time);

