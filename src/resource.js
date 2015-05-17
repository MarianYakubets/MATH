var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    White_jpg : "res/white1.jpg",
    Square_png : "res/square.png",
    CloseSelected_png : "res/CloseSelected.png"
};
var levels = {
    1 : "res/levels/1.json"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
for (var i in levels) {
    g_resources.push(levels[i]);
}