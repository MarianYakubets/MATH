var EditorScene = cc.Scene.extend({
    space: null,
    gameLayer: null,

    onEnter: function () {
        this._super();
        var label = new cc.LabelTTF("LABEL", "Arial");
        label.setPosition(DIM.width / 2, DIM.height * .6);
        label.setFontSize(20);
        label.setFontFillColor(cc.color(255, 255, 255));
        this.addChild(new BackgroundLayer(), 0);
        this.addChild(label);


        var save = new cc.MenuItemFont("save", function () {
            try {
                cc.sys.localStorage.setItem("test", Math.random());
            } catch (err) {
                label.setString(err);
            }
        });
        save.setFontSize(70);

        var read = new cc.MenuItemFont("read", function () {
            try {
                label.setString(cc.sys.localStorage.getItem("test"));
            } catch (err) {
                label.setString(err);
            }
        });

        var path = new cc.MenuItemFont("path", function () {
            try {
                label.setString(jsb.fileUtils.getSearchPaths());
                cc.path.mainFileName();
            } catch (err) {
                label.setString(err);
            }
        });

        var backItem = new cc.MenuItemFont("back", function () {
            cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
        });

        save.setFontSize(70);
        path.setFontSize(70);
        read.setFontSize(70);
        backItem.setFontSize(70);

        var menu = new cc.Menu(save, read, path, backItem);
        menu.setPosition(DIM.width / 2, 200);
        menu.alignItemsInColumns(3, 1);

        this.addChild(menu);
    }
});