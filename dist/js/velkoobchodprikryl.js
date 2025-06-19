function productCardEdit(){ 

    $(".p").each(function(){
        var price = $(this).find(".flags .flag .price-standard").html();
        $(this).find(".prices span").remove();
        $(this).find(".prices").prepend(price);
    });


}

productCardEdit();

document.addEventListener('ShoptetDOMPageContentLoaded', function () {
    productCardEdit();
});
document.addEventListener('ShoptetDOMPageMoreProductsLoaded', function () {
    productCardEdit();
});



function productCartPrices(){ 

document.querySelectorAll("td.p-discount.p-cell").forEach(discountCell => {
    let discountSpan = discountCell.querySelector('span[data-testid="cartItemDiscount"]');
    
    if (discountSpan) {
        let discountText = discountSpan.textContent.trim(); // Získání textu, např. "2 %"

        let totalCell = discountCell.closest("tr")?.querySelector('td.p-total[data-testid="cellTotalPrice"] strong.price-final[data-testid="cartPrice"]');
        
        if (totalCell && !totalCell.querySelector('.discount-tag')) { // Kontrola, aby se sleva nepřidávala opakovaně
            totalCell.innerHTML = `<span class="discount-tag">-${discountText} </span>` + totalCell.innerHTML;
        }
    }
});

}
productCartPrices();

    /* call functions after order modal loaded */
    document.addEventListener('ShoptetCartUpdated', function () {
        productCartPrices();
    },{
        passive: true
    });



/* doplnkove parametry checkbox

    $(function () {
        const $row = $('tr.surcharge-list');
        const $select = $row.find('select.parameter-id-290');
      
        if ($select.length === 0) return;
      
        // Label text z th
        const labelText = $row.find('th').contents().filter(function() {
          return this.nodeType === 3; // text node
        }).text().trim();
      
        // Najdi první option, která není výchozí (data-choose)
        const $option = $select.find('option').not('[data-choose]').first();
        if ($option.length === 0) return;
      
        const value = $option.val();
        const price = $option.data('surcharge-final-price');
        const priceText = price !== undefined ? `+${price} Kč` : '';
      
      
        // Najdi nebo vytvoř <td class="custom-checkbox-cell">
        let $customTd = $row.find('td.custom-checkbox-cell');
        if ($customTd.length === 0) {
          $customTd = $('<td class="custom-checkbox-cell"></td>');
          $row.append($customTd);
        }
        $customTd.empty();
      
        // Vytvoř checkbox label
        const $label = $(`
          <label>
            <input type="checkbox" name="${$select.attr('name')}" value="${value}">
            <span>${labelText}</span>
            <span>${priceText}</span>
          </label>
        `);
      
        // Nastav checkbox podle selectu
        if ($option.is(':selected')) {
          $label.find('input').prop('checked', true);
        }
      
        // Synchronizuj změny checkboxu s selectem
        $label.find('input').on('change', function () {
          if (this.checked) {
            $select.val(value).trigger('change');
          } else {
            $select.val('').trigger('change');
          }
        });
      
        // Přidej label do custom td
        $customTd.append($label);
      });
      */