var EditorDialog = cc.Layer.extend({
    grid: null,
    level: null,
    panel: null,
    save: null,
    load: null,
    test: null,

    ctor: function (level) {
        this._super();
        this.level = level;
        this.save = this.saveF(level);
        this.load = this.loadF(this);

        this.grid = new Grid();
        this.grid.drawGrid(level.cells);
        this.addChild(this.grid);

        this.panel = new EditorPanel(this);
        this.addChild(this.panel);

        var touchListener = GridUtils.createTouchListener();
        touchListener.controller = this;
        cc.eventManager.addListener(touchListener, this.grid);
    },

    onTouchBegan: function (p) {
        var cell = GridUtils.getCellByPoint(p, this.grid.border, this.grid.size, this.level.cells);
        this.addChild(new EditorCellDialog(cell));
    },

    saveF: function (level) {
        return function () {
            LevelIO.save(level);
        };
    },

    loadF: function (dialog) {
        return function () {
            dialog.init(LevelIO.read(dialog.level.value));
        };
    },

    testF: function () {
        return function () {
            LevelIO.save(level);
        };
    }

});