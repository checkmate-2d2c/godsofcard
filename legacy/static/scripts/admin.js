function getBase64(file, cb) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result.replace(/^data:image\/(png|jpg|jpeg|gif);base64,/, ""));
    };
    reader.onerror = function (error) {
      cb('Error: ', error);
    };
 }

change_preview = (file) => {
    console.log($("#card-input").prop("files"))
    $('.image-preview').removeClass("border")
    $('.image-preview img').attr("src", window.URL.createObjectURL(file))
}

function reload() {
    $("#submit").click(() => {
        console.log("clicked")
        const name = $("#name-input").val()
        const tier = $("#tiezr-input").val()
        const anime = $("#anime-input").val()
        const file = $("#card-input").prop("files")[0]
        console.log(getBase64(file))
        if (name && tier && anime && file) {
            
        }
    })
}

submit = () => {
    const name = $("#name-input").val()
    const tier = $("#tier-input").val()
    const anime = $("#anime-input").val()
    const file = $("#card-input").prop("files")[0]
    const [filename, format] = $("#card-input").val().split(/(\\|\/)/g).pop().split(".")
    if (name && tier && anime && file) {
        getBase64(file , (dataUrl) => {
            console.log(dataUrl);
            $.post("/upload_card",{name:name,tier:tier,anime:anime,file:dataUrl, filename:filename, format:format})
                .done(function(result) {
                    alert(result)
                })
                .fail(function(xhr, status, error) {
                    alert(error)
                });
        })     
    }
    /**/
    
    
}

$("document").ready(() => {
    $(".main-container").load("../templates/submit_card.html")
    reload()
})