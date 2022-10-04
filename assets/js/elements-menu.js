function updateMenu() {
    var menuCate = [];
    var menuName = [];
    $('.wrapper .elements section').each(function () {
        var cate = $(this).data('cate');
        menuCate.push(cate);
    });
    menuCate = new Set(menuCate);

    menuCate.forEach(function (e) {
        var cateHTML = `<div class="cate">` + e + `</div>`;
        $('.menu').append(cateHTML);
        var nameHTML = `<ul>`;
        $('.wrapper .elements section[data-cate="' + e + '"]').each(function () {
            nameHTML = nameHTML + `<li><a href="#` + $(this).attr('id') + `">` + $(this).data('name') + `</a></li>`;
        });
        nameHTML = nameHTML + `</ul>`;
        $('.menu').append(nameHTML);
    });

}
updateMenu();

$('#menuToggle').on('click', function () {
    $(this).toggleClass('active');
    $(this).find('i').toggleClass('fa-bars').toggleClass('fa-times');
    $('.menu').toggleClass('show');
});

$('.container').on('scroll', function () {
    $('.wrapper .elements section').each(function () {
        var partOffset = $(this).offset().top;
        if (partOffset <= 70 && partOffset > 0) {
            var targetId = $(this).attr('id');
            $('.menu ul li a').each(function () {
                if ($(this).attr('href') == '#' + targetId) {
                    $(this).css('font-weight', 600);
                } else {
                    $(this).css('font-weight', 'inherit');
                }
            });
        }
    });
});