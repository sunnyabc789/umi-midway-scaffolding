(window["webpackJsonp_sugo-portal-app"]=window["webpackJsonp_sugo-portal-app"]||[]).push([[6],{"5UOa":function(e,t,a){"use strict";var n=a("tAuX"),i=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=p,a("Pwec");var l=i(a("CtXQ")),r=i(a("eHn4")),d=i(a("p0pE")),u=i(a("gWZ8")),o=i(a("qIgq")),s=n(a("q1tI")),c=(a("Hg0r"),i(a("LvDl"))),f=a("qKvR");function p(e){var t=(0,s.useState)({}),a=(0,o.default)(t,2),n=a[0],i=a[1],p=e.setTagId,v=(e.setSelectName,e.setTagData),g=e.tagId,x=e.tree,h=void 0===x?[]:x;function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",o=e.id;if(o)return a=1===t?e.name:a+"/"+e.name,(0,f.jsx)(s.default.Fragment,{key:e.id},(0,f.jsx)("div",{title:e.name,key:e.id,style:{background:g===e.id?"#EDF1F5":"#ffffff",paddingLeft:"6px",minWidth:"170px",color:g===e.id?"#2A2987":"#000000"},className:"aside-menu relative depth-1 pointer"},(0,f.jsx)("div",{style:{marginLeft:"".concat(8*t,"px"),maxWidth:"96px",marginRight:"34px"},className:"elli",onClick:function(){p(o),v([{tagName:e.name,id:e.id}].concat((0,u.default)((e.children||[]).map(function(e){return{tagName:e.name,id:e.id}}))))}},e.name,c.default.isEmpty(null===e||void 0===e?void 0:e.children)?null:(0,f.jsx)(l.default,{type:n[e.id]?"down":"right",className:"color-black vertical-center-of-relative right2 bold font14 fpointer",onClick:function(){n[e.id]?i((0,d.default)({},n,(0,r.default)({},e.id,""))):i((0,d.default)({},n,(0,r.default)({},e.id,"expand")))}}))),n[e.id]?((null===e||void 0===e?void 0:e.children)||[]).map(function(e){return m(e,t+1,a)}):null)}return(0,f.jsx)("div",{className:"contain-docs-nav-light top0",style:{display:"block"}},(0,f.jsx)("div",{className:"pd2x pdy12 alignright"}),(0,f.jsx)("div",{className:"aside-menus absolute"},h.map(function(e){return m(e)})))}},"Mc+h":function(e,t,a){"use strict";var n=a("g09b"),i=a("tAuX");Object.defineProperty(t,"__esModule",{value:!0}),t.default=J,a("miYZ");var l=n(a("tsqr")),r=n(a("eHn4")),d=n(a("d6i3"));a("+BJd");var u=n(a("mr32"));a("sPJy");var o=n(a("bE4q"));a("Pwec");var s=n(a("CtXQ"));a("2qtc");var c=n(a("kLXV")),f=n(a("gWZ8")),p=n(a("1l/V")),v=n(a("qIgq"));a("ozfa");var g=n(a("MJZm"));a("fu2T");var x=n(a("gK9i"));a("5NDa");var h=n(a("5rEg"));a("B9cy");var m=n(a("Ol7k"));a("lUTK");var y=n(a("BvKs"));a("Znn+");var S=n(a("ZTPi")),b=i(a("q1tI")),j=a("Hg0r"),k=a("g96v"),w=a("Z8Nr"),I=a("3Vcf"),N=a("r9/Z"),A=n(a("n7hF")),E=n(a("ZdT4")),C=n(a("ExLZ")),_=n(a("6W/3"));a("QJ0i");var R,T,F=n(a("5UOa")),D=a("mjZG"),O=n(a("LvDl")),W=a("B+SW"),q=a("qKvR"),B=S.default.TabPane,L=(y.default.SubMenu,m.default.Header,m.default.Content),M=m.default.Sider,z=h.default.Search,G=x.default.Panel,P=g.default.TreeNode,U=(null===(R=window)||void 0===R?void 0:null===(T=R.sugo)||void 0===T?void 0:T.user)||{},K=(null===U||void 0===U?void 0:U.id)||"",Z=function e(t,a){for(var n,i=0;i<a.length;i++){var l=a[i];l.children&&(l.children.some(function(e){return e.name===t})?n=l.id:e(t,l.children)&&(n=e(t,l.children)))}return n},H=function e(t,a){for(var n,i=0;i<a.length;i++){var l=a[i];l.children&&(l.children.some(function(e){return e.id===t})?n=l.id:e(t,l.children)&&(n=e(t,l.children)))}return n};function J(e){var t,a=(0,b.useState)("0"),n=(0,v.default)(a,2),i=n[0],h=n[1],y=(0,b.useState)([]),R=(0,v.default)(y,2),T=R[0],U=R[1],J=(0,b.useState)(""),X=(0,v.default)(J,2),Q=X[0],V=X[1],Y=(0,b.useState)(""),$=(0,v.default)(Y,2),ee=$[0],te=$[1],ae=(0,b.useState)([]),ne=(0,v.default)(ae,2),ie=ne[0],le=ne[1],re=(0,b.useState)(""),de=(0,v.default)(re,2),ue=de[0],oe=de[1],se=(0,b.useState)(""),ce=(0,v.default)(se,2),fe=ce[0],pe=ce[1],ve=(0,b.useState)(!1),ge=(0,v.default)(ve,2),xe=ge[0],he=ge[1],me=(0,b.useState)(""),ye=(0,v.default)(me,2),Se=ye[0],be=ye[1],je=(0,b.useState)([]),ke=(0,v.default)(je,2),we=ke[0],Ie=(ke[1],(0,b.useState)([])),Ne=(0,v.default)(Ie,2),Ae=Ne[0],Ee=Ne[1],Ce=(0,b.useState)(!0),_e=(0,v.default)(Ce,2),Re=_e[0],Te=_e[1],Fe=(0,b.useState)(""),De=(0,v.default)(Fe,2),Oe=De[0],We=De[1],qe=(0,b.useState)([]),Be=(0,v.default)(qe,2),Le=Be[0],Me=Be[1],ze=(0,b.useState)([]),Ge=(0,v.default)(ze,2),Pe=Ge[0],Ue=Ge[1],Ke=(0,b.useState)([]),Ze=(0,v.default)(Ke,2),He=Ze[0],Je=(Ze[1],(0,b.useState)("")),Xe=(0,v.default)(Je,2),Qe=Xe[0],Ve=Xe[1],Ye=(0,b.useState)(""),$e=(0,v.default)(Ye,2),et=$e[0],tt=$e[1],at=(0,b.useState)([]),nt=(0,v.default)(at,2),it=nt[0],lt=nt[1],rt=(0,j.useDispatch)();(0,k.useRuntimeSagaModels)(e,[(0,N.applicationSagaSyncModelGen)("getApplications"),(0,I.appUserRelationSagaSyncModelGen)("appUserRelation"),(0,N.appTagSagaSyncModelGen)(N.TAGS_SAGA_MODEL_NS),(0,N.appTagOrderSagaSyncModelGen)(N.TAG_APP_ORDER_SAGA_MODEL_NS),(0,N.appTagRelationSagaSyncModelGen)("appTagRelation")]);var dt=(0,j.useSelector)(function(e){return null===e||void 0===e?void 0:e.getApplications}),ut=(0,j.useSelector)(function(e){var t;return(null===e||void 0===e?void 0:null===(t=e[N.TAGS_SAGA_MODEL_NS])||void 0===t?void 0:t.applicationTags)||[]}),ot=(0,j.useSelector)(function(e){var t;return(null===e||void 0===e?void 0:null===(t=e[N.TAG_APP_ORDER_SAGA_MODEL_NS])||void 0===t?void 0:t.tagAppOrders)||[]}),st=(0,W.dictBy)(ot,function(e){return null===e||void 0===e?void 0:e.extappTagId},function(e){return null===e||void 0===e?void 0:e.appIdOrder}),ct=O.default.keyBy(ut,"id"),ft=(0,W.getParameterByName)("topId",window.location.href),pt=ft&&O.default.get(ct,[ft,"name"])||"\u5e94\u7528\u4e2d\u5fc3";function vt(){h("0"),U([]),Ee([]),pe(""),tt(""),Ue([]),Me([]),We(""),Te(!0),be(""),oe(""),le([]),te(""),V("")}(0,b.useEffect)(function(){vt()},[ft]);(0,j.useSelector)(function(e){return(null===e||void 0===e?void 0:e.appTagRelation)||[]});var gt=(0,j.useSelector)(function(e){return null===e||void 0===e?void 0:e.appUserRelation});function xt(e){return ht.apply(this,arguments)}function ht(){return ht=(0,p.default)(d.default.mark(function e(t){var a,n,i;return d.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(a=O.default.get(gt,"AppUserRelation",[]),n=a.filter(function(e){return e.userId===K&&e.extappId===t}),i="",!O.default.isEmpty(n)){e.next=9;break}return e.next=6,(0,w.creatAppUserRelation)({extappId:t});case 6:i=e.sent,e.next=12;break;case 9:return e.next=11,(0,w.deleteAppUserRelation)({id:n[0].id});case 11:i=e.sent;case 12:if(i.success){e.next=14;break}return e.abrupt("return",l.default.error("\u64cd\u4f5c\u5931\u8d25"));case 14:l.default.success("\u64cd\u4f5c\u6210\u529f"),rt({type:"appUserRelation/fetch"});case 16:case"end":return e.stop()}},e)})),ht.apply(this,arguments)}function mt(e){if("1"===e)return be(""),h("0"),null;var t;T.forEach(function(a,n){a.key===e&&(t=n-1)}),T=T.filter(function(t){return t.key!==e}),T.length&&i===e&&(i=t>=0?T[t].key:T[0].key),h(O.default.isEmpty(T)?"0":i),U(T)}O.default.get(gt,"AppUserRelation",[]).filter(function(e){return e.userId===K}).map(function(e){return e.extAppId});var yt={};O.default.get(dt,"application",[]).map(function(e){yt[e.id]||(yt[e.id]=e)}),(0,b.useEffect)(function(){var t,a,n=null===(t=window)||void 0===t?void 0:null===(a=t.__SUGO_PORTAL__)||void 0===a?void 0:a.app_store_kidsTag;if(n)lt(n||[]);else{var i,l,r=null===e||void 0===e?void 0:null===(i=e.location)||void 0===i?void 0:null===(l=i.query)||void 0===l?void 0:l.topId;if(!r)return;C.default.get("".concat(D.requestBase,"/sugo-app-tag/tag-as-menu")).then(function(e){if(e.success){n=e.result;var t=n.find(function(e){return e.id===r});return lt(t.children||[])}})}},[null===e||void 0===e?void 0:null===(t=e.location)||void 0===t?void 0:t.query]),(0,b.useEffect)(function(){Ue(ut.map(function(e){return e.id}))},[JSON.stringify(ut)]);var St=ie.map(function(e){var t=(st[e.id]||[]).map(function(e){return yt[e]});return{tagName:e.tagName,appData:t,tagId:e.id}});if(O.default.isEmpty(ie)&&(St=it.map(function(e){var t=(st[e.id]||[]).map(function(e){return yt[e]});return{tagName:e.name,appData:O.default.compact(t),tagId:e.id}})),!O.default.isEmpty(Le)){var bt=Le.map(function(e){return ct[e].name}).join(",");St=[{tagName:bt,tagId:"mix",appData:Le.map(function(e){return(st[e]||[]).map(function(e){return yt[e]})}).reduce(function(e,t){return O.default.intersectionWith(e,t,O.default.isEqual)})}]}(0,b.useEffect)(function(){Ee(St.map(function(e){return e.tagId}))},[JSON.stringify(St)]);var jt=O.default.get(gt,"AppUserRelation",[]),kt=jt.filter(function(e){return e.userId===K&&e.extappId===fe});function wt(e){oe(e.url),pe(e.id),O.default.findIndex(T,{key:e.id})<0&&U([].concat((0,f.default)(T),[{title:e.name,url:e.url,key:e.id}])),h(e.id)}function It(e){var t=e.name.indexOf(Qe),a=e.name.substr(0,t),n=e.name.substr(t+Qe.length),i=t>-1?(0,q.jsx)("span",null,a,(0,q.jsx)("span",{style:{color:"#f50"}},Qe),n):(0,q.jsx)("span",null,e.name);return(0,q.jsx)(P,{title:i,key:e.id},((null===e||void 0===e?void 0:e.children)||[]).map(function(e){return It(e)}))}return(0,q.jsx)("div",{className:"relative width-100 height-100",id:"app-store"},(0,q.jsx)(c.default,{visible:"selectTag"===Oe,maskClosable:!1,title:"\u9009\u62e9\u5e94\u7528\u6807\u7b7e",onCancel:function(){return We("")},okText:"\u63d0\u4ea4",footer:null,bodyStyle:{height:"520px",overflow:"auto",boxSizing:"border-box"}},(0,q.jsx)(z,{allowClear:!0,placeholder:"\u8f93\u5165\u6807\u7b7e\u540d\u79f0",size:"large",onSearch:function(e){var t=ut.map(function(t){return t.name.indexOf(e)>-1?Z(t.name,it):null}).filter(function(e,t,a){return e&&a.indexOf(e)===t}),a=[];function n(e){var t,i,l;(null===(t=ct[e])||void 0===t?void 0:t.parentId)&&(a.push(null===(i=ct[e])||void 0===i?void 0:i.parentId),n(null===(l=ct[e])||void 0===l?void 0:l.parentId))}t.map(function(e){a.push(e),n(e)}),a=O.default.union(a),Ue(a),Ve(e)}}),(0,q.jsx)(g.default,{checkable:!0,checkStrictly:!0,selectedKeys:He,checkedKeys:Le,onCheck:function(e){var t=e.checked,a="";t.map(function(e){return{tagId:e,name:ct[e].name}}).map(function(e){var t,n;a+=(null===(t=ct[H(e.tagId,it)])||void 0===t?void 0:t.name)?(null===(n=ct[H(e.tagId,it)])||void 0===n?void 0:n.name)+":":"",a+=e.name+" / "}),te(a.substr(0,a.length-1)),Me(t)},expandedKeys:Pe,onExpand:function(e,t){var a=t.node,n=a.props.eventKey,i=O.default.concat(Pe,n);return Pe.includes(n)&&(i=Pe.filter(function(e){return e!==n})),Ue(i)}},it.map(function(e){return It(e)}))),(0,q.jsx)(A.default,{visible:xe,url:ue,handleCancel:function(){he(!1)}}),ue&&"0"!==i&&"1"!==i?(0,q.jsx)("div",{className:"absolute right0 pointer zIndex1",style:{zIndex:1,top:"10px",right:"20px"}},(0,q.jsx)("div",{className:"itblock",onClick:function(){xt(fe)},style:{marginRight:"10px"}},(0,q.jsx)(s.default,{type:"star",className:"star-icon",theme:O.default.isEmpty(kt)?"outlined":"filled"}),(0,q.jsx)("span",null,"\u6536\u85cf"))):null,(0,q.jsx)(S.default,{hideAdd:!0,onChange:function(e){h(e);var t=O.default.find(T,function(t){return t.key===e});t&&oe(t.url)},activeKey:i,type:"editable-card",onEdit:function(e){mt(e)},style:{width:"100%"},tabBarStyle:{height:"44px",backgroundColor:"#F7F7F7",paddingTop:"8px"}},"0"==i?(0,q.jsx)(B,{tab:pt,key:"0",closable:!1},(0,q.jsx)("div",null,(0,q.jsx)(m.default,{style:{background:"#fff",minWidth:"1300px"}},(0,q.jsx)(M,{width:170,style:{background:"#ffffff",height:"calc(100vh - 98px)",overflowX:"auto"}},(0,q.jsx)(F.default,{reuseSagaModel:!0,setTagId:V,setSelectName:te,setTagData:le,tagId:Q,showLeftNav:Re,setShowLeftNav:Te,tree:it})),(0,q.jsx)(m.default,{style:{height:"calc(100vh - 98px)"}},(0,q.jsx)(o.default,{separator:"/",style:{padding:"10px",paddingLeft:"30px",background:"#F7F6F9",fontSize:"14px",fontWeight:"1000"}},(0,q.jsx)(o.default.Item,null,(0,q.jsx)("span",{style:{fontSize:"14px",fontWeight:"400",color:"##C5C4C7"}},pt))),(0,q.jsx)(L,{style:{background:"#F1F3F4",minHeight:280,height:"100% !important"}},(0,q.jsx)("div",{className:"height-100",style:{backgroundColor:"#ffffff",margin:"10px"}},(0,q.jsx)("div",{className:"tag-selected corner bg-white"},(0,q.jsx)("div",{className:"tag-selected-content my-search",style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},(0,q.jsx)("div",{style:{display:"flex",alignItems:"center"}},(0,q.jsx)(u.default,{className:"pointer",style:{background:"#FFFFFF",color:"#333333",width:"84px",height:"32px",textAlign:"center",lineHeight:"32px",fontWeight:"normal"},onClick:function(){We("selectTag")}},"\u9009\u62e9\u6807\u7b7e"),(0,q.jsx)("span",{style:{marginRight:"8px",fontSize:"14px",color:"#000000",fontWeight:"normal"}},"\u5df2\u9009\u62e9\u6807\u7b7e"),(0,q.jsx)("span",{style:{backgroundColor:"#EDEDFE",minWidth:"85px",height:"24px",padding:"4px 8px",lineHeight:"16px",display:"block",borderRadius:"2px",textAlign:"center",color:"#000000",fontSize:"14px",fontWeight:"normal"}},ee||"\u5168\u90e8")),(0,q.jsx)(z,{className:"my-search",prefix:(0,q.jsx)(s.default,{type:"search",style:{color:"#BFBFBF",fontSize:"12px"}}),placeholder:"\u8f93\u5165\u5e94\u7528\u540d\u79f0",allowClear:!0,onSearch:function(){var e=(0,p.default)(d.default.mark(function e(t){return d.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:tt(t);case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),style:{width:240,height:32}}))),(0,q.jsx)(x.default,{activeKey:Ae,onChange:function(e){Ee(e)},expandIcon:function(e){var t=e.isActive;return(0,q.jsx)(s.default,{style:{fontSize:"16px",color:"#7E8285"},type:"right-circle",theme:"filled",rotate:t?90:0})}},St.map(function(e,t){return(0,q.jsx)(G,{style:{backgroundColor:"#ffffff",color:"#333333",fontSize:"14px",fontWeight:"bold",border:"none"},header:e.tagName,key:e.tagId},(0,q.jsx)("div",{style:{display:"flex",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"center",width:"100%",height:"100%"}},O.default.isEmpty(e.appData)?(0,q.jsx)("div",{className:"mg2x",style:{height:"50px",lineHeight:"50px"}},"\u6682\u65e0\u5e94\u7528"):e.appData.filter(function(e){return null===e||void 0===e?void 0:e.name.includes(et)}).map(function(e){var t=O.default.get(gt,"AppUserRelation",[]),a=t.filter(function(t){return t.userId===K&&t.extappId===(null===e||void 0===e?void 0:e.id)});return(0,q.jsx)("div",{key:null===e||void 0===e?void 0:e.id,className:"card-border card-border-radius my-card",style:{height:"190px",width:"262px",marginRight:"20px",position:"relative"}},(0,q.jsx)("div",{className:"pointer width-100 bg-white aligncenter relative pointer card-border card-top",style:{height:"153px"},onClick:function(){if("browserTab"===(null===e||void 0===e?void 0:e.openWay))return C.default.post("".concat(D.requestBase,"/sugo-smart-recommend"),{extappId:e.id}),void window.open(e.url,"_blank");wt(e)}},O.default.isEmpty(null===e||void 0===e?void 0:e.img)?(0,q.jsx)("span",{className:"center-of-relative card-border-top-radius",style:{width:"262px",height:"150px",borderRadius:"6px"}},"\u6682\u65e0\u7f29\u7565\u56fe"):(0,q.jsx)("img",{className:"width-100 card-border-top-radius",style:{height:"150px",width:"262px",borderRadius:"6px"},alt:"\u56fe\u7247",src:null===e||void 0===e?void 0:e.img}),(0,q.jsx)("div",{style:{width:"70px",height:"24px",background:"rgba(255,255,255,1)",opacity:"0.9",borderRadius:"4px",position:"absolute",bottom:"8px",right:"8px"},onClick:function(t){t.stopPropagation(),xt(e.id)},className:"star-icon-display"},(0,q.jsx)("div",{style:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}},(0,q.jsx)(s.default,{theme:"filled",type:"star",style:{color:O.default.isEmpty(a)?"#B4B6BD":"#F1AD47",fontSize:"14px"}}),(0,q.jsx)("span",{style:{fontSize:"12px",marginLeft:"3px"}},O.default.isEmpty(a)?"\u5173\u6ce8":"\u5df2\u5173\u6ce8")))),(0,q.jsx)("div",{className:"relative card-bottom card-border-showdow",style:{width:"262px",height:"40px",padding:"0px",backgroundColor:"#ffffff"}},(0,q.jsx)("span",{className:"center-of-relative card-name elli",style:{display:"flex",justifyContent:"flex-start",alignItems:"center",fontSize:"14px",width:"100%",fontWeight:"normal"}},null===e||void 0===e?void 0:e.name)))})))})))))))):(0,q.jsx)(B,{tab:pt,key:"0",closable:!1}),Se?(0,q.jsx)(B,{tab:"\u6211\u7684\u641c\u7d22",key:"1"},(0,q.jsx)(E.default,{showIframe:wt,serchValue:Se,searchList:we})):null,T.map(function(e){var t;return(0,q.jsx)(B,{tab:e.title,key:e.key},(0,q.jsx)(_.default,(t={appId:e.key,url:e.url},(0,r.default)(t,"appId",e.key),(0,r.default)(t,"url",e.url),(0,r.default)(t,"fullScreen",xe),(0,r.default)(t,"iframeUrl",ue),(0,r.default)(t,"setFullScreen",he),(0,r.default)(t,"cancelOrCreatStarApp",xt),(0,r.default)(t,"selectStar",kt),(0,r.default)(t,"activeKey",i),(0,r.default)(t,"selectAppId",fe),(0,r.default)(t,"pane",e),t)))})))}},QJ0i:function(e,t,a){}}]);