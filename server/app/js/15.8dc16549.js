(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{"713b":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-layout",{attrs:{view:"hHh lpR fFf"}},[a("q-page-container",[a("transition",{attrs:{"enter-active-class":"animated "+e.transition.in,"leave-active-class":"animated "+e.transition.out,mode:"out-in",duration:100}},[a("keep-alive",[a("router-view")],1)],1),a("q-footer",{staticClass:"bg-white shadow-5 rounded-t-2xl mx-4"},[a("q-tabs",{staticClass:"text-black rounded-t-2xl",model:{value:e.store.activeRoute,callback:function(t){e.$set(e.store,"activeRoute",t)},expression:"store.activeRoute"}},[a("q-tab",{class:"/profile"===e.store.activeRoute?"text-blue-500":"",attrs:{name:"/profile",icon:"fas fa-user",label:"Profile"},on:{click:function(t){return e.$router.push("/profile")}}},[e.store.changeInVaccineStatus||e.store.changeInVaccinationStatus?a("q-badge",{attrs:{floating:"",color:"red",label:"NEW"}}):e._e()],1),a("q-tab",{class:"/home"===e.store.activeRoute?"text-blue-500":"",attrs:{name:"/home",icon:"fas fa-home",label:"Home"},on:{click:function(t){return e.$router.push("/home")}}}),a("q-tab",{class:"/logs"===e.store.activeRoute?"text-blue-500":"",attrs:{name:"/logs",icon:"fas fa-pen-fancy",label:"Logs"},on:{click:function(t){return e.$router.push("/logs")}}})],1)],1)],1)],1)},n=[],s=a("d3a2"),i=a("2047"),r=a("2b0e"),l=a("9baa"),c=r["a"].extend({name:"MainLayout",data(){return{store:i["a"],transition:s["a"]}},beforeRouteLeave(e,t,a){"/login"===e.path?Object(l["a"])()?(console.log("preventing unwanted navigation back to login"),a(!1)):a():"/"===e.path?(console.log("preventing unwanted navigation back to splash"),a(!1)):a()}}),u=c,b=a("2877"),f=a("4d5a"),p=a("09e3"),d=a("7ff0"),g=a("429b"),v=a("7460"),h=a("58a81"),m=a("eebe"),w=a.n(m),k=Object(b["a"])(u,o,n,!1,null,null,null);t["default"]=k.exports;w()(k,"components",{QLayout:f["a"],QPageContainer:p["a"],QFooter:d["a"],QTabs:g["a"],QTab:v["a"],QBadge:h["a"]})}}]);