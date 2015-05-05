var EditorPanel = cc.Node.extend({
    ctor:function(){
        this._super();
        var back = this.createTextButton("back", function () {
            cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
        });
        var save = this.createTextButton("save", function () {
            cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
        });
        var load = this.createTextButton("load", function () {
            cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
        });
        var test = this.createTextButton("test", function () {
            cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
        });

        var menu = new cc.Menu(save, load, test, back);
        menu.alignItemsInColumns(3, 1);
        menu.setPosition(DIM.width / 2, 200);

        this.addChild(menu);
    },

    createTextButton:function(name, callBack){
        var item = new cc.MenuItemFont(name, callBack);
        item.setFontSize(70);
        return item;
    }
});