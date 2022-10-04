var successSnd = '../sounds/popupSuccess.wav';
var warningSnd = '../sounds/popupWarning.wav';
var alertingSnd = '../sounds/popupAlerting.wav';

var timeOptions = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '24:00', ];

function fetchJob() {
    $.ajax({
        url: '../php/fetchJob.php',
        type: 'POST',
        async: false,
        dataType: 'json',
        beforeSend: function () {
            $('#jobTitleManagement').html('<section class="noData">職位名稱獲取中...</section>');
        },
        success: function (data) {
            if (data['status'] == 'success') {
                $('#jobTitleManagement').html(data['result']);
            } else {
                createWarningPopup(data['result'], warningSnd);
            }
        }
    });
}

fetchJob();

$(document).on('change', 'input[name="rest"]', function () {
    var weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (this.checked) {
        $(`[data-group="${weekDays[this.value - 1]}"]`).attr('style', 'display: none;');
        $(`[data-group="${weekDays[this.value - 1]}"] select`).attr('disabled', true);
        $(`[data-group="${weekDays[this.value - 1]}"] select`).attr('required', false);
        $(`[data-group="${weekDays[this.value - 1]}"] [data-type="removeTime"]`).addClass('disabled');
    } else {
        $(`[data-group="${weekDays[this.value - 1]}"]`).attr('style', '');
        $(`[data-group="${weekDays[this.value - 1]}"] select`).attr('disabled', false);
        $(`[data-group="${weekDays[this.value - 1]}"] select`).attr('required', true);
        $(`[data-group="${weekDays[this.value - 1]}"] [data-type="removeTime"]`).removeClass('disabled');
    }
});

$(document).on('click', '[data-type="addTime"]', function (e) {
    e.preventDefault();
    timeOptionsLength = timeOptions.length - 1;
    var currentCount = parseInt(this.getAttribute('data-count')) + 1;
    var currentGroup = $(this).data('group');
    this.setAttribute('data-count', currentCount);
    $(this).attr('data-count', currentCount);
    var appendHTML = `<div class="flexInputs" data-group="${currentGroup}">`;
    for (var i in timeOptions) {
        if (i == 0) {
            appendHTML = appendHTML + `<div class="select flex"><select name="${currentGroup}OpenHrs[]" id="${currentGroup}Open${currentCount}"><option value="" selected hidden>請選擇</option>`;
            appendHTML = appendHTML + `<option value="${timeOptions[i]}">${timeOptions[i]}</option>`;
        } else if (i == timeOptionsLength) {
            appendHTML = appendHTML + `<option value="${timeOptions[i]}">${timeOptions[i]}</option>`;
            appendHTML = appendHTML + `</select></div>`;
        } else {
            appendHTML = appendHTML + `<option value="${timeOptions[i]}">${timeOptions[i]}</option>`;
        }
    }
    appendHTML = appendHTML + `<div class="separator">到</div>`;
    for (var j in timeOptions) {
        if (j == 0) {
            appendHTML = appendHTML + `<div class="select flex"><select name="${currentGroup}CloseHrs[]" id="${currentGroup}Close${currentCount}"><option value="" selected hidden>請選擇</option>`;
            appendHTML = appendHTML + `<option value="${timeOptions[j]}">${timeOptions[j]}</option>`;
        } else if (j == timeOptionsLength) {
            appendHTML = appendHTML + `<option value="${timeOptions[j]}">${timeOptions[j]}</option>`;
            appendHTML = appendHTML + `</select></div><div class="btn warning" data-type="removeTime"><i class="fas fa-trash-alt fa-fw"></i></div>`;
        } else {
            appendHTML = appendHTML + `<option value="${timeOptions[j]}">${timeOptions[j]}</option>`;
        }
    }
    appendHTML = appendHTML + `</div>`;
    $(`[data-weekday="${currentGroup}"]`).append(appendHTML);
});

$(document).on('click', '[data-type="removeTime"]', function () {
    if (!$(this).hasClass('disabled')) {
        $(this).parent('[data-group]').remove();
    }
});

$('#openHrs .functions [type="submit"]').on('click', function (e) {
    e.preventDefault();
    console.log($('#openHrs').serialize());
});

