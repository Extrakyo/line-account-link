function loginAccessPermission(path) {
    var result;
    $.ajax({
        url: path,
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            result = data
        }
    });
    return result;
}