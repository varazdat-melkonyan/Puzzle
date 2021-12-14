let set = {index: 0};
let textSet = [];
let valueSet = [];
let scrolling = [false, false];
let done = false;
let currentWord = [0, 0];
let keepValue = false;
let dupValues = [];

const onLoad = async () => {
    $.get('data/data.json', function (data) { 
        set.elements = data.elements;

        for (let i = 0; i < set.elements.length; i++)
        {
            textSet.push(shuffle(set.elements[i].text));
            valueSet.push(shuffle(set.elements[i].value));

        }
        view.createWord(0, textSet[0], "top", "divOne");
        view.createWord(1, textSet[1], "center", "divOne");
        view.createWord(2, textSet[2], "bottom", "divOne");
    
        view.createWord(0, valueSet[0], "top", "divTwo");
        view.createWord(1, valueSet[1], "center", "divTwo");
        view.createWord(2, valueSet[2], "bottom", "divTwo");
    
        $("#divOne" ).on('wheel', async function (e) { wheel(e, $("#divOne"), 0) });
        $("#divTwo").on('wheel', async function (e) { wheel(e, $("#divTwo"), 1) });
    });
};

const wheel = async (e, obj, i) => {
    if (!scrolling[i] && !done) {
        let dir = Math.sign(e.originalEvent.wheelDelta);
        let two = keepValue && i == 1 ? dupValues.length < 3 : set.data.left.length < 3;
        if (two) {
            if($(obj).find(".top").length == 0 && dir == -1) {
                return;
            } else if ($(obj).find(".bottom").length == 0 && dir == 1) {
                return;
            }
        }

        currentWord[i] += dir;
        set.index += dir;
        scrolling[i] = true;
        await view.scrollToWord(1,obj);
        
        setTimeout(() => scrolling[i] = false, 500)
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

function checkStatus() {
    $(`#divOne #${set.index + 1}`).animate({"left": -200}, 32);
    $("#divTwo #1").animate({"right": -200}, 32);

    setTimeout(() => {
        view.removeWord(1);
        $("#divTwo #1").remove();
        $(`#divOne #${set.index}`).animate({"top": 60}, 32);
        $("#divTwo #0").animate({"top": 60}, 32);
    }, 333);

}

const getWord = (newIndex, type) => {
    let length  = (type == 1 && keepValue) ? dupValues.length : set.data.left.length;
    if (type == 1 && !keepValue) length = values.length;
    newIndex    %= length;
    
    if (newIndex < 0) {
        newIndex = length + newIndex;
    }
    else if (newIndex > length) {
        newIndex = 0;
    }

    if (type == 1 && !keepValue)
        return values[newIndex];
    return (type == 1 && keepValue) ? dupValues[newIndex] : set.data.left[newIndex];
}

$(onLoad);
