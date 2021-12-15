const view = {
    correct: 0,
    row: `<div class="row"></div>`,
    addPuzzle: async (firstText, secondText, threeText) => {
        $(".top .left").append(`<p></p>`);
        $(".top .center").append(`<p></p>`);
        $(".top .right").append(`<p></p>`);
        $(".current .left").append(`<p>${firstText}</p>`);
        $(".current .center").append(`<p>${secondText}</p>`);
        $(".current .right").append(`<p>${threeText}</p>`);
    },
    editPuzzle: (firstText, secondText, threeText) => {
        $(".top").css("opacity", "1");
        // $(".overlay .top").removeClass("top").addClass("current");
        // $(".overlay .current").removeClass("current").addClass("top");
        $(".top .left p").text(firstText);
        $(".top .center p").text(secondText);
        $(".top .right p").text(threeText);
    },
    flashCircle: async() => {
        $(".circle").css("opacity", 0);
        await timeout(300);
        $(".circle").css("opacity", 1);
    },
    toggleFlash: async(color) => {
		$(`#${color}`).css("opacity", 1);
		await timeout(500);
		$(`#${color}`).css("opacity", 0);
	},
    deletePuzzle: () =>{
        $(".current").addClass("goLeft");
    },
    shake: async () => {
        $(".current").addClass("shake");
        await timeout(820);
        $(".current").removeClass("shake");
    },
    end: async () => {
        await timeout(200);
        let classes = [".left", ".center", ".right"];

        for (let i = 0; i < classes.length; i++) {
            $(classes[i]).addClass("closed");
            $(".signs").css("display", "none");
            $(".signsOverlay").css("display", "none");
        }

        await timeout(1000);
        $(".outcome").show();
        $(".outcome").addClass("showOutcome");
        $(".outcomeOverlay").addClass("showOutcome");
        $(".outcomeOverlay").show();

        let rowCount = Math.ceil(originalData.length / 3);
        let itemCount = 0;

        for (let i = 0; i < rowCount; i++) {
            $(".outcome").append(view.row);
            await timeout(20);
            
            for (let j = 0; j < 3; j++) {
                view.createItem($(".row").eq(i), originalData[itemCount].text, originalData[itemCount].value);
                itemCount++;

                if (itemCount == originalData.length) {
                    view.fitText(".textHolder", 0, 0);
                    view.fitText(".valueHolder", 0, 0);
                    break;
                }
            }

            view.fitText(".textHolder", 0, 0);
            view.fitText(".valueHolder", 0, 0);

            await timeout(200);
        }

        $(".outcome").css("overflow", "auto");
    },
    createItem: async (parent, text, value) => {
        let item = `<div class="item">
                        <div class="textHolder">
                            <p>${text}</p>
                        </div>
                        <div class="bar"></div>
                        <div class="valueHolder">
                            <p>${value}</p>
                        </div>
                    </div>`;

        $(parent).append(item);
    },
}