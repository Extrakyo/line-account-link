$('.alertContainer .alertMessage.warning .topbar .closeBtn').on('click', function () {
    $('.alertContainer').removeClass('show');
    $('.alertMessage.warning').removeClass('show');
    $('.alertMessage.warning .content').text(null);
    if ($('.alertMessage.success').hasClass('show')) {
        $('.alertMessage.success').removeClass('show');
    }
    if ($('.alertMessage.alerting').hasClass('show')) {
        $('.alertMessage.alerting').removeClass('show');
    }
});

$('.alertContainer .alertMessage.warning .btns .closeBtn').on('click', function () {
    $('.alertContainer').removeClass('show');
    $('.alertMessage.warning').removeClass('show');
    $('.alertMessage.warning .content').text(null);
    if ($('.alertMessage.success').hasClass('show')) {
        $('.alertMessage.success').removeClass('show');
    }
    if ($('.alertMessage.alerting').hasClass('show')) {
        $('.alertMessage.alerting').removeClass('show');
    }
});

// $('.alertContainer .alertMessage.warning .btns .secondary').on('click', function () {
//     $('.alertContainer').removeClass('show');
//     $('.alertMessage.warning').removeClass('show');
// });

$('.alertContainer .alertMessage.success .topbar .closeBtn').on('click', function () {
    $('.alertContainer').removeClass('show');
    $('.alertMessage.success').removeClass('show');
    $('.alertMessage.success .content').text(null);
    if ($('.alertMessage.warning').hasClass('show')) {
        $('.alertMessage.warning').removeClass('show');
    }
    if ($('.alertMessage.alerting').hasClass('show')) {
        $('.alertMessage.alerting').removeClass('show');
    }
});

$('.alertContainer .alertMessage.success .btns .closeBtn').on('click', function () {
    $('.alertContainer').removeClass('show');
    $('.alertMessage.success').removeClass('show');
    $('.alertMessage.success .content').text(null);
    if ($('.alertMessage.warning').hasClass('show')) {
        $('.alertMessage.warning').removeClass('show');
    }
    if ($('.alertMessage.alerting').hasClass('show')) {
        $('.alertMessage.alerting').removeClass('show');
    }
});

// $('.alertContainer .alertMessage.success .btns .secondary').on('click', function () {
//     $('.alertContainer').removeClass('show');
//     $('.alertMessage.success').removeClass('show');
// });

$('.alertContainer .alertMessage.alerting .topbar .closeBtn').on('click', function () {
    $('.alertContainer').removeClass('show');
    $('.alertMessage.alerting').removeClass('show');
    $('.alertMessage.alerting .content').text(null);
    if ($('.alertMessage.warning').hasClass('show')) {
        $('.alertMessage.warning').removeClass('show');
    }
    if ($('.alertMessage.success').hasClass('show')) {
        $('.alertMessage.success').removeClass('show');
    }
});

$('.alertContainer .alertMessage.alerting .btns .closeBtn').on('click', function () {
    $('.alertContainer').removeClass('show');
    $('.alertMessage.alerting').removeClass('show');
    $('.alertMessage.alerting .content').text(null);
    if ($('.alertMessage.warning').hasClass('show')) {
        $('.alertMessage.warning').removeClass('show');
    }
    if ($('.alertMessage.success').hasClass('show')) {
        $('.alertMessage.success').removeClass('show');
    }
});