var successSnd = '../sounds/popupSuccess.wav';
var warningSnd = '../sounds/popupWarning.wav';
var alertingSnd = '../sounds/popupAlerting.wav';

function fetchPersonalInfo() {
    var inputFieldsType = ['img', 'text', 'text', 'select', 'text', 'email', 'text', 'text', 'text'];
    var inputFields = ['avatar', 'empLname', 'empFname', 'empGender', 'empMobile', 'empEmail', 'empUsrn', 'employeeId', 'jobTitle'];
    $.ajax({
        url: '../php/fetchPersonalInfo.php',
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {
            inputFields: inputFields
        },
        success: function (data) {
            inputFields.forEach(function (element, index) {
                if (inputFieldsType[index] == 'img') {
                    $(`#${element}`).attr('src', `../images/avatar/${data[element]}`);
                } else if (inputFieldsType[index] == 'text') {
                    $(`#${element}`).attr('value', `${data[element]}`);
                } else if (inputFieldsType[index] == 'email') {
                    $(`#${element}`).attr('value', `${data[element]}`);
                } else if (inputFieldsType[index] == 'select') {
                    $(`#${element} option[value="${data[element]}"]`).attr('selected', true);
                }
            });
        }
    });
}

fetchPersonalInfo();

function fetchPasswordChanging() {
    console.log('fetchPasswordChanging');
}

function avatarPreview(imageSrc) {
    if (imageSrc.files && imageSrc.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.avatar').attr('src', e.target.result)
        }
        reader.readAsDataURL(imageSrc.files[0]);
    }
}

$(".avatarUpload").on('change', function () {
    avatarPreview(this);
});

$('.avatarUploadBtn').on('click', function () {
    $('.avatarUpload').click();
});

$('#passwordToggle').on('click', function () {
    var inputField = this.parentElement.querySelector('input');
    $(this).toggleClass('show');
    if (inputField.type == 'text') {
        inputField.type = "password";
    } else {
        inputField.type = "text";
    }
});

$('#originalPwdToggle').on('click', function () {
    var inputField = this.parentElement.querySelector('input');
    $(this).toggleClass('show');
    if (inputField.type == 'text') {
        inputField.type = "password";
    } else {
        inputField.type = "text";
    }
});

$('#newPwdToggle').on('click', function () {
    var inputField = this.parentElement.querySelector('input');
    $(this).toggleClass('show');
    if (inputField.type == 'text') {
        inputField.type = "password";
    } else {
        inputField.type = "text";
    }
});

$('#reNewPwdToggle').on('click', function () {
    var inputField = this.parentElement.querySelector('input');
    $(this).toggleClass('show');
    if (inputField.type == 'text') {
        inputField.type = "password";
    } else {
        inputField.type = "text";
    }
});

$('#personalInfo').on('submit', function (e) {
    e.preventDefault();
    $('.modals').addClass('show');
    $('#confirm').addClass('show');
    $('#confirm input')[0].focus();
});

$('#personalInfo .functions button.primary').on('click', function () {
    $('#personalInfo').find('input').each(function () {
        if ($(this).prop('required')) {
            if ($(this).val() == '') {
                $(this).addClass('error');
            }
        }
    });
    $('#personalInfo').find('select').each(function () {
        if ($(this).prop('required')) {
            if ($(this).val() == '') {
                $(this).addClass('error');
            }
        }
    });
});

$('#personalInfo .functions button[type="reset"]').on('click', function () {
    $('#personalInfo input').removeClass('error');
    $('#personalInfo select').removeClass('error');
});

