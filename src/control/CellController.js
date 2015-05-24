var CellController = cc.Class.extend({
    grid: null,
    cells: [],
    chosenCells: [],
    lastCell: null,
    result: null,
    touchListener: null,

    ctor: function (grid, level, label) {
        this.grid = grid;
        this.cells = level.cells;

        var gates = 0;
        this.cells.forEach(function (r) {
            r.forEach(function (c) {
                if (c.type == Type.gate) {
                    gates++;
                }
            });
        });
        this.result = new Result(level.num, gates);

        this.grid.drawGrid(this.cells);

        this.touchListener = GridUtils.createTouchListener();
        this.touchListener.controller = this;
        //cc.eventManager.addListener(this.touchListener, this.grid);

        if ('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                swallowTouches: true,
                onMouseDown: this.onTouchBegan(this),
                onMouseMove: this.onTouchMoved(this),
                onMouseUp: this.onTouchEnded(this)
            }, this.grid);
        } else {
            cc.log("Mouse is not supported on desktop");
        }

        if (cc.sys.capabilities.hasOwnProperty('touches')) {
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: this.onTouchBegan(this),
                onTouchMoved: this.onTouchMoved(this),
                onTouchEnded: this.onTouchEnded(this),
                onTouchCancelled: this.onTouchCancelled(this)
            }, this.grid);
        } else {
            cc.log("TOUCH-ONE-BY-ONE is not supported on desktop");
        }

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
        this.chosenCells = [];
    },

    choseCell: function (cell) {
        if (cell != null && this.chosenCells.indexOf(cell) == (-1)) {
            if (this.chosenCells.length == 0) {
                this.chosenCells.push(cell);
                cell.select();
                return;
            }
            var lastCell = this.chosenCells[this.chosenCells.length - 1];
            if (!this.isConnected(lastCell, cell)) {
                return;
            }
            if (this.isGateConnected(lastCell, cell)) {
                if (this.chosenCells.length == 1) {
                    this.chosenCells.push(cell);
                    cell.select();
                    this.tryOpenGate(lastCell, cell);
                }
                return;
            }
            if (this.isTwoOperations(lastCell, cell)) {
                return;
            }
            this.chosenCells.push(cell);
            cell.select();
        }
    },

    isConnected: function (lastCell, cell) {
        if (this.chosenCells.length == 0) {
            return true;
        }
        var pos = lastCell.pos;
        if (pos.x == cell.pos.x && Math.abs(pos.y - cell.pos.y) == 1) {
            return true;
        }
        return !!(pos.y == cell.pos.y && Math.abs(pos.x - cell.pos.x) == 1);

    },

    isTwoOperations: function (lastCell, cell) {
        if (isNaN(lastCell.value)) {
            return !!isNaN(cell.value);
        }
        return false;
    },

    isGateConnected: function (lastCell, cell) {
        return !!(lastCell.type == Type.gate || cell.type == Type.gate);
    },

    onTouchBegan: function (contr) {
        return function (p) {
            contr.choseCell(GridUtils.getCellByPoint(p.getLocation(), contr.grid.border, contr.grid.size, contr.cells));
        }
    },

    onTouchMoved: function (contr) {
        return function (p) {
            contr.choseCell(GridUtils.getCellByPoint(p.getLocation(), contr.grid.border, contr.grid.size, contr.cells));
        }
    },

    onTouchEnded: function (contr) {
        return function (p) {
            contr.evaluateExpression();
        }
    },

    onTouchCancelled: function (p) {
        return function (p) {
            //contr.evaluateExpression();
        }
    },

    evaluateExpression: function () {
        var result = '';
        if (this.chosenCells.length < 2) {
            this.rollbackSelection();
            return;
        }
        this.chosenCells.forEach(function (cell) {
            result += cell.value;
        });
        try {
            result = eval(result);
            this.executeSelection(result);
        } catch (err) {
            this.chosenCells = [];
            this.rollbackSelection();
        }
        this.endMove();
    },

    endMove: function () {
        this.result.moves++;
        this.chosenCells = [];
    },

    endLevel: function () {
        //cc.eventManager.removeListener(this.touchListener, this.grid);
        this.cells = null;
        this.touchListener = null;
        this.grid.visible = false;
        this.grid.removeAllChildrenWithCleanup(true);
        cc.director.runScene(new cc.TransitionFade(1.2, new FinishScene(this.result)));
    },

    tryOpenGate: function (lastCell, cell) {
        if (lastCell.value == cell.value) {
            var controller = this;
            this.chosenCells.forEach(function (cell) {
                if (cell.type == Type.gate) {
                    cell.deselect();
                    cell.unlock();
                } else {
                    cell.view.visible = false;
                }
                controller.cells[cell.pos.x][cell.pos.y] = null;
            });
            this.endMove();
            if (this.result.openGate()) {
                this.endLevel();
            }
        } else {
            this.rollbackSelection();
        }
    }

});