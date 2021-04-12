(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{1789:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"block m-auto w-80 flex items-center justify-center text-gray-500"},[e.loading?a("div",[a("q-spinner",{staticClass:"block mx-auto",attrs:{size:"128px"}})],1):a("div",[a("q-icon",{staticClass:"block mx-auto",attrs:{name:e.icon,size:"128px"}}),a("div",{staticClass:"text-center text-h6"},[e._v(e._s(e.title))]),a("div",{staticClass:"text-center text-subtitle2"},[e._v(e._s(e.subtitle))])],1)])},s=[],n=a("2b0e"),c=n["a"].extend({name:"EmptyPlaceholder",props:{loading:{type:Boolean},icon:{type:String},title:{type:String},subtitle:{type:String}}}),o=c,r=a("2877"),l=a("0d59"),d=a("0016"),u=a("eebe"),f=a.n(u),p=Object(r["a"])(o,i,s,!1,null,"725475ef",null);t["a"]=p.exports;f()(p,"components",{QSpinner:l["a"],QIcon:d["a"]})},5485:function(e,t,a){"use strict";a("b815")},"8b24":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{staticClass:"px-8 py-8"},[a("h4",{staticClass:"m-0 font-light"},[e._v("PEOPLE")]),a("q-tabs",{staticClass:"border-0 border-b border-solid border-gray-300",model:{value:e.activeTab,callback:function(t){e.activeTab=t},expression:"activeTab"}},[a("q-tab",{staticClass:"px-24",attrs:{name:"select",icon:"add",label:"Select"},on:{click:function(t){return e.getData({pagination:e.pagination,filter:e.searchFilter})}}}),a("q-tab",{staticClass:"px-24",attrs:{name:"edit",icon:"create",label:"Edit"}})],1),a("q-tab-panels",{attrs:{animated:"","keep-alive":""},model:{value:e.activeTab,callback:function(t){e.activeTab=t},expression:"activeTab"}},[a("q-tab-panel",{attrs:{name:"select"}},[a("h6",{staticClass:"m-0 font-light"},[e._v("SELECT ACCOUNTS TO EDIT")]),a("br"),a("q-table",{staticClass:"sticky",attrs:{loading:e.loading,"virtual-scroll":"","table-style":"max-height: 500px;",flat:"",columns:e.columns,"visible-columns":e.visibleColumns,filter:e.searchFilter,pagination:e.pagination,"binary-state-sort":"",selection:"multiple",selected:e.selected,title:"Users",data:e.data},on:{"update:pagination":function(t){e.pagination=t},"update:selected":function(t){e.selected=t},request:e.getData},scopedSlots:e._u([{key:"top",fn:function(){return[a("div",{staticClass:"flex flex-row items-center content-center"},[a("q-input",{staticStyle:{"min-width":"400px"},attrs:{dense:"",outlined:"",debounce:"300",placeholder:"Search names"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:e.searchFilter,callback:function(t){e.searchFilter=t},expression:"searchFilter"}}),a("q-select",{staticClass:"mx-4",staticStyle:{"min-width":"150px"},attrs:{multiple:"",outlined:"",dense:"","options-dense":"","display-value":"Show/hide columns","emit-value":"","map-options":"",options:e.columns,"option-value":"name","options-cover":""},model:{value:e.visibleColumns,callback:function(t){e.visibleColumns=t},expression:"visibleColumns"}}),a("div",[a("q-btn",{staticClass:"mx-2",attrs:{outline:"",color:e.showPUMs?"green":"black",label:e.showPUMs?"Showing Under Monitoring":"Show Under Monitoring",icon:e.showPUMs?"fas fa-eye":"fas fa-eye-slash"},on:{click:function(t){return e.toggleShow("PUMs",!e.showPUMs)}}}),a("q-btn",{staticClass:"mx-2",attrs:{outline:"",color:e.showPUIs?"green":"black",label:e.showPUIs?"Showing Under Investigation":"Show Under Investigation",icon:e.showPUIs?"fas fa-eye":"fas fa-eye-slash"},on:{click:function(t){return e.toggleShow("PUIs",!e.showPUIs)}}})],1)],1)]},proxy:!0}])}),a("q-page-sticky",{attrs:{offset:[20,20],position:"bottom-right"}},[a("q-btn",{staticClass:"p-2 mx-2",attrs:{label:" EXPORT AS EXCEL",color:"secondary",icon:"fas fa-file-export",fab:""},on:{click:e.exportToExcel}}),a("q-btn",{staticClass:"p-2 mx-2",attrs:{disable:1!==e.selected.length,label:" VIEW LOGS",color:"secondary",icon:"remove_red_eye",fab:""},on:{click:e.viewLogs}}),a("q-btn",{staticClass:"p-2 mx-2",attrs:{disable:0===e.selected.length,label:"ADD TO EDITOR PANEL",color:"primary",icon:"add",fab:""},on:{click:e.addSelectionToEdit}})],1)],1),a("q-tab-panel",{attrs:{name:"edit"}},[a("edit-vaccination-status",{ref:"edit"})],1)],1)],1)},s=[],n=a("2047"),c=[{name:"username",required:!1,label:"Username",field:"username",align:"left",sortable:!0},{name:"firstName",required:!1,label:"First Name",field:"firstName",sortable:!0},{name:"middleName",required:!1,label:"Middle Name",field:"middleName",sortable:!0},{name:"lastName",required:!1,label:"Last Name",field:"lastName",sortable:!0},{name:"isPUM",required:!1,label:"Is Under Monitoring",format:e=>""+(e?"✔ Yes":"❌ No"),field:"isPUM",sortable:!0},{name:"isPUI",required:!1,label:"Is Under Investigation",format:e=>""+(e?"✔ Yes":"❌ No"),field:"isPUI",sortable:!0},{name:"isVaccinated",required:!1,label:"Is Vaccinated",format:e=>""+(e?"✔ Yes":"❌ No"),field:"isVaccinated",sortable:!0},{name:"isVaccineReady",required:!1,label:"Vaccine Readiness",field:"isVaccineReady",sortable:!0},{name:"vaccineManufacturer",required:!1,label:"Vaccine Manufacturer",field:"vaccineManufacturer",sortable:!0}],o=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"overflow-x-visible grid grid-cols-2 gap-4"},[a("div",[a("div",{staticClass:"text-h6 mb-8"},[e._v("EDIT VACCINATION STATUSES")]),0!==e.store.usersToModify.length?a("transition-group",{attrs:{name:"transition",mode:"out-in"}},e._l(e.store.usersToModify,(function(t,i){return a("q-card",{key:t.id,staticClass:"mb-8 shadow-none border border-solid border-gray-400",class:t.hasDiscrepancy?"ring-4 ring-red-500":""},[a("q-card-section",[a("div",{staticClass:"flex flex-nowrap justify-between"},[a("q-btn",{staticClass:"absolute -mt-8 -ml-8",attrs:{round:"",color:"negative",icon:"close"},on:{click:function(t){return e.store.usersToModify.splice(i,1)}}}),a("div",[a("div",{staticClass:"flex flex-nowrap"},[a("q-avatar",{staticClass:"block mb-4 rounded-full ring-4 w-16 h-16 ring-blue-500 shadow-5"},[a("q-img",{attrs:{ratio:"1",src:"http://localhost/"+t.profilePicturePath}})],1),a("div",{staticClass:"mx-4"},[a("h6",{staticClass:"m-0 p-0 font-bold leading-5"},[e._v(e._s(t.firstName)+" "+e._s(t.lastName))]),a("p",{staticClass:"m-0 p-0"},[e._v("@"+e._s(t.username))])])],1),a("q-btn",{attrs:{outline:"",label:"View Logs"},on:{click:function(a){return e.$router.push("view-logs/"+t.id)}}})],1),a("div",[a("p",{staticClass:"m-0 p-0 text-right font-extrabold",class:!0===t.isVaccinated?"text-green-500":"text-red-700"},[e._v(e._s(!0===t.isVaccinated?"✅ VACCINATED":"❌ NOT VACCINATED"))]),a("p",{staticClass:"m-0 p-0 text-right font-extrabold",class:e.vaccineStatusStyling(t.isVaccineReady)},[e._v("VACCINE IS "+e._s(t.isVaccineReady.toUpperCase()))]),a("hr"),a("p",{staticClass:"m-0 p-0 text-right"},[e._v("UNDER INVESTIGATION: "),a("b",[e._v(e._s(t.isPUI?"Yes":"No"))])]),a("p",{staticClass:"m-0 p-0 text-right"},[e._v("UNDER MONITORING: "),a("b",[e._v(e._s(t.isPUM?"Yes":"No"))])])])],1),a("br"),a("div",[a("q-btn",{attrs:{outline:"",color:"negative",label:"Vaccine Not Ready"},on:{click:function(a){return e.toggleVaccineStatus(t,"Not Ready")}}}),a("q-btn",{attrs:{outline:"",color:"primary",label:"Vaccine Pending"},on:{click:function(a){return e.toggleVaccineStatus(t,"Pending")}}}),a("q-btn",{attrs:{outline:"",color:"positive",label:"Vaccine Ready"},on:{click:function(a){return e.toggleVaccineStatus(t,"Ready")}}}),a("div",{staticClass:"my-4"}),a("q-btn",{attrs:{outline:"",label:"Mark as not vaccinated"},on:{click:function(a){return e.toggleVaccinated(t,!1)}}}),a("q-btn",{attrs:{outline:"",label:"Mark as vaccinated",color:"secondary"},on:{click:function(a){return e.toggleVaccinated(t,!0)}}}),a("div",{staticClass:"my-4"}),a("q-btn",{attrs:{outline:"",label:"Mark as Under Investigation"},on:{click:function(a){return e.togglePUI(t,!t.isPUI)}}}),a("q-btn",{attrs:{outline:"",label:"Mark as Under Monitoring"},on:{click:function(a){return e.togglePUM(t,!t.isPUM)}}}),a("div",{staticClass:"my-4"}),a("q-input",{staticClass:"w-full mt-2",attrs:{debounce:"500",outlined:"",label:"Vaccine Manufacturer"},on:{input:e.computeDiscrepancies},model:{value:t.vaccineManufacturer,callback:function(a){e.$set(t,"vaccineManufacturer",a)},expression:"user.vaccineManufacturer"}})],1)])],1)})),1):a("empty-placeholder",{attrs:{icon:"fas fa-question",title:"No users added",subtitle:"You need to add users to the editor panel on the select tab first."}})],1),a("div",[a("div",{staticClass:"text-h6 mb-8"},[e._v("DISCREPANCIES")]),a("transition-group",{attrs:{name:"transition"}},[0===e.discrepancies.length?a("empty-placeholder",{key:"pl",attrs:{icon:"fas fa-check",title:"No discrepancies detected",subtitle:"You're good to go!"}}):e._e(),e._l(e.discrepancies,(function(t){return a("div",{key:t.title},[a("q-card",{staticClass:"mb-4"},[a("div",[a("div",{staticClass:"p-4"},[a("div",{staticClass:"flex flex-nowrap"},[a("q-icon",{attrs:{size:"lg",name:"fas fa-exclamation"}}),a("b",[e._v(e._s(t.title))])],1),a("i",{domProps:{innerHTML:e._s(t.subtitle)}})])])])],1)}))],2)],1)]),a("q-page-sticky",{attrs:{offset:[20,20],position:"bottom-right"}},[a("q-fab",{staticClass:"p-2",attrs:{disable:0===e.store.usersToModify.length,color:"secondary",direction:"up",icon:"expand_less"}},[a("q-fab-action",{attrs:{color:"primary",icon:"fas fa-pen",label:"Set all vaccine manufacturer"},on:{click:e.setAllVaccineManufacturer}}),a("hr"),a("q-fab-action",{attrs:{color:"negative",icon:"fas fa-times",label:"Mark all Vaccine not ready"},on:{click:function(t){return e.markAllVaccineStatus("Not Ready")}}}),a("q-fab-action",{attrs:{color:"primary",icon:"fas fa-hourglass",label:"Mark all Vaccine pending"},on:{click:function(t){return e.markAllVaccineStatus("Pending")}}}),a("q-fab-action",{attrs:{color:"positive",icon:"fas fa-check",label:"Mark all Vaccine ready"},on:{click:function(t){return e.markAllVaccineStatus("Ready")}}}),a("hr"),a("q-fab-action",{attrs:{color:"negative",icon:"fas fa-times ",label:"Mark all unvaccinated"},on:{click:function(t){return e.markAllVaccinationStatus(!1)}}}),a("q-fab-action",{attrs:{color:"primary",icon:"fas fa-check",label:"Mark all vaccinated"},on:{click:function(t){return e.markAllVaccinationStatus(!0)}}})],1),a("q-btn",{staticClass:"p-2 mx-2",attrs:{disable:0===e.store.usersToModify.length,label:"Discard",color:"negative",icon:"close",fab:""},on:{click:e.confirmDiscard}}),a("q-btn",{staticClass:"p-2 mx-2",attrs:{disable:0===e.store.usersToModify.length,label:"Commit changes",color:"primary",icon:"check",fab:""},on:{click:e.confirmSubmit}})],1)],1)},l=[],d=a("1789"),u=function(e,t,a,i){function s(e){return e instanceof a?e:new a((function(t){t(e)}))}return new(a||(a=Promise))((function(a,n){function c(e){try{r(i.next(e))}catch(t){n(t)}}function o(e){try{r(i["throw"](e))}catch(t){n(t)}}function r(e){e.done?a(e.value):s(e.value).then(c,o)}r((i=i.apply(e,t||[])).next())}))},f=o["a"].extend({name:"EditVaccinationStatus",components:{EmptyPlaceholder:d["a"]},data(){return{store:n["a"],discrepancies:[]}},activated(){this.computeDiscrepancies()},methods:{computeDiscrepancies(){console.log("computing"),this.discrepancies=[];for(const e of n["a"].usersToModify)e.hasDiscrepancy=!1,"Ready"!==e.isVaccineReady&&e.isVaccinated&&(this.discrepancies.push({title:`${e.firstName} is apparently vaccinated, but vaccine status is ${e.isVaccineReady}`,subtitle:`Change ${e.firstName}'s vaccination status to <b>Not Vaccinated</b>, or set the vaccine status to <b>Ready.</b>`}),e.hasDiscrepancy=!0),"Ready"!==e.isVaccineReady||e.vaccineManufacturer||(this.discrepancies.push({title:`${e.firstName}'s vaccine is Ready, but no vaccine manufacturer is set`,subtitle:"Set a vaccine manufacturer, or set vaccine status to <b>Not Ready</b> / <b>Pending.</b>"}),e.hasDiscrepancy=!0)},vaccineStatusStyling(e){return"Not Ready"===e?"text-red-700":"Pending"===e?"text-blue-500":"Ready"===e?"text-green-500":void 0},toggleVaccinated(e,t){e.isVaccinated=t,this.computeDiscrepancies()},toggleVaccineStatus(e,t){e.isVaccineReady=t,this.computeDiscrepancies()},markAllVaccineStatus(e){for(const t of n["a"].usersToModify)t.isVaccineReady=e;this.computeDiscrepancies()},markAllVaccinationStatus(e){for(const t of n["a"].usersToModify)t.isVaccinated=e;this.computeDiscrepancies()},confirmDiscard(){this.$q.dialog({title:"Discard changes?",cancel:!0,message:`Discard the changes you're making on ${n["a"].usersToModify.length} users?`}).onOk((()=>{n["a"].usersToModify=[]}))},confirmSubmit(){this.$q.dialog({title:"Commit changes?",cancel:!0,message:`Commit the changes you're making on ${n["a"].usersToModify.length} users?\n        ${0!==this.discrepancies.length?"There are still discrepancies as well.":""}`}).onOk((()=>u(this,void 0,void 0,(function*(){try{const e=yield this.$axios.post("/admin/editUser",{data:n["a"].usersToModify.map((e=>{var t;return{id:e.id,isVaccinated:e.isVaccinated,isVaccineReady:e.isVaccineReady,vaccineManufacturer:null!==(t=e.vaccineManufacturer)&&void 0!==t?t:"",isPUI:e.isPUI,isPUM:e.isPUM}}))});e.data.result?(this.$q.notify({message:"Saved changes!"}),n["a"].usersToModify=[],this.computeDiscrepancies()):this.$q.notify({message:e.data.message,type:"negative"})}catch(e){this.$q.notify({message:`Commit failed: ${e}`,type:"negative"})}}))))},togglePUI(e,t){e.isPUI=t},togglePUM(e,t){e.isPUM=t},setAllVaccineManufacturer(){this.$q.dialog({title:"Set all vaccine manufacturer",message:"Batch set all of these user's vaccine manufacturer fields.",prompt:{model:""},cancel:!0,persistent:!0}).onOk((e=>{for(const t of n["a"].usersToModify)t.vaccineManufacturer=e;this.computeDiscrepancies()}))}}}),p=f,m=a("2877"),b=a("f09f"),h=a("a370"),g=a("9c40"),v=a("cb32"),y=a("068f"),x=a("27f9"),k=a("0016"),C=a("de5e"),P=a("c294"),q=a("72db"),M=a("eebe"),w=a.n(M),S=Object(m["a"])(p,r,l,!1,null,null,null),U=S.exports;w()(S,"components",{QCard:b["a"],QCardSection:h["a"],QBtn:g["a"],QAvatar:v["a"],QImg:y["a"],QInput:x["a"],QIcon:k["a"],QPageSticky:C["a"],QFab:P["a"],QFabAction:q["a"]});var V=function(e,t,a,i){function s(e){return e instanceof a?e:new a((function(t){t(e)}))}return new(a||(a=Promise))((function(a,n){function c(e){try{r(i.next(e))}catch(t){n(t)}}function o(e){try{r(i["throw"](e))}catch(t){n(t)}}function r(e){e.done?a(e.value):s(e.value).then(c,o)}r((i=i.apply(e,t||[])).next())}))},I=o["a"].extend({name:"Index",components:{EditVaccinationStatus:U},activated(){return V(this,void 0,void 0,(function*(){this.loading=!0,yield this.getData({pagination:this.pagination,filter:void 0}),this.loading=!1}))},data(){return{selected:[],store:n["a"],searchFilter:"",data:[],showPUIs:!1,showPUMs:!1,activeTab:"select",loading:!1,pagination:{page:0,rowsPerPage:10,rowsNumber:0,sortBy:"id",descending:!1},columns:c,visibleColumns:["username","firstName","middleName","lastName"]}},methods:{getData(e){return V(this,void 0,void 0,(function*(){this.pagination=Object.assign({},e.pagination),this.loading=!0;const t=yield n["a"].axios.post("/admin/getUsers",{page:this.pagination.page-1,pageSize:this.pagination.rowsPerPage,filter:this.searchFilter,showPUIs:this.showPUIs,showPUMs:this.showPUMs,orderBy:this.pagination.sortBy,ascending:!this.pagination.descending});this.data=t.data.results,this.pagination.rowsNumber=t.data.total,this.loading=!1}))},toggleShow(e,t){"PUMs"===e?this.showPUMs=t:"PUIs"===e&&(this.showPUIs=t),this.getData({pagination:this.pagination,filter:this.searchFilter,showPUIs:this.showPUIs,showPUMs:this.showPUMs})},addSelectionToEdit(){e:for(const e of this.selected){for(const t of n["a"].usersToModify)if(e.id===t.id){this.$q.notify({message:`${e.username} is already in the edit panel.`,type:"info"});continue e}n["a"].usersToModify.push(Object.assign({},e))}this.selected=[]},viewLogs(){return V(this,void 0,void 0,(function*(){yield this.$router.push(`/view-logs/${this.selected[0].id}`)}))},exportToExcel(){this.$q.dialog({title:"Export user data to an excel file?",message:"You will be exporting all user data.",cancel:!0}).onOk((()=>V(this,void 0,void 0,(function*(){try{const e=yield this.$axios.get("/admin/export");e.data.result?this.$q.notify({message:"Export successful! Export file located on the Desktop.",type:"positive"}):this.$q.notify({message:"Export failed! Check server console for details.",type:"negative"})}catch(e){this.$q.notify({message:`Export failed! ${e}`,type:"negative"})}}))))}}}),T=I,N=(a("5485"),a("9989")),_=a("429b"),E=a("7460"),D=a("adad"),R=a("823b"),$=a("eaac"),A=a("ddd8"),Q=Object(m["a"])(T,i,s,!1,null,null,null);t["default"]=Q.exports;w()(Q,"components",{QPage:N["a"],QTabs:_["a"],QTab:E["a"],QTabPanels:D["a"],QTabPanel:R["a"],QTable:$["a"],QInput:x["a"],QIcon:k["a"],QSelect:A["a"],QBtn:g["a"],QPageSticky:C["a"]})},b815:function(e,t,a){}}]);