function addJobTitle() {
    $.ajax({
        url: '../php/addJobTitle.php',
        type: 'POST',
        dataType: 'text',
        data: $('.modals #addJobTitle').serialize(),
        beforeSend: function () {
            createAlertingPopup('職位新增中，請稍後...', alertingSnd);
            $('#addJobTitle .functions button.primary').attr('disabled', true);
        },
        success: function (data) {
            $('#addJobTitle .functions button.primary').attr('disabled', false);
            if (data == 'success') {
                createSuccessPopup(data, successSnd);
                $('#addJobTitle').addClass('fadeOut');
                setTimeout(function () {
                    $('#addJobTitle').removeClass('fadeOut').removeClass('show');
                    $('.modals').removeClass('show');
                }, 200);
                $('#addJobTitle')[0].reset();
            } else {
                createWarningPopup(data, warningSnd);
            }
            fetchJob();
        }
    });
}

$('#addJobBtn').on('click', function (e) {
    e.preventDefault();
    $('.modals').addClass('show');
    $('.modals #addJobTitle').addClass('show');
});

$('#addJobTitle .functions button[data-type="submit"]').on('click', function (e) {
    e.preventDefault();
    addJobTitle()
});

$('#addJobTitle .functions button[data-type="cancel"]').on('click', function () {
    $('#addJobTitle').addClass('fadeOut');
    setTimeout(function () {
        $('#addJobTitle').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
});

$('#addJobTitle .topbar .closeBtn').on('click', function () {
    $('#addJobTitle').addClass('fadeOut');
    setTimeout(function () {
        $('#addJobTitle').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
});

function deleteJobTitle(deleteJob) {
    $('.modals').addClass('show');
    $('#deleteJobTitle').addClass('show');
    $('#deleteJobTitle .functions [data-type="submit"]').on('click', function () {
        $.ajax({
            url: '../php/deleteJob.php',
            type: 'POST',
            dataType: 'text',
            data: {
                deleteJob: deleteJob
            },
            beforeSend: function () {
                createAlertingPopup('職位刪除中，請稍後...', alertingSnd);
                $('#deleteJobTitle .functions button[data-type="submit"]').attr('disabled', true);
            },
            success: function (data) {
                $('#deleteJobTitle .functions button[data-type="submit"]').attr('disabled', false);
                if (data == 'success') {
                    createSuccessPopup(data, successSnd);
                    $('#deleteJobTitle').addClass('fadeOut');
                    setTimeout(function () {
                        $('#deleteJobTitle').removeClass('fadeOut').removeClass('show');
                        $('.modals').removeClass('show');
                    }, 200);
                } else if (data == 'has') {
                    $('.modals').addClass('show');
                    $('#empHasJobTitle').addClass('show');
                    $('#deleteJobTitle').addClass('fadeOut');
                    setTimeout(function () {
                        $('#deleteJobTitle').removeClass('fadeOut').removeClass('show');
                    }, 200);
                } else {
                    createWarningPopup(data, warningSnd);
                }
                fetchJob();
            }
        });
    });
    $('#deleteJobTitle .functions [data-type="cancel"]').on('click', function () {
        $('#deleteJobTitle').addClass('fadeOut');
        setTimeout(function () {
            $('#deleteJobTitle').removeClass('fadeOut').removeClass('show');
            $('.modals').removeClass('show');
        }, 200);
    });
    $('#deleteJobTitle .topbar .closeBtn').on('click', function () {
        $('#deleteJobTitle').addClass('fadeOut');
        setTimeout(function () {
            $('#deleteJobTitle').removeClass('fadeOut').removeClass('show');
            $('.modals').removeClass('show');
        }, 200);
    });
}

$(document).on('click', '[data-type="deleteJob"]', function (e) {
    e.preventDefault();
    deleteJobTitle($(this).data('job'));
});

$('#empHasJobTitle .functions button[data-type="submit"]').on('click', function () {
    $('#empHasJobTitle').addClass('fadeOut');
    setTimeout(function () {
        $('#empHasJobTitle').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
});

$('#empHasJobTitle .functions button[data-type="cancel"]').on('click', function () {
    $('#empHasJobTitle').addClass('fadeOut');
    setTimeout(function () {
        $('#empHasJobTitle').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
});

$('#empHasJobTitle .topbar .closeBtn').on('click', function () {
    $('#empHasJobTitle').addClass('fadeOut');
    setTimeout(function () {
        $('#empHasJobTitle').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
});

function editJobTitle() {
    var originalJob = $('#selectedJobTitle').val();
    var editJob = $('#editJob').val();
    $('#editJobTitleConfirm .details').text(`請問是否要變更「${originalJob}」職位名稱，並修改所有當前為該職位員工之職位為新職位名稱「${editJob}」？`);
    $('.modals').addClass('show');
    $('#editJobTitleConfirm').addClass('show');
    $('#editJobTitleConfirm .functions [data-type="submit"]').on('click', function () {
        $.ajax({
            url: '../php/editJob.php',
            type: 'POST',
            dataType: 'text',
            data: $('#editJobTitle').serialize(),
            beforeSend: function () {
                createAlertingPopup('職位名稱變更中，請稍後...', alertingSnd);
                $('#editJobTitle .functions button[data-type="submit"]').attr('disabled', true);
                $('#editJobTitleConfirm .functions button[data-type="submit"]').attr('disabled', true);
            },
            success: function (data) {
                $('#editJobTitle .functions button[data-type="submit"]').attr('disabled', false);
                $('#editJobTitleConfirm .functions button[data-type="submit"]').attr('disabled', false);
                if (data == 'success') {
                    createSuccessPopup(data, successSnd);
                    $('#editJobTitle').addClass('fadeOut');
                    $('#editJobTitleConfirm').addClass('fadeOut');
                    setTimeout(function () {
                        $('#editJobTitle').removeClass('fadeOut').removeClass('show');
                        $('#editJobTitleConfirm').removeClass('fadeOut').removeClass('show');
                        $('.modals').removeClass('show');
                    }, 200);
                } else {
                    createWarningPopup(data, warningSnd);
                }
                fetchJob();
            }
        });
    });
    $('#editJobTitleConfirm .functions [data-type="cancel"]').on('click', function () {
        $('#editJobTitleConfirm').addClass('fadeOut');
        setTimeout(function () {
            $('#editJobTitleConfirm').removeClass('fadeOut').removeClass('show');
            $('.modals').removeClass('show');
        }, 200);
    });
    $('#editJobTitleConfirm .topbar .closeBtn').on('click', function () {
        $('#editJobTitleConfirm').addClass('fadeOut');
        setTimeout(function () {
            $('#editJobTitleConfirm').removeClass('fadeOut').removeClass('show');
            $('.modals').removeClass('show');
        }, 200);
    });
}

$(document).on('click', '[data-type="editJob"]', function () {
    $('.modals').addClass('show');
    $('#editJobTitle').addClass('show');
    $('#selectedJobTitle').val($(this).data('job'));
    $('#editJob').val($(this).data('job'));
});

$('#editJobTitle .functions button[data-type="submit"]').on('click', function (e) {
    e.preventDefault();
    editJobTitle();
});

$('#editJobTitle .functions button[data-type="cancel"]').on('click', function () {
    $('#editJobTitle').addClass('fadeOut');
    setTimeout(function () {
        $('#editJobTitle').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
    $('#editJobTitle')[0].reset();
});

$('#editJobTitle .topbar .closeBtn').on('click', function () {
    $('#editJobTitle').addClass('fadeOut');
    setTimeout(function () {
        $('#editJobTitle').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
    $('#editJobTitle')[0].reset();
});

function fetchBrandInfo() {
    var inputFieldsType = ['text', 'text', 'text', 'select'];
    var inputFields = ['brandName', 'postal', 'address', 'brandType'];
    $.ajax({
        url: '../php/fetchBrandInfo.php',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            inputFields.forEach(function (element, index) {
                if (inputFieldsType[index] == 'text') {
                    $(`#${element}`).attr('value', `${data[element]}`);
                } else if (inputFieldsType[index] == 'select') {
                    $(`#${element} option[value="${data[element]}"]`).attr('selected', true);
                }
            });
        }
    });
}

fetchBrandInfo();

function editBrandInfo() {
    var inputs = ['brandName', 'postal', 'address', 'brandType'];
    $.ajax({
        url: '../php/editBrandInfo.php',
        type: 'POST',
        async: false,
        dataType: 'json',
        data: $('#brandInfo').serialize(),
        beforeSend: function () {
            createAlertingPopup('店鋪基本資訊更新中，請稍後...', alertingSnd);
            $('#brandInfo .functions button[type="submit"]').attr('disabled', true);
        },
        success: function (data) {
            if (data['status'] == 'success') {
                createSuccessPopup('店鋪基本資訊已成功更新！', successSnd);
            } else {
                inputs.forEach(function (element, index) {
                    if (data[element] != 'valid') {
                        $(`[name="${element}"]`).addClass('error');
                        createWarningPopup(data[element], warningSnd);
                    } else {
                        $(`[name="${element}"]`).removeClass('error');
                    }
                });
            }
            $('#brandInfo .functions button[type="submit"]').attr('disabled', false);
        }
    });
    fetchBrandInfo();
}

$(document).on('click', '#brandInfo .functions button[type="submit"]', function (e) {
    e.preventDefault();
    editBrandInfo();
});

function fetchBrandHrs() {
    $.ajax({
        url: '../php/fetchBrandHrs.php',
        type: 'POST',
        async: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
        }
    });
}