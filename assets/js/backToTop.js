$('.container').scroll(function () {
    var scrolled = $('.container').scrollTop();
    if (scrolled > 0) {
        if ($('.backToTop').not('.show')) {
            $('.backToTop').addClass('show');
        }
    } else {
        if ($('.backToTop').hasClass('show')) {
            $('.backToTop').removeClass('show');
        }
    }
});

$('.backToTop').on('click', function () {
    $('.container').animate({
        scrollTop: 0
    }, 500);
});