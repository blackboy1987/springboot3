var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};

module.exports = {
    formatTime: function(a) {
        var r, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd", n = "";
        n = a ? new Date(a) : new Date();
        var l = function(a) {
            var r = Number(a);
            return r = r > 9 ? r : "0" + r;
        };
        if ("string" == typeof a && a.indexOf("-") > -1) {
            var t = a.split(" "), u = t[0].split("-"), o = t.length > 1 ? t[1].split(":") : [ "00", "00", "00" ];
            r = [ u[0], l(u[1]), l(u[2]), l(o[0]), l(o[1]), l(o[2]) ];
        } else {
            var s = n.getFullYear(), i = n.getMonth() + 1, y = n.getDate(), D = n.getHours(), h = n.getMinutes(), m = n.getSeconds();
            r = [ s, l(i), l(y), l(D), l(h), l(m) ];
        }
        var v = e;
        return v = v.replace(/yyyy/, r[0]), v = v.replace(/MM/, r[1]), v = v.replace(/dd/, r[2]),
        v = v.replace(/hh/, r[3]), v = v.replace(/mm/, r[4]), v = v.replace(/ss/, r[5]);
    },
    formatNumber: function(a) {
        return (a = a.toString())[1] ? a : "0" + a;
    },
    formatMoney: function(a, r) {
        if (!a) return "0";
        var e, n, l = a.toString(), t = "", u = r || 2;
        if (l.indexOf(".") > -1) {
            var o = a.toFixed(u).split(".");
            e = o[0], n = o[1];
        } else e = a;
        var s = e.toString(), i = [];
        if (s.length > 3) {
            for (var y = s.length; y > 0; y -= 3) {
                var D = s.substring(y - 3, y);
                i.unshift(D);
            }
            t = i.join(",");
        } else t = e;
        return n && (t = t + "." + n), t;
    },
    getDaysByDateString: function(a) {
        var r, e, n = new Date(), l = n.getMonth() + 1, t = n.getDate();
        r = (n.getFullYear() + "-" + l + "-" + t).split("-"), e = a.split("-");
        var u = new Date(r[0], r[1] - 1, r[2]), o = new Date(e[0], e[1] - 1, e[2]);
        return parseInt((o - u) / 1e3 / 60 / 60 / 24);
    },
    filterFestival: function() {
        for (var r = [], e = 0; e < 10; e++) for (var n = 0; n < 12; n++) for (var l = new Date(2019 + e, n + 1, 0).getDate(), t = 1; t <= l; t++) r.push(2019 + e + "/" + (n + 1) + "/" + t);
        for (var u = [], o = [ "春节", "情人节", "女神节", "儿童节", "母亲节", "父亲节", "七夕", "教师节", "感恩节", "圣诞节" ], s = {
            "春节": "jr_Newyear",
            "情人节": "jr_Valentine",
            "女神节": "jr_goddess",
            "儿童节": "jr_childrensday",
            "母亲节": "jr_mothersday",
            "父亲节": "jr_fathersday",
            "七夕": "jr_qixi",
            "教师节": "jr_teacher",
            "感恩节": "jr_thanksgiving",
            "圣诞节": "jr_Christmas"
        }, i = 0; i < r.length; i++) {
            var y = r[i].split("/"), D = a.default.solarToLunar(y[0], y[1], y[2]), h = "", m = 0;
            D.solarFestival && D.lunarFestival ? m = 3 : D.solarFestival ? (h = D.solarFestival,
            m = 2) : D.lunarFestival && (h = D.lunarFestival, m = 1), 3 == m ? (o.indexOf(D.lunarFestival) >= 0 && u.push({
                name: D.lunarFestival,
                isLunar: 1,
                solarDay: r[i],
                solarDayFormet: y[0] + "-" + y[1] + "-" + y[2] + " 23:59:59",
                showSolarDay: y[1] + "月" + y[2] + "日",
                lunarDay: D.lunarYear + "-" + D.lunarMonth + "-" + D.lunarDay + " 23:59:59",
                lunarName: D.lunarMonthName + D.lunarDayName,
                icon: s[D.lunarFestival]
            }), o.indexOf(D.solarFestival) >= 0 && u.push({
                name: D.solarFestival,
                isLunar: 2,
                solarDay: r[i],
                solarDayFormet: y[0] + "-" + y[1] + "-" + y[2] + " 23:59:59",
                showSolarDay: y[1] + "月" + y[2] + "日",
                lunarDay: D.lunarYear + "-" + D.lunarMonth + "-" + D.lunarDay + " 23:59:59",
                lunarName: D.lunarMonthName + D.lunarDayName,
                icon: s[D.solarFestival]
            })) : m && (o.indexOf(D.solarFestival) >= 0 || o.indexOf(D.lunarFestival) >= 0) && u.push({
                name: h,
                isLunar: m,
                solarDay: r[i],
                solarDayFormet: y[0] + "-" + y[1] + "-" + y[2] + " 23:59:59",
                showSolarDay: y[1] + "月" + y[2] + "日",
                lunarDay: D.lunarYear + "-" + D.lunarMonth + "-" + D.lunarDay + " 23:59:59",
                lunarName: D.lunarMonthName + D.lunarDayName,
                icon: s[h]
            });
            var v = new Date(r[i]).getDay();
            0 == v && (v = 7);
            var f = Math.ceil((Number(y[2]) + 6 - v) / 7);
            5 == y[1] && 2 == f && 0 == new Date(r[i]).getDay() && u.push({
                name: "母亲节",
                isLunar: 2,
                solarDay: r[i],
                solarDayFormet: y[0] + "-" + y[1] + "-" + y[2] + " 23:59:59",
                showSolarDay: y[1] + "月" + y[2] + "日",
                lunarDay: D.lunarYear + "-" + D.lunarMonth + "-" + D.lunarDay + " 23:59:59",
                lunarName: D.lunarMonthName + D.lunarDayName,
                icon: s["母亲节"]
            }), 6 == y[1] && 3 == f && 0 == new Date(r[i]).getDay() && u.push({
                name: "父亲节",
                isLunar: 2,
                solarDay: r[i],
                solarDayFormet: y[0] + "-" + y[1] + "-" + y[2] + " 23:59:59",
                showSolarDay: y[1] + "月" + y[2] + "日",
                lunarDay: D.lunarYear + "-" + D.lunarMonth + "-" + D.lunarDay + " 23:59:59",
                lunarName: D.lunarMonthName + D.lunarDayName,
                icon: s["父亲节"]
            }), 11 == y[1] && 4 == f && 0 == new Date(r[i]).getDay() && u.push({
                name: "感恩节",
                isLunar: 2,
                solarDay: r[i],
                solarDayFormet: y[0] + "-" + y[1] + "-" + y[2] + " 23:59:59",
                showSolarDay: y[1] + "月" + y[2] + "日",
                lunarDay: D.lunarYear + "-" + D.lunarMonth + "-" + D.lunarDay + " 23:59:59",
                lunarName: D.lunarMonthName + D.lunarDayName,
                icon: s["感恩节"]
            });
        }
        console.log(JSON.stringify(u));
    }
};
