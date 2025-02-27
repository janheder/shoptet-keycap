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
