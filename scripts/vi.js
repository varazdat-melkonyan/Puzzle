const vview = {
    correct: 0,
    row: `<div class="row"></div>`,
    addPuzzle: async (firstText, secondText, threeText) => {
            $(".left").append(`<p>${firstText}</p>`);
            $(".center").append(`<p>${secondText}</p>`);
            $(".right").append(`<p>${threeText}</p>`);
    },
    editPuzzle: (i, firstText, secondText, threeText) => {
        $(".left p").text(firstText[i]);
        $(".center p").text(secondText[i]);
        $(".right p").text(threeText[i]);
    }
}