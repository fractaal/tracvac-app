(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"713b":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-layout",{attrs:{view:"lHh Lpr lFf"}},[a("q-drawer",{attrs:{"show-if-above":"",bordered:"","content-class":"bg-grey-1"},model:{value:t.leftDrawerOpen,callback:function(e){t.leftDrawerOpen=e},expression:"leftDrawerOpen"}},[a("h5",{staticClass:"px-8 mt-12 m-0 font-bold truncate"},[t._v(t._s(t.store.serverConfig.location))]),a("p",{staticClass:"px-8 mb-2"},[t._v("TRACVAC ADMINISTRATOR")]),a("p",{staticClass:"px-8 font-semibold",class:t.store.serverConfig.isConfigured?"text-green-700":"text-red-500"},[t._v("\n      "+t._s(t.store.serverConfig.isConfigured?"SERVER READY":"SERVER NOT CONFIGURED")+"\n    ")]),a("q-list",{staticClass:"my-auto blo"},[a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"p-12",attrs:{clickable:""},on:{click:function(e){return t.$router.push("/")}}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{color:"primary",name:"person",size:"lg"}})],1),a("q-item-section",{staticClass:"text-lg"},[a("b",[t._v("People")]),a("i",{staticClass:"text-sm"},[t._v("Change vaccination status of people on this site.")])])],1),a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"p-12",attrs:{clickable:""},on:{click:function(e){return t.$router.push("/notif")}}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{color:"primary",name:"announcement",size:"lg"}})],1),a("q-item-section",{staticClass:"text-lg"},[a("b",[t._v("Notifications")]),a("i",{staticClass:"text-sm"},[t._v("Push notifications to everyone on this site.")])])],1),a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"p-12",attrs:{clickable:""},on:{click:function(e){return t.$router.push("/config")}}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{color:"primary",name:"settings",size:"lg"}})],1),a("q-item-section",{staticClass:"text-lg"},[a("b",[t._v("Configuration")]),a("i",{staticClass:"text-sm"},[t._v("Set some very important options for Tracvac to run.")])])],1)],1)],1),a("q-page-container",[a("keep-alive",[a("router-view")],1),a("q-page-sticky",{attrs:{offset:[20,20],position:"top-right"}},[a("q-btn",{attrs:{fab:"",color:"secondary",icon:"remove_red_eye"},on:{click:function(e){t.leftDrawerOpen=!t.leftDrawerOpen}}})],1)],1)],1)},i=[],r=a("2047"),n=a("2b0e"),o=n["a"].extend({name:"MainLayout",data(){return{store:r["a"],leftDrawerOpen:!1}}}),c=o,l=a("2877"),p=a("4d5a"),m=a("9404"),u=a("1c1c"),f=a("66e5"),v=a("4074"),C=a("0016"),g=a("09e3"),b=a("de5e"),d=a("9c40"),w=a("714f"),q=a("eebe"),_=a.n(q),x=Object(l["a"])(c,s,i,!1,null,null,null);e["default"]=x.exports;_()(x,"components",{QLayout:p["a"],QDrawer:m["a"],QList:u["a"],QItem:f["a"],QItemSection:v["a"],QIcon:C["a"],QPageContainer:g["a"],QPageSticky:b["a"],QBtn:d["a"]}),_()(x,"directives",{Ripple:w["a"]})}}]);