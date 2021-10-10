function when(target, type, callback) {
    target.addEventListener(type, callback);
    return {
        stop: function () { target.removeEventListener(type, callback); }
    };
}
when(window, "load", function () {
    navigator.serviceWorker.register("/web/sw.js", { scope: "/web/" }).then(function (value) {
        console.log(value);
    })["catch"](function (reason) {
        console.error(reason);
    });
});
