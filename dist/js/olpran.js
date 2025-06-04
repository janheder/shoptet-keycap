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



// =============================================================================
// load cart images 
// =============================================================================

if ($("#checkoutSidebar .cart-item").length){
    const loadPicImages = (html) => {
        let nodes = new DOMParser().parseFromString(html, 'text/html');
        let body = nodes.querySelectorAll('.cart-p-image a');
        let num = nodes.querySelectorAll('.cart-p-image a').length;
        for(let i = 0; i < num; i++) {
            document.querySelector('#checkoutSidebar .cart-item:nth-child('+ (i+1) +')').prepend(body[i]);
        }
        $("img").unveil();
    };
    fetch("/kosik/")
        .then((response) => response.text())
        .then(loadPicImages)
        .then($("img").unveil())
}


// =============================================================================
// ADVANCED ORCDER SUMMARY
// =============================================================================


if ($(".type-detail").length){

    $("body").append('<div class="advancedModal"><div class="advancedModal__inner"><h2 class="advancedModal__title">Zboží bylo přidáno do košíku</h2><div class="advancedModal__content"></div><div class="advancedModal__buttons"><a href="#" class="btn btn-ghost" id="advancedModalBack">Zpět do obchodu</a><a href="/kosik" class="btn">Přejít do košíku</a></div></div></div>');

    if ($(".products-related").length){
        var related = $(".products-related").html();
        $(".advancedModal__inner").append('<div id="productsRelated"><h3 class="advancedModal__relatedTitle">Související produkty</h3><div class="products-block">' + related + '</div></div>');
    }
    
    function advanceOrderCustom() {
    
        $("body").addClass("--advancedModal");
        $(".advancedModal__content").html("");
    
        var img = $(".p-detail-inner .p-image-wrapper a").html();
        var name = $(".p-detail-inner .p-detail-inner-header h1").html();
        if($(".p-detail-inner .parameter-dependent").length){
            var stock = $(".p-detail-inner .availability-value .parameter-dependent:not(.noDisplay) span").html();
        }else{
            var stock = $(".p-detail-inner .availability-value").html();
        }
        var amount = parseFloat($(".p-detail-inner .add-to-cart .amount").val());
    
        var priceSingle = $(".p-detail-inner .p-final-price-wrapper .price-final-holder:not(.noDisplay)").html();
        var priceTotal = parseFloat(priceSingle.replace(/ /g, ''))*amount;
    
        $(".advancedModal__content").prepend('<div class="advancedProduct">' +
        '<div class="advancedProduct-img">' + img + '</div>' +
        '<div class="advancedProduct-content">' +
        '<h4 class="advancedProduct-name">' + name + '</h4>' +
        '<div class="advancedProduct-stock">Dostupnost<span>' + stock + '</span></div>' +
        '<div class="advancedProduct-amount">Počet kusů<span>' + amount + 'x</span></div>' +
        '<div class="advancedProduct-priceTotal">Celková cena<span>' + priceTotal + ' Kč</span></div>' +
        '</div></div>');
        
    }
    
    /* call functions after order modal loaded */
    document.addEventListener('ShoptetCartAddCartItem', function () {
        advanceOrderCustom();
    },{
        passive: true
    });

    $('.advancedModal').on('click',function(e){
        if (e.target !== this)
        return;
        $("body").removeClass("--advancedModal");
    });

    $('#advancedModalBack').on('click',function(){
        $("body").removeClass("--advancedModal");
    });
}


if ($(".type-index, .type-category").length){

    $("body").append('<div class="advancedModal --product"><div class="advancedModal__inner"><h2 class="advancedModal__title">Zboží bylo přidáno do košíku</h2><div class="advancedModal__content"></div><div class="advancedModal__buttons"><a href="#" class="btn btn-ghost">Zpět do obchodu</a><a href="/kosik" class="btn">Přejít do košíku</a></div></div></div>');

    
    /* call functions after order modal loaded */
    $(".add-to-cart-button").on('click',function(){

        var img = $(this).closest(".p").find(".image").html();
        var name = $(this).closest(".p").find(".name").html();
        var stock = $(this).closest(".p").find(".availability").html();

        var amount = parseFloat($(this).closest(".p").find("input[name='amount']").val());

        var priceSingle = $(this).closest(".p").find(".price-final strong").html();
        var priceTotal = parseFloat(priceSingle.replace(/ /g, ''))*amount;

        document.addEventListener('ShoptetCartAddCartItem', function () {
            $("body").addClass("--advancedModal");
            $(".advancedModal__content").html("");
        
            $(".advancedModal__content").prepend('<div class="advancedProduct">' +
            '<div class="advancedProduct-img">' + img + '</div>' +
            '<div class="advancedProduct-content">' +
            '<div class="advancedProduct-name">' + name + '</div>' +
            '<div class="advancedProduct-stock">Dostupnost<span>' + stock + '</span></div>' +
            '<div class="advancedProduct-amount">Počet kusů<span>' + amount + 'x</span></div>' +
            '<div class="advancedProduct-priceTotal">Celková cena<span>' + priceTotal + ' Kč</span></div>' +
            '</div></div>');
        },{
            passive: true
        });
    });


    $('.advancedModal').on('click',function(e){
        if (e.target !== this)
        return;
        $("body").removeClass("--advancedModal");
    });
}

// =============================================================================
// FAQ
// =============================================================================

$(document).ready(function () {
    $('#faqSearch').on('keyup', function () {
        let searchQuery = $(this).val().trim().toLowerCase();

        if (searchQuery === '') {
            // Reset: Show all and close all details
            $('#FaqResult *').show();
            $('#FaqResult details').attr("open", false);
            return;
        }

        // Escape special characters for regex
        let escapedQuery = searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        let regex = new RegExp(escapedQuery, 'i'); // Case-insensitive matching

        $('#FaqResult details').each(function () {
            let detailsText = $(this).text().toLowerCase();
            let matches = regex.test(detailsText);

            if (matches) {
                $(this).show().attr("open", true); // Show and expand matching details
            } else {
                $(this).hide().attr("open", false); // Hide non-matching details
            }
        });
    });
});




/* add search and user icons to header area */
$(".navigation-buttons").prepend('<div class="nav-search" id="js-searchToggle">');


/* toggle control of responsive search */
$("#js-searchToggle").click(function(){
    $("body").toggleClass("--searchActive");
    $(".header-top .search .form-control").focus(); 
});



$(document).ready(function () {
    $("#banner-categories").insertAfter(".position--benefitHomepage");
});
