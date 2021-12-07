let all_cards = []

search_list = (key, value, list) => {
    if (list.length > 0) {
        let final_result = []
        for (let i = 0; i < list.length; i++) {
            console.log(list[i][key], list[i][key].toLowerCase().includes(String(value).toLowerCase()))
            if (list[i][key].toLowerCase().includes(String(value).toLowerCase())) {
                final_result.push(list[i])
            }
        }
        return final_result
    }
}

show_cards = (list) => {
    $(".card-display").html("")
    if (list) {
        list.forEach(e => {
            $(".card-display").append(`<img src="${e.url}" alt="">`) 
        });
    }
    
}

$("document").ready(() => {
    $.post("/get_inventory", (result) => {
        console.log(result)
        all_cards = result.cards
        show_cards(all_cards)
    })

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
            show_cards(all_cards)
        } else {
            current_card = 0
            searched_list = final
            console.log(searched_list.length)
            show_cards(searched_list)
        }
    })
})