$('[data-type="page"]').on('click', function (e) {
    e.preventDefault();
    var urlLocation = $(this).prop('href');
    var iframeHttp = new XMLHttpRequest();
    iframeHttp.open('HEAD', urlLocation, false);
    iframeHttp.send();
    if (iframeHttp.status != 200) {
        localStorage.setItem('currentPage', $(this).data('page'));
        window.location.href = `error.html?code=${iframeHttp.status}`;
    } else {
        window.location.href = urlLocation;
    }
});