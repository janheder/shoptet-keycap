
// =============================================================================
// INIT HOMEPAGE CAROUSEL
// =============================================================================

$("#carousel").addClass("swiffy-slider slider-item-show1 slider-nav-arrow slider-nav-autoplay slider-nav-autopause slider-indicators-round");
$("#carousel").attr("data-interval" , '');
$("#carousel").attr("data-slider-nav-autoplay-interval","5000");
$("#carousel .carousel-inner").removeClass("carousel-inner").attr("aria-label","Carousel");;
$("#carousel > div").addClass("slider-container");
$("#carousel").append('<button type="button" class="slider-nav" aria-label="Previous"></button> <button type="button" class="slider-nav slider-nav-next" aria-label="Next"></button>');

$('#carousel .item').each(function(){
    $(this).attr("role","option");
    $(this).find(".extended-banner-texts").append('<p class="extended-banner-text">' + $(this).find("img").attr("alt") + '</p>');
    $(this).find(".extended-banner-texts").append('<div class="btn">Více informací</div>');
});


// =============================================================================
// HOMEPAGE PRODUCTS
// =============================================================================

$(".in-index .products.products-block").each(function() {
    $(".in-index .products.products-block").attr("data-slider-nav-autoplay-interval","8000");

    if($(this).find('.product').length > 4){
        $(this).addClass("swiffy-slider slider-item-show4 slider-nav-arrow slider-nav-autopause slider-indicators-round slider-nav-page");
        $(this).wrapInner("<div class='slider-container'></div>");
        $(this).append('<button type="button" class="slider-nav" aria-label="Previous"></button> <button type="button" class="slider-nav slider-nav-next" aria-label="Next"></button>');
    };
});


// =============================================================================
// PRODUCT DETAIL CAROUSEL
// =============================================================================

if ($(".p-detail-inner").length){

    if($('.p-thumbnails-inner .p-thumbnail').length >= 1){
        $(".p-image-wrapper").prepend("<div id='productSlider' class='swiffy-slider slider-nav-arrow slider-indicators-round slider-nav-animation slider-nav-animation-slow slider-item-ratio-4x3'><div class='slider-container'></div></div>");

        $("#productSlider").append('<button type="button" class="slider-nav" aria-label="Previous"></button> <button type="button" class="slider-nav slider-nav-next" aria-label="Next"></button>');

        var loop = 0;
        var sliderElement = document.getElementById('productSlider');

        $(".p-thumbnail").each(function() {
        
            let a = $(this).html().replace("/related/","/big/");
            let url = $(this).prop("href").replace("/related/","/big/");
            $("#productSlider .slider-container").append('<a href="' + url + '" class="cbox-gal cboxElement ' + (loop == 0 ? 'slide-visible': '')  + '" data-gallery="lightbox[gallery]"><img src="' + url + '"></a>');

            $(this).removeAttr("href");
            $(this).attr("onclick",'swiffyslider.slideTo(sliderElement, "'+ loop +'");');

            loop++;
        });

    }else{
        $(".product-top .p-image").attr('style', 'display: block !important');
    }

}
