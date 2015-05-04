var CellController = cc.Class.extend({
    canvas: null,
    cells: [],
    border: 0,
    size: 0,
    chosenCells: [],
    lastCell: null,

    ctor: function (canvas, level, label) {
        this.canvas = canvas;
        this.cells = level.cells;
        //label.setString("10");

        this.border = DIM.width * .05;
        this.size = (DIM.width - this.border * 2) / this.cells[0].length;
        //label.setString("11");

        this.drawGrid(this.border, this.size);
        //label.setString("12");

        var touchListener = this.createTouchListener();
        touchListener.controller = this;
        //label.setString("13");

        cc.eventManager.addListener(touchListener, this.canvas);
        //label.setString("14");
        try {
          /*  label.setString("Level: " + level.num);

            label.setString(jsb.fileUtils.getWritablePath());
            */
        }
        catch (err) {
        }
    },

    /*
     createStub: function () {
     var columns = 5;
     var rows = 6;
     var row;
     var symb = "+";
     var cells = [];

     var keys = Object.keys(expression);
     for (var i = 0; i < rows; i++) {
     row = [];
     for (var j = 0; j < columns; j++) {
     if (i == j) {
     symb = "-";
     } else {
     symb = "+";
     }
     row.push(new Cell(cc.p(i, j), Type.default,
     symb + Math.round(Math.random() * 10)));
     }
     cells.push(row);
     }
     return new Level(0, cells);
     },
     */


    drawGrid: function (border, size) {
        var columns = this.cells.length;
        var rows = this.cells[0].length;

        var square;
        var posX;
        var posY;

        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                posX = border + size * i + size * .5 - DIM.width / 2;
                posY = border + size * j + size * .5 - DIM.width / 2;

                square = new Box(this.cells[j][i].num, cc.p(size, size));
                square.setPosition(posX, posY);
                this.canvas.addChild(square);
                this.cells[j][i].square = square;
            }
        }

    },

    executeSelection: function (result) {
        cc.log(result);
        var controller = this;
        var lastCell = this.chosenCells[this.chosenCells.length - 1];
        this.chosenCells.forEach(function (cell) {
            cell.square.visible = false;
            controller.cells[cell.pos.x][cell.pos.y] = null;
        });
        lastCell.deselect();
        lastCell.setNum(result);
        lastCell.square.visible = true;
        this.cells[lastCell.pos.x][lastCell.pos.y] = lastCell;
    },

    rollbackSelection: function () {
        cc.log("wrong selection");
        this.chosenCells.forEach(function (cell) {
            cell.deselect();
        });
    },

    getCellByPoint: function (point) {
        var column = Math.abs(Math.round((point.x - this.border - this.size * .5) / this.size));
        var row = Math.abs(Math.round(((point.y - this.border - this.size * .5 - (DIM.height - DIM.width) / 2) / this.size)));
        return this.cells[row][column];
    },

    choseCell: function (cell) {
        if (this.chosenCells.indexOf(cell) == (-1)) {
            if (!this.isConnected(cell)) {
                return;
            }
            this.chosenCells.push(cell);
            cell.select();
        }
    },

    isConnected: function (cell) {
        if (this.chosenCells.length == 0) {
            return true;
        }
        var pos = this.chosenCells[this.chosenCells.length - 1].pos;

        if (pos.x == cell.pos.x && Math.abs(pos.y - cell.pos.y) == 1) {
            return true;
        }

        if (pos.y == cell.pos.y && Math.abs(pos.x - cell.pos.x) == 1) {
            return true;
        }
        return false;
    },

    onTouchBegan: function (p) {
        this.choseCell(this.getCellByPoint(p));
    },

    onTouchMoved: function (p) {
        this.choseCell(this.getCellByPoint(p));
    },

    onTouchEnded: function (p) {
        var result = '';
        this.chosenCells.forEach(function (cell) {
            result += cell.num;
        });
        try {
            result = eval(result);
            this.executeSelection(result);
        } catch (err) {
            this.rollbackSelection();
        }
        this.chosenCells = [];
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
                this.controller.onTouchMoved(touch.getLocation());
                return true;
            },

            onTouchEnded: function (touch, event) {
                this.controller.onTouchEnded();
            }
        });
    }

});