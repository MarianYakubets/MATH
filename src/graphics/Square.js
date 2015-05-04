var Square = cc.DrawNode.extend({
    size: null,
    label: null,
    mask: null,

    ctor: function (figure, size) {
        this._super();
        this.size = size;
        this.mask = new cc.DrawNode();

        var low = cc.p(size.x / (-2), size.y / (-2));
        var up = cc.p(size.x / (2), size.y / (2));
        this.drawRect(low, up, cc.color(251, 225, 234), 4, cc.color(241, 132, 171));
        this.label = new cc.LabelTTF(figure, "Arial");
        this.label.setFontSize(50);
        this.label.setFontFillColor(cc.color(187, 0, 83));

        this.addChild(this.label);
    },

    select: function () {
        this.mask.clear();
        var low = cc.p(this.size.x / (-2), this.size.y / (-2));
        var up = cc.p(this.size.x / (2), this.size.y / (2));
        this.mask.drawRect(low, up, cc.color(0, 0, 255, 64), 0, cc.color(255, 255, 255, 64));
        this.addChild(this.mask);
    },

    deselect: function () {
        this.removeChild(this.mask);
    },

    setNum: function (num) {
        this.label.setString(num);
        this.label.setFontFillColor(cc.color(63, 81, 181));
    }
});