function updatePersonalInfo() {
    var avatarData = $('#avatarUpload').prop('files')[0];
    var personalInfoForm = document.getElementById('personalInfo');
    var personalInfoData = new FormData(personalInfoForm);
    personalInfoData.append('avatarUpload', avatarData);
    var inputs = ['avatar', 'empLname', 'empFname', 'empGender', 'empEmail', 'empMobile'];
    $.ajax({
        url: '../php/updatePersonalInfo.php',
        type: 'POST',
        async: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        data: personalInfoData,
        beforeSend: function () {
            createAlertingPopup('個人資訊更新中，請稍後...', alertingSnd);
            $('#personalInfo .functions button.primary').attr('disabled', true);
        },
        success: function (data) {
            if (data['status'] == 'success') {
                createSuccessPopup('個人資料已成功更新！', successSnd);
            } else {
                inputs.forEach(function (element, index) {
                    if (element == 'avatar') {
                        if (data[element] != 'valid') {
                            createWarningPopup(data[element], warningSnd);
                        }
                    } else {
                        if (data[element] != 'valid') {
                            $(`[name="${element}"]`).addClass('error');
                            createWarningPopup(data[element], warningSnd);
                        } else {
                            $(`[name="${element}"]`).removeClass('error');
                        }
                    }
                });
            }
            $('#personalInfo .functions button.primary').attr('disabled', false);
        }
    });
    fetchPersonalInfo();
}

$('.modals #confirm').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        url: '../php/loginAuth.php',
        type: 'POST',
        dataType: 'text',
        data: $('#confirm').serialize(),
        beforeSend: function () {
            createAlertingPopup('正在嘗試登入驗證！', alertingSnd);
            $('.modals #confirm .functions button.primary').attr('disabled', true);
        },
        success: function (data) {
            if (data === 'success') {
                $('.modals').removeClass('show');
                $('.modals #confirm').removeClass('show');
                $('.modals #confirm')[0].reset();
                createSuccessPopup('帳號驗證成功！', successSnd);
                updatePersonalInfo();
            } else {
                createWarningPopup(data, warningSnd);
            }
            $('.modals #confirm .functions button.primary').attr('disabled', false);
        }
    });
});

$('#confirm .functions button[data-type="cancel"]').on('click', function () {
    // $('.modals').removeClass('show');
    // $('.modals #confirm').removeClass('show');
    $('.modals #confirm').addClass('fadeOut');
    setTimeout(function () {
        $('.modals #confirm').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
    $('.modals #confirm')[0].reset();
});

$('#confirm .topbar .closeBtn').on('click', function () {
    // $('.modals').removeClass('show');
    // $('.modals #confirm').removeClass('show');
    $('.modals #confirm').addClass('fadeOut');
    setTimeout(function () {
        $('.modals #confirm').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
    $('.modals #confirm')[0].reset();
});

$('#passwordChanging').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        url: '../php/changePassword.php',
        type: 'POST',
        dataType: 'text',
        data: $('#passwordChanging').serialize(),
        beforeSend: function () {
            createAlertingPopup('密碼變更中，請稍後...', alertingSnd);
            $('#passwordChanging .functions button.primary').attr('disabled', true);
        },
        success: function (data) {
            $('#passwordChanging .functions button.primary').attr('disabled', false);
            if (data == 'success') {
                createSuccessPopup('密碼已成功變更！', successSnd);
            } else {
                createWarningPopup(data, warningSnd);
            }
        }
    });
    fetchPasswordChanging();
});

$('#passwordChanging .functions button.primary').on('click', function () {
    $('#passwordChanging').find('input').each(function () {
        if ($(this).prop('required')) {
            if ($(this).val() == '') {
                $(this).addClass('error');
            }
        }
    });
});

$('#passwordChanging .functions button[type="reset"]').on('click', function () {
    $('#passwordChanging input').removeClass('error');
});

$('#originalPwd').on('blur', function () {
    if ($(this).val() == '') {
        $(this).addClass('error');
    } else {
        $(this).removeClass('error');
    }
});

$('#newPwd').on('blur', function () {
    if ($(this).val() == '') {
        $(this).addClass('error');
    } else {
        $(this).removeClass('error');
    }
});

$('#reNewPwd').on('keypress blur', function () {
    if ($(this).val() == '') {
        $(this).addClass('error');
    } else if ($(this).val() != $('#newPwd').val()) {
        $(this).addClass('error');
    } else {
        $(this).removeClass('error');
    }
});