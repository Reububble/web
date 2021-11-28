function when(target, type, callback) {
    target.addEventListener(type, callback);
    return {
        stop: function () { target.removeEventListener(type, callback); }
    };
}
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
when(document.querySelector("button"), "click", function () {
    askPermission().then(function () {
        var subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U')
        };
        return navigator.serviceWorker.register("/web/sw.js", { scope: "/web/" }).then(function (value) {
            value.pushManager.subscribe(subscribeOptions).then(function (a) {
                console.log(a);
                value.showNotification("Hey");
            });
        })["catch"](function (reason) {
            console.error(reason);
        });
    });
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
