var GameLayer = cc.Layer.extend({
    controller: null,
    ctor: function (level, label) {
        this._super();
        this.init();
        var cellCanvas = new cc.Node();

        this.controller = new CellController(cellCanvas, level, label);
        cellCanvas.setPosition(DIM.center);
        this.addChild(cellCanvas);
    },

    init: function () {
        this._super();
        //this.scheduleUpdate();
    },

    update: function (dt) {

    }

});
