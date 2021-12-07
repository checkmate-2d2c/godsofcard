$("document").ready(() => {
    $.post("get_all_news", (result) => {
        if (result.status === "success") {
            const news = result.result
            console.log(news)
            for (let i = news.length - 1; i > -1; i--) {
                $(".news-container").append(`
                <a href="/news/${news[i].id}">
                    <div class="content">
                        <div class="news-icon">
                            <i class="fas fa-bullhorn"></i>
                        </div>
                        <div class="title">
                            <h1>${news[i].title}</h1>
                            <span>${news[i].date}</span>
                        </div>
                    </div>
                </a>
                `)
            }
        }
    })
})