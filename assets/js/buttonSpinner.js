function buttonSpinner(id) {
    const downloadId = id;
    setTimeout(function () {
        $('#' + downloadId).find('.text').addClass('show');
        $('#' + downloadId).find('.buttonSpinner').removeClass('show');
    }, 500);
    $('#' + downloadId).find('.buttonSpinner').addClass('show');
    $('#' + downloadId).find('.text').removeClass('show');
}

function showButtonSpinner(id) {
    $('#' + id).find('.text').addClass('show');
    $('#' + id).find('.buttonSpinner').removeClass('show');
}

function hideButtonSpinner(id) {
    $('#' + id).find('.buttonSpinner').addClass('show');
    $('#' + id).find('.text').removeClass('show');
}

$(document).on('click', 'button.btnSpinner', function () {
    // const btnSpinnerId = this.id;
    // setTimeout(function () {
    //     $('#' + btnSpinnerId).find('.text').addClass('show');
    //     $('#' + btnSpinnerId).find('.buttonSpinner').removeClass('show');
    // }, 500);
    // $('#' + btnSpinnerId).find('.buttonSpinner').addClass('show');
    // $('#' + btnSpinnerId).find('.text').removeClass('show');

    var btnSpinnerId = $(this);
    setTimeout(function () {
        btnSpinnerId.find('.text').addClass('show');
        btnSpinnerId.find('.buttonSpinner').removeClass('show');
    }, 500);
    btnSpinnerId.find('.buttonSpinner').addClass('show');
    btnSpinnerId.find('.text').removeClass('show');
});