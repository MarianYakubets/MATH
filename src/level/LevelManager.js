var LevelManager = {
    getLevel: function (num) {
        return LevelIO.read(num);
    },

    saveLevel: function (level) {
        LevelIO.save(level);
    }
};