class Kerpar1 {

    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
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

    chooseCell(num) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
                else if (matrix[y][x].index == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;

    }

    move() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(0));

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
                this.die();
            }
            this.acted = true;
        }
    }
    eat1() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(1));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;


                this.x = newX;
                this.y = newY;
                this.energy1++;
                if (this.energy1 >= 13) {
                    this.mul1();
                }
                this.acted = true;

            }
            else {
                this.move();
                this.mul2();
            }
        }

        //console.log(this.energy1, this.energy2);
    }
    eat2() {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(2));
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;


                this.x = newX;
                this.y = newY;
                this.energy2++;
                if (this.energy2 >= 13) {
                    this.mul2();
                }
                this.acted = true;

            }
            else {
                this.move();
                this.mul1();
            }
        }
        //console.log(this.energy2);
    }

    mul1() {
        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new GrassEater(newX, newY, 2);
            this.energy1 = 10;
        }
    }


    mul2() {
        var newCell = random(this.chooseCell(2));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = new Gishatich(newX, newY, 3);
            this.energy2 = 10;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
    }

}