Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.scDB = function(i) {
    try {
        if (t = uni.getStorageSync("lishi"), t = JSON.parse(t)) {
            for (var e = 0; e < t.length; e++) if (t[e].vod_id == i.vod_id) {
                t.splice(e, 1);
                break;
            }
            t.unshift(i), t.length > 10 && t.pop(), uni.setStorageSync("lishi", JSON.stringify(t));
        }
    } catch (e) {
        var t = [ i ];
        uni.setStorageSync("lishi", JSON.stringify(t));
    }
}, exports.getLSDB = function(i) {
    var e = {};
    try {
        var t = uni.getStorageSync("lishi");
        if ((t = JSON.parse(t)).length > 0) for (var r = 0; r < t.length; r++) if (t[r].vod_id == i) {
            e = t[r];
            break;
        }
    } catch (i) {}
    return e;
}, exports.setLSDB = function(i) {
    try {
        if (t = uni.getStorageSync("lishi"), t = JSON.parse(t)) {
            for (var e = 0; e < t.length; e++) if (t[e].vod_id == i.vod_id) {
                t.splice(e, 1);
                break;
            }
            t.unshift(i), t.length > 10 && t.pop(), uni.setStorageSync("lishi", JSON.stringify(t));
        }
    } catch (e) {
        var t = [ i ];
        uni.setStorageSync("lishi", JSON.stringify(t));
    }
}, exports.DeleteDB = function(i) {
    var e = uni.getStorageSync("lishi");
    if (e = JSON.parse(e)) for (var t = 0; t < e.length; t++) if (e[t].vod_id == i.vod_id) {
        console.log(e[t].vod_id), e.splice(t, 1);
        break;
    }
    uni.setStorageSync("lishi", JSON.stringify(e));
};