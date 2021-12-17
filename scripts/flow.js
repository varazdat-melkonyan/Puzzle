const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let data;
let allData;
let moving = false;
let done = false;
let index = 1;
let left = [];
let center = [];
let right = [];
let currentItem = [];
let secondItem = [];
let currentIndex = 1;
let selectedItem;

let dragElement = { index: -1, startingPosition: -1, endPosition: -1 };
let positions = [];

let drag = { mouseDownPos: 0, start: 0, end: 0, ended: false };
let area = { x: 0 };
let coolDown = false;

const onPageLoad = async () => {
    json = await $.get('data/data.json');
    data = await $.get('data/data.json');
    data = data.elements;
    allData = json.elements;
    shuffle(allData[0])

    for (let i = 0; i < data.length; i++) {
        left.push(data[i].first);
        center.push(data[i].second);
        right.push(data[i].three);
    }
    for (let j = 0; j < Object.keys(allData[0]).length; j++) {
        view.addPuzzle(j, Object.values(allData[0])[j]);
    }

    $(".current .items").mousedown(function (e) {
        dragElement.index = $(this).index();
        selectedItem = this;
        $(this).css("transition", `none`);

        $(".current .items").each(function (index) {
            if (index != dragElement.index) {
                $(this).css("pointer-events", "none");
            }

            let left = $(this).css("margin-left");
            left = parseFloat(left.substring(0, left.indexOf("px")));
            positions[index] = left;
        });

        let pos = $(this).css("margin-left");
        pos = parseFloat(pos.substring(0, pos.indexOf("px")));
        dragElement.startingPosition = pos;

        if (!drag.ended && coolDown == false) {
            drag.mouseDownPos = e.pageX;
            drag.start = e.pageX;
            drag.ended = true;
        }
        $(".movementDetector").css("z-index", 10);
    });

    $(".movementDetector").mousemove(function (e) {
        if (drag.ended) {
            area.x = e.pageX - drag.start;
            $(selectedItem).css("z-index", `3`);
            $(selectedItem).each(function () {
                let left = parseFloat($(selectedItem).css("margin-left"));
                $(selectedItem).css("margin-left", left + area.x);
            });

            drag.start = e.pageX;
        }
    })

    $(".movementDetector").mouseup(function (e) {
        $(".current .items").css("transition", `0.5s`);
        $(".movementDetector").css("z-index", 0);
        $(".current .items").css("pointer-events", "all");
        mouseup(e, selectedItem);
    })

    loader.toggle();
}

const mouseup = (e, element) => {
    $(".current .items").css("pointer-events", "none");
    if (drag.ended) {
        drag.end = e.pageX;
        drag.ended = false;
    }

    let pos = $(element).css("margin-left");
    pos = parseFloat(pos.substring(0, pos.indexOf("px")));
    dragElement.endPosition = pos;
    dragElement.index = $(element).index();
    view.changePositions(dragElement, positions);
    setTimeout(() => {
        $(".current .items").css("pointer-events", "all");
    }, 300);
}

function check() {
    moving = true;
    view.flashCircle();
    if (data.length < 2) {
        done = true;
        view.end();
        $("#check").css("display", "none");
    }
    else {
        $("#check").attr("onclick", "");
        for (let i = 0; i < Object.values(data[0]).length; i++) {

            if ($(`.current .obj_${i} p`).text() == Object.values(data[0])[i]) {
                view.toggleFlash("green");
                currentIndex++;
                index++;
                data.splice(0, 1);
                for (let j = 0; j < Object.values(data[0]).length; j++) {
                    view.editPuzzle(j, Object.values(data[0])[j]);
                }
            }
            else {
                view.toggleFlash("red");
                view.shake();
            }
        }

        setTimeout(() => {
            $("#check").attr("onclick", "check()");
            moving = false;
        }, 2000);
    }
}

const shuffle = (array) => {
    let currentIndex = array.length, tempVal, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        tempVal = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempVal;
    }

    return array;
}

$(onPageLoad);