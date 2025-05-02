// =============================================================================
// LOAD HOMEPAGE NEWS
// =============================================================================

window.newsSelector = window.newsSelector || '.news-wrapper .news-item:nth-child(-n+3)';

if ($(".in-index").length) {
    const loadNews = (html) => {
        const nodes = new DOMParser().parseFromString(html, 'text/html');
        const body = nodes.querySelectorAll(window.newsSelector);
        const newsWrapper = document.querySelector('.in-index #newsWrapper');

        if (body.length > 0 && newsWrapper) {
            for (let i = 0; i < body.length; i++) {
                newsWrapper.appendChild(body[i]);
            }
        } else {
            console.warn("No news items found or #newsWrapper not present.");
        }
    };

    const loadImg = () => {
        $("img").unveil();
    };

    fetch("/blog/")
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                console.warn(`/blog not found or returned a non-OK status: ${response.status}`);
                return null;
            }
        })
        .then((html) => {
            if (html) {
                loadNews(html);
                loadImg();
            }
        })
        .catch((error) => {
            console.error("Error fetching /blog:", error);
        });
}
