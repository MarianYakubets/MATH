var GameLayer = cc.Layer.extend({
    controller: null,
    ctor: function (level, label) {
        this._super();
        this.init();
        var grid = new Grid();
        this.controller = new CellController(grid, level, label);
        this.addChild(grid);
    },

    init: function () {
        this._super();
    }
});
