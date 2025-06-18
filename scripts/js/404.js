/* jshint esversion: 11, jquery: true */

const redirect = [5, 4, 3, 2, 1];
redirect.forEach((num, index) => {
    setTimeout(() => {
        $(".countdown").text(num);
    }, index * 1000);
});

setTimeout(function () {
    window.location.href = "index.html";
}, 5000);