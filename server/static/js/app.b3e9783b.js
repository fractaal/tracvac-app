(function(e){function t(t){for(var r,o,c=t[0],u=t[1],f=t[2],l=0,s=[];l<c.length;l++)o=c[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&s.push(a[o][0]),a[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);d&&d(t);while(s.length)s.shift()();return i.push.apply(i,f||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={1:0},a={1:0},i=[];function c(e){return u.p+"js/"+({}[e]||e)+"."+{2:"6255c898",3:"829ef4be",4:"a51ef223",5:"d0d4776d",6:"9187981c",7:"6c6071a0",8:"3aaea1a7"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={2:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{2:"a625a209",3:"31d6cfe0",4:"31d6cfe0",5:"31d6cfe0",6:"31d6cfe0",7:"31d6cfe0",8:"31d6cfe0"}[e]+".css",a=u.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var f=i[c],l=f.getAttribute("data-href")||f.getAttribute("href");if("stylesheet"===f.rel&&(l===r||l===a))return t()}var s=document.getElementsByTagName("style");for(c=0;c<s.length;c++){f=s[c],l=f.getAttribute("data-href");if(l===r||l===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],d.parentNode.removeChild(d),n(i)},d.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=i);var f,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=c(e);var s=new Error;f=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",s.name="ChunkLoadError",s.type=r,s.request=o,n[1](s)}a[e]=void 0}};var d=setTimeout((function(){f({type:"timeout",target:l})}),12e4);l.onerror=l.onload=f,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="",u.oe=function(e){throw console.error(e),e};var f=window["webpackJsonp"]=window["webpackJsonp"]||[],l=f.push.bind(f);f.push=t,f=f.slice();for(var s=0;s<f.length;s++)t(f[s]);var d=l;i.push([0,0]),n()})({0:function(e,t,n){e.exports=n("2f39")},2047:function(e,t,n){"use strict";t["a"]={usersToModify:[],axios:null,userShownInLogs:null,serverConfig:{isConfigured:!1,secret:null,location:null,lguUrl:null,httpPort:null,httpsPort:null}}},"2f39":function(e,t,n){"use strict";n.r(t);n("e6cf"),n("5319"),n("573e"),n("7d6e"),n("e54f"),n("4439"),n("4605"),n("f580"),n("5b2b"),n("8753"),n("2967"),n("7e67"),n("d770"),n("dd82"),n("922c"),n("d7fb"),n("a533"),n("c32e"),n("a151"),n("8bc7"),n("e80f"),n("5fec"),n("e42f"),n("57fc"),n("d67f"),n("880e"),n("1c10"),n("9482"),n("e797"),n("4848"),n("53d0"),n("63b1"),n("e9fd"),n("195c"),n("64e9"),n("33c5"),n("4f62"),n("0dbc"),n("7c38"),n("0756"),n("4953"),n("81db"),n("2e52"),n("22485"),n("7797"),n("12a1"),n("ce96"),n("70ca"),n("2318"),n("24bd"),n("8f27"),n("3064"),n("c9a2"),n("8767"),n("4a8e"),n("b828"),n("3c1c"),n("21cb"),n("c00e"),n("e4a8"),n("e4d3"),n("f4d9"),n("fffd"),n("f645"),n("639e"),n("34ee"),n("b794"),n("af24"),n("7c9c"),n("7bb2"),n("64f7"),n("c382"),n("053c"),n("c48f"),n("f5d1"),n("3cec"),n("c00ee"),n("d450"),n("ca07"),n("14e3"),n("9393"),n("9227"),n("1dba"),n("674a"),n("de26"),n("6721"),n("9cb5"),n("ed9b"),n("fc83"),n("98e5"),n("605a"),n("ba60"),n("df07"),n("7903"),n("e046"),n("58af"),n("7713"),n("0571"),n("3e27"),n("6837"),n("3fc9"),n("0693"),n("bf41"),n("985d"),n("31cd"),n("9a0d");var r=n("2b0e"),o=n("1f91"),a=n("b3f7"),i=n("b05d"),c=n("436b"),u=n("2a19");r["a"].use(i["a"],{config:{},lang:o["a"],iconSet:a["a"],plugins:{Dialog:c["a"],Notify:u["a"]}});var f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"q-app"}},[n("router-view")],1)},l=[],s=n("d89f"),d=function(e,t,n,r){function o(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,a){function i(e){try{u(r.next(e))}catch(t){a(t)}}function c(e){try{u(r["throw"](e))}catch(t){a(t)}}function u(e){e.done?n(e.value):o(e.value).then(i,c)}u((r=r.apply(e,t||[])).next())}))},p=r["a"].extend({name:"App",created(){return d(this,void 0,void 0,(function*(){const e=yield Object(s["a"])();e.isConfigured||(this.$q.dialog({cancel:!1,title:"Configure me first!",message:"Before this Tracvac site can be used, we need to perform a pre-flight check."}),yield this.$router.push("/config"))}))}}),h=p,b=n("2877"),g=Object(b["a"])(h,f,l,!1,null,null,null),v=g.exports,m=n("4bde"),y=n("8c4f");const w=[{path:"/",component:()=>Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"713b")),children:[{path:"",component:()=>Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"8b24"))},{path:"/config",component:()=>Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"99a5"))},{path:"/notif",component:()=>Promise.all([n.e(0),n.e(7)]).then(n.bind(null,"f2e3"))},{path:"/addNotif",component:()=>Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"a5a6"))},{path:"/view-logs",component:()=>Promise.all([n.e(0),n.e(8)]).then(n.bind(null,"b433"))}]},{path:"*",component:()=>Promise.all([n.e(0),n.e(6)]).then(n.bind(null,"e51e"))}];var P=w,x=Object(m["route"])((function({Vue:e}){e.use(y["a"]);const t=new y["a"]({scrollBehavior:()=>({x:0,y:0}),routes:P,mode:"hash",base:""});return t})),C=async function(){const e="function"===typeof x?await x({Vue:r["a"]}):x,t={router:e,render:e=>e(v),el:"#q-app"};return{app:t,router:e}},O=n("bc3a"),j=n.n(O),S=n("2047"),_=Object(m["boot"])((({Vue:e})=>{j.a.defaults.validateStatus=e=>e<500,e.prototype.$axios=j.a,S["a"].axios=j.a}));const E="";async function T(){const{app:e,router:t}=await C();let n=!1;const o=e=>{n=!0;const r=Object(e)===e?t.resolve(e).route.fullPath:e;window.location.href=r},a=window.location.href.replace(window.location.origin,""),i=[_];for(let u=0;!1===n&&u<i.length;u++)if("function"===typeof i[u])try{await i[u]({app:e,router:t,Vue:r["a"],ssrContext:null,redirect:o,urlPath:a,publicPath:E})}catch(c){return c&&c.url?void(window.location.href=c.url):void console.error("[Quasar] boot error:",c)}!0!==n&&new r["a"](e)}T()},"31cd":function(e,t,n){},"9a0d":function(e,t,n){},d89f:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return c}));var r=n("2047"),o=n("2a19"),a=function(e,t,n,r){function o(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,a){function i(e){try{u(r.next(e))}catch(t){a(t)}}function c(e){try{u(r["throw"](e))}catch(t){a(t)}}function u(e){e.done?n(e.value):o(e.value).then(i,c)}u((r=r.apply(e,t||[])).next())}))};function i(){return a(this,void 0,void 0,(function*(){try{const e=yield r["a"].axios.get("/admin/setup");return r["a"].serverConfig=Object.assign({},r["a"].serverConfig,e.data),e.data}catch(e){o["a"].create({message:`Configuration load from server failed: ${e}`,type:"negative"})}}))}function c(e){return a(this,void 0,void 0,(function*(){delete e.isConfigured;try{const t=yield r["a"].axios.post("/admin/setup",e);t.data.result?(o["a"].create({message:"Configuration saved!",type:"positive"}),yield i()):o["a"].create({message:`Configuration save failed - ${t.data.message}`,type:"negative"})}catch(t){o["a"].create({message:`Configuration save failed - ${t}`,type:"negative"})}}))}}});