appCode:"AEC4OARSJZAB4SG3TA",
appToken:"bdb1123588b8c311c661e2e2f6bff63195fb1932809403507e67044dfadgg755",
baseUrl:"https://www.igomall.xin/api/v3/",

1.修改的地方：
    main.js 32行到34行：
        appCode:"AEC4OARSJZAB4SG3TA",
        appToken:"bdb1123588b8c311c661e2e2f6bff63195fb1932809403507e67044dfadgg755",
        baseUrl:"https://www.igomall.xin/api/v3/",
    main.js 151行：
        c.default.prototype.cjurl = "http://localhost:9000/api/v3/",
        改成
        c.default.prototype.cjurl = "http://接口地址/api/v3/",

    vendor.js 54行到55行：
        appCode:"AEC4OARSJZAB4SG3TA",
        appToken:"bdb1123588b8c311c661e2e2f6bff63195fb1932809403507e67044dfadgg755",
        
