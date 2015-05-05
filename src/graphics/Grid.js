var Grid = cc.Node.extend({
    border: 0,

    ctor: function () {
        this._super();
        this.border = DIM.width * .05;
        this.setPosition(DIM.center);
    },

    redrawGrid: function (cells) {
        this.removeAllChildren();
        this.drawGrid(cells);
    },

    drawGrid: function (cells) {
        var columns = cells.length;
        var rows = cells[0].length;
        this.size = (DIM.width - this.border * 2) / rows;

        var square;
        var posX;
        var posY;

        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                posX = this.border + this.size * i + this.size * .5 - DIM.width / 2;
                posY = this.border + this.size * j + this.size * .5 - DIM.width / 2;

                square = new Box(cells[j][i].num, cc.p(this.size, this.size));
                square.setPosition(posX, posY);

                cells[j][i].view = square;
                this.addChild(square);
            }
        }
    }
});