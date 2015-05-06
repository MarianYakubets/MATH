var EditorPanel = cc.Node.extend({
    dialog:null,
    ctor: function (dialog) {
        this._super();
        this.dialog = dialog;
        var back = this.createTextButton("back", function () {
            cc.director.runScene(new cc.TransitionFade(1.2, new LevelScene(new EditorScene())));
        });
        var save = this.createTextButton("save", dialog.save);
        var load = this.createTextButton("load", dialog.load);
        var test = this.createTextButton("test", dialog.test);

        var menu = new cc.Menu(save, load, test, back);
        menu.alignItemsInColumns(3, 1);
        menu.setPosition(DIM.width / 2, 200);

        this.addChild(menu);
    },

    createTextButton: function (name, callBack) {
        var item = new cc.MenuItemFont(name, callBack);
        item.setFontSize(70);
        return item;
    }
});