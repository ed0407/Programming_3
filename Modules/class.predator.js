function random(arr){
    var random = Math.floor(Math.random() *arr.length)
    return arr[random];
}
var LivingCreature = require("./class.LivingCreature");
module.exports = class Gishatich extends LivingCreature{
    constructor(x, y, index) {
        super(x,y,index);
        this.directions = [];
        this.energy = 25;
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y - 2]
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
            var newCell = random(this.chooseCell(2,matrix));
            //console.log(this.energy)
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;


                this.x = newX;
                this.y = newY;
                this.energy++;
                if (this.energy >= 28) {
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
        var newCell = random(this.chooseCell(2,matrix));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Gishatich(newX, newY, 3);
            this.energy = 15;
        }
    }
    die(matrix) {
        matrix[this.y][this.x] = 0;

    }

}