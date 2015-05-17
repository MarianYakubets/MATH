var FinishScene = cc.Scene.extend({
    result: 0,

    ctor: function (result) {
        this._super();
        this.result = result;
    },

    onEnter: function () {
        this._super();
        this.addChild(new BackgroundLayer());
        this.addResults();
        this.addButtons();
    },

    addResults: function () {
        var label = new cc.LabelTTF("RESULT:\n", "Arial");
        label.setPosition(DIM.width / 2, DIM.height * .66);
        label.setFontSize(80);
        label.setFontFillColor(cc.color(255, 200, 200));
        this.addChild(label);

        label.setString("END of Level: " + this.result.num + "\n\nMoves: " + this.result.moves);
    },

    addButtons: function () {
        var restart = this.createTextButton("restart", this.startLevel(this.result.num));
        var next = this.createTextButton("next", this.startLevel(1 + this.result.num));
        var menu = this.createTextButton("menu", this.menu);

        var buttons = new cc.Menu(restart, next, menu);
        buttons.alignItemsHorizontallyWithPadding(30);
        buttons.setPosition(DIM.width / 2, 250);

        this.addChild(buttons);
    },

    startLevel: function (num) {
        return function () {
            cc.director.runScene(new cc.TransitionFade(1.2, new GameScene(num)));
        }
    },

    menu: function () {
        cc.director.runScene(new cc.TransitionFade(1.2, new MainScene()));
    },

    createTextButton: function (name, callBack) {
        var item = new cc.MenuItemFont(name, callBack);
        item.setFontSize(60);
        return item;
    }
});
