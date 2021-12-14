const vview = {
    correct: 0,
    row: `<div class="row"></div>`,
    addPuzzle: async (parent, i, text) => {
            $(parent).append(`<div class="left ${i}"><p>${text}</p></div>`);
            $(parent).append(`<div class="center ${i}"><p>${text}</p></div>`);
            $(parent).append(`<div class="right ${i}"><p>${text}</p></div>`);
    }
}