var Cell = cc.Class.extend({
    pos: null,
    value: "",
    type: Type.default,
    view: null,

    ctor: function (pos, value, type) {
        this.pos = pos;
        if (value) {
            this.value = value;
        }
        if (type) {
            this.type = type;
        }
    },

    setNum: function (num) {
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
