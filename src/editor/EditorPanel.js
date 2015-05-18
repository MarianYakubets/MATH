var EditorPanel = cc.Node.extend({
    dialog: null,
    ctor: function (dialog) {
        this._super();
        this.dialog = dialog;
        var back = this.createTextButton("back", function () {
            cc.director.runScene(new cc.TransitionFade(1.2, new LevelScene(new EditorScene())));
        });
        var save = this.createTextButton("save", dialog.save(dialog));
        var load = this.createTextButton("load", dialog.load(dialog));
        var test = this.createTextButton("test", dialog.test(dialog));

        var rp = this.createTextButton("R+", dialog.rp(dialog));
        var rm = this.createTextButton("R-", dialog.rm(dialog));
        var cp = this.createTextButton("C+", dialog.cp(dialog));
        var cm = this.createTextButton("C-", dialog.cm(dialog));

        var menu = new cc.Menu(rp, rm, cp, cm, save, load, test, back);
        menu.alignItemsInColumns(4, 4);
        menu.setPosition(DIM.width / 2, DIM.height - 100);

        this.addChild(menu);
    },

    createTextButton: function (name, callBack) {
        var item = new cc.MenuItemFont(name, callBack);
        item.setFontSize(70);
        return item;
    }
});