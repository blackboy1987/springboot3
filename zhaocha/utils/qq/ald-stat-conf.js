var app_key = "", accountInfo = wx.getAccountInfoSync(), appId = accountInfo.miniProgram.appId;

"1110169020" == appId && (app_key = "f720de7319ab054577d9d19adf66628f"), "1109994085" == appId && (app_key = "09ec88108a07e4791b36e9b33f24dced"), 
console.log("qq", appId, app_key), exports.app_key = app_key, exports.plugin = !1, 
exports.useOpen = !1, exports.openKey = "";