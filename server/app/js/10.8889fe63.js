(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{"11c2":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("custom-header",{attrs:{title:"Change Profile Picture"}}),n("div",{staticClass:"px-8"},[n("p",{staticClass:"font-bold p-0 text-gray-500"},[t._v("SELECT A PICTURE")]),n("q-file",{attrs:{filled:"",label:"Some picture..."},model:{value:t.file,callback:function(e){t.file=e},expression:"file"}}),n("br"),n("q-img",{attrs:{src:t.url}}),n("br"),t.file?n("p",{staticClass:"font-bold p-0 text-gray-500 text-center text-sm mt-2"},[n("i",[t._v("FOR BEST RESULTS, UPLOAD A SQUARE IMAGE.")])]):t._e(),t.file?n("q-btn",{staticClass:"p-2 block mx-auto",attrs:{loading:t.loading,unelevated:"",color:"primary"},on:{click:t.uploadProfilePicture}},[t._v("UPLOAD")]):t._e()],1)],1)},o=[],a=n("2b0e"),c=n("339c"),l=n("ea9b"),r=function(t,e,n,i){function o(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,a){function c(t){try{r(i.next(t))}catch(e){a(e)}}function l(t){try{r(i["throw"](t))}catch(e){a(e)}}function r(t){t.done?n(t.value):o(t.value).then(c,l)}r((i=i.apply(t,e||[])).next())}))},s=a["a"].extend({components:{CustomHeader:c["a"]},name:"ChangeProfilePicture",activated(){this.file=null},data(){return{loading:!1,file:null}},computed:{url(){try{return console.log(this.file),URL.createObjectURL(this.file)}catch(t){return""}}},methods:{uploadProfilePicture(){return r(this,void 0,void 0,(function*(){this.loading=!0;const t=yield Object(l["c"])(this.file);this.loading=!1,t&&this.$router.back()}))}}}),u=s,f=n("2877"),d=n("7d53"),p=n("068f"),h=n("9c40"),m=n("eebe"),b=n.n(m),v=Object(f["a"])(u,i,o,!1,null,"f42635b4",null);e["default"]=v.exports;b()(v,"components",{QFile:d["a"],QImg:p["a"],QBtn:h["a"]})},"339c":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"m-0 py-4 px-4"},[n("q-btn",{staticClass:"inline mr-4 p-0",attrs:{flat:"",round:"",icon:"keyboard_arrow_left"},on:{click:t.goBack}}),n("h5",{staticClass:"align-middle inline font-bold"},[t._v(t._s(t.title))])],1)},o=[],a=n("2b0e"),c=function(t,e,n,i){function o(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,a){function c(t){try{r(i.next(t))}catch(e){a(e)}}function l(t){try{r(i["throw"](t))}catch(e){a(e)}}function r(t){t.done?n(t.value):o(t.value).then(c,l)}r((i=i.apply(t,e||[])).next())}))},l=a["a"].extend({name:"BlueHeader",props:{title:{type:String}},methods:{goBack(){return c(this,void 0,void 0,(function*(){yield new Promise((t=>setTimeout(t,150))),this.$router.back()}))}}}),r=l,s=n("2877"),u=n("9c40"),f=n("eebe"),d=n.n(f),p=Object(s["a"])(r,i,o,!1,null,"5b0f3949",null);e["a"]=p.exports;d()(p,"components",{QBtn:u["a"]})}}]);