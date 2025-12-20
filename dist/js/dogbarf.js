/* add hamburger menu icon on mobile */
$(".header-top").prepend('<div class="navigation-buttons-left"><div class="nav-menu-toggle" id="js-menuToggle"><span></span></div><div class="nav-search" id="js-searchToggle"></div>');

/* toggle control of responsive menu */
$("#js-menuToggle, .navigation-close").click(function(){
    $("body").toggleClass("--menuActive");
});

/* add search and user icons to header area */
$(".navigation-buttons").prepend('<a href="/login" class="nav-user" id="js-userToggle">Uživatel</a>');


/* toggle user login modal */
$("#js-userToggle").click(function(){
    $("body").toggleClass("--navUserActive");
});
$('.user-action-login').on('click',function(e){
    if (e.target !== this)
    return;
    $("body").toggleClass("--navUserActive");
});

/* login form close */
$(".user-action .login-widget .popup-widget-inner").append("<span class='login-close'></span>");
$(".login-close").click(function(){
    $("body").removeClass("--navUserActive");
});


/* toggle control of responsive search */
$("#js-searchToggle").click(function(){
    $("body").toggleClass("--searchActive");
    $(".header-top .search .form-control").focus(); 
});


$(".cart-count").on('touchstart', function() {
  $("body").toggleClass("--cartActive");
});
    
/* trigger on backdrop tap */
$(".menu-helper").click(function(){
    $("body").removeClass("--menuActive --navUserActive --searchActive --cartActive --advancedModal filters-visible --checkoutSidebarActive");
    $("#filters").removeClass("filters");
    $("#filters").removeClass("visible");
    $("#filters-wrapper .filters-unveil-button-wrapper > a").text("Otevřít filtr");
});

$("#filters-wrapper .filters-unveil-button-wrapper > a").click(function(){
    $("#filters-wrapper .filters-unveil-button-wrapper > a").text("Zavřít filtr");
});





var target = document.querySelector('.header-top .site-name-wrapper');

if (target) {
  target.insertAdjacentHTML('afterend', `
    <div class="header-tel">
      <div class="header-tel-img">
        <img src="https://www.dogbarf.cz/user/documents/upload/icons/i-phone-green.svg" alt="+420 723 467 178">
      </div>
      <div class="header-tel-content">
        <small>Potřebujete poradit?</small>
        <a href="tel:+420723467178">+420 723 467 178</a>
      </div>
    </div>
  `);
} else {
  console.log('Element .site-name-wrapper nebyl nalezen');
}





// =============================================================================
// REFACTORED PAGINATION (NEW HTML STRUCTURE, LI WITH CLASSES)
// =============================================================================

document.addEventListener('DOMContentLoaded', function () {
    var paginationNav = document.querySelector('.type-category .pagination');

    if (paginationNav !== null) {
        function refactorPagi() {
            var paginationList = paginationNav.querySelector('.pagination__list');
            if (!paginationList) return;

            // Aktuální stránka
            var currentEl = paginationList.querySelector('.pagination__currentPage');
            var current = parseInt(currentEl ? currentEl.textContent : '1');

            // Maximální stránka
            var lastLink = paginationList.querySelector('a.pagination__link--last');
            var max = lastLink ? parseInt(lastLink.textContent) : current;

            // URL bez /strana-X
            var currentUrl = window.location.href;
            var queryIndex = currentUrl.indexOf('?');
            var baseUrl = queryIndex === -1 ? currentUrl : currentUrl.slice(0, queryIndex);
            baseUrl = baseUrl.replace(/\/strana-\d+/g, '');
            var queryParams = queryIndex === -1 ? '' : currentUrl.slice(queryIndex);

            // Vyčištění listu
            while (paginationList.firstChild) {
                paginationList.removeChild(paginationList.firstChild);
            }

            for (var i = 1; i <= max; i++) {
                var li = document.createElement('li');
                li.classList.add('pagination__link');

                if ((current - i) > 2 || (i - current) > 1) {
                    if (i !== 1 && i !== max) li.classList.add('hidden');
                }

                if (i === current) {
                    li.innerHTML = "<strong class='pagination__currentPage' aria-current='page'>" + i + "</strong>";
                } else {
                    li.innerHTML = "<a href='" + baseUrl + "/strana-" + i + queryParams + "'>" + i + "</a>";
                }

                paginationList.appendChild(li);
            }

            if (current > 1) {
                var prevLi = document.createElement('li');
                prevLi.classList.add('pagination__link');
                prevLi.innerHTML = "<a href='" + baseUrl + "/strana-" + (current - 1) + queryParams + "' aria-label='Předchozí, strana " + (current - 1) + "'><</a>";
                paginationList.insertBefore(prevLi, paginationList.firstChild);
            }

            if (current < max) {
                var nextLi = document.createElement('li');
                nextLi.classList.add('pagination__link');
                nextLi.innerHTML = "<a href='" + baseUrl + "/strana-" + (current + 1) + queryParams + "' aria-label='Následující, strana " + (current + 1) + "'>></a>";
                paginationList.appendChild(nextLi);
            }
        }

        refactorPagi();

        document.addEventListener('ShoptetDOMPageContentLoaded', refactorPagi, { passive: true });
        document.addEventListener('ShoptetDOMPageMoreProductsLoaded', refactorPagi, { passive: true });
    }
});

