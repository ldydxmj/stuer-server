(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["discuss-posts"],{"831c":function(t,s,i){"use strict";var e=i("a36c"),a=i.n(e);a.a},a36c:function(t,s,i){},db2f:function(t,s,i){"use strict";i.r(s);var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"discuss-wrap"},[t.postExist?i("div",{staticClass:"discuss-box block"},[i("div",{staticClass:"discuss-box-head"},[i("h1",{staticClass:"discuss-title"},[t._v(t._s(t.post.title))]),i("div",{staticClass:"discuss-author"},[i("router-link",{attrs:{to:"/profile/"+t.post.userId}},[i("img",{staticClass:"post-avatar",attrs:{src:t.post.userInfo.avatar||t.defaultAvatar,alt:"用户头像"}})]),i("div",{staticClass:"post-detail"},[i("router-link",{staticClass:"post-user",attrs:{to:"/profile/"+t.post.userId}},[t._v(t._s(t.post.userInfo.nickName||"stuer用户"))]),i("div",{staticClass:"post-legend"},[i("div",{staticClass:"post-time"},[i("span",[t._v("发表于 "+t._s(t.post.createdAt?t.$dayjs(t.post.createdAt).format("YYYY-MM-DD HH:mm:ss"):"-")+" ，")]),i("span",[t._v("编辑于 "+t._s(t.post.updatedAt?t.$dayjs(t.post.updatedAt).format("YYYY-MM-DD HH:mm:ss"):"-"))])]),i("ul",{staticClass:"post-legend-opts"},t._l(t.legendOpts,function(s,e){return i("li",{key:e},[i("span",[t._v(t._s(s))]),i("span",{staticClass:"opts-num"},[t._v(t._s(parseInt((Math.random()+"").slice(2,4),10)))]),e!==t.legendOpts.length-1?i("span",{staticClass:"seperate-pipe"},[t._v("|")]):t._e()])}),0)])],1)],1)]),i("div",{staticClass:"discuss-box-main"},[i("div",{staticClass:"discuss-content",domProps:{innerHTML:t._s(t.post.content)}}),i("div",{staticClass:"discuss-foot"},[i("ul",{staticClass:"opt-list"},t._l(t.postOpts,function(s,e){return i("li",{key:e},[i("a",{staticClass:"opt-list-item",attrs:{href:"javascript:void(0)"}},[i("svg",{staticClass:"icon opt-list-icon",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-"+s.icon}})]),i("span",{staticClass:"opt-list-name"},[t._v(t._s(s.name))])]),e!==t.postOpts.length-1?i("span",{staticClass:"seperate-pipe"},[t._v("|")]):t._e()])}),0)])])]):t._e(),t.postExist?i("div",{staticClass:"comment-box block"},[i("div",{staticClass:"comment-box-head"},[i("h1",{staticClass:"discuss-title"},[t._v(t._s(t.commentCount)+"条评论")]),i("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-edit"}},[t._v("评论")])],1),i("div",{staticClass:"comment-box-main"},[i("div",{staticClass:"comment-list"},t._l(10,function(s){return i("div",{key:s,staticClass:"comment-list-item"},[i("span",[t._v("还未完成")])])}),0)])]):t._e(),t.postExist?i("div",{staticClass:"edit-box block"},[i("div",{staticClass:"editor"},[i("div",{ref:"editor_bar",staticClass:"editor-bar"}),i("div",{ref:"editor_main",staticClass:"editor-main"}),i("div",{staticClass:"edit-box-foot"},[i("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-edit"}},[t._v("评论")])],1)])]):t._e(),t.postExist?t._e():i("div",{staticClass:"postNotFound block"},[t._v("帖子不存在")]),t.postExist?t._e():i("div",{staticClass:"toIndex"},[i("el-button",{attrs:{type:"primary"},on:{click:t.routeToIndex}},[t._v("返回首页")])],1)])},a=[],o=(i("96cf"),i("3b8d")),n=i("cb15"),r=i.n(n),c=i("365c"),d={data:function(){return{editor:null,post:{title:"",content:"",userId:void 0,createdAt:void 0,updateAt:void 0,userInfo:{avatar:"",nickName:""}},commentCount:0,comments:[{userId:void 0,nickName:""}],legendOpts:["收藏","点赞","评论","浏览"],postOpts:[{name:"收藏",icon:"collect"},{name:"点赞",icon:"dianzan"},{name:"评论",icon:"comment"},{name:"举报",icon:"report"}],defaultAvatar:r.a,postExist:!0}},mounted:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.initPost();case 2:this.initEditor();case 3:case"end":return t.stop()}},t,this)}));function s(){return t.apply(this,arguments)}return s}(),methods:{initPost:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var s,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return s=this.$route.params.id,t.next=3,Object(c["e"])(s);case 3:i=t.sent,0===i.code?this.post=i.data:this.postExist=!1;case 5:case"end":return t.stop()}},t,this)}));function s(){return t.apply(this,arguments)}return s}(),initEditor:function(){var t=window.wangEditor;this.editor=new t(this.$refs.editor_bar,this.$refs.editor_main),this.editor.customConfig.zIndex=100,this.editor.customConfig.uploadImgServer="/api/uploadImgsForPost",this.editor.customConfig.uploadImgMaxSize=3145728,this.editor.customConfig.uploadImgMaxLength=5;var s=this;this.editor.customConfig.customAlert=function(t){s.$message.error(t)},this.editor.create()},routeToIndex:function(){this.$router.push("/")}}},l=d,u=(i("831c"),i("2877")),p=Object(u["a"])(l,e,a,!1,null,"38fab993",null);s["default"]=p.exports}}]);
//# sourceMappingURL=discuss-posts.110414c9.js.map