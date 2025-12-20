(function waitForjQuery() {
  if (typeof jQuery === 'undefined') {
    return setTimeout(waitForjQuery, 50); // zkus za 50ms znovu
  }

  (function($){
    const originalDetach = $.fn.detach;
    const originalAppendTo = $.fn.appendTo;
    const originalInsertBefore = $.fn.insertBefore;

    const blocked = [
      '#navigation',
      '.navigation-wrapper .menu-helper',
      '.responsive-tools > a[data-target="navigation"]',
      '.search'
    ];

    function isBlocked(el) {
      return blocked.some(sel => $(el).is(sel) || $(el).closest(sel).length);
    }

    $.fn.detach = function() {
      if (isBlocked(this)) return this;
      return originalDetach.apply(this, arguments);
    };

    $.fn.appendTo = function(target) {
      if (isBlocked(this)) return this;
      return originalAppendTo.apply(this, arguments);
    };

    $.fn.insertBefore = function(target) {
      if (isBlocked(this)) return this;
      return originalInsertBefore.apply(this, arguments);
    };
  })(jQuery);

})();




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