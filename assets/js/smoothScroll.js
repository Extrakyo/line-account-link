$(document).on('click', '.menu ul li a', function (e) {
    e.preventDefault();
    const destination = $(this).attr('href');
    const linkScroll = $(destination).position().top;
    $('.container').stop().animate({
        scrollTop: linkScroll + 90
    }, 500);

    $('.menu').removeClass('show');
});