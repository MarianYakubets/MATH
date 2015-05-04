var GameScene = cc.Scene.extend({
    space: null,
    gameLayer: null,
    level: null,

    ctor: function (level) {
        this._super();
        this.level = level

    },

    onEnter: function () {
        this._super();
        var label = new cc.LabelTTF("LABEL", "Arial");
        label.setPosition(DIM.width / 2, DIM.height * .95);
        label.setFontSize(20);
        label.setFontFillColor(cc.color(255, 255, 255));
        this.addChild(new BackgroundLayer(), 0);
        this.addChild(label, 10);
        this.addChild(new GameLayer(this.level, label), 1);

        var backItem = new cc.MenuItemFont("back", function () {
            cc.director.runScene(new cc.TransitionFade(1.2, new LevelScene()));
        });

        var menu = new cc.Menu(backItem);
        menu.setPosition(DIM.width / 2, 50);
        this.addChild(menu, 9);
    }
});