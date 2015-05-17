var GameScene = cc.Scene.extend({
    num: 0,

    ctor: function (num) {
        this._super();
        this.num = num;
    },

    onExit:function(){
        this._super();
        this.removeAllChildrenWithCleanup(true);
    },

    onEnter: function () {
        this._super();

        var label = new cc.LabelTTF("LABEL", "Arial");
        label.setPosition(DIM.width / 2, DIM.height * .85);
        label.setFontSize(20);
        label.setFontFillColor(cc.color(255, 255, 255));
        this.addChild(new BackgroundLayer(), 0);
        this.addChild(label, 10);
        var grid = new Grid();
        this.controller = new CellController(grid, LevelManager.getLevel(this.num), label);
        this.addChild(grid, 1);

        var backItem = new cc.MenuItemFont("back", function () {
            cc.director.runScene(new cc.TransitionFade(1.2, new LevelScene(new GameScene())));
        });

        var menu = new cc.Menu(backItem);
        menu.setPosition(DIM.width / 2, DIM.height - 50);

        this.addChild(menu, 9);
    }
});
