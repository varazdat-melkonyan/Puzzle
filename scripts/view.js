const view = {
    correct: 0,
    row: `<div class="row"></div>`,
    safeZone: 110,
    addPuzzle: async (i, text) => {
        $(`.top`).append(`<div class="obj_${i} items"><p></p></div>`);
        $(`.current`).append(`<div class="obj_${i} items"><p>${text}</p></div>`);
        $(`.obj_${i}`).css("margin-left", 200 * i);
        currentLeftPos = $(`.obj_0`).css("margin-left");
        currentCenterPos = $(`.obj_1`).css("margin-left");
        currentRigthPos = $(`.obj_2`).css("margin-left");
    },
    editPuzzle: (i, text) => {
        $(".current").addClass("goLeft").css("opacity", 0);
        setTimeout(() => { 
            view.reset();
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
    changePositions: async (elem, positions) => {
        let offsets = [];

        for (let i = 0; i < positions.length; i++) {
            if (elem.index != i) {
                offsets[i] = elem.endPosition - positions[i];
            }
        }

        let smallestVal = Number.MAX_SAFE_INTEGER;
        let index = -1;
        for (let i = 0; i < offsets.length; i++) {
            let absOffset = Math.abs(offsets[i]);
            if (absOffset <= view.safeZone && absOffset < smallestVal) {
                smallestVal = absOffset;
                index = i;

            }
        }

        if (index > -1) {
            $(`.obj_${index}`).css("margin-left", `${elem.startingPosition}px`);
            $(`.obj_${elem.index}`).css("margin-left", `${positions[index]}px`);
        }
        else {
            $(`.obj_${elem.index}`).css("margin-left", `${elem.startingPosition}px`);
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
                view.createItem($(".row").eq(i), i, Object.values(allData[itemCount]));
                itemCount++;
            }

            await timeout(200);
        }

        $(".outcome").css("overflow", "auto");
    },
    createItem: async (parent, i, text) => {
        let item = `<div class="item">
                        <div class="leftTextHolder" style="top: ${i * 10}px">
                            <p>${text}</p>
                        </div>
                    </div>`

        $(parent).append(item);
    },
    reset: async () => {
        for (let i = 0; i < 3; i++) {
            $(`.obj_${i}`).css("margin-left", 200 * i);
        }
    }
}