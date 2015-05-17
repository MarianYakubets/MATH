var Result = cc.Class.extend({
    num: 0,
    moves: 0,
    closedGates: 0,

    ctor: function (num, closedGates) {
        this.num = num;
        this.closedGates = closedGates;
    },

    openGate: function () {
        this.closedGates--;
        return this.closedGates == 0;
    }

});
