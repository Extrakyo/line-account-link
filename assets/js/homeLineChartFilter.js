$('#filterBtn').on('click', function () {
    $('.modals').addClass('show');
    $('.modals #lineChartFilter').addClass('show');
});

$('.modals #lineChartFilter .topbar .closeBtn').on('click', function () {
    $('.modals #lineChartFilter')[0].reset();
    $('.modals #lineChartFilter').addClass('fadeOut');
    setTimeout(function () {
        $('.modals #lineChartFilter').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
});

$('.modals #lineChartFilter .functions input[type="submit"]').on('click', function (e) {
    e.preventDefault();
    console.log($('.modals #lineChartFilter').serialize());
});