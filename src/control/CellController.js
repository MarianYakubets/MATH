var CellController = cc.Class.extend({
    grid: null,
    cells: [],
    chosenCells: [],
    lastCell: null,

    ctor: function (grid, level, label) {
        this.grid = grid;
        this.cells = level.cells;
        this.grid.drawGrid(this.cells);

        var touchListener = GridUtils.createTouchListener();
        touchListener.controller = this;
        cc.eventManager.addListener(touchListener, this.grid);

        label.setString("Level: " + level.num);
    },

    executeSelection: function (result) {
        cc.log(result);
        var controller = this;
        var lastCell = this.chosenCells[this.chosenCells.length - 1];
        this.chosenCells.forEach(function (cell) {
            cell.view.visible = false;
            controller.cells[cell.pos.x][cell.pos.y] = null;
        });
        lastCell.deselect();
        lastCell.setNum(result);
        lastCell.view.visible = true;
        this.cells[lastCell.pos.x][lastCell.pos.y] = lastCell;
    },

    rollbackSelection: function () {
        cc.log("wrong selection");
        this.chosenCells.forEach(function (cell) {
            cell.deselect();
        });
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

    possibleMove: function (cell, newCell) {
    },

    onTouchBegan: function (p) {
        this.choseCell(GridUtils.getCellByPoint(p, this.grid.border, this.grid.size, this.cells));
    },

    onTouchMoved: function (p) {
        this.choseCell(GridUtils.getCellByPoint(p, this.grid.border, this.grid.size, this.cells));
    },

    onTouchEnded: function (p) {
        var result = '';
        if (this.chosenCells.length < 2) {
            this.chosenCells = [];
            return;
        }
        this.chosenCells.forEach(function (cell) {
            result += cell.value;
        });
        try {
            result = eval(result);
            this.executeSelection(result);
        } catch (err) {
            this.rollbackSelection();
        }
        this.chosenCells = [];
    }

});