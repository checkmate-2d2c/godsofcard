let all_cards = []
let searched_list = []
let current_card = 0

search_list = (key, value, list) => {
    if (list.length > 0) {
        let final_result = []
        for (let i = 0; i < list.length; i++) {   
            if (list[i][key].toLowerCase().includes(String(value).toLowerCase())) {
                console.log(list[i])
                final_result.push(list[i])
            }
        }
        return final_result
    }
}

show_cards = (list, start = current_card, amount = 4) => {
    if (start === 0) $(".card-display").html("")
    console.log(list.length)
    if (list && start < list.length) {
        if (start + amount > list.length) amount = list.length - start
        for (let i = start; i < start + amount; i++) {
            $(".card-display").append(`<img src="${list[i].url}" alt="">`) 
        }
        current_card += amount
    }
}

$("document").ready(() => {
    $.post("/get_all_cards", ({status, cards}) => {
        if (status === "success") {
            all_cards = cards
            console.log(all_cards)
            show_cards(cards, 0, 8)
        }
    })
    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && window.scrollY > 190) {
            if (searched_list.length > 0) {
                show_cards(searched_list)
            } else {
                show_cards(all_cards)
            }
            
        }
    };
    $("#search").click(() => {
        let final = all_cards.map(a => {return {...a}})
        const name = $("#name-search").val()
        const anime = $("#anime-search").val()
        const tier = $("#tier-search").val()
        if (name) {
            final = search_list("name", name, final)
        }
        if (anime) {
            final = search_list("anime", anime, final)
        }
        if (tier) {
            final = search_list("tier", tier, final)
        }
        if (!name && !tier && !anime) {
            searched_list = []
            current_card = 0
            show_cards(all_cards, start = 0, amount = 8)
        } else {
            current_card = 0
            searched_list = final
            console.log(searched_list.length)
            show_cards(searched_list, start = 0, amount = 8)
        }
    })
})