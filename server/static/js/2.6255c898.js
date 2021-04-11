(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{5485:function(t,e,a){"use strict";a("b815")},"8b24":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"px-8 py-8"},[a("h4",{staticClass:"m-0 font-light"},[t._v("PEOPLE")]),a("q-tabs",{staticClass:"border-0 border-b border-solid border-gray-300",model:{value:t.activeTab,callback:function(e){t.activeTab=e},expression:"activeTab"}},[a("q-tab",{staticClass:"px-24",attrs:{name:"select",icon:"add",label:"Select"},on:{click:function(e){return t.getData({pagination:t.pagination,filter:t.searchFilter})}}}),a("q-tab",{staticClass:"px-24",attrs:{name:"edit",icon:"create",label:"Edit"}})],1),a("q-tab-panels",{attrs:{animated:""},model:{value:t.activeTab,callback:function(e){t.activeTab=e},expression:"activeTab"}},[a("q-tab-panel",{attrs:{name:"select"}},[a("h6",{staticClass:"m-0 font-light"},[t._v("SELECT ACCOUNTS TO EDIT")]),a("br"),a("q-table",{staticClass:"sticky",attrs:{loading:t.loading,"virtual-scroll":"","table-style":"max-height: 500px;",flat:"",columns:t.columns,"visible-columns":t.visibleColumns,filter:t.searchFilter,pagination:t.pagination,"binary-state-sort":"",selection:"multiple",selected:t.selected,title:"Users",data:t.data},on:{"update:pagination":function(e){t.pagination=e},"update:selected":function(e){t.selected=e},request:t.getData},scopedSlots:t._u([{key:"top",fn:function(){return[a("div",{staticClass:"flex flex-row items-center content-center"},[a("q-input",{staticStyle:{"min-width":"400px"},attrs:{dense:"",outlined:"",debounce:"300",placeholder:"Search names"},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}]),model:{value:t.searchFilter,callback:function(e){t.searchFilter=e},expression:"searchFilter"}}),a("q-select",{staticClass:"mx-4",staticStyle:{"min-width":"150px"},attrs:{multiple:"",outlined:"",dense:"","options-dense":"","display-value":"Show/hide columns","emit-value":"","map-options":"",options:t.columns,"option-value":"name","options-cover":""},model:{value:t.visibleColumns,callback:function(e){t.visibleColumns=e},expression:"visibleColumns"}}),a("div",[a("q-btn",{staticClass:"mx-2",attrs:{outline:"",color:t.showPUMs?"green":"black",label:t.showPUMs?"Showing Under Monitoring":"Show Under Monitoring",icon:t.showPUMs?"fas fa-eye":"fas fa-eye-slash"},on:{click:function(e){return t.toggleShow("PUMs",!t.showPUMs)}}}),a("q-btn",{staticClass:"mx-2",attrs:{outline:"",color:t.showPUIs?"green":"black",label:t.showPUIs?"Showing Under Investigation":"Show Under Investigation",icon:t.showPUIs?"fas fa-eye":"fas fa-eye-slash"},on:{click:function(e){return t.toggleShow("PUIs",!t.showPUIs)}}})],1)],1)]},proxy:!0}])}),a("q-page-sticky",{attrs:{offset:[20,20],position:"bottom-right"}},[a("q-btn",{staticClass:"p-2 mx-2",attrs:{label:" EXPORT AS EXCEL",color:"secondary",icon:"fas fa-file-export",fab:""},on:{click:t.exportToExcel}}),a("q-btn",{staticClass:"p-2 mx-2",attrs:{disable:1!==t.selected.length,label:" VIEW LOGS",color:"secondary",icon:"remove_red_eye",fab:""},on:{click:t.viewLogs}}),a("q-btn",{staticClass:"p-2 mx-2",attrs:{disable:0===t.selected.length,label:"ADD TO EDITOR PANEL",color:"primary",icon:"add",fab:""},on:{click:t.addSelectionToEdit}})],1)],1),a("q-tab-panel",{attrs:{name:"edit"}},[a("h6",{staticClass:"m-0 font-light"},[t._v("EDIT VACCINATION STATUSES")]),a("edit-vaccination-status")],1)],1)],1)},s=[],n=a("2047"),o=[{name:"username",required:!1,label:"Username",field:"username",align:"left",sortable:!0},{name:"firstName",required:!1,label:"First Name",field:"firstName",sortable:!0},{name:"middleName",required:!1,label:"Middle Name",field:"middleName",sortable:!0},{name:"lastName",required:!1,label:"Last Name",field:"lastName",sortable:!0},{name:"isPUM",required:!1,label:"Is Under Monitoring",format:t=>""+(t?"✔ Yes":"❌ No"),field:"isPUM",sortable:!0},{name:"isPUI",required:!1,label:"Is Under Investigation",format:t=>""+(t?"✔ Yes":"❌ No"),field:"isPUI",sortable:!0},{name:"isVaccinated",required:!1,label:"Is Vaccinated",format:t=>""+(t?"✔ Yes":"❌ No"),field:"isVaccinated",sortable:!0},{name:"isVaccineReady",required:!1,label:"Vaccine Readiness",field:"isVaccineReady",sortable:!0},{name:"vaccineManufacturer",required:!1,label:"Vaccine Manufacturer",field:"vaccineManufacturer",sortable:!0}],c=a("2b0e"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"mt-12 overflow-x-visible"},[a("transition-group",{attrs:{name:"transition",mode:"out-in"}},t._l(t.store.usersToModify,(function(e,i){return a("q-card",{key:e.id,staticClass:"mb-8 shadow-none border border-solid border-gray-400"},[a("q-card-section",[a("div",{staticClass:"flex flex-row justify-between"},[a("q-btn",{staticClass:"absolute -mt-8 -ml-8",attrs:{round:"",color:"negative",icon:"close"},on:{click:function(e){return t.store.usersToModify.splice(i,1)}}}),a("div",[a("h6",{staticClass:"m-0 p-0 font-bold"},[t._v(t._s(e.firstName)+" "+t._s(e.lastName))]),a("p",{staticClass:"m-0 p-0"},[t._v(t._s(e.username))])]),a("div",[a("p",{staticClass:"m-0 p-0 text-right font-extrabold",class:1===e.isVaccinated?"text-green-500":"text-red-700"},[t._v(t._s(1===e.isVaccinated?"✅ VACCINATED":"❌ NOT VACCINATED"))]),a("p",{staticClass:"m-0 p-0 text-right font-extrabold",class:t.vaccineStatusStyling(e.isVaccineReady)},[t._v("VACCINE IS "+t._s(e.isVaccineReady.toUpperCase()))]),a("hr"),a("p",{staticClass:"m-0 p-0 text-right"},[t._v("UNDER INVESTIGATION: "),a("b",[t._v(t._s(e.isPUI?"Yes":"No"))])]),a("p",{staticClass:"m-0 p-0 text-right"},[t._v("UNDER MONITORING: "),a("b",[t._v(t._s(e.isPUM?"Yes":"No"))])])])],1),a("br"),a("div",[a("q-btn",{attrs:{outline:"",color:"negative",label:"Vaccine Not Ready"},on:{click:function(a){return t.toggleVaccineStatus(e,"Not Ready")}}}),a("q-btn",{staticClass:"ml-1",attrs:{outline:"",color:"primary",label:"Vaccine Pending"},on:{click:function(a){return t.toggleVaccineStatus(e,"Pending")}}}),a("q-btn",{staticClass:"ml-1",attrs:{outline:"",color:"positive",label:"Vaccine Ready"},on:{click:function(a){return t.toggleVaccineStatus(e,"Ready")}}}),a("q-input",{staticClass:"float-right w-2/5",attrs:{outlined:"",label:"Vaccine Manufacturer"},model:{value:e.vaccineManufacturer,callback:function(a){t.$set(e,"vaccineManufacturer",a)},expression:"user.vaccineManufacturer"}}),a("br"),a("q-btn",{staticClass:"mt-2",attrs:{outline:"",label:"Mark as not vaccinated"},on:{click:function(a){return t.toggleVaccinated(e,!1)}}}),a("q-btn",{staticClass:"mt-2 ml-1",attrs:{outline:"",label:"Mark as vaccinated",color:"secondary"},on:{click:function(a){return t.toggleVaccinated(e,!0)}}}),a("br"),a("q-btn",{staticClass:"mt-2",attrs:{outline:"",label:"Mark as Under Investigation"},on:{click:function(a){return t.togglePUI(e,!e.isPUI)}}}),a("q-btn",{staticClass:"mt-2 ml-1",attrs:{outline:"",label:"Mark as Under Monitoring"},on:{click:function(a){return t.togglePUM(e,!e.isPUM)}}})],1)])],1)})),1)],1),a("q-page-sticky",{attrs:{offset:[20,20],position:"bottom-right"}},[a("q-fab",{staticClass:"p-2",attrs:{disable:0===t.store.usersToModify.length,color:"secondary",direction:"up",icon:"expand_less"}},[a("q-fab-action",{attrs:{color:"primary",icon:"fas fa-pen",label:"Set all vaccine manufacturer"},on:{click:t.setAllVaccineManufacturer}}),a("hr"),a("q-fab-action",{attrs:{color:"negative",icon:"fas fa-times",label:"Mark all Vaccine not ready"},on:{click:function(e){return t.markAllVaccineStatus("Not Ready")}}}),a("q-fab-action",{attrs:{color:"primary",icon:"fas fa-hourglass",label:"Mark all Vaccine pending"},on:{click:function(e){return t.markAllVaccineStatus("Pending")}}}),a("q-fab-action",{attrs:{color:"positive",icon:"fas fa-check",label:"Mark all Vaccine ready"},on:{click:function(e){return t.markAllVaccineStatus("Ready")}}}),a("hr"),a("q-fab-action",{attrs:{color:"negative",icon:"fas fa-times ",label:"Mark all unvaccinated"},on:{click:function(e){return t.markAllVaccinationStatus(0)}}}),a("q-fab-action",{attrs:{color:"primary",icon:"fas fa-check",label:"Mark all vaccinated"},on:{click:function(e){return t.markAllVaccinationStatus(1)}}})],1),a("q-btn",{staticClass:"p-2 mx-2",attrs:{disable:0===t.store.usersToModify.length,label:"Discard",color:"negative",icon:"close",fab:""},on:{click:t.confirmDiscard}}),a("q-btn",{staticClass:"p-2 mx-2",attrs:{disable:0===t.store.usersToModify.length,label:"Commit changes",color:"primary",icon:"check",fab:""},on:{click:t.confirmSubmit}})],1)],1)},r=[],d=function(t,e,a,i){function s(t){return t instanceof a?t:new a((function(e){e(t)}))}return new(a||(a=Promise))((function(a,n){function o(t){try{l(i.next(t))}catch(e){n(e)}}function c(t){try{l(i["throw"](t))}catch(e){n(e)}}function l(t){t.done?a(t.value):s(t.value).then(o,c)}l((i=i.apply(t,e||[])).next())}))},u=c["a"].extend({name:"EditVaccinationStatus",data(){return{store:n["a"]}},methods:{vaccineStatusStyling(t){return"Not Ready"===t?"text-red-700":"Pending"===t?"text-blue-500":"Ready"===t?"text-green-500":void 0},toggleVaccinated(t,e){"Ready"!==t.isVaccineReady&&e?this.$q.dialog({title:"Discrepancy",message:`You can't mark ${t.username} vaccinated becauase their vaccination status is ${t.isVaccineReady}.`}):t.isVaccinated=e?1:0},toggleVaccineStatus(t,e){t.isVaccineReady=e,t.isVaccinated&&"Not Ready"===e&&this.toggleVaccinated(t,!1)},markAllVaccineStatus(t){"Not Ready"==t&&this.markAllVaccinationStatus(0);for(const e of n["a"].usersToModify)e.isVaccineReady=t},markAllVaccinationStatus(t){1===t&&this.markAllVaccineStatus("Ready");for(const e of n["a"].usersToModify)e.isVaccinated=t},confirmDiscard(){this.$q.dialog({title:"Discard changes?",cancel:!0,message:`Discard the changes you're making on ${n["a"].usersToModify.length} users?`}).onOk((()=>{n["a"].usersToModify=[]}))},confirmSubmit(){this.$q.dialog({title:"Commit changes?",cancel:!0,message:`Commit the changes you're making on ${n["a"].usersToModify.length} users?`}).onOk((()=>d(this,void 0,void 0,(function*(){try{const t=yield this.$axios.post("/admin/editUser",{data:n["a"].usersToModify.map((t=>({id:t.id,isVaccinated:t.isVaccinated,isVaccineReady:t.isVaccineReady,vaccineManufacturer:t.vaccineManufacturer,isPUI:t.isPUI,isPUM:t.isPUM})))});t.data.result?(this.$q.notify({message:"Saved changes!"}),n["a"].usersToModify=[]):this.$q.notify({message:t.data.message,type:"negative"})}catch(t){this.$q.notify({message:`Commit failed: ${t}`,type:"negative"})}}))))},togglePUI(t,e){t.isPUI=e},togglePUM(t,e){t.isPUM=e},setAllVaccineManufacturer(){this.$q.dialog({title:"Set all vaccine manufacturer",message:"Batch set all of these user's vaccine manufacturer fields.",prompt:{model:""},cancel:!0,persistent:!0}).onOk((t=>{for(const e of n["a"].usersToModify)e.vaccineManufacturer=t}))}}}),f=u,m=a("2877"),g=a("f09f"),h=a("a370"),b=a("9c40"),p=a("27f9"),y=a("de5e"),v=a("c294"),k=a("72db"),x=a("eebe"),M=a.n(x),P=Object(m["a"])(f,l,r,!1,null,null,null),q=P.exports;M()(P,"components",{QCard:g["a"],QCardSection:h["a"],QBtn:b["a"],QInput:p["a"],QPageSticky:y["a"],QFab:v["a"],QFabAction:k["a"]});var C=function(t,e,a,i){function s(t){return t instanceof a?t:new a((function(e){e(t)}))}return new(a||(a=Promise))((function(a,n){function o(t){try{l(i.next(t))}catch(e){n(e)}}function c(t){try{l(i["throw"](t))}catch(e){n(e)}}function l(t){t.done?a(t.value):s(t.value).then(o,c)}l((i=i.apply(t,e||[])).next())}))},U=c["a"].extend({name:"Index",components:{EditVaccinationStatus:q},activated(){return C(this,void 0,void 0,(function*(){this.loading=!0,yield this.getData({pagination:this.pagination,filter:void 0}),this.loading=!1}))},data(){return{selected:[],store:n["a"],searchFilter:"",data:[],showPUIs:!1,showPUMs:!1,activeTab:"select",loading:!1,pagination:{page:0,rowsPerPage:10,rowsNumber:0,sortBy:"id",descending:!1},columns:o,visibleColumns:["username","firstName","middleName","lastName"]}},methods:{getData(t){return C(this,void 0,void 0,(function*(){this.pagination=Object.assign({},t.pagination),this.loading=!0;const e=yield n["a"].axios.post("/admin/getUsers",{page:this.pagination.page-1,pageSize:this.pagination.rowsPerPage,filter:this.searchFilter,showPUIs:this.showPUIs,showPUMs:this.showPUMs,orderBy:this.pagination.sortBy,ascending:!this.pagination.descending});this.data=e.data.results,this.pagination.rowsNumber=e.data.total,this.loading=!1}))},toggleShow(t,e){"PUMs"===t?this.showPUMs=e:"PUIs"===t&&(this.showPUIs=e),this.getData({pagination:this.pagination,filter:this.searchFilter,showPUIs:this.showPUIs,showPUMs:this.showPUMs})},addSelectionToEdit(){t:for(const t of this.selected){for(const e of n["a"].usersToModify)if(t.id===e.id){this.$q.notify({message:`${t.username} is already in the edit panel.`,type:"info"});continue t}n["a"].usersToModify.push(Object.assign({},t))}this.selected=[]},viewLogs(){return C(this,void 0,void 0,(function*(){n["a"].userShownInLogs=Object.assign({},this.selected[0]),yield this.$router.push("/view-logs")}))},exportToExcel(){this.$q.dialog({title:"Export user data to an excel file?",message:"You will be exporting all user data.",cancel:!0}).onOk((()=>C(this,void 0,void 0,(function*(){try{const t=yield this.$axios.get("/admin/export");t.data.result?this.$q.notify({message:"Export successful! Export file located on the Desktop.",type:"positive"}):this.$q.notify({message:"Export failed! Check server console for details.",type:"negative"})}catch(t){this.$q.notify({message:`Export failed! ${t}`,type:"negative"})}}))))}}}),w=U,V=(a("5485"),a("9989")),S=a("429b"),I=a("7460"),T=a("adad"),N=a("823b"),E=a("eaac"),R=a("0016"),_=a("ddd8"),A=Object(m["a"])(w,i,s,!1,null,null,null);e["default"]=A.exports;M()(A,"components",{QPage:V["a"],QTabs:S["a"],QTab:I["a"],QTabPanels:T["a"],QTabPanel:N["a"],QTable:E["a"],QInput:p["a"],QIcon:R["a"],QSelect:_["a"],QBtn:b["a"],QPageSticky:y["a"]})},b815:function(t,e,a){}}]);