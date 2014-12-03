$(document).ready(function() {

    $(document).foundation();
    SetupScrollAnimation();

    var $galleries = $(".js-packery");

    //var packery = $galleries.packery({
    //    itemSelector: '.packery_item',
    //    gutter: 15
    //});

    //var fn = function () { console.log("print test function"); };


    var $container = $galleries.imagesLoaded( function() {
        // initialize Packery after all images have loaded
        $container.packery({
            itemSelector: '.packery_item',
            gutter: 15
        });
    });

    //$galleries.imagesLoaded(function () {
    //    packery.packery();
    //    // images have loaded
    //});
    //imagesLoaded($packeryGalleries, function () {
    //    console.log("instance: ");
    //});

    console.log("after");
});





function SetupScrollAnimation() {
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
        var pos = $(id).offset().top;

        // animated top scrolling
        $('body, html').animate({scrollTop: pos, easing: "easeInOutQuad", duration: 1000});
    });
}
