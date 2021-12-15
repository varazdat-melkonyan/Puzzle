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
        $("#0 .left p").text(firstText);
        $("#0 .center p").text(secondText);
        $("#0 .right p").text(threeText);
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
    }
}