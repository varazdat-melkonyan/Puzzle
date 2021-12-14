const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let data;
let dupValues = [];
let values = [];
let keepValue = false;
let scrolling = false;
let done = false;
let originalData = [];
let href = window.location.href;
let index = 1;
let currentWord = [];

jQuery.event.special.wheel = {
    setup: function( _, ns, handle ) {
        this.addEventListener("wheel", handle, { passive: !ns.includes("noPreventDefault") });
    }
};

const onPageLoad = async () => {
    data = await $.get('data/data.json');
    data = data.elements;

    for(let i = 0; i < data.length - 1; i++) {
            dupValues.push(data[i].value);
        }

    for (let i = 0; i < dupValues.length; i++) dupValues[i] = {value: dupValues[i]};

    for (let i =  0; i < data.length; i++) {
        values.push({value: data[i].value});
    }

    let rand = Math.floor(Math.random() * dupValues.length);
    currentWord.push(rand,rand);

    originalData = JSON.parse(JSON.stringify(data));

    addWords(".left", currentWord[0], 0);
    addWords(".center",currentWord[1],1);
    addWords(".right", currentWord[2], 2);

    $(".signs" ).on('wheel', async function (e) { wheel(e) });
    loader.toggle();
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