var Grass = require('./class.grass.js')
var GrassEater = require('./class.eatgrass.js')
var Gishatich = require('./class.predator.js')
var Kerpar1 = require('./class.kerpar1.js')
var Kerpar2 = require('./class.kerpar2.js')


var matrix = [];
var xotQanak = 25;
var xotakerQanak = 20;
var gishatichQanak = 10;
var kerpar1Qanak = 5;
var kerpar2Qanak = 3;

var n = 20;
var m = 20;
for (var y = 0; y < n; y++) {
    matrix[y] = [];
    for (var x = 0; x < m; x++) {

        matrix[y][x] = 0;
    }
}
var k = 0;

while (k < xotQanak) {
    var x = Math.floor(Math.random() * (matrix[0].length));
    var y = Math.floor(Math.random() * (matrix.length));

    //console.log(y, x)

    if (matrix[y][x] == 0) {
        matrix[y][x] = new Grass(x, y, 1);
        k++;
    }
}

var p = 0;

while (p < xotakerQanak) {
    var x = Math.floor(Math.random() * (matrix[0].length));
    var y = Math.floor(Math.random() * (matrix.length));

    if (matrix[y][x] == 0) {
        matrix[y][x] = new GrassEater(x, y, 2);
        p++;
    }
}
var l = 0;
while (l < gishatichQanak) {
    var x = Math.floor(Math.random() * (matrix[0].length));
    var y = Math.floor(Math.random() * (matrix.length));

    if (matrix[y][x] == 0) {
        matrix[y][x] = new Gishatich(x, y, 3);
        l++;
    }
}
var a = 0;
while (a < kerpar1Qanak) {
    var x = Math.floor(Math.random() * (matrix[0].length));
    var y = Math.floor(Math.random() * (matrix.length));

    if (matrix[y][x] == 0) {
        matrix[y][x] = new Kerpar1(x, y, 4);
        a++;
    }
}
var b = 0;
while (b < kerpar2Qanak) {
    var x = Math.floor(Math.random() * (matrix[0].length));
    var y = Math.floor(Math.random() * (matrix.length));

    if (matrix[y][x] == 0) {
        matrix[y][x] = new Kerpar2(x, y, 5);
        b++;
    }
}

module.exports = matrix;


