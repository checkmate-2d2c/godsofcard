$("document").ready(() => {
    $("#logout").click(() => {
        console.log("clicked")
        $.post("/logout", (res) => {
            console.log(res)
            if (res.status === "success") {
                location.reload();
            }
        })
    })
})