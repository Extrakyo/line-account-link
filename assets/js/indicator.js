$('.container').scroll(function () {
    var scrolled = $('.container').scrollTop();
    var height = document.querySelector('.container').scrollHeight - document.querySelector('.container').clientHeight;
    var resultS = (scrolled / height) * 100;
    // console.log(scrolled + ', ' + height + ', ' + resultS);
    document.getElementById('indicatorBar').style.width = resultS + "%";
});