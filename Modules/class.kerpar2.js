function random(arr){
    var random = Math.floor(Math.random() *arr.length)
    return arr[random];
}
var LivingCreature = require("./class.LivingCreature");
var Grass = require("./class.grass.js");
var st = require("./statistic.js");
module.exports = class Kerpar2 extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index);
        this.directions = [];
        this.energy = 15;
        this.acted = false;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(ch,matrix) {
        this.getNewCoordinates();
       return super.chooseCell(ch,matrix);
        }
        move(matrix) {

            if (this.acted == false) {
                var newCell = random(this.chooseCell(0,matrix));

                if (newCell) {
                    var newX = newCell[0];
                    var newY = newCell[1];

                    matrix[newY][newX] = matrix[this.y][this.x];
                    matrix[this.y][this.x] = 0;

                    this.x = newX;
                    this.y = newY;
                }
                this.energy--;
                if (this.energy <= 0) {
                    this.die(matrix);
                }
                this.acted = true;
            }
            else this.acted = false;
        }
    
    eat(matrix) {
        if (this.acted == false) {

            var newCell = random(this.chooseCell(3,matrix));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;


                this.x = newX;
                this.y = newY;
                this.acted = true;

                st.Predator.current--;
                st.Predator.dead++;

            }
            else {
                this.move(matrix);
            }
        }
        else this.acted = false;
    }
   
    die(matrix){
        matrix[this.y][this.x] = 0;

        st.Kerpar2.current--;
        st.Kerpar2.dead++;
        var datarkner = this.chooseCell(0,matrix);

        for(var i in datarkner){
            var newX = datarkner[i][0];
            var newY = datarkner[i][1];
            matrix[newY][newX] = new Grass (newX,newY,1)
        }       
    }
}
