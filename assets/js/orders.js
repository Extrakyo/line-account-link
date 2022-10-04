function fetchTodayOrders() {
    console.log('fetchTodayOrders');
}

function fetchHistoryOrders() {
    console.log('fetchHistoryOrders');
}

var dataTable = $('.tabs ul li.active').data('table');
if (dataTable == 'history') {
    $('#todayFilter').removeClass('show');
    $('#todayTableSearch').val('');
    $('.modals #todayFilterModal')[0].reset();
    $('#historyFilter').addClass('show');
    // $('.pagination ul li[data-table]').attr('data-table', 'history');
    // $('.pagination .select select[data-table]').attr('data-table', 'history');
    fetchHistoryOrders();
} else {
    $('#historyFilter').removeClass('show');
    $('#historyTableSearch').val('');
    $('.modals #historyFilterModal')[0].reset();
    $('#todayFilter').addClass('show');
    // $('.pagination ul li[data-table]').attr('data-table', 'today');
    // $('.pagination .select select[data-table]').attr('data-table', 'today');
    fetchTodayOrders();
}

$('.tabs ul li').on('click', function () {
    $('.tabs ul li').removeClass('active');
    $(this).addClass('active');
    if ($(this).data('table') == 'history') {
        $('#todayFilter').removeClass('show');
        $('#todayTableSearch').val('');
        $('.modals #todayFilterModal')[0].reset();
        $('#historyFilter').addClass('show');
        // $('.pagination ul li[data-table]').attr('data-table', 'history');
        // $('.pagination .select select[data-table]').attr('data-table', 'history');
        fetchHistoryOrders();
    } else {
        $('#historyFilter').removeClass('show');
        $('#historyTableSearch').val('');
        $('.modals #historyFilterModal')[0].reset();
        $('#todayFilter').addClass('show');
        // $('.pagination ul li[data-table]').attr('data-table', 'today');
        // $('.pagination .select select[data-table]').attr('data-table', 'today');
        fetchTodayOrders();
    }
});

$('#todayTableFilter').on('click', function () {
    $('.modals').addClass('show');
    $('#todayFilterModal').addClass('show');
});

$('.modals #todayFilterModal .topbar .closeBtn').on('click', function () {
    $('.modals #todayFilterModal')[0].reset();
    $('.modals').removeClass('show');
    $('.modals #todayFilterModal').removeClass('show');
});

$('#historyTableFilter').on('click', function () {
    $('.modals').addClass('show');
    $('#historyFilterModal').addClass('show');
});

$('.modals #historyFilterModal .topbar .closeBtn').on('click', function () {
    $('.modals #historyFilterModal')[0].reset();
    $('.modals').removeClass('show');
    $('.modals #historyFilterModal').removeClass('show');
});

$('button[data-type="drawer"]').on('click', function () {
    $('.drawer').addClass('show');
});

$('.drawer header .btn').on('click', function () {
    $('.drawer').removeClass('show');
});