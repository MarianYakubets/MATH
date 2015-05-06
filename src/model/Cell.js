var Cell = cc.Class.extend({
    pos: null,
    value: 0,
    type: Type.default,
    view: null,

    ctor: function (pos, type, num) {
        this.pos = pos;
        this.type = type;
        this.value = num;
    },

    setNum: function (num) {
        if (num >= 0) {
            num = "+" + num;
        }
        this.value = num;
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
