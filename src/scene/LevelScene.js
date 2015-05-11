var LevelScene = cc.Scene.extend({
    sceneName: "Level",

    ctor: function (sceneName) {
        this._super();
        this.sceneName = sceneName;
    },

    onEnter: function () {
        this._super();
        this.addChild(new BackgroundLayer());

        var levels = [];
        for (var i = 1; i <= 20; i++) {
            var levelItem = new cc.MenuItemFont(i.toString(), this.onItemClick(this.sceneName, i));
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

    },

    onItemClick: function (name, i) {
        return function () {
            var scene = eval("new " + name + "Scene(" + i + ");");
            cc.director.runScene(new cc.TransitionFade(1.2, scene));
        }
    }
});
