function random(arr){
    var random = Math.floor(Math.random() * arr.length)
    return arr[random];
}
var LivingCreature = require("./class.LivingCreature");
var Gishatich = require("./class.predator.js");
var GrassEater = require("./class.eatgrass.js")
var st = require("./statistic.js");
module.exports = class Kerpar1 extends LivingCreature{

    constructor(x, y, index) {
        super(x,y,index)
        this.directions = [];
        this.energy1 = 10;
        this.energy2 = 10;
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
            this.energy1--;
            this.energy2--;
            if (this.energy1 <= 0 || this.energy2 <= 0) {
                this.die(matrix);
            }
            this.acted = true;
        }
        else this.acted = false;
    }
    
    eat1(matrix) {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(1,matrix));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                console.log(newX,newY)
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;


                this.x = newX;
                this.y = newY;
                this.energy1++;

                st.Grass.current--;
                st.Grass.dead++;

                if (this.energy1 >= 13) {
                    this.mul1(matrix);
                }
                this.acted = true;

            }
            else {
                this.move(matrix);
                this.mul2(matrix);
            }
        }
        else this.acted = false;
    }

    eat2(matrix) {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(2,matrix));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;


                this.x = newX;
                this.y = newY;
                this.energy2++;

                st.GrassEater.dead++;
                st.GrassEater.current--;

                if (this.energy2 >= 13) {
                    this.mul2(matrix);
                }
                this.acted = true;

            }
            else {
                this.move(matrix);
                this.mul1(matrix);
            }
        }
        else this.acted = false;
    }

    mul1(matrix) {
        var newCell = random(this.chooseCell(1,matrix));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new GrassEater(newX, newY, 2);
            this.energy1 = 10;

            st.Kerpar1.current++;
            st.Kerpar1.born++;
        }
    }

    mul2(matrix) {
        var newCell = random(this.chooseCell(2,matrix));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Gishatich(newX, newY, 3);
            this.energy2 = 10;
            st.Kerpar1.current++;
            st.Kerpar1.born++;
        }
    }

    die(matrix) {
        st.Kerpar1.current--;
        st.Kerpar1.dead++;
        matrix[this.y][this.x] = 0;
    }

}