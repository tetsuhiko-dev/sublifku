let mouseCursor = null;
let previous_color = null;
let slot_colors = [null, null, null, null];
function slot_color_click(color) {
    if (mouseCursor == null) {
        mouseCursor = document.querySelector(".slot_area");
        console.log(mouseCursor);
    }

    switch (color) {
        case 'R':
            if (previous_color === 'R') {
                mouseCursor.style.cursor = "pointer";
                previous_color = null;
                return;
            }
            mouseCursor.style.cursor = "url('imgs/shardRedFull_small.webp') 16 16, auto";
            previous_color = 'R';
            break;
        case 'G':
            if (previous_color === 'G') {
                mouseCursor.style.cursor = "pointer";
                previous_color = null;
                return;
            }
            mouseCursor.style.cursor = "url('imgs/shardGreenFull_small.webp') 16 16, auto";
            previous_color = 'G';
            break;
        case 'B':
            if (previous_color === 'B') {
                mouseCursor.style.cursor = "pointer";
                previous_color = null;
                return;
            }
            mouseCursor.style.cursor = "url('imgs/shardBlueFull_small.webp') 16 16, auto";
            previous_color = 'B';
            break;
        case 'W':
            if (previous_color === 'W') {
                mouseCursor.style.cursor = "pointer";
                previous_color = null;
                return;
            }
            mouseCursor.style.cursor = "url('imgs/shardWhiteFull_small.webp') 16 16, auto";
            previous_color = 'W';
            break;
    }
}

function change_slot_color(element) {
    console.log(element.attributes.slot_index.value);
    if (slot_colors[element.attributes.slot_index.value] === previous_color) {
        element.src = "imgs/shardMultiEmpty.webp";
        slot_colors[element.attributes.slot_index.value] = null;
        console.log(slot_colors);
        return;
    }
    switch (previous_color) {
        case 'R':
            element.src = "imgs/shardRedFull.webp";
            break;
        case 'G':
            element.src = "imgs/shardGreenFull.webp";
            break;
        case 'B':
            element.src = "imgs/shardBlueFull.webp";
            break;
        case 'W':
            element.src = "imgs/shardWhiteFull.webp";
            break;
    }
    slot_colors[element.attributes.slot_index.value] = previous_color;
    console.log(slot_colors);
}
