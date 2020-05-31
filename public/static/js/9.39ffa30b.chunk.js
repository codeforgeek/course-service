(this["webpackJsonpcourse-generator-ui"]=this["webpackJsonpcourse-generator-ui"]||[]).push([[9],{287:function(e,a,t){"use strict";var n=t(2),l=t(3),c=t(5),r=t.n(c),m=t(0),s=t.n(m),o=t(10),d=["xl","lg","md","sm","xs"],u=s.a.forwardRef((function(e,a){var t=e.bsPrefix,c=e.className,m=e.noGutters,u=e.as,i=void 0===u?"div":u,E=Object(l.a)(e,["bsPrefix","className","noGutters","as"]),p=Object(o.b)(t,"row"),v=p+"-cols",b=[];return d.forEach((function(e){var a,t=E[e];delete E[e];var n="xs"!==e?"-"+e:"";null!=(a=null!=t&&"object"===typeof t?t.cols:t)&&b.push(""+v+n+"-"+a)})),s.a.createElement(i,Object(n.a)({ref:a},E,{className:r.a.apply(void 0,[c,p,m&&"no-gutters"].concat(b))}))}));u.displayName="Row",u.defaultProps={noGutters:!1},a.a=u},311:function(e,a,t){},319:function(e,a,t){"use strict";t.r(a);var n=t(87),l=t(0),c=t.n(l),r=t(294),m=t(287),s=t(166),o=t(296),d=t(53),u=t(74),i=t(73),E=t(88),p=t(44),v=t(7),b=t(6);var f=function(e){var a=e.mode,t=e.module,r=e.onAdd,m=e.onUpdate,s=Object(l.useState)("add"===a?{name:""}:Object(i.a)({},t)),o=Object(n.a)(s,2),f=o[0],N=o[1],y=function(e){e.preventDefault(),"add"===a&&r(f),"update"===a&&m(f)};return c.a.createElement("div",{className:"module-form"},function(){var e=f.name;return c.a.createElement(p.a,{onSubmit:y},c.a.createElement(E.a,{className:"border-0"},c.a.createElement(E.a.Body,null,c.a.createElement("div",{className:"text-muted"},c.a.createElement("div",{className:"mb-0 pb-3"},c.a.createElement("strong",{className:"d-block text-gray-dark"},c.a.createElement(v.a,{icon:b.b,className:"mr-2"}),"Name"),c.a.createElement(p.a.Group,{controlId:"name",className:"mb-0 mt-2"},c.a.createElement(p.a.Control,{type:"text",value:e||"",placeholder:"Enter name",onChange:function(e){return function(e,a){if(a.stopPropagation(),e){var t=a.target.value;t!==f[e]&&N(Object(i.a)({},f,Object(u.a)({},e,t)))}}("name",e)},required:!0})))),c.a.createElement("div",{className:"pt-3"},"add"===a&&c.a.createElement(d.a,{type:"submit",variant:"success"},c.a.createElement(v.a,{icon:b.s,className:"mr-2"}),"Add Module"),"update"===a&&c.a.createElement(d.a,{type:"submit",variant:"success"},c.a.createElement(v.a,{icon:b.v,className:"mr-2"}),"Save Module")))))}())},N=t(168);var y=function(e){var a=e.module,t=e.onUpdate,r=e.deleteModule,m=a.name,s=a.id,o=Object(l.useState)(!1),u=Object(n.a)(o,2),i=u[0],p=u[1],y=Object(l.useState)(!1),j=Object(n.a)(y,2),M=j[0],O=j[1],g=function(){O(!M)};return c.a.createElement("div",{className:"module-details"},c.a.createElement(N.a,{visible:M,onCancel:g,onOk:function(){r(s)},message:"Are you sure you want to delete this module?"}),c.a.createElement("div",{className:"text-right p-1"},c.a.createElement(d.a,{variant:"warning",className:"text-right",onClick:function(){p(!i)}},c.a.createElement(v.a,{icon:b.r,className:"mr-2"}),"Edit"),c.a.createElement(d.a,{variant:"danger",className:"text-right ml-2",onClick:g,disabled:M},c.a.createElement(v.a,{icon:b.A,className:"mr-2"}),"Delete")),i?c.a.createElement(f,{mode:"update",onUpdate:t,module:a}):c.a.createElement(E.a,{className:"border-0"},c.a.createElement(E.a.Body,null,c.a.createElement("div",{className:"text-muted"},c.a.createElement("div",{className:"mt-2 mb-0 pb-3"},c.a.createElement("strong",{className:"d-block text-gray-dark"},c.a.createElement(v.a,{icon:b.b,className:"mr-2"}),"Name"),c.a.createElement("div",null,m||"Not specified"))))))};var j=function(e){var a=e.localCourseModulesData,t=e.addModule,n=e.updateModule,l=e.deleteModule;return c.a.createElement("div",{id:"cfg_modules",className:"page p-0"},c.a.createElement("div",{className:"p-3 bg-light"},c.a.createElement("h6",{className:"m-0"},"Module Count: ",c.a.createElement("b",null,a.length))),c.a.createElement("div",{className:"p-3"},c.a.createElement(r.a.Container,{id:"left-tabs-example",defaultActiveKey:"addNewModule"},c.a.createElement(m.a,null,c.a.createElement(s.a,{xs:2,className:"d-md-none"},c.a.createElement(o.a,{className:"flex-column"},c.a.createElement(o.a.Item,null,c.a.createElement(o.a.Link,{eventKey:"addNewModule",className:"ellipsis clamp-1"},c.a.createElement(d.a,{variant:"secondary"},"+"))),a.map((function(e,a){return c.a.createElement(o.a.Item,{key:"module-".concat(e.id)},c.a.createElement(o.a.Link,{eventKey:e.id},c.a.createElement(d.a,{variant:"secondary"},a+1)))})))),c.a.createElement(s.a,{md:3,xl:2,className:"d-none d-md-block"},c.a.createElement(o.a,{variant:"pills",className:"flex-column"},c.a.createElement(o.a.Item,null,c.a.createElement(o.a.Link,{eventKey:"addNewModule",className:"ellipsis clamp-1"},"Add new module")),a.map((function(e,a){return c.a.createElement(o.a.Item,{key:"module-".concat(e.id)},c.a.createElement(o.a.Link,{eventKey:e.id,className:"ellipsis clamp-2 position-relative"},"".concat(a+1,". ").concat(e.name)))})))),c.a.createElement(s.a,{xs:9,xl:10},c.a.createElement(r.a.Content,null,c.a.createElement(r.a.Pane,{eventKey:"addNewModule"},c.a.createElement(f,{mode:"add",onAdd:t})),a.map((function(e){return c.a.createElement(r.a.Pane,{eventKey:e.id,key:"module-pane-".concat(e.id)},c.a.createElement(y,{key:"module-".concat(e.id),module:e,onUpdate:n,deleteModule:l}))}))))))))},M=t(172),O=t(35);t(311);a.default=function(e){var a=Object(O.c)((function(e){return e.activeCourseModules.data})),t=Object(O.b)(),r=Object(l.useState)([]),m=Object(n.a)(r,2),s=m[0],o=m[1],d=Object(l.useState)(e.match.params.id),u=Object(n.a)(d,2),i=u[0],E=u[1],p=Object(l.useState)(!1),v=Object(n.a)(p,2),b=v[0],f=v[1];return Object(l.useEffect)((function(){f(!1),o(a)}),[a]),Object(l.useEffect)((function(){var a=e.match.params.id;E(a),t(M.a.loadModules(a))}),[e.match.params.id]),c.a.createElement(j,{localCourseModulesData:s,isModified:b,addModule:function(e){t(M.a.addNewModuleDetails(i,e))},updateModule:function(e){t(M.a.saveModuleDetails(i,e))},deleteModule:function(e){t(M.a.deleteModuleDetails(i,e))}})}}}]);
//# sourceMappingURL=9.39ffa30b.chunk.js.map