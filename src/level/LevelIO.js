var LevelIO = {

    read: function (num) {
        var data = cc.sys.localStorage.getItem("level_" + num);
        if (data == null || data.length < 5) {
            return new Level(num, GridUtils.buildGrid(5, 6));
        }
        return this.createLevelFromSavedData(JSON.parse(data));
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
        cc.sys.localStorage.setItem("level_" + level.num, JSON.stringify(level, function (key, value) {
            if (key == 'view') {
                return null;
            }
            return value;
        }));
    }
};