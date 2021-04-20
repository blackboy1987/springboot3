require('./../../runtime.js');
require('./../../remax-vendors.js');
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([[4],{

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(34);


/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@remax/runtime/esm/index.js + 25 modules
var esm = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/remax/wechat.js
var wechat = __webpack_require__(3);

// EXTERNAL MODULE: ./src/pages/index/index.css
var pages_index = __webpack_require__(14);

// EXTERNAL MODULE: ./src/util/constant.ts
var constant = __webpack_require__(5);

// EXTERNAL MODULE: ./src/component/myAd/index.tsx
var myAd = __webpack_require__(10);

// CONCATENATED MODULE: ./src/pages/index/index.tsx
function _slicedToArray(arr,i){return _arrayWithHoles(arr)||_iterableToArrayLimit(arr,i)||_unsupportedIterableToArray(arr,i)||_nonIterableRest();}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}function _iterableToArrayLimit(arr,i){if(typeof Symbol==="undefined"||!(Symbol.iterator in Object(arr)))return;var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"]!=null)_i["return"]();}finally{if(_d)throw _e;}}return _arr;}function _arrayWithHoles(arr){if(Array.isArray(arr))return arr;}/* harmony default export */ var src_pages_index = (function(){var _useState=Object(react["useState"])({}),_useState2=_slicedToArray(_useState,2),indexAd=_useState2[0],setIndexAd=_useState2[1];Object(esm["g" /* usePageEvent */])("onLoad",function(){Object(wechat["j" /* request */])({url:constant["a" /* Constants */].baseUrl+"config",method:'POST',header:{'appCode':constant["a" /* Constants */].appCode,'appToken':constant["a" /* Constants */].appToken}}).then(function(response){wx.setStorageSync("appConfig",response.data.data);setIndexAd(response.data.data.indexAd||{});var interstitialAd=Object(wechat["f" /* createInterstitialAd */])({adUnitId:response.data.data.indexAd.interstitialAdId});setTimeout(function(){interstitialAd.show().catch(function(err){console.error(err);});},15e3);});});return/*#__PURE__*/react["createElement"](wechat["e" /* View */],null,/*#__PURE__*/react["createElement"]("view",{className:"fortune_box bg5"},/*#__PURE__*/react["createElement"](myAd["a" /* default */],{adConfig:indexAd}),/*#__PURE__*/react["createElement"](wechat["e" /* View */],{className:"fortune"},constant["b" /* data */].map(function(item,index){return/*#__PURE__*/react["createElement"](wechat["e" /* View */],{className:"li",onClick:function onClick(){Object(wechat["i" /* navigateTo */])({url:'/pages/fortune_info/index?id='+(index+1)});},key:index,__key:index},/*#__PURE__*/react["createElement"](wechat["c" /* Image */],{className:"li_img",mode:"widthFix",src:"/images/item-circle/".concat(index+1,".png")}),/*#__PURE__*/react["createElement"](wechat["e" /* View */],{className:"name"},item.name),/*#__PURE__*/react["createElement"](wechat["e" /* View */],{className:"date"},item.date));}))));});
// CONCATENATED MODULE: ./src/pages/index/index.entry.js
__webpack_require__(14);Page(Object(esm["e" /* createPageConfig */])(src_pages_index,'pages/index/index'));

/***/ })

},[[29,1,0]]]);