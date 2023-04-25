function removeAlzaBox() {
    if (document.querySelector('#do-balikovny-wrapper')) {

      var target = document.querySelector('#do-balikovny-result-table');

      var observer = new MutationObserver(function(mutations) {

        mutations.forEach(function(mutation) {
            console.log(mutation.type);
            $('td strong:contains("AlzaBox"), td strong:contains("BOX OX"), td strong:contains("BOX ČS"), td strong:contains("ČZU Box"), td strong:contains("Balík Box"), td strong:contains("Boxtrolls")').closest("tr").remove();

        });

      });
      var config = { attributes: true, childList: true, characterData: true, subtree:true };
      observer.observe(target, config);

    }
}
  

 
function removeAlzaBox2() {
  document.addEventListener('shoptet.modal.shoptetResize', function () {
      $('.ui-autocomplete li:contains("AlzaBox"), .ui-autocomplete li:contains("BOX OX"), .ui-autocomplete li:contains("BOX ČS"), .ui-autocomplete li:contains("ČZU Box"), .ui-autocomplete li:contains("Balík Box"), .ui-autocomplete li:contains("Boxtrolls")').remove();
  }, { passive: true })
}


  document.addEventListener('ShoptetBillingMethodUpdated', function () {
    setTimeout(() => {
      removeAlzaBox();
      removeAlzaBox2();
    }, "2000");
    
  }, { passive: true })



