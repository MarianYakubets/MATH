var BackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();

        var layer = new cc.LayerColor(cc.color(2, 120, 120));

        layer.ignoreAnchor = false;
        layer.anchorX = 0.5;
        layer.anchorY = 0.5;
        layer.x = DIM.center.x;
        layer.y = DIM.center.y;

        this.addChild(layer);
    },

    actionRotate: function () {
        return cc.rotateBy(1.0, 90.0).repeatForever();
    },

    actionScale: function () {
        var scale = cc.scaleBy(1.33, 1.5);
        return cc.sequence(scale, scale.reverse()).repeatForever();
    }
});
