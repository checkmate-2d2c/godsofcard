let started = false;
let user_id = ""
let cost
let tier
let card_pools
let selected_id = ""
let current_card = 0
let highlight_cards = []

update_card_pool = (idx) => {
    selected_id = card_pools[idx].card_pool_id
    $(".event_card_display img").attr("src", "")
    let current_card = 0
    const end = card_pools[idx].expire ? new Date(card_pools[idx].expire):0
    highlight_cards = card_pools[idx].highlight_cards
    $(".event_card_display img").attr("src", highlight_cards[0])
    let time_delta = ""
    if (end) {
        time_delta = (end - Date.now()) / 86400000
        if (time_delta < 1) {
            time_delta *= 24 * 60
            const hour = Math.floor(time_delta)
            const minute = Math.ceil((time_delta - hour) * 60)
            time_delta = hour + "小時 " + minute + "分鐘"
        } else {
            time_delta = Math.ceil(time_delta) + "日"
        }
    } else {
        time_delta = "永久"
    }
    console.log(time_delta)
    $(".eventdate p").html(`活動限期 : ${time_delta}`)
    $(".probability-container").empty()
    $(".probability-container").append(`<h3>${card_pools[idx].name}</h3>`)
    $(".probability-container").append(`<p>${card_pools[idx].description}</p>`)
    const _tiers = Object.keys(card_pools[idx].probability)
    for (let i = 0; i < _tiers.length; i++) {
        $(".probability-container").append(`<p>${_tiers[i]}級卡牌 : ${card_pools[idx].probability[_tiers[i]]}%</p>`)
    }
    $("#ten-draw").toggleClass("hide", !card_pools[idx].ten)
    if (card_pools[idx].limit) {
        console.log("ran")
        $("#single-draw").prop("disabled", true)
        $("#ten-draw").prop("disabled", true)
    } else {
        $("#single-draw").prop("disabled", false)
        $("#ten-draw").prop("disabled", false)
    }
}

image_loaded = () => {
    console.log("loaded")
    $(".video-container video").removeClass("hide")
    $("#exit").click(() => {
        location.reload()
    })
    $(".video-container video").get(0).play()
    $(".video-container h1").addClass("hide")
    $(".skip-area").removeClass("hide")
    let skipped = false
    $(".skip-area").click(() => {
        skipped = true
        $(".skip-area").addClass("hide")
        $(".expose-container").addClass("skipped-expose")
        $(".video-container video").addClass("hide")
        setTimeout(() => {
            $(".card-container").removeClass("hide")
            setTimeout(() => {
                $(".button-container-card").addClass("show")
                $(".button-container-card button").prop("disabled", false)
            }, 4000)
        }, 1000)
    })
    setTimeout(() => {
        $(".expose-container").addClass("expose")
        setTimeout(() => {
            $(".video-container video").addClass("hide")
            $(".card-container").removeClass("hide")
            $(".skip-area").addClass("hide")
            setTimeout(() => {
                $(".button-container-card").addClass("show")
                $(".button-container-card button").prop("disabled", false)
            }, 4000)
        }, 1000)
    }, 6000)
}

$("document").ready(() => {
    /*if ($(window).width() <= 720) {
        console.log("mobile")
        $("#content-container").load("../templates/card_menu_mobile.html")
    }*/
    $("head").append(`<link rel="prefetch" href="https://drive.google.com/uc?id=1VNSXQPCWpSEWVdSZVvhrKaJnFVwSMGAF" as="video">`)
    $.post("/get_card_pool", {} , (result) => {
        console.log(result)
        card_pools = result.card_pools
        $("#remaining").html(`剩餘點數: ${result.amount}pt`)
        for (let i = 0; i < card_pools.length; i++) {
            const _tier = Object.keys(card_pools[i].probability)[i]
            $(".events").append(`<img src="/images/cards/events/${card_pools[i].banner}">`)
        }
        update_card_pool(0)
        $("#content-container").removeClass("hide")
        $(".loading").addClass("hide")
        $(".events img").click(function() {
            const idx = $(".events img").index($(this))
            if (card_pools[idx].id !== selected_id) {
                update_card_pool(idx)
            }
        })
    })
    //single
    $("#single-draw").click(() => {
        $.post("/draw_card", {card_pool_id:selected_id, amount:1}, (result) => {
            if (result.status === "success") {
                $("nav").addClass("hide")
                $("#content-container").load("../templates/card_main.html", () => {                            
                    console.log(result)
                    $(".video-container video").on('canplaythrough', function() {
                        $(".card-container img").each(function(idx) {
                            $(this).attr("src", result.cards[idx].url)
                        })
                    }) 
                })
            } else {
                alert(result.msg)
            }
            
        })
    }) 
    //-----------------------------------------

    //tenth
    $("#ten-draw").click(() => {
        $.post("/draw_card", {card_pool_id:selected_id, amount:10}, (result) => {
            if (result.status === "success") {
                $("nav").addClass("hide")
                $("#content-container").load("../templates/card_main.html", () => { 
                    $(".card-container").addClass("ten")     
                    for (let i = 0; i < 9; i++) {
                        $(".card-container").append('<img src="" alt="">')
                    }                      
                    console.log(result)
                    $(".video-container video").on('canplaythrough', function() {
                        $(".card-container img").each(function(idx) {
                            $(this).attr("src", result.cards[idx].url)
                        })
                    }) 
                })
            }else {
                alert(result.msg)
            }
        })
    })

    $("top-card-tenth").click(() => {
        console.log("clicked")
    })
    //---------------------------
    $("#back-icon-main").click(() => {
        $("body").load("../templates/card_menu.html")
    })

    $("#left-nav").click(() => {
        current_card = current_card - 1 < 0 ? highlight_cards.length - 1: current_card - 1
        $(".event_card_display img").attr("src", highlight_cards[current_card])
    })
    $("#right-nav").click(() => {
        current_card = current_card + 1 > highlight_cards.length - 1 ? 0: current_card + 1
        $(".event_card_display img").attr("src", highlight_cards[current_card])
    })
})