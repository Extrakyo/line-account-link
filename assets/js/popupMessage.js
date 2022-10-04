// var successSnd = '../sounds/popupSuccess.wav';
// var warningSnd = '../sounds/popupWarning.wav';
// var alertingSnd = '../sounds/popupAlerting.wav';

// var successSnd = 'sounds/popupSuccess.wav';
// var warningSnd = 'sounds/popupWarning.wav';
// var alertingSnd = 'sounds/popupAlerting.wav';

var popupTimeOut;

function createPopup(notiType, message) {
    let id = Math.random().toString(36).substr(2, 10);
    var icon = '';
    switch (notiType) {
        case 'warning':
            icon = 'fa-times-circle';
            break;
        case 'success':
            icon = 'fa-check-circle';
            break;
        case 'alerting':
            icon = 'fa-exclamation-circle';
            break;
    }
    var popupHtml = `
    <div class="pop ` + notiType + ` show" id="` + id + `">
    <div class="icon">
    <i class="fas ` + icon + ` fa-fw"></i>
    </div>
    <div class="popContent">` + message + `</div>
    </div>`;
    $('.popupMessage').append(popupHtml);
    popupTimeOut = setTimeout(function () {
        var popupMessage = $('#popupMessage .pop');
        for (let i = 0; i < popupMessage.length; i++) {
            if ($(popupMessage[i]).attr('id') == id) {
                $(popupMessage[i]).addClass('fadeOut');
                setTimeout(function () {
                    // console.log(id);
                    $('#' + id).remove();
                }, 300);
                break;
            }
        }
    }, 3000);
}

function createWarningPopup(message, path) {
    // path = 'sounds/popupWarning.wav';
    var snd = new Audio(path);
    // var snd = new Audio('sounds/popupWarning.wav');
    snd.play();
    var message = message;
    createPopup('warning', message);
}

function createSuccessPopup(message, path) {
    // path = 'sounds/popupSuccess.wav';
    var snd = new Audio(path);
    // var snd = new Audio('sounds/popupSuccess.wav');
    snd.play();
    var message = message;
    createPopup('success', message);
}

function createAlertingPopup(message, path) {
    // path = 'sounds/popupAlerting.wav';
    var snd = new Audio(path);
    // var snd = new Audio('sounds/popupAlerting.wav');
    snd.play();
    var message = message;
    createPopup('alerting', message);
}

$(document).on('mouseover', '.popupMessage .pop', function () {
    clearTimeout(popupTimeOut);
});

$(document).on('mouseout', '.popupMessage .pop', function () {
    let id = this.id;
    popupTimeOut = setTimeout(function () {
        var popupMessage = $('#popupMessage .pop');
        for (let i = 0; i < popupMessage.length; i++) {
            $(popupMessage[i]).addClass('fadeOut');
            setTimeout(function () {
                // console.log(id);
                $('#' + id).remove();
            }, 300);
        }
    }, 3000);
});