if (typeof TypeOfCell == "undefined") {
    var TypeOfCell = {};
    TypeOfCell.default = 0;
    TypeOfCell.pined = 1;
    TypeOfCell.start = 2;
    TypeOfCell.end = 3;
    TypeOfCell.block = 4;
    TypeOfCell.none = 5;
}

var Type = Object.freeze({
    default: 0,
    pined: 1,
    start: 2,
    end: 3,
    blocked: 4,
    gate: 5
});

var expression = Object.freeze({
    plus: "+",
    minus: "-",
    multiply: "*",
    divide: "/"
});

