function r(r) {
    r = r.replace(/rn/g, "n");
    for (var e = "", o = 0; o < r.length; o++) {
        var t = r.charCodeAt(o);
        t < 128 ? e += String.fromCharCode(t) : t > 127 && t < 2048 ? (e += String.fromCharCode(t >> 6 | 192), 
        e += String.fromCharCode(63 & t | 128)) : (e += String.fromCharCode(t >> 12 | 224), 
        e += String.fromCharCode(t >> 6 & 63 | 128), e += String.fromCharCode(63 & t | 128));
    }
    return e;
}

function e(r) {
    for (var e = "", o = 0, t = c1 = c2 = 0; o < r.length; ) (t = r.charCodeAt(o)) < 128 ? (e += String.fromCharCode(t), 
    o++) : t > 191 && t < 224 ? (c2 = r.charCodeAt(o + 1), e += String.fromCharCode((31 & t) << 6 | 63 & c2), 
    o += 2) : (c2 = r.charCodeAt(o + 1), c3 = r.charCodeAt(o + 2), e += String.fromCharCode((15 & t) << 12 | (63 & c2) << 6 | 63 & c3), 
    o += 3);
    return e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

exports.b64_encode = function(e) {
    var t, a, n, c, d, h, C, f = "", i = 0;
    for (e = r(e); i < e.length; ) c = (t = e.charCodeAt(i++)) >> 2, d = (3 & t) << 4 | (a = e.charCodeAt(i++)) >> 4, 
    h = (15 & a) << 2 | (n = e.charCodeAt(i++)) >> 6, C = 63 & n, isNaN(a) ? h = C = 64 : isNaN(n) && (C = 64), 
    f = f + o.charAt(c) + o.charAt(d) + o.charAt(h) + o.charAt(C);
    return f;
}, exports.b64_decode = function(r) {
    var t, a, n, c, d, h, C = "", f = 0;
    for (r = r.replace(/[^A-Za-z0-9+/=]/g, ""); f < r.length; ) t = o.indexOf(r.charAt(f++)) << 2 | (c = o.indexOf(r.charAt(f++))) >> 4, 
    a = (15 & c) << 4 | (d = o.indexOf(r.charAt(f++))) >> 2, n = (3 & d) << 6 | (h = o.indexOf(r.charAt(f++))), 
    C += String.fromCharCode(t), 64 != d && (C += String.fromCharCode(a)), 64 != h && (C += String.fromCharCode(n));
    return C = e(C);
}, exports._utf8_encode = r, exports._utf8_decode = e;