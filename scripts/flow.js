const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let data;
let index = 1;
let left = [];
let center = [];
let right = [];
let currentItem = [];
let secondItem = [];
let currentIndex = 0;

jQuery.event.special.wheel = {
    setup: function( _, ns, handle ) {
        this.addEventListener("wheel", handle, { passive: !ns.includes("noPreventDefault") });
    }
};

const onPageLoad = async () => {
    data = await $.get('data/data.json');
    data = data.elements;

    for(let i = 0; i < data.length; i++) {
        left.push(data[i].first);
        center.push(data[i].second);
        right.push(data[i].three);
    }
    currentItem.push(left[0], center[0], right[0]);
    secondItem.push(data[1].first, data[1].second, data[1].three);
    shuffle(secondItem);
    shuffle(currentItem);
    view.addPuzzle(currentItem[0], currentItem[1], currentItem[2], secondItem[0], secondItem[1], secondItem[2]);

    // $(".left" ).on('wheel', async function (e) { wheel(e), 0});
    // $(".center" ).on('wheel', async function (e) { wheel(e), 1});
    // $(".right" ).on('wheel', async function (e) { wheel(e), 2});
    loader.toggle();
}

function check() {
    view.flashCircle();
    $("#check").attr("onclick", "");
    if ($(".current .left p").text() == data[currentIndex].first && $(".current .center p").text() == data[currentIndex].second && $(".current .right p").text() == data[currentIndex].three) {        
        view.toggleFlash("green");
        currentItem = [data[index].first, data[index].second, data[index].three]
        shuffle(currentItem);
        view.editPuzzle(currentItem[0], currentItem[1], currentItem[2])
        index++;
        currentIndex++;
        view.deletePuzzle();
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

const wheel = async (e) => {
    if (!scrolling && !done) {
        let dir = Math.sign(e.originalEvent.wheelDelta);
        let newIndex = index - dir;

        if (newIndex >= 0 && newIndex <= 2)
        {
            scrolling = true;
            index -= dir;
            await view.scrollSign(dir);
            setTimeout(() => {
                scrolling = false;
            }, 700);
        }
    }
}

$(onPageLoad);