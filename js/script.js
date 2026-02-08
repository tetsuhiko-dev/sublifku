let mouseCursor = null;
let previous_color = null;
let slot_colors = [null, null, null, null];

function get_slot_color_url(color) {
    switch (color) {
        case 'R':
            return "imgs/shardRedFull.webp";
        case 'G':
            return "imgs/shardGreenFull.webp";
        case 'B':
            return "imgs/shardBlueFull.webp";
        case 'W':
            return "imgs/shardWhiteFull.webp";
    }
}

function slot_color_click(color) {
    if (mouseCursor == null) {
        mouseCursor = document.querySelector(".slot_area");
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
    if (slot_colors[element.attributes.slot_index.value] === previous_color) {
        element.src = "imgs/shardMultiEmpty.webp";
        slot_colors[element.attributes.slot_index.value] = null;
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
}

function compute_slot() {
    for(let i=0; i<slot_colors.length; i++) {
        if(slot_colors[i] == null) {
            alert("Please fill all slots !");
            return;
        }
    }

    let slots = slot_colors[0] + slot_colors[1] + slot_colors[2] + slot_colors[3];

    $.ajax({
        url: "https://sublikfu.ddns.net/compute/" + slots,
        method: "GET",
        success: function(data) {
            let table_content = $("#table_content");
            table_content.empty();
            let entries = JSON.parse(data);
            entries = entries.sort(function(a, b) {
                // First, sort by fit_slot (true before false)
                if (a.fit_slot !== b.fit_slot) {
                    return b.fit_slot - a.fit_slot;
                }
                // Then, sort by sublimation_name alphabetically
                return a.sublimation_name.localeCompare(b.sublimation_name);
            });
            for(let i=0; i<entries.length; i++) {
                table_content.append(create_table_entry(entries[i]));
            }
        }
    })
}

function create_table_entry(entry)
{
    return "<tr>" +
        "<th scope='row'>" + entry.sublimation_name + "</th>" +
        "<td>" + entry.fit_slot + "</td>" +
        "<td>" + create_permutations(entry.equipment_slots) + "</td>" +
    "</tr>";
}

function create_permutations(permutations)
{
    let permutations_html = "";
    for(let i=0; i<permutations.length; i++) {
        permutations_html += create_permutation(permutations[i]);
    }
    return permutations_html;
}

function create_permutation(permutation)
{
    return '' +
        '<div class="justify-content-cednter permutation_area">' +
            '<div class="permutation_body">' +
                '<img class="permutation_slot_item permutation_slot_item_left" src="' + get_slot_color_url(permutation[0]) + '" alt=""/>' +
                '<img class="permutation_slot_item permutation_slot_item_center" src="' + get_slot_color_url(permutation[1]) + '"  alt=""/>' +
                '<img class="permutation_slot_item permutation_slot_item_right" src="' + get_slot_color_url(permutation[2]) + '" alt=""/>' +
            '</div>' +
        '</div>';
}