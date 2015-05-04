var LevelScene = cc.Scene.extend({

    onEnter: function () {
        this._super();
        this.addChild(new BackgroundLayer());
        var levels = [];
        for (var i = 1; i <= 20; i++) {
            var levelItem = new cc.MenuItemFont(i.toString(), function (text) {
                var level = LevelManager.getLevel(text.getLabel()._originalText)
                cc.director.runScene(new cc.TransitionFade(1.2, new GameScene(level)));
            }, this);
            levelItem.setFontSize(100);
            levels.push(levelItem)
        }
        var backItem = new cc.MenuItemFont("back", function () {
            cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
        });
        levels.push(backItem);
        var menu = new cc.Menu(levels);
        menu.alignItemsInColumns(5, 5, 5, 5, 1);
        this.addChild(menu);

    }
});
