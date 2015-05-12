var EditorCellDialog = cc.Layer.extend({
    cell: null,
    nums: [],
    grid: null,
    field: null,

    ctor: function (cell) {
        this._super();
        this.init(cell);
    },

    init: function (cell) {
        this.cell = cell;

        this.addChild(new BackgroundLayer());
        var label = new cc.LabelTTF("OLD: " + cell.value, "Arial");
        label.setPosition(DIM.width / 2, DIM.height * .95);
        label.setFontSize(40);
        label.setFontFillColor(cc.color(255, 255, 255));

        this.field = new cc.LabelTTF("" + cell.value, "Arial");
        this.field.setPosition(DIM.width / 2, DIM.height * .8);
        this.field.setFontSize(60);
        this.field.setFontFillColor(cc.color(255, 255, 255));
        this.addChild(this.field, 20);

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
            figures.push(this.createTextButton("" + i, this.addChar(this.field, "" + i)));
        }
        for (i = 0; i < symbols.length; i++) {
            figures.push(this.createTextButton(symbols[i], this.addChar(this.field, symbols[i])));
        }

        figures.push(this.createTextButton("D", this.setCellType(this, Type.default)));
        figures.push(this.createTextButton("P", this.setCellType(this, Type.pined)));
        figures.push(this.createTextButton("E", this.setCellType(this, Type.end)));
        figures.push(this.createTextButton("G", this.setCellType(this, Type.gate)));
        figures.push(this.createTextButton("B", this.setCellType(this, Type.blocked)));
        figures.push(this.createTextButton("S", this.setCellType(this, Type.start)));

        var menu = new cc.Menu(figures);
        menu.alignItemsInColumns(4, 4, 4, 4, 6);
        menu.setPosition(DIM.center);
        this.addChild(menu);
    },

    addChar: function (field, char) {
        return function () {
            var str = field.getString();
            if (char == "<<<" && str.length > 0) {
                str = str.substring(0, str.length - 1);
            } else {
                str += char;
            }
            field.setString(str);
        }
    },

    addButtons: function () {
        var back = this.createTextButton("back", this.goBack(this));
        var save = this.createTextButton("save", this.save(this));
        var menu = new cc.Menu(save, back);
        menu.alignItemsInColumns(2);
        menu.setPosition(DIM.width / 2, 200);

        this.addChild(menu);
    },

    save: function (parent) {
        return function () {
            parent.cell.setNum(parent.field.getString());
            parent.goBack(parent)();
        }
    },

    setCellType: function (parent, type) {
        return function () {
            parent.cell.setType(type);
        }
    },

    goBack: function (parent) {
        return function () {
            parent.visible = false;
        }
    },

    createTextButton: function (name, callBack) {
        var item = new cc.MenuItemFont(name, callBack);
        item.setFontSize(70);
        return item;
    }
});
