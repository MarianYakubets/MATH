var MainScene = cc.Scene.extend({

    onEnter: function () {
        this._super();
        this.addChild(new BackgroundLayer());
        var gameItem = new cc.MenuItemFont("GAME", function () {
            cc.director.runScene(new cc.TransitionFade(1.2, new LevelScene(new GameScene)));
        }, this);
        gameItem.setFontSize(100);

        var editItem = new cc.MenuItemFont("EDIT", function () {
            cc.director.runScene(new cc.TransitionFade(1.2, new LevelScene(new EditorScene())));
        }, this);
        editItem.setFontSize(100);

        var exitItem = new cc.MenuItemFont("EXIT", function () {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                cc.director.end();
            }
        }, this);
        exitItem.setFontSize(100);

        var menu = new cc.Menu(gameItem, editItem, exitItem);
        menu.alignItemsVerticallyWithPadding(100);
        this.addChild(menu);

    }
});