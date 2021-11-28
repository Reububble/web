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
when(document.querySelector("button"), "click", function () {
    askPermission().then(console.log);
});
function askPermission() {
    return new Promise(function (resolve, reject) {
        var permissionResult = Notification.requestPermission(function (result) {
            resolve(result);
        });
        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    })
        .then(function (permissionResult) {
        if (permissionResult !== 'granted') {
            throw new Error('We weren\'t granted permission.');
        }
    });
}
