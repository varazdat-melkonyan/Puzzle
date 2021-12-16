const view = {
    correct: 0,
    row: `<div class="row"></div>`,
    addPuzzle: async (i, text) => {
        $(`.top`).append(`<div class="obj_${i} items"><p></p></div>`);
        $(`.current`).append(`<div class="obj_${i} items"><p>${text}</p></div>`);
        $(`.obj_${i}`).css("margin-left", 200 * i);
    },
    editPuzzle: (i, text) => {
        
        $(".current").addClass("goLeft").css("opacity", 0);
        setTimeout(() => { 
            $(".current").removeClass("goLeft");
            $("#1").removeClass("current").addClass("top");
            $(".top").css("opacity", 0);
            $("#1 .top").css("top", "-150px");
            $("#0").removeClass("top").addClass("current");
            $(".current").css("opacity", 1);
            $(".current").attr("id", "1");
            $(".top").attr("id", "0");
        }, 1000);
        $(`#0 .obj_${i} p`).text(text);
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
    shake: async () => {
        $(".current").addClass("shake");
        await timeout(820);
        $(".current").removeClass("shake");
    },
    reverseMove: async () => {
        if ($(`.current .obj_0`).css("left") > "140px" && $(`.current .obj_0`).css("left") < "300px") {
            $(`.current .obj_0`).css("left", "220px");
            $(`.current .obj_1`).css("left", "5px");
        }
        else {
            $(`.current .obj_0`).css("left", "5px");
            if($(`.current .obj_1`).css("left") == "5px") {
                if ($(`.current .obj_0`).css("left") < "80px") {
                    $(`.current .obj_1`).css("left", "220px");
                    $(`.current .obj_0`).css("left", "5px");
                }
            }
        }
        if ($(`.current .obj_0`).css("left") > "380px") {
            $(`.current .obj_0`).css("left", "445px");
            $(`.current .obj_2`).css("left", "5px");
        }
    },
    end: async () => {
        await timeout(200);
        let classes = [".left", ".center", ".right", ".overlay", ".hoverable"];

        for (let i = 0; i < classes.length; i++) {
            $(classes[i]).addClass("closed");
        }

        await timeout(1000);
        $(".outcome").show();
        $(".outcome").addClass("showOutcome");
        $(".outcomeOverlay").addClass("showOutcome");
        $(".outcomeOverlay").show();

        let rowCount = Math.ceil(allData.length / 3);
        let itemCount = 0;

        for (let i = 0; i < rowCount; i++) {
            $(".outcome").append(view.row);
            await timeout(20);
            
            for (let j = 0; j < 3; j++) {
                view.createItem($(".row").eq(i), allData[itemCount].first, allData[itemCount].second, allData[itemCount].three);
                itemCount++;
            }

            await timeout(200);
        }

        $(".outcome").css("overflow", "auto");
    },
    createItem: async (parent, leftText, centerText, rightText) => {
        let item = `<div class="item">
                        <div class="leftTextHolder">
                            <p>${leftText}</p>
                        </div>
                        <div class="bar"></div>
                        <div class="centerTextHolder">
                            <p>${centerText}</p>
                        </div>
                        <div class="bar"></div>
                        <div class="rightTextHolder">
                            <p>${rightText}</p>
                        </div>
                    </div>`;

        $(parent).append(item);
    },
}