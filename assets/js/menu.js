$('#menuToggle').on('click', function () {
    $('.sidebar').toggleClass('active');
});

$('#sidebarToggle').on('click', function () {
    $('.sidebar').removeClass('active');
});

$('#pageContainer').on('load', function () {
    var currentPage = localStorage.getItem('currentPage');
    // console.log(currentPage);
    $('.menuItem').each(function () {
        var menuItem = $(this).find('a').data('page');
        if (menuItem != currentPage) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
    });
    $('.navbarItem').each(function () {
        var navbarItem = $(this).find('a').data('page');
        if (navbarItem != currentPage) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
    });

    var iframeHttp = new XMLHttpRequest();
    iframeHttp.open('HEAD', $('#pageContainer').prop('src'), false);
    iframeHttp.send();
    if (iframeHttp.status != 200) {
        $('iframe[name="pageContainer"]').prop('src', `pages/error.html?code=${iframeHttp.status}`);
    }
    // $('.sidebar .menu ul li:not(#' + currentPage + ')').removeClass('active');
    // $('#' + currentPage).addClass('active');
});

$('.menuItem a[data-page]').on('click', function (e) {
    e.preventDefault();
    $('.menuItem').removeClass('active');
    $(this).parent('.menuItem').addClass('active');
    localStorage.setItem('currentPage', $(this).data('page'));
    // Test
    $('iframe[name="pageContainer"]').prop('src', $(this).prop('href'));
    $('.sidebar').addClass('fadeOut');
    setTimeout(function () {
        $('.sidebar').removeClass('fadeOut').removeClass('active');
    }, 300);
});

$('.menu ul li.menuGroup .groupName').on('click', function () {
    if ($(this).parent('li.menuGroup').hasClass('show')) {
        $(this).parent('li.menuGroup').removeClass('show')
    } else {
        $(this).parent('li.menuGroup').addClass('show')
    }
});

$('.menu ul li.menuGroup .dropdown ul .menuItem a[data-page]').on('click', function (e) {
    e.preventDefault();
    $('.menuItem').removeClass('active');
    $(this).parent('.menuItem').addClass('active');
    localStorage.setItem('currentPage', $(this).data('page'));
    // Test
    $('iframe[name="pageContainer"]').prop('src', $(this).prop('href'));
    $('.sidebar').addClass('fadeOut');
    setTimeout(function () {
        $('.sidebar').removeClass('fadeOut').removeClass('active');
    }, 300);
});

$('.navbar ul li.navbarItem a').on('click', function (e) {
    e.preventDefault();
    $('.navbar ul li.navbarItem').removeClass('active');
    $(this).parent('li').addClass('active');
    localStorage.setItem('currentPage', $(this).data('page'));
    // Test
    $('iframe[name="pageContainer"]').prop('src', $(this).prop('href'));
});

document.querySelector('#backToPreviousPage').addEventListener('click', function () {
    document.querySelector('iframe[name="pageContainer"]').contentWindow.history.back();

    // // Page forward
    // // Way 1
    // window.history.forward();
    // // Way2
    // window.history.go(1);
    // // Way 1 (iframe)
    // iframe.contentWindow.history.forward();
    // // Way2 (iframe)
    // iframe.contentWindow.history.go(1);
    // // Page back
    // // Way 1
    // window.history.back();
    // // Way2
    // window.history.go(-1);
    // // Way 1 (iframe)
    // iframe.contentWindow.history.back();
    // // Way2 (iframe)
    // iframe.contentWindow.history.go(-1);
});

$('#goToSettings').on('click', function () {
    $('.menuItem').removeClass('active');
    $('.menu a[data-page="settings"]').parent('.menuItem').addClass('active');
    localStorage.setItem('currentPage', $(this).data('page'));
    $('iframe[name="pageContainer"]').prop('src', 'pages/settings.html');
    $('.sidebar').addClass('fadeOut');
    setTimeout(function () {
        $('.sidebar').removeClass('fadeOut').removeClass('active');
    }, 300);
});