self.addEventListener("fetch", function (event) {
    if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin") {
        return;
    }
    event.respondWith(fetch(event.request)
        .then(function (response) {
        var newHeaders = new Headers(response.headers);
        newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
        newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
        var moddedResponse = new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders
        });
        return moddedResponse;
    })["catch"](function (e) {
        console.error(e);
        throw e;
    }));
});
var f = function () {
    serviceWorkerRegistration.showNotification("Yo", {
        "body": "hi"
    });
    setTimeout(f, 10000);
};
setTimeout(f, 10000);
