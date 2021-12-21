const view = {
    row: `<div class="row"></div>`,
    safeZone: 36.6666666667,
    addPuzzle: async (i, text) => {
        $(`.current`).append(`<div id="${i}" class="items"><p>${text}</p></div>`);
        $(`.items`).css({
            "width": 450 / $(`.items`).length, 
            "height": 450 / $(`.items`).length
        });
        $(`.current`).css("left", `${60 / $(`.items`).length}%`);
        $(`#${i}`).css("left", 600 / 3 * i);
    },
    editPuzzle: (i, text) => {
        $(".current").addClass("goLeft").css("opacity", 0);
        setTimeout(() => { 
            view.reset();
            $(".current").removeClass("goLeft");
            $(".current").addClass("top");
            // $(`.current`).append(`<div id="${i}" class="items"><p>${text}</p></div>`);
            // $(`.items`).css({
            //     "width": 450 / $(`.items`).length, 
            //     "height": 450 / $(`.items`).length
            // });
            // $(`.current`).css("left", `${60 / $(`.items`).length}%`);
            // $(`#${i}`).css("left", 600 / 3 * i);
            $(`.current #${i} p`).text(text);
            setTimeout(() => {
                $(".current").removeClass("top");
                $(".current").css("opacity", 1);
            },600)
        }, 500);
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
        view.safeZone = 36.6666666667 * $(".items").length;
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
            $(`#${index}`).css("left",      `${elem.startingPosition}px`);
            $(`#${elem.index}`).css("left", `${positions[index]}px`);

            let old = $(`#${elem.index}`);
            $(`#${index}`).attr("id", elem.index);
            old.attr("id", index);
        }
        else {
            $(`#${elem.index}`).css("left", `${elem.startingPosition}px`);
        }
        
        return index;
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

        let rowData = await $.get('data/data.json');
        rowData = rowData.elements;
        let rowCount = Math.ceil(rowData.length / 3);
        let itemCount = 0;

        for (let i = 0; i < rowCount; i++) {
            $(".outcome").append(view.row);
            await timeout(20);
            
            for (let j = 0; j < $(`.items`).length; j++) {
                view.createItem($(".row").eq(i), i, rowData[itemCount]);
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
        for (let i = 0; i < $(`.items`).length; i++) {
            $(`#${i}`).css("left", 200 * i);
        }
    }
}