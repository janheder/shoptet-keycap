// Zkontroluje, zda existuje #productVideos
var productVideos = document.querySelector('#productVideos');

if (productVideos) {
    // Získání všech h3 a iframe uvnitř #productVideos
    var videoBlocks = productVideos.querySelectorAll('h3, iframe');
    var sliderContainer = document.querySelector('#productSlider .slider-container');
    var thumbnailsInner = document.querySelector('.p-thumbnails-inner > div');

    if (videoBlocks.length > 0 && sliderContainer && thumbnailsInner) {
        var existingSlides = sliderContainer.children.length;
        
        videoBlocks.forEach((element, index) => {
            if (element.tagName.toLowerCase() === 'iframe') {
                // Vytvoření wrapper divu
                var wrapperDiv = document.createElement('div');
                wrapperDiv.style.position = 'relative';
                wrapperDiv.style.width = '100%';
                wrapperDiv.style.paddingBottom = '75%'; // 4:3 ratio
                
                element.style.position = 'absolute';
                element.style.top = '0';
                element.style.left = '0';
                element.style.width = '100%';
                element.style.height = '100%';
                
                // Přidání h3 (pokud existuje) a iframe do wrapperDiv
                if (videoBlocks[index - 1] && videoBlocks[index - 1].tagName.toLowerCase() === 'h3') {
                    wrapperDiv.appendChild(videoBlocks[index - 1]);
                }
                wrapperDiv.appendChild(element);
                
                // Přidání wrapperDiv do sliderContainer
                sliderContainer.appendChild(wrapperDiv);
                
                // Získání ID videa
                var videoSrc = element.getAttribute('src') || element.getAttribute('data-iframe-src');
                if (videoSrc && videoSrc.includes('/embed/')) {
                    var videoId = videoSrc.split('/embed/')[1].split('?')[0];
                    var thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    
                    // Vytvoření náhledového obrázku
                    var newThumbnail = document.createElement('a');
                    newThumbnail.classList.add('p-thumbnail', '--video');
                    newThumbnail.setAttribute('onclick', `swiffyslider.slideTo(sliderElement, '${existingSlides}');`);
                    newThumbnail.innerHTML = `<img src="${thumbnailUrl}" alt="Video Thumbnail">`;
                    
                    // Přidání nového thumbnailu do .p-thumbnails-inner > div
                    thumbnailsInner.appendChild(newThumbnail);
                    existingSlides++;
                }
            }
        });
    } else {
        console.error("No valid video elements found or slider structure missing.");
    }



    // Nový blok pro případ, kdy #productSlider NEexistuje
    if (!document.querySelector('#productSlider')) {
        var productVideos = document.querySelector('#productVideos');
        var imageWrapper = document.querySelector('.p-image-wrapper');

        if (productVideos && imageWrapper) {
            // Vytvoření .p-thumbnails-wrapper pokud neexistuje
            var thumbnailsWrapper = imageWrapper.querySelector('.p-thumbnails-wrapper');
            if (!thumbnailsWrapper) {
                thumbnailsWrapper = document.createElement('div');
                thumbnailsWrapper.classList.add('p-thumbnails-wrapper-videos');
                imageWrapper.appendChild(thumbnailsWrapper);
            }

            // Získání všech h3 a iframe uvnitř #productVideos
            var videoBlocks = productVideos.querySelectorAll('h3, iframe');

            videoBlocks.forEach((element, index) => {
                if (element.tagName.toLowerCase() === 'iframe') {
                    // Vytvoření wrapper divu
                    var wrapperDiv = document.createElement('div');
                    wrapperDiv.style.position = 'relative';
                    wrapperDiv.style.width = '100%';
                    wrapperDiv.style.paddingBottom = '75%'; // 4:3 poměr

                    element.style.position = 'absolute';
                    element.style.top = '0';
                    element.style.left = '0';
                    element.style.width = '100%';
                    element.style.height = '100%';

                    // Přidání h3 (pokud existuje) a iframe do wrapperDiv
                    if (videoBlocks[index - 1] && videoBlocks[index - 1].tagName.toLowerCase() === 'h3') {
                        wrapperDiv.appendChild(videoBlocks[index - 1]);
                    }
                    wrapperDiv.appendChild(element);

                    // Přidání wrapperDiv do thumbnailsWrapper
                    thumbnailsWrapper.appendChild(wrapperDiv);
                }
            });
        } else {
            console.warn('Nebyl nalezen #productVideos nebo .p-image-wrapper pro zobrazení videí bez #productSlider.');
        }
    }



}
