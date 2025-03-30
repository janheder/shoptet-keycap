if($(".id-404").length){const load404=html=>{const body=(new DOMParser).parseFromString(html,"text/html").querySelectorAll("#products-1 .product");for(let i=0;i<=3;i++)document.querySelector("#errorProductsWrap").appendChild(body[i])};function loadImg(){$("img").unveil()}fetch("/").then((response=>response.text())).then(load404).then(loadImg)}if(window.newsSelector=window.newsSelector||".news-wrapper .news-item:nth-child(-n+3)",$(".in-index").length){const loadNews=html=>{const body=(new DOMParser).parseFromString(html,"text/html").querySelectorAll(window.newsSelector),newsWrapper=document.querySelector(".in-index #newsWrapper");if(body.length>0&&newsWrapper)for(let i=0;i<body.length;i++)newsWrapper.appendChild(body[i]);else console.warn("No news items found or #newsWrapper not present.")},loadImg=()=>{$("img").unveil()};fetch("/blog/").then((response=>response.ok?response.text():(console.warn(`/blog not found or returned a non-OK status: ${response.status}`),null))).then((html=>{html&&(loadNews(html),loadImg())})).catch((error=>{console.error("Error fetching /blog:",error)}))}$(".in-blog").length&&$('.top-navigation-bar-menu a[target="blank"]').each((function(){let url=$(this).prop("href"),name=$(this).text();$(".content-inner article").append('<section class="blog-section --'+name+'"><h2>'+name+'</h2><div class="news-wrapper"></div></section>');fetch(url).then((response=>response.text())).then((html=>{const body=(new DOMParser).parseFromString(html,"text/html").querySelectorAll(".news-wrapper .news-item:nth-child(-n+3)");for(let i=0;i<=2;i++)document.querySelector(".content-inner article .blog-section.--"+name+" .news-wrapper").appendChild(body[i])}))})),$(".admin-bar").click((function(){$(".admin-bar").toggleClass("--active")})),$(".header-top").prepend('<div class="nav-menu-toggle" id="js-menuToggle"><span></span></div>'),$("#js-menuToggle, .navigation-close").click((function(){$("body").toggleClass("--menuActive")})),$(".navigation-buttons").prepend('<div class="nav-search" id="js-searchToggle"></div><div class="nav-user" id="js-userToggle">Uživatel</div>'),$("#js-userToggle").click((function(){$("body").toggleClass("--navUserActive")})),$(".user-action-login").on("click",(function(e){e.target===this&&$("body").toggleClass("--navUserActive")})),$(".user-action .login-widget .popup-widget-inner").append("<span class='login-close'></span>"),$(".login-close").click((function(){$("body").removeClass("--navUserActive")})),$("#js-searchToggle").click((function(){$("body").toggleClass("--searchActive"),$(".header-top .search .form-control").focus()})),$(".cart-count").on("touchstart",(function(){$("body").toggleClass("--cartActive")})),$(".menu-helper").click((function(){$("body").removeClass("--menuActive --navUserActive --searchActive --cartActive --advancedModal filters-visible --checkoutSidebarActive"),$("#filters").removeClass("filters"),$("#filters").removeClass("visible"),$("#filters-wrapper .filters-unveil-button-wrapper > a").text("Otevřít filtr")})),$("#filters-wrapper .filters-unveil-button-wrapper > a").click((function(){$("#filters-wrapper .filters-unveil-button-wrapper > a").text("Zavřít filtr")})),window.pageYOffset>=300&&$("body").addClass("--floatSearchActive"),$(window).scroll((function(){$(this).scrollTop()>300?$("body").addClass("--floatSearchActive"):$("body").removeClass("--floatSearchActive")})),document.querySelector("#formSearchForm .query-input").setAttribute("id","searchbox");const speechToggle=document.createElement("div");function startDictation(){if(window.hasOwnProperty("webkitSpeechRecognition")){let recognition=new webkitSpeechRecognition;recognition.continuous=!1,recognition.interimResults=!1,recognition.lang="cs-CZ",recognition.start(),recognition.onresult=function(e){document.getElementById("searchbox").value=e.results[0][0].transcript,recognition.stop(),document.getElementById("formSearchForm").submit()},recognition.onerror=function(e){recognition.stop()}}}if(speechToggle.setAttribute("id","speechToggle"),speechToggle.addEventListener("click",startDictation),document.querySelector(".search-form .btn").before(speechToggle),$(".type-detail").length){if($("body").append('<div class="advancedModal"><div class="advancedModal__inner"><h2 class="advancedModal__title">Zboží bylo přidáno do košíku</h2><div class="advancedModal__content"></div><div class="advancedModal__buttons"><a href="#" class="btn btn-ghost" id="advancedModalBack">Zpět do obchodu</a><a href="/kosik" class="btn">Přejít do košíku</a></div></div></div>'),$(".products-related").length){var related=$(".products-related").html();$(".advancedModal__inner").append('<div id="productsRelated"><h3 class="advancedModal__relatedTitle">Související produkty</h3><div class="products-block">'+related+"</div></div>")}function advanceOrderCustom(){$("body").addClass("--advancedModal"),$(".advancedModal__content").html("");var img=$(".p-detail-inner .p-image-wrapper a").html(),name=$(".p-detail-inner .p-detail-inner-header h1").html();if($(".p-detail-inner .parameter-dependent").length)var stock=$(".p-detail-inner .availability-value .parameter-dependent:not(.noDisplay) span").html();else stock=$(".p-detail-inner .availability-value").html();var amount=parseFloat($(".p-detail-inner .add-to-cart .amount").val()),priceSingle=$(".p-detail-inner .p-final-price-wrapper .price-final-holder:not(.noDisplay)").html(),priceTotal=parseFloat(priceSingle.replace(/ /g,""))*amount;$(".advancedModal__content").prepend('<div class="advancedProduct"><div class="advancedProduct-img">'+img+'</div><div class="advancedProduct-content"><h4 class="advancedProduct-name">'+name+'</h4><div class="advancedProduct-stock">Dostupnost<span>'+stock+'</span></div><div class="advancedProduct-amount">Počet kusů<span>'+amount+'x</span></div><div class="advancedProduct-priceTotal">Celková cena<span>'+priceTotal+" Kč</span></div></div></div>")}document.addEventListener("ShoptetCartAddCartItem",(function(){advanceOrderCustom()}),{passive:!0}),$(".advancedModal").on("click",(function(e){e.target===this&&$("body").removeClass("--advancedModal")})),$("#advancedModalBack").on("click",(function(){$("body").removeClass("--advancedModal")}))}if($(".type-index, .type-category").length&&($("body").append('<div class="advancedModal --product"><div class="advancedModal__inner"><h2 class="advancedModal__title">Zboží bylo přidáno do košíku</h2><div class="advancedModal__content"></div><div class="advancedModal__buttons"><a href="#" class="btn btn-ghost">Zpět do obchodu</a><a href="/kosik" class="btn">Přejít do košíku</a></div></div></div>'),$(".add-to-cart-button").on("click",(function(){var img=$(this).closest(".p").find(".image").html(),name=$(this).closest(".p").find(".name").html(),stock=$(this).closest(".p").find(".availability").html(),amount=parseFloat($(this).closest(".p").find("input[name='amount']").val()),priceSingle=$(this).closest(".p").find(".price-final strong").html(),priceTotal=parseFloat(priceSingle.replace(/ /g,""))*amount;document.addEventListener("ShoptetCartAddCartItem",(function(){$("body").addClass("--advancedModal"),$(".advancedModal__content").html(""),$(".advancedModal__content").prepend('<div class="advancedProduct"><div class="advancedProduct-img">'+img+'</div><div class="advancedProduct-content"><div class="advancedProduct-name">'+name+'</div><div class="advancedProduct-stock">Dostupnost<span>'+stock+'</span></div><div class="advancedProduct-amount">Počet kusů<span>'+amount+'x</span></div><div class="advancedProduct-priceTotal">Celková cena<span>'+priceTotal+" Kč</span></div></div></div>")}),{passive:!0})})),$(".advancedModal").on("click",(function(e){e.target===this&&$("body").removeClass("--advancedModal")}))),$(".p-detail-inner-header").insertAfter(".p-detail-info"),$(".type-detail").length){const pname=$(".p-detail-inner-header h1").text(),pPrice=$(".product-top .price-final-holder:not(.noDisplay)").text();$("body").append('<div class="floating-bar"><div class="floating-product-content"><div class="floating-product-name">'+pname+'</div><div class="floating-product-price">'+pPrice+'</div></div><button type="submit" form="product-detail-form" class="btn">Do košíku</button></div>'),$(window).scroll((function(){$(this).scrollTop()>800?$("body").addClass("--floatBarActive"):$("body").removeClass("--floatBarActive")})),document.addEventListener("ShoptetSurchargesPriceUpdated",(function(){const pPrice=$(".product-top .price-final-holder:not(.noDisplay)").text();$(".floating-product-price").text(pPrice)}),{passive:!0})}function relocateCartHeader(){$(".cart-header").length&&$(".cart-header").insertBefore(".cart-inner")}$(".shipping-options").insertAfter(".availability-value .availability-label:last-child"),$(".menu-level-1 > li.ext").each((function(){$(this).prepend('<div class="menu-item-responsive"></div>');let catLink=$(this).children("a").prop("href");$(this).find(".menu-level-2").prepend('<a class="menu-item-more" href="'+catLink+'">Zobrazit vše</a>')})),$(".mobile").length&&$(".menu-level-1>li.ext>a").click((function(){return $(this).parent(".ext").toggleClass("--active"),!1})),$(".menu-level-2").each((function(){$(this).prepend('<span class="backSubmenu">Zpět</span>')})),$(".backSubmenu").click((function(){$(this).closest("li").toggleClass("--active")})),$(".contact-box").length&&$(".contact-box").clone().insertBefore("#js-userToggle"),$("#customerLogin").length&&$("#customerLogin .password-helper a:last-child").insertAfter("#customerLogin .input-wrapper.password"),relocateCartHeader(),document.addEventListener("ShoptetCartUpdated",(function(){relocateCartHeader()}),{passive:!0});const cartHeader=document.querySelector(".ordering-process .cart-header");cartHeader&&cartHeader.append(Object.assign(document.createElement("li"),{className:"step step-4",innerHTML:"<strong><span>Dokončení objednávky</span></strong>"})),$(".form-group input, .form-group textarea").on("focus",(function(){$(this).closest(".form-group").addClass("--activeFocus")})).blur((function(){$(this).closest(".form-group").removeClass("--activeFocus")})),$(".form-group input, .form-group textarea").keyup((function(){var input=$(this);""==input.val()?input.closest(".form-group").removeClass("--activeFilled"):input.closest(".form-group").addClass("--activeFilled")})),$(document).ready((function(){""!==$(".form-group input, .form-group textarea").val()&&$(".form-group input, .form-group textarea").closest(".form-group").addClass("--activeFilled")}));var pagination=document.querySelector(".pagination");if(null!==pagination){function refactorPagi(){var pagination=document.querySelector(".pagination"),current=parseInt(pagination.querySelector(".current").textContent),max=parseInt(pagination.lastElementChild.textContent),currentUrl=window.location.href,queryIndex=currentUrl.indexOf("?"),baseUrl=-1===queryIndex?currentUrl:currentUrl.slice(0,queryIndex);baseUrl=baseUrl.replace(/\/strana-\d+/g,"");for(var queryParams=-1===queryIndex?"":currentUrl.slice(queryIndex);pagination.firstChild;)pagination.removeChild(pagination.firstChild);for(var i=1;i<=max;i++)i===current?pagination.insertAdjacentHTML("beforeend","<strong class='current'>"+i+"</strong>"):current-i>2||i-current>1?1===i||i===max?pagination.insertAdjacentHTML("beforeend","<a href='"+baseUrl+"/strana-"+i+queryParams+"'>"+i+"</a>"):pagination.insertAdjacentHTML("beforeend","<a class='hidden' href='"+baseUrl+"/strana-"+i+queryParams+"'>"+i+"</a>"):pagination.insertAdjacentHTML("beforeend","<a href='"+baseUrl+"/strana-"+i+queryParams+"'>"+i+"</a>");current!==max&&pagination.insertAdjacentHTML("beforeend","<a href='"+baseUrl+"/strana-"+(current+1)+queryParams+"' class='next'>></a>"),1!==current&&pagination.insertAdjacentHTML("afterbegin","<a href='"+baseUrl+"/strana-"+(current-1)+queryParams+"' class='previous'><</a>")}refactorPagi(),document.addEventListener("ShoptetDOMPageContentLoaded",(function(){refactorPagi()}),{passive:!0}),document.addEventListener("ShoptetDOMPageMoreProductsLoaded",(function(){refactorPagi()}),{passive:!0})}const footer=document.getElementById("footer");if(footer&&footer.addEventListener("click",(function(event){event.target.matches("#footer .custom-footer > div h4")&&event.target.classList.toggle("--active")})),$(".votes-wrap").length){let elem=document.querySelector(".votes-wrap");new Masonry(elem,{itemSelector:".vote-wrap",gutter:30})}$(document).ready((function(){$("#faqSearch").on("keyup",(function(){let searchQuery=$(this).val().trim().toLowerCase();if(""===searchQuery)return $("#FaqResult *").show(),void $("#FaqResult details").attr("open",!1);let escapedQuery=searchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),regex=new RegExp(escapedQuery,"i");$("#FaqResult details").each((function(){let detailsText=$(this).text().toLowerCase();regex.test(detailsText)?$(this).show().attr("open",!0):$(this).hide().attr("open",!1)}))}))}));let price=$(".price-final-holder").text(),priceFormat=parseInt(price.replace(/\D/g,"")),saleNum=10,priceSale=priceFormat*(.01*(100-saleNum));if($("<span class='price-code-holder'>"+priceSale+" Kč s kódem SLEVA</span>").insertBefore(".price-final-holder"),$("#checkoutSidebar .cart-item").length){const loadPicImages=html=>{let nodes=(new DOMParser).parseFromString(html,"text/html"),body=nodes.querySelectorAll(".cart-p-image a"),num=nodes.querySelectorAll(".cart-p-image a").length;for(let i=0;i<num;i++)document.querySelector("#checkoutSidebar .cart-item:nth-child("+(i+1)+")").prepend(body[i]);$("img").unveil()};fetch("/kosik/").then((response=>response.text())).then(loadPicImages).then($("img").unveil())}$(document).ready((function(){$("#checkoutContent").prepend('<div class="btn" id="checkoutSidebarToggle">Rekapitulace objednávky</div>'),$("#checkoutSidebarToggle").click((function(){$("body").toggleClass("--checkoutSidebarActive")}))})),$("#filters-wrapper").length&&($("#filters-wrapper").append('<div class="gridSwitch"><span id="gridSwitch-1" class="--active"></span><span id="gridSwitch-2"></span><span id="gridSwitch-3"></span></div>'),$("#gridSwitch-1").click((function(){$(this).addClass("--active"),$("#gridSwitch-2, #gridSwitch-3").removeClass("--active"),$("#products").removeClass("--grid3"),$("#products").removeClass("--inline")})),$("#gridSwitch-2").click((function(){$(this).addClass("--active"),$("#gridSwitch-1, #gridSwitch-3").removeClass("--active"),$("#products").addClass("--grid3"),$("#products").removeClass("--inline")})),$("#gridSwitch-3").click((function(){$(this).addClass("--active"),$("#gridSwitch-1, #gridSwitch-2").removeClass("--active"),$("#products").removeClass("--grid3"),$("#products").addClass("--inline")})));let necessaryVariantData=shoptet.variantsSplit.necessaryVariantData;function updateImageURL(){let parameterIdParts=[];document.querySelectorAll("select.hidden-split-parameter").forEach((function(select){let parameterId=select.getAttribute("data-parameter-id"),selectedOptionValue=select.value;parameterIdParts.push(parameterId+"-"+selectedOptionValue)})),document.querySelectorAll("div.hidden-split-parameter").forEach((function(div){let parameterId=div.getAttribute("data-parameter-id"),inputs=div.querySelectorAll('input[type="radio"]:checked'),selectedOptionValue=inputs.length>0?inputs[0].value:"";parameterIdParts.push(parameterId+"-"+selectedOptionValue)}));let permutations=function generatePermutations(array){if(1===array.length)return[array];let permutations=[];for(let i=0;i<array.length;i++){let restPermutations=generatePermutations([...array.slice(0,i),...array.slice(i+1)]);for(let permutation of restPermutations)permutations.push([array[i],...permutation])}return permutations}(parameterIdParts),possibleKeys=permutations.map((permutation=>permutation.join("-"))),variant=null;for(let possibleKey of possibleKeys)if(necessaryVariantData[possibleKey]){variant=necessaryVariantData[possibleKey];break}if(!variant)return void console.error("No matching variant found for keys:",possibleKeys);let bigImageURL=variant.variantImage.big;console.log(`Found big image URL: ${bigImageURL}`);let sliderLinks=document.querySelectorAll(".slider-container a");for(let i=0;i<sliderLinks.length;i++){if(sliderLinks[i].getAttribute("href")===bigImageURL){swiffyslider.slideTo(sliderElement,i);break}}}document.querySelectorAll('div.hidden-split-parameter input[type="radio"]').forEach((function(input){input.addEventListener("change",updateImageURL)})),document.querySelectorAll("select.hidden-split-parameter").forEach((function(select){select.addEventListener("change",updateImageURL)}));
//# sourceMappingURL=maps/custom.js.map
