if ($("#checkoutSidebar .cart-item-gift").length){
    const loadPicImages = (html) => {
        let nodes = new DOMParser().parseFromString(html, 'text/html');
        let body = nodes.querySelectorAll('.free-gifts-img');
        let num = nodes.querySelectorAll('.free-gifts-img').length;
        for(let i = 0; i < num; i++) {
            document.querySelector('#checkoutSidebar .cart-item-gift:nth-child('+ (i+1) +')').prepend(body[i]);
        }
        $("img").unveil();
    };
    fetch("/kosik/")
        .then((response) => response.text())
        .then(loadPicImages)
        .then($("img").unveil())
}