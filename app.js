var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


var Grass = require('./Modules/class.grass.js');
var matrix = require('./Modules/matrix.js');
var st = require("./Modules/statistic.js");
var fs = require('fs');

app.use(express.static("./public"));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);
//console.log(matrix);

io.on('connection', function (socket) {
    socket.emit("send matrix", matrix);

    setInterval(function () {
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x].index == 1) {
                    matrix[y][x].mul(matrix);
                }
                if (matrix[y][x].index == 2) {
                    matrix[y][x].eat(matrix);
                }
                if (matrix[y][x].index == 3) {
                    matrix[y][x].eat(matrix);
                }
                if (matrix[y][x].index == 4) {
                    matrix[y][x].eat1(matrix);
                }
                if (matrix[y][x].index == 5) {
                    matrix[y][x].eat(matrix);
                }
            }
        }
        console.log(st);

        var myjson = JSON.stringify(st);
        fs.writeFileSync("package.json", myjson);

        socket.emit("redraw", matrix);
    }, time);
});


var time = frameRate(1);
console.log(matrix);

function frameRate(frameCount) {
    return 1000 / frameCount;
}