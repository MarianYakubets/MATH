var EditorCellDialog = cc.Layer.extend({
    cell: null,
    nums: [],
    grid: null,
    newValue: null,

    ctor: function (cell) {
        this._super();
        this.init(cell);
    },

    init: function (cell) {
        this.cell = cell;

        this.addChild(new BackgroundLayer());
        var label = new cc.LabelTTF("OLD: " + cell.num, "Arial");
        label.setPosition(DIM.width / 2, DIM.height * .95);
        label.setFontSize(40);
        label.setFontFillColor(cc.color(255, 255, 255));
        //this.addChild(label);

        this.newValue = new cc.LabelTTF("" + cell.num, "Arial");
        this.newValue.setPosition(DIM.width / 2, DIM.height * .8);
        this.newValue.setFontSize(60);
        this.newValue.setFontFillColor(cc.color(255, 255, 255));
        this.addChild(this.newValue, 20);

        this.grid = new Grid();
        this.addChild(this.grid);
        this.addNums();
        this.addButtons();
    },

    addNums: function () {
        var symbols = [".", "+", "-", "*", "/", "<<<"];
        this.nums = GridUtils.buildGrid(4, 4);
        var figures = [];
        for (var i = 0; i < 10; i++) {
            figures.push(this.createTextButton("" + i, function(){

            }));
        }
        for (var i = 0; i < symbols.length; i++) {
            figures.push(this.createTextButton(symbols[i], this.addChar(symbols[i])));
        }

        var menu = new cc.Menu(figures);
        menu.alignItemsInColumns(4, 4, 4, 4);
        menu.setPosition(DIM.center);
        this.addChild(menu);
    },

    addChar: function (char) {
        if (char == "<<<") {

        } else {
            this.newValue.setString(this.newValue.getString() + char);
        }
    },

    addButtons: function () {
        var back = this.createTextButton("back", this.goBack());
        var save = this.createTextButton("save", this.save());
        var menu = new cc.Menu(save, back);
        menu.alignItemsInColumns(2);
        menu.setPosition(DIM.width / 2, 200);

        this.addChild(menu);
    },

    save: function () {
        this.cell.num = this.newValue.getString();
        this.goBack();
    },

    goBack: function () {
        // this.visible = false;
    },

    createTextButton: function (name, callBack) {
        var item = new cc.MenuItemFont(name, callBack);
        item.setFontSize(70);
        return item;
    }
});
