if (typeof TypeOfCell == "undefined") {
    var TypeOfCell = {};
    TypeOfCell.default = 0;
    TypeOfCell.pined = 1;
    TypeOfCell.start = 2;
    TypeOfCell.end = 3;
    TypeOfCell.middle = 4;
    TypeOfCell.none = 5;
}

var Type = Object.freeze({
    default: 0,
    pined: 1,
    start: 2,
    end: 3,
    middle: 4,
    remains: 5,
    none: 6
});

var expression = Object.freeze({
    plus: "+",
    minus: "-",
    multiply: "*",
    divide: "/"
});

