function tooltip(el, content) {
    tippy(el, {
        allowHTML: true,
        // content: 'My <br> tooltip!',
        content: content,
    });
}

$('[data-tooltip]').on('mouseover', function () {
    tooltip(this, $(this).data('tooltip'));
});