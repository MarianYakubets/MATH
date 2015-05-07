var GridUtils = {
    buildGrid: function (rows, columns) {
        var row;
        var cells = [];
        for (var i = 0; i < rows; i++) {
            row = [];
            for (var j = 0; j < columns; j++) {
                row.push(new Cell(cc.p(i, j), Type.default, ""));
            }
            cells.push(row);
        }

        return cells;
    },

    getCellByPoint: function (point, border, size, cells) {
        var column = Math.abs(Math.round((point.x - border - size * .5) / size));
        var row = Math.abs(Math.round(((point.y - border - size * .5) / size)));
        return cells[row][column];
    },

    createTouchListener: function () {
        return cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            controller: null,

            onTouchBegan: function (touch, event) {
                this.controller.onTouchBegan(touch.getLocation());
                return true;
            },

            onTouchMoved: function (touch, event) {
                if(this.controller.onTouchMoved == undefined){
                    return;
                }
                this.controller.onTouchMoved(touch.getLocation());
                return true;
            },

            onTouchEnded: function (touch, event) {
                if(this.controller.onTouchEnded == undefined){
                    return;
                }
                this.controller.onTouchEnded();
            }
        });
    }
};