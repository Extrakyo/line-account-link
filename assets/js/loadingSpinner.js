// $(window).on('load', function () {
//     setTimeout(function () {
//         $(".loadingSpinner").fadeOut(200);
//     }, 500);
//     $('.container').fadeIn(200);
// });

document.onreadystatechange = function (e) {
    if (document.readyState == "interactive") {
        var all = document.getElementsByTagName("*");
        for (var i = 0, max = all.length; i < max; i++) {
            set_ele(all[i]);
        }
    }
}

let progNum = 0;

function check_element(ele) {
    var all = document.getElementsByTagName("*");
    var per_inc = 100 / all.length;

    if ($(ele).on()) {
        var prog_width = per_inc + Number(progNum);
        progNum = prog_width;
        $("#bar1").animate({
            width: prog_width + "%",
        }, 10, function () {
            if (document.getElementById("bar1").style.width >= "100%") {
                $(".progress").fadeOut("slow");
            }
        });
    } else {
        set_ele(ele);
    }
}

function set_ele(set_element) {
    check_element(set_element);
}