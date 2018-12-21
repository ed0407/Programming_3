function random(arr){
    var random = Math.floor(Math.random() *arr.length)
    return arr[random];
}
var LivingCreature = require("./class.LivingCreature");

//var Grass = require("./class.LivingCreature");
var st = require("./statistic.js");
//var GrassEater = require("./class.eatgrass");
module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.directions = [];
        this.energy = 8;
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

            var newCell = random(this.chooseCell(1,matrix));

            if (newCell) {
                //console.log(newCell.length,newCell);
                var newX = newCell[0];
                var newY = newCell[1];

                //console.log(newX,newY, newCell);
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;


                this.x = newX;
                this.y = newY;
                this.energy++;
                st.Grass.current--;
                st.Grass.dead++;
                if (this.energy >= 15) {
                    this.mul(matrix);
                }
                this.acted = true;

            }
            else {
                this.move(matrix);
                
            } 
        }
        else this.acted = false;
    }
    mul(matrix) {

        var newCell = random(this.chooseCell(0,matrix));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new GrassEater(newX, newY, 2);
            this.energy = 0;

            st.GrassEater.born++;
            st.GrassEater.current++;
        }
    }


    die(matrix) {
        st.GrassEater.dead++;
        st.GrassEater.current--;
        matrix[this.y][this.x] = 0;

    }


}

