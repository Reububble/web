function when(target, type, callback) {
    target.addEventListener(type, callback);
    return {
        stop: function () { target.removeEventListener(type, callback); }
    };
}
