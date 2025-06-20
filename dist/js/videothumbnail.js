
/*

*/


$(function() {
    var productVideos = $('#productVideos');
    var productSlider = $('#productSlider');
  
    if (productSlider.length) {
      // Pokud #productSlider existuje, uložíme globálně sliderElement
      window.sliderElement = document.getElementById('productSlider');
  
      var videoBlocks = productVideos.find('h3, iframe');
      var sliderContainer = $('#productSlider .slider-container');
      var thumbnailsInner = $('.p-thumbnails-inner > div');
  
      if (videoBlocks.length > 0 && sliderContainer.length && thumbnailsInner.length) {
        var existingSlides = sliderContainer.children().length;
  
        videoBlocks.each(function(index) {
          var element = this;
          if (element.tagName.toLowerCase() === 'iframe') {
            var wrapperDiv = $('<div></div>').css({
              position: 'relative',
              width: '100%',
              paddingBottom: '75%' // 4:3 poměr
            });
  
            $(element).css({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            });
  
            if (videoBlocks[index - 1] && videoBlocks[index - 1].tagName.toLowerCase() === 'h3') {
              wrapperDiv.append(videoBlocks[index - 1]);
            }
            wrapperDiv.append(element);
  
            sliderContainer.append(wrapperDiv);
  
            var videoSrc = $(element).attr('src') || $(element).attr('data-iframe-src') || '';
            if (videoSrc.includes('/embed/')) {
              var videoId = videoSrc.split('/embed/')[1].split('?')[0];
              var thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  
              var newThumbnail = $('<a></a>')
                .addClass('p-thumbnail --video')
                .attr('onclick', `swiffyslider.slideTo(window.sliderElement, '${existingSlides}');`)
                .html(`<img src="${thumbnailUrl}" alt="Video Thumbnail" width="100" height="100">`);
  
              thumbnailsInner.append(newThumbnail);
              existingSlides++;
            }
          }
        });
      } else {
        console.error("No valid video elements found or slider structure missing.");
      }
  
    } else if (productVideos.length) {
      var $imageWrapper = $('.p-image-wrapper');
  
      if ($imageWrapper.length) {
        // Vytvoření #productSlider se strukturou
        var $slider = $('<div id="productSlider" class="swiffy-slider slider-nav-arrow slider-indicators-round slider-nav-animation slider-nav-animation-slow slider-item-ratio-4x3 slider-item-first-visible"></div>');
        var $sliderContainer = $('<div class="slider-container"></div>');
        $slider.append($sliderContainer);
  
        // Přesun hlavního obrázku do slideru jako první slide
        var $mainImageLink = $imageWrapper.find('.p-main-image').first();
        if ($mainImageLink.length) {
          var $mainImageSlide = $('<div></div>').append($mainImageLink.clone(true, true));
          $sliderContainer.append($mainImageSlide);
        }
  
        // Vytvoření .p-thumbnails-wrapper a její struktury
        var $thumbnailsWrapper = $('<div class="p-thumbnails-wrapper"></div>');
        var $thumbnails = $('<div class="p-thumbnails p-thumbnails-horizontal"></div>');
        var $thumbnailsInner = $('<div class="p-thumbnails-inner"></div>');
        var $thumbnailsInnerInner = $('<div></div>');
  
        // Přidej slider navigační tlačítka
        $slider.append('<button type="button" class="slider-nav" aria-label="Previous"></button><button type="button" class="slider-nav slider-nav-next" aria-label="Next"></button>');
        

        // Vlož slider jako první do .p-image-wrapper
        $imageWrapper.prepend($slider);
  
        // Vlož p-thumbnails-wrapper jako druhý
        $imageWrapper.append($thumbnailsWrapper);
        $thumbnailsWrapper.append($thumbnails);
        $thumbnails.append($thumbnailsInner);
        $thumbnailsInner.append($thumbnailsInnerInner);
  
        // Globálně ulož sliderElement
        window.sliderElement = document.getElementById('productSlider');
  
        // Hlavní obrázek do thumbnailů jako první, zvýrazněný
        var $mainImage = $mainImageLink.find('img').first();
        var mainSrc = $mainImage.attr('data-src') || $mainImage.attr('src') || '';
        var mainAlt = $mainImage.attr('alt') || '';
  
        if (mainSrc) {
          var $mainThumbnail = $('<a></a>')
            .addClass('p-thumbnail highlighted')
            .attr('onclick', 'swiffyslider.slideTo(window.sliderElement, "0");')
            .html(`<img src="${mainSrc}" alt="${mainAlt}" width="100" height="100" data-src="${mainSrc}" fetchpriority="low" loading="lazy">`);
          $thumbnailsInnerInner.append($mainThumbnail);
        }
  
        // Přidání videí do slideru a thumbnailů
        var videoBlocks = productVideos.find('h3, iframe');
        var existingSlides = $sliderContainer.children().length;
  
        videoBlocks.each(function(index) {
          var element = this;
          if (element.tagName.toLowerCase() === 'iframe') {
            var $wrapperDiv = $('<div></div>').css({
              position: 'relative',
              width: '100%',
              paddingBottom: '75%'
            });
  
            $(element).css({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            });
  
            if (videoBlocks[index - 1] && videoBlocks[index - 1].tagName.toLowerCase() === 'h3') {
              $wrapperDiv.append(videoBlocks[index - 1]);
            }
            $wrapperDiv.append(element);
            $sliderContainer.append($wrapperDiv);
  
            var videoSrc = $(element).attr('src') || $(element).attr('data-iframe-src') || '';
            if (videoSrc.includes('/embed/')) {
              var videoId = videoSrc.split('/embed/')[1].split('?')[0];
              var thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  
              var $newThumbnail = $('<a></a>')
                .addClass('p-thumbnail --video')
                .attr('onclick', `swiffyslider.slideTo(window.sliderElement, '${existingSlides}');`)
                .html(`<img src="${thumbnailUrl}" alt="Video Thumbnail" width="100" height="100">`);
  
              $thumbnailsInnerInner.append($newThumbnail);
              existingSlides++;
            }
          }
        });
  
        // Skrytí původního hlavního obrázku
        $(".product-top .p-image").attr('style', 'display: none !important');
        window.swiffyslider.init();
      }
    }
  });
  




