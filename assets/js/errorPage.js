const urlAddr = window.location.search;
const urlParams = new URLSearchParams(urlAddr);
const errorCode = urlParams.get('code');

// console.log(urlAddr);
// console.log(urlParams);
// console.log(errorCode);
if (errorCode != 'auth') {
    $('.errorCode').text(errorCode);
} else {
    $('.errorCode').text('NO');
}

if (errorCode == 400)
    $('.errorDescription').html('<h1>400 Bad Request</h1><p>哎呀，發送請求時出現了問題，可以試試看重啟瀏覽器或清除 Cookie 及快取喔！</p>');
else if (errorCode == 403)
    $('.errorDescription').html('<h1>403 Forbidden</h1><p>哎呀，您目前沒有權限訪問這個頁面！不如過一段時間試試看？</p>');
else if (errorCode == 404)
    $('.errorDescription').html('<h1>404 Not Found</h1><p>哎呀，這個頁面目前找不到，可能是還在開發中喔！</p>');
else if (errorCode == 500)
    $('.errorDescription').html('<h1>500 Internal Server Error</h1><p>哎呀，伺服器可能遇到了點問題！不如過一段時間試試看？</p>');
else if (errorCode == 502)
    $('.errorDescription').html('<h1>500 Internal Server Error</h1><p>哎呀，伺服器可能遇到了點問題！不如過一段時間試試看？</p>');
else if (errorCode == 503)
    $('.errorDescription').html('<h1>503 Service Unavailable</h1><p>哎呀，伺服器至暫時遇到了點問題！不如過一段時間試試看？</p>');
else if (errorCode == 504)
    $('.errorDescription').html('<h1>504 Gateway Timeout</h1><p>哎呀，跟伺服器的溝通時間可能過長了！不如過一段時間試試看？</p>');
else if (errorCode == 'auth')
    $('.errorDescription').html('<h1>權限不足</h1><p>哎呀，您沒有權限訪問這個頁面喔！</p>');

$('#backToHome').on('click', function () {
    window.location.href = 'home.html';
});