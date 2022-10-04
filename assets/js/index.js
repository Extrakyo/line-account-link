var loginAccessPermissionPath = 'php/loginAccessPermission.php';
var authAccessPermissionPath = 'php/authAccessPermission.php';

var loginAccessPermission = loginAccessPermission(loginAccessPermissionPath);
var authAccessPermission = authAccessPermission(authAccessPermissionPath);

// console.log(loginAccessPermission, authAccessPermission);

if (loginAccessPermission['status'] == 'success') {
    // $('.user .userInfo .username').text(`${loginAccessPermission['fname']} ${loginAccessPermission['lname']}`);
    // if (loginAccessPermission['job'] == '') {
    //     $('.user .userInfo .job').remove();
    // } else {
    //     $('.user .userInfo .job').text(`${loginAccessPermission['job']}`);
    // }
    // $('.user .avatar img').prop('src', `images/avatar/${loginAccessPermission['avatar']}`);
    console.log('Access allowed');
} else {
    console.log('Access denied');
}

// user error: userError (user not found),
// login error: loginError (one of the sessions is missed or empty),
// login denied: loginDenied (both of the sessions are missed or empty),
// login success: loginSuccess (login is successful),
// auth denied: authDenied (has no allowance to access),
// auth allow: authAllowed (has allowance to access)
// permission
if (authAccessPermission['permission'] == 'loginError') {
    console.log('one of the sessions is missed or empty');
} else if (authAccessPermission['permission'] == 'loginDenied') {
    console.log('both of the sessions are missed or empty');
} else if (authAccessPermission['permission'] == 'userError') {
    console.log('user not found');
} else if (authAccessPermission['permission'] == 'loginSuccess') {
    console.log('login is successful');
}
// authResult
if (authAccessPermission['authResult'] == 'authAllowed') {
    console.log('has allowance to access');
} else if (authAccessPermission['authResult'] == 'authDenied') {
    console.log('has no allowance to access');
}
// authLevel
if (authAccessPermission['authLevel'] == 'admin') {
    console.log('current auth level: admin');
} else if (authAccessPermission['authLevel'] == 'modifier') {
    console.log('current auth level: modifier');
} else if (authAccessPermission['authLevel'] == 'user') {
    $('a[data-page="employees"]').parent('.menuItem').remove();
    $('a[data-page="brand"]').parent('.menuItem').remove();
    console.log('current auth level: user');
} else if (authAccessPermission['authLevel'] == 'unknownLevel') {
    console.log('current auth level: unknownLevel');
}