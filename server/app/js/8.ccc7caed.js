(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"339c":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"m-0 py-4 px-4"},[n("q-btn",{staticClass:"inline mr-4 p-0",attrs:{flat:"",round:"",icon:"keyboard_arrow_left"},on:{click:e.goBack}}),n("h5",{staticClass:"align-middle inline font-bold"},[e._v(e._s(e.title))])],1)},a=[],c=n("2b0e"),s=function(e,t,n,o){function a(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,c){function s(e){try{i(o.next(e))}catch(t){c(t)}}function r(e){try{i(o["throw"](e))}catch(t){c(t)}}function i(e){e.done?n(e.value):a(e.value).then(s,r)}i((o=o.apply(e,t||[])).next())}))},r=c["a"].extend({name:"BlueHeader",props:{title:{type:String}},methods:{goBack(){return s(this,void 0,void 0,(function*(){yield new Promise((e=>setTimeout(e,150))),this.$router.back()}))}}}),i=r,u=n("2877"),l=n("9c40"),f=n("eebe"),d=n.n(f),h=Object(u["a"])(i,o,a,!1,null,"5b0f3949",null);t["a"]=h.exports;d()(h,"components",{QBtn:l["a"]})},"595c":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("q-page",[o("q-pull-to-refresh",{on:{refresh:e.getUserInfo}},[o("custom-header",{staticClass:"bg-blue-500 text-white",attrs:{title:"Vaccine Status"}}),o("div",{staticClass:"m-8 p-8 border-solid border-blue-500 shadow-lg rounded-lg text-center"},[o("p",{staticClass:"m-0 font-bold text-h4"},[e._v("Your vaccine is "+e._s(e.store.userInfo.isVaccineReady.toLowerCase())+".")]),"Ready"===e.store.userInfo.isVaccineReady?o("p",[e._v("\n        Please proceed to your local healthcare center for your vaccination process.\n      ")]):o("p",[e._v("\n        Check back soon! We'll notify you once it is.\n      ")]),o("img",{staticClass:"w-3/4 mx-auto",attrs:{src:n("f5ce"),alt:""}}),o("q-icon",{staticClass:"block ml-auto mr-12 -mt-16",class:e.color,attrs:{name:e.icon,size:"72px"}}),"Ready"===e.store.userInfo.isVaccineReady?o("p",{staticClass:"text-h6"},[e._v("Manufacturer: "+e._s(e.store.userInfo.vaccineManufacturer))]):e._e(),e.store.userInfo.dosageNumber?o("p",[e._v("Dosage Number: "+e._s(e.store.userInfo.dosageNumber))]):e._e()],1)],1)],1)},a=[],c=n("2047"),s=n("ea9b"),r=n("339c"),i=n("2b0e"),u=function(e,t,n,o){function a(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,c){function s(e){try{i(o.next(e))}catch(t){c(t)}}function r(e){try{i(o["throw"](e))}catch(t){c(t)}}function i(e){e.done?n(e.value):a(e.value).then(s,r)}i((o=o.apply(e,t||[])).next())}))},l=i["a"].extend({name:"Profile",components:{CustomHeader:r["a"]},activated(){this.setIcon(),c["a"].changeInVaccineStatus=!1},updated(){this.setIcon()},data(){return{icon:"fas fa-times-circle",color:"text-red-500",store:c["a"]}},methods:{getUserInfo(e){return u(this,void 0,void 0,(function*(){yield Object(s["b"])(),e()}))},setIcon(){var e;switch(null===(e=c["a"].userInfo)||void 0===e?void 0:e.isVaccineReady){case"Ready":this.icon="far fa-check-circle",this.color="text-green-500";break;case"Not Ready":this.icon="far fa-times-circle",this.color="text-red-500";break;case"Pending":this.icon="far fa-hourglass",this.color="text-blue-500";break}}}}),f=l,d=n("2877"),h=n("9989"),p=n("59d7"),b=n("0016"),m=n("eebe"),v=n.n(m),y=Object(d["a"])(f,o,a,!1,null,null,null);t["default"]=y.exports;v()(y,"components",{QPage:h["a"],QPullToRefresh:p["a"],QIcon:b["a"]})},f5ce:function(e,t,n){e.exports=n.p+"img/tracvac-logo.b2ac70dc.png"}}]);