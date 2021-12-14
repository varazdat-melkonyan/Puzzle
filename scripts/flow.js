const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let data;
let index = 1;
let left = [];
let center = [];
let right = [];
let currentItem = [];

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
    shuffle(currentItem);
    vview.addPuzzle(currentItem[0], currentItem[1], currentItem[2]);

    // $(".left" ).on('wheel', async function (e) { wheel(e), 0});
    // $(".center" ).on('wheel', async function (e) { wheel(e), 1});
    // $(".right" ).on('wheel', async function (e) { wheel(e), 2});
    loader.toggle();
}

function check() {
    // $(".overlay").attr("id", "green");

    vview.editPuzzle(index, currentItem[0], currentItem[0], currentItem[0])
    index++;
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
            await vview.scrollSign(dir);
            setTimeout(() => {
                scrolling = false;
            }, 700);
        }
    }
}

$(onPageLoad);