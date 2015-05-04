var LevelIO = cc.Class.extend({
    data: null,
    loadCallback: null,

    load: function (loadCallback) {
        this.loadCallback = loadCallback;

        var self = this;
        cc.loader.loadJson(res.GameState_json, function (error, data) {
            self.data = data;
            self.loadCallback();
        });
    },

    save: function (levels) {
        /*jsb.fileUtils.writeToFile
        jsb.fileUtils.writeStringToFile
        jsb.fileUtils.createDirectory
        jsb.fileUtils.isDirectoryExist*/
        //cc.sys.localStorage.getItem("Levels");
        //this.getDirectory("Levels");
        cc.sys.localStorage.setItem("Levels", JSON.stringify(levels));
        cc.sys.localStorage.getFilePath();
        //jsb.fileUtils.writeToFile(JSON.stringify(levels), "level1");
    },

    getDirectory: function (name) {
        if (!jsb.fileUtils.isDirectoryExist(name)) {
            jsb.fileUtils.createDirectory(name);
        }
    }
});