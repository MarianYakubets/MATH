var Box = cc.Node.extend({
    size: null,
    label: null,
    pic: null,

    ctor: function (figure, size) {
        this._super();
        this.size = size;
        this.pic = new cc.Sprite(res.White_jpg);

        this.pic.setScale(size.y / this.pic.height);

        this.addChild(this.pic);
        this.label = new cc.LabelTTF(figure, "Arial");
        this.label.setFontSize(50);
        this.label.setFontFillColor(cc.color(187, 0, 83));

        this.addChild(this.label);
    },

    select: function () {
        this.pic.setColor(cc.color(197, 202, 233));
    },

    deselect: function () {
        this.pic.setColor(cc.color(255, 255, 255));
    },

    setNum: function (num) {
        this.label.setString(num);
        this.label.setFontFillColor(cc.color(63, 81, 181));
    }
});