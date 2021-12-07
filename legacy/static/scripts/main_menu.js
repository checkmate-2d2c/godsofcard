const splash = document.querySelector('.splash')
const cards = ["https://drive.google.com/uc?id=1JI-73xU86K7bMOnJ9O23YET1lnPX_8BV","https://drive.google.com/uc?id=1bW4IxxA6C5SJ9feP-SS5olC4YjMSeZOD", "https://drive.google.com/uc?id=1bW4IxxA6C5SJ9feP-SS5olC4YjMSeZOD"]
const cardevents = ["/images/cards/events/event1.png","/images/cards/events/event2.png"]
let current_card = 1
let current_cardevents = 1

function update_card(direction) {
    $(".card-container .left, .card-container .middle, .card-container .right").addClass(`move${direction}`)
    setTimeout(() => {
        $(".card-container .left").attr("src",cards[current_card - 1 < 0 ? cards.length - 1:current_card - 1])
        $(".card-container .middle").attr("src",cards[current_card])
        $(".card-container .right").attr("src",cards[current_card + 1 > cards.length - 1 ? 0:current_card + 1])
        $(".card-container .left, .card-container .middle, .card-container .right").removeClass(`move${direction}`)
    }, 200)
}

function update_cardevent(direction) {
    $(".card-event-container .top, .card-event-container .middle, .card-event-container .bottom").addClass(`move${direction}`)
    setTimeout(() => {
        $(".card-event-container .top").attr("src",cardevents[current_cardevents - 1 < 0 ? cardevents.length - 1:current_cardevents - 1])
        $(".card-event-container .middle").attr("src",cardevents[current_cardevents])
        $(".card-event-container .bottom").attr("src",cardevents[current_cardevents + 1 > cardevents.length - 1 ? 0:current_cardevents + 1])
        $(".card-event-container .top, .card-event-container .middle, .card-event-container .bottom").removeClass(`move${direction}`)
    }, 200)
}

$("document").ready(() => {
    setTimeout(()=>{
        splash.classList.add('display-none');
    }, 2000);
    $(".card-container img").each(function(idx) {
        $(this).attr("src",cards[idx])
    })
    $(".card-event-container img").each(function(idx) {
        $(this).attr("src",cardevents[idx > cardevents.length - 1 ? idx - cardevents.length: idx])
    })
    $("#left-nav").click(() => {
        current_card = current_card + 1 > cards.length - 1 ? 0:current_card + 1
        update_card("L")
    })
    $("#right-nav").click(() => {
        current_card = current_card - 1 < 0 ? cards.length - 1:current_card - 1
        update_card("R")
    })
    $("#bottom-nav").click(() => {
        current_cardevents = current_cardevents + 1 > cardevents.length - 1 ? 0:current_cardevents + 1
        update_cardevent("B")
    })
    $("#top-nav").click(() => {
        current_cardevents = current_cardevents - 1 < 0 ? cardevents.length - 1:current_cardevents - 1
        update_cardevent("U")
    })
})

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};