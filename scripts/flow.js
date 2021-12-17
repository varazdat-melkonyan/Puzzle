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
let currentIndex = 1;
let selectItem;
let currentLeftPos;
let currentRigthPos;
let currentCenterPos;

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
    for(let j = 0; j < Object.keys(allData[0]).length; j++) {
        view.addPuzzle(j, Object.values(allData[0])[j]);
    }

    let drag = { mouseDownPos: 0, start: 0, end: 0, ended: false };
    let area = { x: 0 };
    let coolDown = false;
    
    $(".move .items").mousedown(function (e) {
        if (!drag.ended && coolDown == false) {
            drag.mouseDownPos = e.pageX;
            drag.start = e.pageX;
            drag.ended = true;
        }
    })
    
    $(".move .items").mousemove(function (e) {
        selectItem = this;
        if (drag.ended) {
            area.x = e.pageX - drag.start;
            $(this).css("transition", `none`);
            $(this).css("z-index", `3`)
            $(this).each(function() {
                let left = parseFloat($(this).css("margin-left"));
                $(this).css("margin-left", left + area.x);
            });
    
            drag.start = e.pageX;
            $(this).css("transition", `0.5s`);
        }
    })
    
    $(".move .items").mouseup(function (e) {
        if (drag.ended) {
            drag.end = e.pageX;
            drag.ended = false;
        }
        view.reverseMove(selectItem);
    })

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
        for(let i = 0; i < Object.values(data[0]).length; i++) {
            if ($(`.current .obj_${i} p`).text() == Object.values(data[0])[i]) {       
                view.toggleFlash("green");
                currentIndex++;
                index++;
                data.splice(0, 1);
                for(let j = 0; j < Object.values(data[0]).length; j++) {
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
            scrolling = false;
        }, 2000);
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

$(onPageLoad);