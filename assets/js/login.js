$('#eye').on('click', function () {
    $(this).toggleClass('active');
    if ($('input[name="password"]').prop('type') == 'password') {
        $('input[name="password"]').prop('type', 'text');
    } else {
        $('input[name="password"]').prop('type', 'password');
    }
});

var successSnd = 'https://foodler.iistw.com/dashboard/sounds/popupSuccess.wav';
var warningSnd = 'https://foodler.iistw.com/dashboard/sounds/popupWarning.wav';
var alertingSnd = 'https://foodler.iistw.com/dashboard/sounds/popupAlerting.wav';

// $('#loginForm').on('submit', function (e) {
//     e.preventDefault();
//     // console.log($(this).serialize());
//     $.ajax({
//         url: 'php/login.php',
//         type: 'POST',
//         data: $(this).serialize(),
//         dataType: 'text',
//         beforeSend: function () {
//             createAlertingPopup('正在嘗試登入！', alertingSnd);
//             $('input[type="submit"]').attr('disabled', true);
//         },
//         success: function (data) {
//             if (data === 'success') {
//                 createSuccessPopup('已成功登入，將於 3 秒後跳轉至首面！', successSnd);
//                 setTimeout(function () {
//                     // location.href = 'index.html';
//                     location.href = 'index.php';
//                 }, 3000);
//             } else {
//                 createWarningPopup(data, warningSnd);
//             }
//             $('input[type="submit"]').attr('disabled', false);
//         }
//     });
// });