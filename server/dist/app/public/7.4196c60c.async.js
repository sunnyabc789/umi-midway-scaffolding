(window["webpackJsonp_sugo-portal-app"]=window["webpackJsonp_sugo-portal-app"]||[]).push([[7],{"7v3w":function(e,t,r){"use strict";var a=r("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.fetchHome=i;var n=a(r("d6i3")),s=a(r("1l/V")),u=a(r("ExLZ")),o=r("mjZG");function i(e){var t,r=(null===(t=window.sugo)||void 0===t?void 0:t.user)||{},a=function(){var t=(0,s.default)(n.default.mark(function t(){var a,s;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(r["home_app"]&&("all"===r.appsPermissions[0]||r.appsPermissions.includes(r["home_app"]))){t.next=2;break}return t.abrupt("return",e(""));case 2:return console.log(),t.next=5,u.default.get("".concat(o.requestBase,"/sugo-app/").concat(r["home_app"]));case 5:if(s=t.sent,s.success&&(null===(a=s.result)||void 0===a?void 0:a.length)){t.next=8;break}return t.abrupt("return",e(""));case 8:if(s.result[0].url){t.next=10;break}return t.abrupt("return",e(""));case 10:e(s.result[0].url);case 11:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}();a()}},eMoF:function(e,t,r){"use strict";var a=r("tAuX"),n=r("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=l;var s=n(r("qIgq")),u=a(r("q1tI")),o=(r("Hg0r"),r("g96v"),n(r("bKFA"))),i=r("7v3w"),c=(n(r("LvDl")),r("qKvR"));function l(e){var t=(0,u.useState)("loading"),r=(0,s.default)(t,2),a=r[0],n=r[1];return(0,u.useEffect)(function(){var e=!1;if(!e)return(0,i.fetchHome)(n),function(){e=!0}},[]),"loading"===a?(0,c.jsx)("div",{id:"content-loading"},(0,c.jsx)("div",{className:"spinner"},(0,c.jsx)("div",{className:"bounce1"}),(0,c.jsx)("div",{className:"bounce2"}),(0,c.jsx)("div",{className:"bounce3"}))):a?(0,c.jsx)("div",{className:"relative width-100 height-100",id:"portal-home"},(0,c.jsx)("iframe",{src:a,frameBorder:"0",width:"100%",height:"100%"})):(0,c.jsx)(o.default,null)}}}]);