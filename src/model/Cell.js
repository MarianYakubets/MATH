var Cell = cc.Class.extend({
    pos: null,
    num: 0,
    type: Type.default,
    square: null,

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
        this.square.setNum(num);
    },

    select: function () {
        if (this.square != null) {
            this.square.select();
        }
    },

    deselect: function () {
        if (this.square != null) {
            this.square.deselect();
        }
    }

});
