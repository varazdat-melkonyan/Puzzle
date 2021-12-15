const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let data;
let allData;
let scrolling = false;
let done = false;
let index = 1;
let left = [];
let center = [];
let right = [];
let currentItem = [];
let secondItem = [];

const onPageLoad = async () => {
    json = await $.get('data/data.json');
    data = await $.get('data/data.json');
    data = data.elements;
    allData = json.elements;

    for(let i = 0; i < data.length; i++) {
        left.push(data[i].first);
        center.push(data[i].second);
        right.push(data[i].three);
    }
    currentItem.push(left[0], center[0], right[0]);
    // shuffle(secondItem);
    // shuffle(currentItem);
    view.addPuzzle(currentItem[0], currentItem[1], currentItem[2]);

    loader.toggle();
}

function check() {
    scrolling = true;
    view.flashCircle();
    if (data.length < 2) {
        done = true;
        view.end();
        $("#check").css("display", "none");
    }
    else {
        $("#check").attr("onclick", "");
        let currentIndex = 1;
        if ($(".current .left p").text() == data[0].first && $(".current .center p").text() == data[0].second && $(".current .right p").text() == data[0].three) {       
            view.toggleFlash("green");
            currentItem = [data[currentIndex].first, data[currentIndex].second, data[currentIndex].three]
            // shuffle(currentItem);
            view.editPuzzle(currentItem[0], currentItem[1], currentItem[2]);
            index++;
            currentIndex++;
            data.splice(0, 1);
            
        }
        else {
            view.toggleFlash("red");
            view.shake();
        }
        setTimeout(() => {
            $("#check").attr("onclick", "check()");
            scrolling = false;
        }, 1000);
    }
}

const shuffle = (array) => {
	let currentIndex = array.length, tempVal, randomIndex;

	while (0 !== currentIndex)
	{
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		tempVal = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = tempVal;
	}

	return array;
}

let drag = { mouseDownPos: 0, start: 0, end: 0, ended: false };
let area = { x: 0 };
let inMotion = false;
let coolDown = false;

$(".overlay").mousedown(function (e) {
    if (!drag.ended && coolDown == false) {
        drag.mouseDownPos = e.pageX;
        drag.start = e.pageX;
        drag.ended = true;
    }
})

$(".overlay").mousemove(function (e, i) {
    if (drag.ended) {        
        area.x = e.pageX - drag.start;
        $(`.${i}`).css("transition", `none`);

        $(`.${i}`).each(function(i) {
            let left = parseFloat($(this).css("left"));
            $(this).css("left", left + area.x);
        });

        drag.start = e.pageX;
        $(`.${i}`).css("transition", `0.5s`);
    }
    if (e.pageX <= 105 || e.pageX >= window.innerWidth - 815) {
        mouseup(e);
    }
    // if(($(`#-1`).css("margin-left") < "-1800px" || $(`#${set.data.length}`).css("margin-left") < "1800")) {
    //     mouseup(e);
    // }
})

$(".overlay").mouseup(function (e) {
    mouseup(e);
})

const mouseup = (e) => {
    if (drag.ended) {
        drag.end = e.pageX;
        drag.ended = false;

    }
}
$(onPageLoad);