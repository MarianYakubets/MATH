var EditorScene = cc.Scene.extend({
    num: null,

    ctor: function (num) {
        this._super();
        this.num = num

    },

    onEnter: function () {
        this._super();
        this.addChild(new BackgroundLayer());
        this.addChild(new EditorDialog(new Level(this.num, GridUtils.buildGrid(6, 6))));
    }
});