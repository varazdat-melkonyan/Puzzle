const view = {
    createWord: (i, text, type, parent) => {
        let htmlWord = `
            <div id="${i}" class="word ${type}">
                <p class="text">${text}</p>
            </div>
        `;
        $(`#${parent}`).append(htmlWord);

        $(`#${parent} #${i}`).css("margin-top", 120 * i);
    },
    editWord: (i, text) => {
        $(`#${i} .text`).html(text);
    },
    removeWord: (i) => {
        $(`#${i} .text`).remove();
    },
    scrollToWord: async(direction, obj) => {
      let offset = direction > 0 ? "+=77" : "-=77";
        $(".divs").css("top", offset);
    }
}
 
