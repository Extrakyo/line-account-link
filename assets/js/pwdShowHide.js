$('.passwordField i').on('click', function () {
    var inputField = this.parentElement.querySelector('input');
    if (inputField.type === "password") {
        inputField.type = "text";
    } else {
        inputField.type = "password";
    }
    $(this).toggleClass('show');
});