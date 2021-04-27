Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e) {
    return function() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return new Promise(function(t, u) {
            n.success = function(e) {
                t(e);
            }, n.fail = function(e) {
                u(e);
            }, e(n);
        });
    };
};