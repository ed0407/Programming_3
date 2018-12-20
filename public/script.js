// var Grass = require("Programming3/Modules/class.grass");
// var GrassEater = require("Programming3/Modules/class.eatgrass");
// var Gishatich = require("Programming3/Modules/class.predator");
// var Kerpar1 = require("Programming3/Modules/class.kerpar1");
// var Kerpar2 = require("Programming3/Modules/class.kerpar2");


var matrix = [];
var socket;
var side = 20;
// var xotQanak = 2200;
// var xotakerQanak = 700;
// var gishatichQanak = 175;
// var kerpar1Qanak = 150;
// var kerpar2Qanak = 100;
// var m = 80;
// var n = 80;
 //function setup() {


    // for (var y = 0; y < n; y++) {
    //     matrix[y] = [];
    //     for (var x = 0; x < m; x++) {
    //         matrix[y][x] = 0;
    //     }
    // }
    // matrix = [
    //     [0, 4, 0, 0, 0],
    //     [0, 0, 0, 2, 0],
    //     [0, 5, 0, 2, 2],
    //     [0, 0, 3, 0, 3],
    //     [0, 1, 0, 5, 0],
    //     [1, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0]
    // ];

    // for (var y = 0; y < matrix.length; y++) {
    //     for (var x = 0; x < matrix[y].length; x++) {
    //         if (matrix[y][x] == 1) {
    //             matrix[y][x] = new Grass(x, y, 1);
    //         }
    //         if (matrix[y][x] == 2) {
    //             matrix[y][x] = new GrassEater(x, y, 2);
    //         }
    //         if (matrix[y][x] == 3) {
    //             matrix[y][x] = new Gishatich(x, y, 3);
    //         }
    //         if (matrix[y][x] == 4) {
    //             matrix[y][x] = new Kerpar1(x, y, 4);
    //         }
    //         if (matrix[y][x] == 5) {
    //             matrix[y][x] = new Kerpar2(x, y, 5);
    //         }

    //     }
    // }
    // console.log(matrix);

    // var k = 0;
    // while (k < xotQanak) {
    //     var x = Math.floor(random(matrix[0].length));
    //     var y = Math.floor(random(matrix.length));

    //     if (matrix[y][x] == 0) {
    //         matrix[y][x] = new Grass(x, y, 1);
    //         k++;
    //     }
    // }
    // var p = 0;
    // while (p < xotakerQanak) {
    //     var x = Math.floor(random(matrix[0].length));
    //     var y = Math.floor(random(matrix.length));

    //     if (matrix[y][x] == 0) {
    //         matrix[y][x] = new GrassEater(x, y, 2);
    //         p++;
    //     }
    // }
    // var l = 0;
    // while (l < gishatichQanak) {
    //     var x = Math.floor(random(matrix[0].length));
    //     var y = Math.floor(random(matrix.length));

    //     if (matrix[y][x] == 0) {
    //         matrix[y][x] = new Gishatich(x, y, 3);
    //         l++;
    //     }
    // }
    // var a = 0;
    // while (a < kerpar1Qanak) {
    //     var x = Math.floor(random(matrix[0].length));
    //     var y = Math.floor(random(matrix.length));

    //     if (matrix[y][x] == 0) {
    //         matrix[y][x] = new Kerpar1(x, y, 4);
    //         a++;
    //     }
    // }
    // var b = 0;
    // while (b < kerpar2Qanak) {
    //     var x = Math.floor(random(matrix[0].length));
    //     var y = Math.floor(random(matrix.length));

    //     if (matrix[y][x] == 0) {
    //         matrix[y][x] = new Kerpar2(x, y, 5);
    //         b++;
    //     }
    // }


    // frameRate(80);
    // createCanvas(matrix[0].length * side, matrix.length * side);
    // background("#acacac");
    function setup() {
        background('#acacac');
        frameRate(0);
        
        socket = io();
    
        socket.on("send matrix", function(mtx){
            matrix = mtx;
            createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
            console.log(matrix);
            redraw();
    
            socket.on("redraw", function(mtx){
                matrix = mtx;
                redraw();
            })
        });
    
        noLoop();
    }

//}




function draw() {

    // for (var y = 0; y < matrix.length; y++) {
    //     for (var x = 0; x < matrix[y].length; x++) {
    //         if (matrix[y][x].index == 1) {
    //             matrix[y][x].mul();
    //         }
    //         if (matrix[y][x].index == 2) {
    //             matrix[y][x].eat();
    //         }
    //         if (matrix[y][x].index == 3) {
    //             matrix[y][x].eat();
    //         }
    //         if (matrix[y][x].index == 4) {
    //             matrix[y][x].eat1();
    //         }
    //         if (matrix[y][x].index == 5) {
    //             matrix[y][x].eat();
    //         }
    //     }
    // }


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x].index == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x].index == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;
            }
            else if (matrix[y][x].index == 3) {
                fill("black");
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;

            }
            else if (matrix[y][x].index == 4) {
                fill("red");
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;

            }
            else if (matrix[y][x].index == 5) {
                fill("LightSkyBlue");
                rect(x * side, y * side, side, side);
                matrix[y][x].acted = false;

            }
        }
    }
}




