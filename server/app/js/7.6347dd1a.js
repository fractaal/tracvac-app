(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"339c":function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"m-0 py-4 px-4"},[s("q-btn",{staticClass:"inline mr-4 p-0",attrs:{flat:"",round:"",icon:"keyboard_arrow_left"},on:{click:e.goBack}}),s("h5",{staticClass:"align-middle inline font-bold"},[e._v(e._s(e.title))])],1)},i=[],a=s("2b0e"),r=function(e,t,s,n){function i(e){return e instanceof s?e:new s((function(t){t(e)}))}return new(s||(s=Promise))((function(s,a){function r(e){try{c(n.next(e))}catch(t){a(t)}}function o(e){try{c(n["throw"](e))}catch(t){a(t)}}function c(e){e.done?s(e.value):i(e.value).then(r,o)}c((n=n.apply(e,t||[])).next())}))},o=a["a"].extend({name:"BlueHeader",props:{title:{type:String}},methods:{goBack(){return r(this,void 0,void 0,(function*(){yield new Promise((e=>setTimeout(e,150))),this.$router.back()}))}}}),c=o,l=s("2877"),p=s("9c40"),u=s("eebe"),d=s.n(u),v=Object(l["a"])(c,n,i,!1,null,"5b0f3949",null);t["a"]=v.exports;d()(v,"components",{QBtn:p["a"]})},9224:function(e){e.exports=JSON.parse('{"name":"tracvac","version":"1.3.8","description":"Vaccine passport application.","productName":"Tracvac","author":"visualsbykleio@gmail.com","private":true,"scripts":{"lint":"eslint --ext .js,.ts,.vue ./","build-pwa":"quasar build -m pwa","test":"echo \\"No test specified\\" && exit 0"},"dependencies":{"@quasar/extras":"^1.0.0","axios":"^0.18.1","core-js":"^3.6.5","date-fns":"^2.19.0","fastclick":"^1.0.6","http-proxy-middleware":"0.19.x","quasar":"^1.0.0","typescript":"3.8.3","vue-page-transition":"^0.2.2"},"devDependencies":{"@quasar/app":"^2.0.0","@types/fastclick":"^1.0.29","@types/node":"^10.17.15","@typescript-eslint/eslint-plugin":"^3.3.0","@typescript-eslint/parser":"^3.3.0","babel-eslint":"^10.0.1","eslint":"^6.8.0","eslint-config-standard":"^14.1.0","eslint-loader":"^3.0.3","eslint-plugin-import":"^2.14.0","eslint-plugin-node":"^11.0.0","eslint-plugin-promise":"^4.0.1","eslint-plugin-standard":"^4.0.0","eslint-plugin-vue":"^6.1.2","quasar-app-extension-tailwindcss":"^2.0.4","workbox-webpack-plugin":"^5.0.0"},"browserslist":["last 10 Chrome versions","last 10 Firefox versions","last 4 Edge versions","last 7 Safari versions","last 8 Android versions","last 8 ChromeAndroid versions","last 8 FirefoxAndroid versions","last 10 iOS versions","last 5 Opera versions"],"engines":{"node":">= 10.18.1","npm":">= 6.13.4","yarn":">= 1.21.1"}}')},"982f":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",[n("custom-header",{attrs:{title:"Preferences"}}),n("div",{staticClass:"px-8"},[n("p",{staticClass:"font-bold m-0 p-0 text-gray-500"},[e._v("YOU'RE CONNECTED TO")]),n("p",{staticClass:"text-h5 m-0"},[e._v(e._s(e.store.serverInfo.location))]),n("p",{staticClass:"m-0"},[e._v("at "),n("b",[e._v(e._s(e.store.serverInfo.address))])]),n("hr"),n("q-btn",{attrs:{outline:"",label:"Disconnect"},on:{click:e.disconnect}}),n("div",{staticClass:"text-subtitle2 mt-4 font-bold m-0 p-0 text-gray-500"},[e._v("\n      APP VERSION "+e._s(s("9224").version)+"\n    ")])],1)],1)},i=[],a=s("2b0e"),r=s("2047"),o=s("44eb"),c=s("339c"),l=a["a"].extend({name:"Preferences",components:{CustomHeader:c["a"]},data(){return{store:r["a"]}},methods:{disconnect:o["c"]}}),p=l,u=s("2877"),d=s("9989"),v=s("9c40"),f=s("eebe"),m=s.n(f),b=Object(u["a"])(p,n,i,!1,null,"3c27755a",null);t["default"]=b.exports;m()(b,"components",{QPage:d["a"],QBtn:v["a"]})}}]);