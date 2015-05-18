var EditorScene = cc.Scene.extend({
    num: 0,

    ctor: function (num) {
        this._super();
        this.num = num;
    },

    onEnter: function () {
        this._super();
        this.addChild(new BackgroundLayer());
        this.addChild(new EditorDialog(LevelManager.getLevel(this.num)));
    },
    onExit:function(){
        this._super();
        this.removeAllChildrenWithCleanup();
    }
});