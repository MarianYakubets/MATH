var LevelIO = {
    read: function (num) {
        var data = cc.sys.localStorage.getItem("level_" + num);
        if (data == null || data.length < 5) {
            return new Level(num, GridUtils.buildGrid(5, 6));
        }
        return JSON.parse(data);
    },

    save: function (level) {
        cc.sys.localStorage.setItem("level_" + level.value, JSON.stringify(level, function (key, value) {
            if (key == 'view') {
                return null;
            }
            return value;
        }));
    }
};