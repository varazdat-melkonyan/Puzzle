const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let data;
let allData;
let moving = false;
let done = false;
let currentItem = [];
let secondItem = [];
let selectedItem;
let currentData;

let dragElement = { index: -1, startingPosition: -1, endPosition: -1 };
let positions = [];

let drag = { mouseDownPos: 0, start: 0, end: 0, ended: false };
let area = { x: 0 };
let coolDown = false;

const onPageLoad = async () => {
    json = await $.get('data/data.json');
    data = await $.get('data/data.json');
    allData = json.elements;
    data = data.elements;

    currentData = allData;
    for (let i = 0; i < currentData.length; i++) {
        shuffle(currentData[i]);
    }

    for (let j = 0; j < data[0].length; j++) {
        view.addPuzzle(j, currentData[0][j]);
    }

    moveMouse();
    
    loader.toggle();
}

function moveMouse() {
    addEvents();
    $(".move .items").mousedown(function (e) {});

    $(".movementDetector").mousemove(function (e) {
        if (drag.ended) {
            area.x = e.pageX - drag.start;
            $(".items").css("z-index", 0);
            $(selectedItem).css("z-index", `3`);
            $(selectedItem).each(function () {
                let left = parseFloat($(selectedItem).css("left"));
                $(selectedItem).css("left", left + area.x);
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
}

const mousedown = async (e, downElement) => {
    selectedItem = downElement;
    dragElement.index = parseFloat($(selectedItem).attr("id"));
    $(selectedItem).css("transition", `none`);

    $(".move .items").each(function (index) {
        if (index != dragElement.index) {
            $(selectedItem).css("pointer-events", "none");
        }
    });

    for (let i = 0; i < $(".items").length; i++) {
        let left = $(`#${i}`).css("left");
        left = parseFloat(left.substring(0, left.indexOf("px")));
        positions[i] = left;
    }

    let pos = $(selectedItem).css("left");
    pos = parseFloat(pos.substring(0, pos.indexOf("px")));
    dragElement.startingPosition = pos;

    if (!drag.ended && coolDown == false) {
        drag.mouseDownPos = e.pageX;
        drag.start = e.pageX;
        drag.ended = true;
    }
    $(".movementDetector").css("z-index", 10);
}

const mouseup = async (e, element) => {
    $(".current .items").css("pointer-events", "none");
    if (drag.ended) {
        drag.end = e.pageX;
        drag.ended = false;
    }

    let pos = $(element).css("left");
    pos = parseFloat(pos.substring(0, pos.indexOf("px")));
    dragElement.endPosition = pos;
    let index = await view.changePositions(dragElement, positions);
    let startingData                        = currentData[0][dragElement.index];
    let endingData                          = currentData[0][index];
    if (index > -1) {
        currentData[0][index]               = startingData;
        currentData[0][dragElement.index]   = endingData;
    }

    setTimeout(() => {
        $(".current .items").css("pointer-events", "all");
    }, 300);
}

const check = async () => {
    moving = true;
    view.flashCircle();
    if (data.length < 2) {
        done = true;
        view.end();
        $("#check").css("display", "none");
    }
    else {
        $("#check").attr("onclick", "").addClass("disable");
        if (currentData[0].length === data[0].length && currentData[0].every((val, index) => val === data[0][index])) {
            view.toggleFlash("green");
            await removeEvents();

            data.splice(0, 1);
            currentData.splice(0, 1);
            
            setTimeout(() => $(`.current .items`).remove(), 200);

            positions = [];
            for (let j = 0; j < data[0].length; j++) {
                view.editPuzzle(j, currentData[0][j]);
            }
        }
        else {
            view.toggleFlash("red");
            view.shake();
        }

        setTimeout(() => {
            addEvents();
            $("#check").attr("onclick", "check()").removeClass("disable");
            moving = false;
        }, 2000);
        setTimeout(() => $("#check").removeClass("disable"), 1000);
    }
}

const removeEvents = async () => {
    for (let i = 0; i < currentData[0].length; i++) {
        let obj = document.getElementById(i.toString());
        obj.removeEventListener("mousedown", mousedown);
    }
}

const addEvents = async () => {
    for (let i = 0; i < currentData[0].length; i++) {
        let obj = document.getElementById(i.toString());
        obj.addEventListener("mousedown", function(e) {
            mousedown(e, obj);
        })
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