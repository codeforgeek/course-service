(this["webpackJsonpcourse-generator-ui"]=this["webpackJsonpcourse-generator-ui"]||[]).push([[12],{322:function(e,a,t){"use strict";t.r(a);var n=t(74),r=t(64),c=t(87),l=t(0),o=t.n(l),s=t(88),m=t(44),i=t(53),u=t(7),d=t(6),b=t(168),g=t(89),p=t(213),E=t.n(p),v=t(167);var h=function(e){var a=e.bitData,t=a.name,n=a.slug,r=a.content,c=a.tags,l=a.author,p=e.tinyMceApiKey,h=e.saveBitDetails,N=e.handleChange,f=e.handleEditorChange,y=e.handleTagsChange;return o.a.createElement("div",{id:"cfg_add_bit_page",className:"page p-0"},o.a.createElement(m.a,{onSubmit:h},o.a.createElement("div",{className:"course-info p-3"},o.a.createElement(s.a,{className:"border-0"},o.a.createElement(s.a.Body,null,o.a.createElement("div",{className:"text-muted"},o.a.createElement("div",{className:"border-bottom mb-0 pb-3"},o.a.createElement("strong",{className:"d-block text-gray-dark"},o.a.createElement(u.a,{icon:d.b,className:"mr-2"}),"Title"),o.a.createElement(m.a.Group,{controlId:"name",className:"mb-0 mt-2"},o.a.createElement(m.a.Control,{type:"text",value:t||"",placeholder:"Enter title",onChange:function(e){return N("name",e)},required:!0})))),o.a.createElement("div",{className:"text-muted pt-3"},o.a.createElement("div",{className:"border-bottom mb-0 pb-3"},o.a.createElement("strong",{className:"d-block text-gray-dark"},o.a.createElement(u.a,{icon:d.c,className:"mr-2"}),"Overview"),o.a.createElement(m.a.Group,{controlId:"overview",className:"mb-0 mt-2"},o.a.createElement(b.a,{apiKey:p,key:"form-wvgiwys",value:r||"",init:{selector:"textarea",images_upload_handler:function(e,a,t){Object(g.b)(e,a,t)},height:500,menubar:!1,plugins:["advlist codesample autolink lists link image imagetools charmap print preview anchor","searchreplace visualblocks code fullscreen","insertdatetime media table paste code help wordcount"],toolbar:"undo redo | formatselect | image | codesample | bold italic backcolor | \n             alignleft aligncenter alignright alignjustify | \n             bullist numlist outdent indent | removeformat | help",codesample_languages:v.a,entity_encoding:"raw"},onEditorChange:function(e){return f("content",e)}})))),o.a.createElement("div",{className:"text-muted pt-3"},o.a.createElement("div",{className:"border-bottom mb-0 pb-3"},o.a.createElement("strong",{className:"d-block text-gray-dark"},o.a.createElement(u.a,{icon:d.w,className:"mr-2"}),"Slug"),o.a.createElement(m.a.Group,{controlId:"slug",className:"mb-0 mt-2"},o.a.createElement(m.a.Control,{type:"text",value:n||"",placeholder:"Enter slug",onChange:function(e){return N("slug",e)},required:!0})))),o.a.createElement("div",{className:"text-muted pt-3"},o.a.createElement("div",{className:"border-bottom mb-0 pb-3"},o.a.createElement("strong",{className:"d-block text-gray-dark"},o.a.createElement(u.a,{icon:d.e,className:"mr-2"}),"Author"),o.a.createElement(m.a.Group,{controlId:"author",className:"mb-0 mt-2"},o.a.createElement(m.a.Control,{type:"text",value:l||"",placeholder:"Enter author's name",onChange:function(e){return N("author",e)}})))),o.a.createElement("div",{className:"text-muted pt-3"},o.a.createElement("div",{className:"border-bottom mb-0 pb-3"},o.a.createElement("strong",{className:"d-block text-gray-dark"},o.a.createElement(u.a,{icon:d.e,className:"mr-2"}),"Bits"),o.a.createElement(m.a.Group,{controlId:"tags",className:"mb-0 mt-2"},o.a.createElement(E.a,{value:""===c?[]:c,onChange:function(e){return y("tags",e)}}))))))),o.a.createElement("div",{className:"course-action-panel"},o.a.createElement("div",{className:"p-3"},o.a.createElement(i.a,{type:"submit",variant:"success",className:"ml-2"},o.a.createElement(u.a,{icon:d.v,className:"mr-2"}),"Save")))))},N=t(35),f=t(83);a.default=function(e){var a=Object(N.b)(),t=Object(N.c)((function(e){return e.app.tinyMceApiKey})),s=Object(l.useState)({name:"",slug:"",content:"",tags:"",author:""}),m=Object(c.a)(s,2),i=m[0],u=m[1];return o.a.createElement(h,{bitData:i,tinyMceApiKey:t,saveBitDetails:function(e){e.preventDefault(),u({name:"",slug:"",content:"",tags:"",author:""}),a(f.a.saveNewBitDetails(i))},handleChange:function(e,a){if(a.stopPropagation(),e){var t=a.target.value;t!==i[e]&&u(Object(r.a)({},i,Object(n.a)({},e,t)))}},handleEditorChange:function(e,a){u(Object(r.a)({},i,Object(n.a)({},e,a)))},handleTagsChange:function(e,a){u(Object(r.a)({},i,Object(n.a)({},e,a)))}})}}}]);
//# sourceMappingURL=12.9eb12657.chunk.js.map