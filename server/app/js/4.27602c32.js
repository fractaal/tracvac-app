(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"1c96":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"border border-solid border-gray-200 mb-5 flex items-center content-center justify-between relative p-4 rounded-lg",on:{click:t.emitClick}},[t.showBadge?n("q-badge",{attrs:{label:"NEW",floating:"",color:"red"}}):t._e(),n("div",{staticClass:" flex items-center"},[n("q-icon",{staticClass:"mr-2 text-blue-500",attrs:{name:t.icon,size:"md"}}),n("p",{staticClass:"font-bold m-0"},[t._v(t._s(t.title))])],1),n("q-icon",{attrs:{name:"keyboard_arrow_right"}})],1)},i=[],r=n("2b0e"),o=r["a"].extend({name:"ButtonCard",props:{title:{type:String,required:!0},icon:{type:String,required:!0},showBadge:{type:Boolean,required:!1}},methods:{emitClick(){setTimeout((()=>{this.$emit("click")}),150)}}}),c=o,s=n("2877"),u=n("58a81"),l=n("0016"),f=n("714f"),d=n("eebe"),h=n.n(d),p=Object(s["a"])(c,a,i,!1,null,null,null);e["a"]=p.exports;h()(p,"components",{QBadge:u["a"],QIcon:l["a"]}),h()(p,"directives",{Ripple:f["a"]})},"24c1":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("q-img",{staticClass:"rounded-full shadow-xl ring-4 ring-white",attrs:{src:t.fullPath,ratio:"1"}},[n("q-menu",[n("q-list",[n("q-item",{directives:[{name:"ripple",rawName:"v-ripple"},{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""}},[n("q-item-section",{on:{click:function(e){return t.$router.push("/change-profile-picture")}}},[t._v("\n            Change Profile Picture\n          ")])],1)],1)],1)],1)],1)},i=[],r=n("2b0e"),o=n("2047"),c=n("18d6"),s=r["a"].extend({name:"ProfilePicture",created(){this.getProfilePicturePath()},methods:{getProfilePicturePath(){var t;this.fullPath=new URL(null===(t=o["a"].userInfo)||void 0===t?void 0:t.profilePicturePath,c["a"].getItem("server")).toString()}},data(){return{errored:!1,store:o["a"],fullPath:""}},watch:{"store.userInfo.profilePicturePath":function(){this.getProfilePicturePath()}}}),u=s,l=n("2877"),f=n("068f"),d=n("4e73"),h=n("1c1c"),p=n("66e5"),m=n("4074"),b=n("714f"),v=n("7f67"),g=n("eebe"),y=n.n(g),w=Object(l["a"])(u,a,i,!1,null,"7a5ff2f3",null);e["a"]=w.exports;y()(w,"components",{QImg:f["a"],QMenu:d["a"],QList:h["a"],QItem:p["a"],QItemSection:m["a"]}),y()(w,"directives",{Ripple:b["a"],ClosePopup:v["a"]})},"2ff9":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",[n("q-pull-to-refresh",{on:{refresh:t.getUserInfo}},[n("custom-header",{staticClass:"bg-blue-500 text-white m-0",attrs:{title:"Profile"}}),n("div",{staticClass:"bg-blue-500 p-8 -mt-12 text-white mb-8 rounded-b-3xl"},[n("profile-picture",{staticClass:"block mx-auto w-24 h-24"}),n("h5",{staticClass:"my-5 text-center text-bold"},[t._v(t._s(t.store.userInfo.firstName)+" "+t._s(t.store.userInfo.middleName)+" "+t._s(t.store.userInfo.lastName))])],1),n("div",{staticClass:"px-8"},[n("div",{staticClass:"p-4 mb-8 border border-solid border-gray-200 rounded-lg text-center"},[t.store.changeInVaccinationStatus?n("q-badge",{staticClass:"float-right",attrs:{label:"NEW",color:"red"}}):t._e(),n("q-icon",{staticClass:"text-blue-500 block mx-auto",attrs:{name:t.store.userInfo.isVaccinated?"fas fa-check-circle":"fas fa-times-circle",size:"128px"}}),n("p",{staticClass:"m-0 mt-4 font-bold"},[t._v(t._s(t.store.userInfo.isVaccinated?"You are vaccinated":"You are not vaccinated"))]),n("p",{staticClass:"text-xs"},[n("i",[t._v("Please check the vaccine status tab for more details.")])])],1),n("button-card",{attrs:{icon:"fas fa-user",title:"Personal Information"},on:{click:function(e){return t.$router.push("/personal-info")}}}),n("button-card",{attrs:{icon:"fas fa-portrait",title:"Change Profile Picture"},on:{click:function(e){return t.$router.push("/change-profile-picture")}}}),n("button-card",{attrs:{"show-badge":t.store.changeInVaccineStatus,icon:"fas fa-syringe",title:"Vaccine Status"},on:{click:function(e){return t.$router.push("/vaccine")}}}),n("button-card",{attrs:{icon:"fas fa-pen-fancy",title:"Create A Log"},on:{click:function(e){return t.$router.push("/view-log")}}})],1)],1)],1)},i=[],r=n("2047"),o=n("ea9b"),c=n("2b0e"),s=n("1c96"),u=n("24c1"),l=n("339c"),f=n("802f"),d=function(t,e,n,a){function i(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,r){function o(t){try{s(a.next(t))}catch(e){r(e)}}function c(t){try{s(a["throw"](t))}catch(e){r(e)}}function s(t){t.done?n(t.value):i(t.value).then(o,c)}s((a=a.apply(t,e||[])).next())}))},h=c["a"].extend({name:"Profile",components:{ProfilePicture:u["a"],ButtonCard:s["a"],CustomHeader:l["a"]},data(){return{store:r["a"]}},beforeRouteLeave(t,e,n){r["a"].changeInVaccinationStatus&&(r["a"].changeInVaccinationStatus=!1),n()},methods:{getUserInfo(t){return d(this,void 0,void 0,(function*(){yield Object(o["b"])(),yield Object(f["a"])(),t()}))}}}),p=h,m=n("2877"),b=n("9989"),v=n("59d7"),g=n("58a81"),y=n("0016"),w=n("eebe"),I=n.n(w),x=Object(m["a"])(p,a,i,!1,null,null,null);e["default"]=x.exports;I()(x,"components",{QPage:b["a"],QPullToRefresh:v["a"],QBadge:g["a"],QIcon:y["a"]})},"339c":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"m-0 py-4 px-4"},[n("q-btn",{staticClass:"inline mr-4 p-0",attrs:{flat:"",round:"",icon:"keyboard_arrow_left"},on:{click:t.goBack}}),n("h5",{staticClass:"align-middle inline font-bold"},[t._v(t._s(t.title))])],1)},i=[],r=n("2b0e"),o=function(t,e,n,a){function i(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,r){function o(t){try{s(a.next(t))}catch(e){r(e)}}function c(t){try{s(a["throw"](t))}catch(e){r(e)}}function s(t){t.done?n(t.value):i(t.value).then(o,c)}s((a=a.apply(t,e||[])).next())}))},c=r["a"].extend({name:"BlueHeader",props:{title:{type:String}},methods:{goBack(){return o(this,void 0,void 0,(function*(){yield new Promise((t=>setTimeout(t,150))),this.$router.back()}))}}}),s=c,u=n("2877"),l=n("9c40"),f=n("eebe"),d=n.n(f),h=Object(u["a"])(s,a,i,!1,null,"5b0f3949",null);e["a"]=h.exports;d()(h,"components",{QBtn:l["a"]})},"802f":function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var a=n("18d6"),i=n("2047"),r=n("d7ca"),o=function(t,e,n,a){function i(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,r){function o(t){try{s(a.next(t))}catch(e){r(e)}}function c(t){try{s(a["throw"](t))}catch(e){r(e)}}function s(t){t.done?n(t.value):i(t.value).then(o,c)}s((a=a.apply(t,e||[])).next())}))};function c(){return o(this,void 0,void 0,(function*(){let t=a["a"].getItem("alreadyRead");null===t&&a["a"].set("alreadyRead",[]),t=a["a"].getItem("alreadyRead");const[e]=yield Object(r["a"])(0);for(const a of e)if(-1===(null===t||void 0===t?void 0:t.indexOf(a.id))){for(const t of i["a"].menu)"Notifications from your LGU"===t.name&&(t.showBadge=!0);t.push(a.id)}a["a"].set("alreadyRead",t);const n=a["a"].getItem("lastIsVaccinated"),o=a["a"].getItem("lastIsVaccineReady");if(null!==n||null!==o){const t=!!i["a"].userInfo.isVaccinated,e=i["a"].userInfo.isVaccineReady;t!==n&&(i["a"].changeInVaccinationStatus=!0),e!==o&&(i["a"].changeInVaccineStatus=!0),a["a"].set("lastIsVaccinated",t),a["a"].set("lastIsVaccineReady",e)}else a["a"].set("lastIsVaccinated",!!i["a"].userInfo.isVaccinated),a["a"].set("lastIsVaccineReady",i["a"].userInfo.isVaccineReady)}))}},d7ca:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));n("2047");var a=n("44eb"),i=n("1d60"),r=n("18d6"),o=function(t,e,n,a){function i(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,r){function o(t){try{s(a.next(t))}catch(e){r(e)}}function c(t){try{s(a["throw"](t))}catch(e){r(e)}}function s(t){t.done?n(t.value):i(t.value).then(o,c)}s((a=a.apply(t,e||[])).next())}))};function c(t){return o(this,void 0,void 0,(function*(){try{const e=yield a["b"].get(`/notification/${t}`),n=r["a"].getItem("alreadyRead");for(const t of e.data.notifications.results)-1===n.indexOf(t.id)&&n.push(t.id);return r["a"].set("alreadyRead",n),[e.data.notifications.results,0===e.data.notifications.results.length]}catch(e){return i["a"].negative(`An error occurred while trying to get notifications! ${e}`),[null,!1]}}))}}}]);