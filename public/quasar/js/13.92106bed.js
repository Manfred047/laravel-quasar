(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{"1e16":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-layout",{attrs:{view:"hHh Lpr lFf"}},[r("q-header",{staticClass:"glossy",attrs:{elevated:""}},[r("q-toolbar",[r("q-btn",{attrs:{flat:"",dense:"",round:"","aria-label":"Menu"},on:{click:function(e){t.drawer=!t.drawer}}},[r("q-icon",{attrs:{name:"menu"}})],1),r("q-toolbar-title",[t._v("\n        Laravel 6.0 with Quasar v"+t._s(t.$q.version)+" (SPA) by Manfred047\n      ")])],1)],1),r("q-drawer",{attrs:{bordered:"","content-class":"bg-grey-2"},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[r("q-scroll-area",{staticStyle:{height:"calc(100% - 150px)","margin-top":"150px","border-right":"1px solid #ddd"}},[r("q-list",[r("q-item-label",{attrs:{header:""}},[t._v("Essential Links")]),r("q-item",{attrs:{exact:"",tag:"a",clickable:"",to:{name:"public.index"}}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"home"}})],1),r("q-item-section",[r("q-item-label",[t._v(t._s(t.$t("page_titles.home_title")))])],1)],1),r("q-item",{attrs:{to:{name:"auth.user"}}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"account_box"}})],1),r("q-item-section",[r("q-item-label",[t._v(t._s(t.$t("page_titles.user_title")))])],1)],1),r("q-item",{attrs:{to:{name:"auth.info"}}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"info"}})],1),r("q-item-section",[r("q-item-label",[t._v(t._s(t.$t("page_titles.info_title")))])],1)],1),r("q-item",{attrs:{to:"/go-error"}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"error"}})],1),r("q-item-section",[r("q-item-label",[t._v(t._s(t.$t("page_titles.e404_title")))])],1)],1),r("q-item",{attrs:{clickable:""},on:{click:function(e){return t.logout(t.$router)}}},[r("q-item-section",{attrs:{avatar:""}},[r("q-icon",{attrs:{name:"lock"}})],1),r("q-item-section",[r("q-item-label",[t._v(t._s(t.$t("page_titles.logout_title")))])],1)],1)],1)],1),r("q-img",{staticClass:"absolute-top",staticStyle:{height:"150px"},attrs:{src:"https://cdn.quasar.dev/img/material.png"}},[r("div",{staticClass:"absolute-bottom bg-transparent text-center"},[r("q-avatar",{staticClass:"q-mb-sm",attrs:{size:"70px"}},[r("img",{attrs:{src:a("98e8")}})]),r("div",{staticClass:"text-weight-bold"},[t._v(t._s(t.username))]),r("div",[t._v(t._s(t.email))])],1)])],1),r("q-page-container",[r("router-view")],1),r("footer-layout")],1)},n=[],i=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("9523")),o=a.n(i),s=a("2f62"),c=a("f508");function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function u(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){o()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var m={preFetch:function(t){var e=t.store,a=t.currentRoute,r=(t.previousRoute,t.redirect);t.ssrContext;return c["a"].show(),e.dispatch("auth/getUserData").then((function(t){if(!e.getters["auth/isAuth"])return r("/login?redirect=".concat(a.fullPath))})).catch((function(t){return r("/login?redirect=".concat(a.fullPath))})).then((function(){c["a"].hide()}))},name:"AdminLayout",components:{"footer-layout":function(){return Promise.all([a.e(0),a.e(2)]).then(a.bind(null,"5966"))}},computed:u({},Object(s["c"])("auth",["username","email"])),methods:u({},Object(s["b"])("auth",["logout"])),data:function(){return{drawer:!1}}},b=m,d=a("2877"),p=a("eebe"),f=a.n(p),q=a("4d5a"),g=a("e359"),h=a("65c6"),v=a("9c40"),_=a("0016"),w=a("6ac5"),y=a("9404"),O=a("4983"),Q=a("1c1c"),j=a("0170"),x=a("66e5"),P=a("4074"),k=a("068f"),$=a("cb32"),C=a("09e3"),L=Object(d["a"])(b,r,n,!1,null,"46334558",null);e["default"]=L.exports;f()(L,"components",{QLayout:q["a"],QHeader:g["a"],QToolbar:h["a"],QBtn:v["a"],QIcon:_["a"],QToolbarTitle:w["a"],QDrawer:y["a"],QScrollArea:O["a"],QList:Q["a"],QItemLabel:j["a"],QItem:x["a"],QItemSection:P["a"],QImg:k["a"],QAvatar:$["a"],QPageContainer:C["a"]})},"98e8":function(t,e,a){t.exports=a.p+"img/smile.c78bd322.jpg"}}]);