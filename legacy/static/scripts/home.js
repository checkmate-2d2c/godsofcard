const sio_home = io(":8080/home");
const sio_db = io(":8080/db");

$("document").ready(() => {
    sio_home.on("connect", () => {
        sio_db.on("connect", () => {
            $("#submit").click(() => {
                $("#submit").prop( "disabled", true );
                user_id = $("#id_input").val()
                sio_db.emit("db:check_account", user_id, (result) => {
                    if (result) {
                        sio_home.emit("home:submit_id", user_id, (res) => {
                            $.post("/submit_id", {user_id:res}, (data) => {
                                if (data.ok) {
                                    window.location = data.url
                                } else {
                                    alert("Error")
                                    $("#submit").prop( "disabled", false );
                                }
                            })
                        })
                    } else {
                        alert("Account does not exist")
                        $("#submit").prop( "disabled", false );
                    }
                })
            })
        })
    })
    
})
