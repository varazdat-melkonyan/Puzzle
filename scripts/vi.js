const vview = {
    correct: 0,
    row: `<div class="row"></div>`,
    addPuzzle: async (i, left, center, right, type) => {
            $(".left").append(`<div class="left word"><p>${left}</p></div>`);
            $(".center").append(`<div class="center word"><p>${center}</p></div>`);
            $(".right").append(`<div class="right word"><p>${right}</p></div>`);
    }
}