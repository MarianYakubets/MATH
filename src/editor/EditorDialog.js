var EditorDialog = cc.Layer.extend({
    grid: null,
    level: null,
    panel: null,

    ctor: function (level) {
        this._super();
        this.grid = new Grid();
        this.init(level);

        this.addChild(this.grid);

        this.panel = new EditorPanel(this);
        this.addChild(this.panel);

        var touchListener = GridUtils.createTouchListener();
        touchListener.controller = this;
        cc.eventManager.addListener(touchListener, this.grid);
    },

    init: function (level) {
        this.level = level;
        this.grid.redrawGrid(level.cells);
    },

    onTouchBegan: function (p) {
        var cell = GridUtils.getCellByPoint(p, this.grid.border, this.grid.size, this.level.cells);
        this.addChild(new EditorCellDialog(cell));
    },

    save: function (dialog) {
        return function () {
            LevelIO.save(dialog.level);
        };
    },

    load: function (dialog) {
        return function () {
            dialog.init(LevelIO.read(dialog.level.value));
        };
    },

    rp: function (dialog) {
        return function () {
            var cells = dialog.level.cells;
            var row = [];
            cells[cells.length - 1].forEach(function (cell) {
                row.push(new Cell(cc.p(cell.pos.x, cell.pos.y + 1)))
            });
            cells.push(row);
            dialog.init(dialog.level);
        };
    },

    rm: function (dialog) {
        return function () {
            dialog.level.cells.pop();
            dialog.init(dialog.level);
        };
    },

    cp: function (dialog) {
        return function () {
            dialog.level.cells.forEach(function (row) {
                var cell = row[row.length - 1];
                row.push(new Cell(cc.p(cell.pos.x + 1, cell.pos.y)))
            });
            dialog.init(dialog.level);
        };
    },

    cm: function (dialog) {
        return function () {
            dialog.level.cells.forEach(function (row) {
                row.pop();
            });
            dialog.init(dialog.level);
        };
    }

});