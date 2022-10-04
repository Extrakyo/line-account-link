$(document).ready(function () {
    var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    if (storedTheme) {
        $('html').attr('data-theme', storedTheme);
    }

    if (storedTheme == 'dark') {
        if ($('#theme-toggle i').hasClass('fa-sun')) {
            $('#theme-toggle i').removeClass('fa-sun');
            $('#theme-toggle i').addClass('fa-moon');
        }
    } else {
        if ($('#theme-toggle i').hasClass('fa-moon')) {
            $('#theme-toggle i').removeClass('fa-moon');
            $('#theme-toggle i').addClass('fa-sun');
        }
    }

    $('#theme-toggle').on('click', function () {
        var currentTheme = $('html').attr('data-theme');
        // var currentTheme = $('html').data('theme');
        if (currentTheme == 'light') {
            $('html').attr('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            $(this).find('i').removeClass('fa-sun');
            $(this).find('i').addClass('fa-moon');
        } else {
            $('html').attr('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            $(this).find('i').removeClass('fa-moon');
            $(this).find('i').addClass('fa-sun');
        }
        $('#pageContainer').attr('src', $('#pageContainer').attr('src'));
    });
});

setTimeout(function () {
    $('.disclaimer').hide();
}, 1000);