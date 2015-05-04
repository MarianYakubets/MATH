var LevelManager = {

    getLevel: function (num) {
        var level;
       /* try {
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                level = this.readLevel(num);
            } else {
                level = this.createStub();
            }
        } catch (err) {*/
            level = this.createStub();
        //}
        level.num = num;
        return level;
    },

    getDefaultLevel: function () {

    },

    saveLevel: function (level) {
        var io = new LevelIO();
        io.save(level)
    },

    readLevel: function (num) {

    },

    createStub: function () {
        var columns = 5;
        var rows = 6;
        var row;
        var symb = "+";
        var cells = [];

        var keys = Object.keys(expression);
        for (var i = 0; i < rows; i++) {
            row = [];
            for (var j = 0; j < columns; j++) {
                if (i == j) {
                    symb = "-";
                } else {
                    symb = "+";
                }
                row.push(new Cell(cc.p(i, j), Type.default,
                    symb + Math.round(Math.random() * 10)));
            }
            cells.push(row);
        }
        return new Level(0, cells);
    }

};