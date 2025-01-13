// Zkontroluje, zda existuje #productVideos
var productVideos = document.querySelector('#productVideos');

if (productVideos) {
    // Získání h3 a iframe z #productVideos
    var productVideosH3 = productVideos.querySelector('h3');
    var productVideosIframe = productVideos.querySelector('iframe');

    if (productVideosIframe) {
        // Vytvoření nového divu pro obalení h3 a iframe
        var wrapperDiv = document.createElement('div');

        // Přidání stylů pro aspect ratio 4:3
        wrapperDiv.style.position = 'relative';
        wrapperDiv.style.width = '100%';
        wrapperDiv.style.paddingBottom = '75%'; // 4:3 ratio

        productVideosIframe.style.position = 'absolute';
        productVideosIframe.style.top = '0';
        productVideosIframe.style.left = '0';
        productVideosIframe.style.width = '100%';
        productVideosIframe.style.height = '100%';

        // Přidání h3 a iframe do nového divu
        wrapperDiv.appendChild(productVideosH3);
        wrapperDiv.appendChild(productVideosIframe);

        // Přidání obaleného divu zpět do #productVideos místo původních prvků
        productVideos.appendChild(wrapperDiv);

        // Získání obsahu nově vytvořeného wrapperDiv
        var productVideosContent = wrapperDiv.outerHTML;

        // Přidání obsahu na konec #productSlider .slider-container
        var sliderContainer = document.querySelector('#productSlider .slider-container');
        sliderContainer.insertAdjacentHTML('beforeend', productVideosContent);

        // Získání ID videa z iframe src nebo data-iframe-src atributu
        var videoSrc = productVideosIframe.getAttribute('src') || productVideosIframe.getAttribute('data-iframe-src');
        if (videoSrc) {
            var videoId = videoSrc.split('/embed/')[1].split('?')[0];

            // Vytvoření náhledového obrázku z YouTube videa
            var thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            // Získání všech existujících .p-thumbnail pro určení indexu nového thumbnailu
            var existingThumbnails = document.querySelectorAll('.p-thumbnails-inner > div .p-thumbnail');
            var newIndex = existingThumbnails.length + 1; // Nový index pro slide, protože indexování začíná od 1

            // Vytvoření nového <a> elementu s class .p-thumbnail a onclick atributem
            var newThumbnail = document.createElement('a');
            newThumbnail.classList.add('p-thumbnail', '--video');
            newThumbnail.setAttribute('onclick', `swiffyslider.slideTo(sliderElement, "${newIndex}");`);

            // Přidání obrázku do nového <a> elementu
            newThumbnail.innerHTML = `<img src="${thumbnailUrl}" alt="Video Thumbnail">`;

            // Přidání nového .p-thumbnail do .p-thumbnails-inner > div
            var thumbnailsInner = document.querySelector('.p-thumbnails-inner > div');
            thumbnailsInner.appendChild(newThumbnail);
        } else {
            console.error("Iframe src or data-iframe-src attribute is missing or invalid.");
        }
    } else {
        console.error("Iframe not found inside #productVideos.");
    }
}
