
(function(window, document, $, undefined) {

    "use strict";
    var $galleries;
    var $conceptGalleries;
    var $sketchGalleries;
    var $printGalleries;


    function setupScrollAnimation() {
        var textOffset = -35;
        // handle links with @href started with '#' only
        $(document).on('click', 'a[href^="#"]', function (e) {
            // target element id
            var id = $(this).attr('href');

            // target element
            var $id = $(id);
            if ($id.size() === 0) {
                return;
            }
            // prevent standard hash navigation (avoid blinking in IE)
            e.preventDefault();

            // top position relative to the document
            var pos = $(id).offset().top + textOffset;
            // animated top scrolling
            $('body, html').animate({ scrollTop: pos, easing: "easeInOutCubic", duration: 1000 });
        });
    }


    function onLoadedImage(imagesLoadedInstance, image) {
        //console.log("loaded: " + image);
        var $img = $(image.img);
        var $galleryItem = $img.parent();
        $galleryItem.removeClass("loading");

        $galleries.packery('once', 'layoutComplete', function () {
            $img.velocity("fadeIn");
            $galleryItem.velocity({
                backgroundColor: "#000000",
                backgroundColorAlpha: 0.0
            });
        });

        $galleries.packery({
            itemSelector: ".gallery-item",
            gutter: 15
        });
    }


    function main() {

        $(document).foundation();
        setupScrollAnimation();

        $galleries = $(".gallery");
        var $packeryGalleries = $(".js-packery");
        $conceptGalleries = $(".concept-gallery");
        $sketchGalleries = $(".sketch-gallery");
        $printGalleries = $(".print-gallery");


        var $packery = $packeryGalleries.packery({
            itemSelector: ".gallery-item",
            gutter: 15
        });

        window.galleryItems.forEach(function(elem) {
            var dom = sprintf("<div class='gallery-item loading medium-%i'><img style='opacity:0;' src='%s'></div>", 
                elem.size, elem.image);
            //console.log(dom);

            switch (elem.gallery) {
                case "concept":
                    $conceptGalleries.append($(dom));
                    break;
                case "sketch":
                    $sketchGalleries.append($(dom));
                    break;
                case "print":
                    $printGalleries.append($(dom));
                    break;
            }
        });
        $galleries.imagesLoaded().progress(onLoadedImage);
        $galleries.packery({
            itemSelector: ".gallery-item",
            gutter: 15
        });
    }


    /* Callback once DOM is loaded. */
    $(document).ready(function () {
        main();
    });




})(window, document, jQuery, undefined);



