var LevelIO = {

    read: function (num) {
        //var data = cc.sys.localStorage.getItem("level_" + num);
        var data = null;
        if (data == null || data.length < 5) {
            data = this.getFile(num);
            if (data == null) {
                return new Level(num, GridUtils.buildGrid(2, 2));
            } else {
                return this.createLevelFromSavedData(data);
            }
        }
        return this.createLevelFromSavedData(JSON.parse(data));
    },

    getFile: function (num) {
        try {
            var data = null;
            var wait = true;
            cc.loader.load(levels[num], function (err, results) {
                data = results[0];
                wait = false;
            });
            while (wait) {
            }
            return data;

        } catch (err) {
            return null;
        }
    },

    createLevelFromSavedData: function (data) {
        var cells = [];
        var newCell;
        var newRow;
        data.cells.forEach(function (row) {
            newRow = [];
            row.forEach(function (cell) {
                newCell = new Cell(cell.pos, cell.value, cell.type);
                newRow.push(newCell);
            });
            cells.push(newRow);
        });
        return new Level(data.num, cells);
    },

    save: function (level) {
        var result = JSON.stringify(level, function (key, value) {
            if (key == 'view') {
                return null;
            }
            return value;
        });
        cc.sys.localStorage.setItem("level_" + level.num, result);
        cc.log(result);
    }
};