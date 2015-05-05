var Cell = cc.Class.extend({
    pos: null,
    num: 0,
    type: Type.default,
    view: null,

    ctor: function (pos, type, num) {
        this.pos = pos;
        this.type = type;
        this.num = num;
    },

    setNum: function (num) {
        if (num >= 0) {
            num = "+" + num;
        }
        this.num = num;
        this.view.setNum(num);
    },

    select: function () {
        if (this.view != null) {
            this.view.select();
        }
    },

    deselect: function () {
        if (this.view != null) {
            this.view.deselect();
        }
    }

});
