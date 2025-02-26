if ($("#checkoutSidebar .cart-item-gift").length){
    const loadPicImages = (html) => {
        let nodes = new DOMParser().parseFromString(html, 'text/html');
        let body = nodes.querySelectorAll('#vyberte-jiny-darek li.active .free-gifts-img');
        let num = nodes.querySelectorAll('#vyberte-jiny-darek li.active .free-gifts-img').length;
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


/****************prislusenstvi********************/

const targetSpan = Array.from(document.querySelectorAll('#navigation-2'))
                        .find(span => span.textContent.includes('Dveřní zavírače'));
                        
// Najdeme aktivní prvek navigace, který obsahuje "Podlahové zavírače"
const isPodlahove = Array.from(document.querySelectorAll('#navigation-3'))
    .some(span => span.textContent.includes('Podlahové'));

// Najdeme aktivní prvek navigace, který obsahuje "Příslušenství k podlahovým zavíračům"
const isPrislusenstviPodlahove = Array.from(document.querySelectorAll('#navigation-3'))
    .some(span => span.textContent.includes('Příslušenství k podlahovým zavíračům'));

if (targetSpan) {

    // Nastavíme URL a nadpis podle podmínky
    let url, headingText;

    if (isPrislusenstviPodlahove) {
        url = '/prislusenstvi-k-podlahovym-zaviracum-2';
        headingText = 'Příslušenství k podlahovým zavíračům';
    } else if (isPodlahove) {
        url = '/prislusenstvi-k-podlahovym-zaviracum-2';
        headingText = 'Příslušenství k podlahovým zavíračům';
    } else {
        url = '/prislusenstvi-k-hornim-zaviracum';
        headingText = 'Příslušenství k horním zavíračům';
    }

    // Pomocí fetch načteme obsah stránky
    fetch(url)
      .then(response => response.text())
      .then(html => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const productsElement = tempDiv.querySelector('#products');

        if (productsElement) {
          const productsChildren = Array.from(productsElement.children);
          const newProductsElement = document.createElement('div');
          newProductsElement.id = 'products';
          newProductsElement.classList.add('products-block');

          const limitedProducts = productsChildren.slice(0, Math.min(4, productsChildren.length));
          limitedProducts.forEach(child => newProductsElement.appendChild(child));

          const containerDiv = document.createElement('div');
          containerDiv.classList.add('dalsi-prislusenstvi');

          const headerDiv = document.createElement('div');
          headerDiv.classList.add('dalsi-prislusenstvi-header');

          const heading = document.createElement('h2');
          heading.textContent = headingText;
          headerDiv.appendChild(heading);

          const moreLink = document.createElement('a');
          moreLink.href = url;
          moreLink.textContent = 'Více příslušenství';
          headerDiv.appendChild(moreLink);

          containerDiv.appendChild(headerDiv);
          containerDiv.appendChild(newProductsElement);

          document.querySelector('#description').insertAdjacentElement('afterend', containerDiv);

          $("img").unveil();
        }
      })
      .catch(error => {
        console.error('Chyba při načítání obsahu:', error);
      });

}


/****************prislusenstvi antipanikove********************/

const targetSpan2 = Array.from(document.querySelectorAll('#navigation-2'))
                        .find(span => span.textContent.includes('Antipanikové kování'));

// Ověříme, zda je aktivní některá z těchto kategorií
const isAntipanikovaHrazda = Array.from(document.querySelectorAll('#navigation-3'))
    .some(span => 
        span.textContent.includes('Kyvné hrazdy') ||
        span.textContent.includes('Tlačné hrazdy') ||
        span.textContent.includes('Příslušenství k antipanikovým hrazdám')
    );

if (targetSpan2) {
    // Vždy načítáme produkty z Příslušenství k antipanikovým hrazdám
    const url = '/prislusenstvi-k-antipanikovym-hrazdam';
    const headingText = 'Příslušenství k antipanikovým hrazdám';

    // Pomocí fetch načteme obsah stránky
    fetch(url)
      .then(response => response.text())
      .then(html => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const productsElement = tempDiv.querySelector('#products');

        if (productsElement) {
          const productsChildren = Array.from(productsElement.children);
          const newProductsElement = document.createElement('div');
          newProductsElement.id = 'products';
          newProductsElement.classList.add('products-block');

          const limitedProducts = productsChildren.slice(0, Math.min(4, productsChildren.length));
          limitedProducts.forEach(child => newProductsElement.appendChild(child));

          const containerDiv = document.createElement('div');
          containerDiv.classList.add('dalsi-prislusenstvi');

          const headerDiv = document.createElement('div');
          headerDiv.classList.add('dalsi-prislusenstvi-header');

          const heading = document.createElement('h2');
          heading.textContent = headingText;
          headerDiv.appendChild(heading);

          const moreLink = document.createElement('a');
          moreLink.href = url;
          moreLink.textContent = 'Více příslušenství';
          headerDiv.appendChild(moreLink);

          containerDiv.appendChild(headerDiv);
          containerDiv.appendChild(newProductsElement);

          document.querySelector('#description').insertAdjacentElement('afterend', containerDiv);

          $("img").unveil();
        }
      })
      .catch(error => {
        console.error('Chyba při načítání obsahu:', error);
      });
}



/****************prislusenstvi zástrče********************/


const targetSpan3 = Array.from(document.querySelectorAll('#navigation-2'))
                        .find(span => span.textContent.includes('Dveřní kování'));


// Funkce pro kontrolu, zda je aktivní určité kategorie
function isCategoryActive(selector, keywords) {
    return Array.from(document.querySelectorAll(selector))
        .some(span => keywords.some(keyword => span.textContent.includes(keyword)));
}

// Ověříme, zda jsme v podkategoriích Zástrče nebo Příslušenství k zástrčím
const isZastrceOrPrislusenstvi = isCategoryActive('#navigation-3', [
    'Zástrče',
    'Příslušenství k zástrčím'
]);


if (targetSpan3) {
    // Načítáme produkty z Příslušenství k zástrčím
    const url = '/prislusenstvi-k-zastrcim';
    const headingText = 'Příslušenství k zástrčím';

    // Pomocí fetch načteme obsah stránky
    fetch(url)
      .then(response => response.text())
      .then(html => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const productsElement = tempDiv.querySelector('#products');

        if (productsElement) {
          const productsChildren = Array.from(productsElement.children);
          const newProductsElement = document.createElement('div');
          newProductsElement.id = 'products';
          newProductsElement.classList.add('products-block');

          const limitedProducts = productsChildren.slice(0, Math.min(4, productsChildren.length));
          limitedProducts.forEach(child => newProductsElement.appendChild(child));

          const containerDiv = document.createElement('div');
          containerDiv.classList.add('dalsi-prislusenstvi');

          const headerDiv = document.createElement('div');
          headerDiv.classList.add('dalsi-prislusenstvi-header');

          const heading = document.createElement('h2');
          heading.textContent = headingText;
          headerDiv.appendChild(heading);

          const moreLink = document.createElement('a');
          moreLink.href = url;
          moreLink.textContent = 'Více příslušenství';
          headerDiv.appendChild(moreLink);

          containerDiv.appendChild(headerDiv);
          containerDiv.appendChild(newProductsElement);

          document.querySelector('#description').insertAdjacentElement('afterend', containerDiv);

          $("img").unveil();
        }
      })
      .catch(error => {
        console.error('Chyba při načítání obsahu:', error);
      });
}