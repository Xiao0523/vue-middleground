(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05265b16"],{4917:function(e,t,a){"use strict";var o=a("cb7c"),s=a("9def"),r=a("0390"),i=a("5f1b");a("214f")("match",1,(function(e,t,a,l){return[function(a){var o=e(this),s=void 0==a?void 0:a[t];return void 0!==s?s.call(a,o):new RegExp(a)[t](String(o))},function(e){var t=l(a,e,this);if(t.done)return t.value;var n=o(e),c=String(this);if(!n.global)return i(n,c);var p=n.unicode;n.lastIndex=0;var m,d=[],u=0;while(null!==(m=i(n,c))){var f=String(m[0]);d[u]=f,""===f&&(n.lastIndex=r(c,s(n.lastIndex),p)),u++}return 0===u?null:d}]}))},"99b1":function(e,t,a){"use strict";a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return i}));var o="https://upload.my51share.com",s=o+"/pic",r=o+"/video",i=o+"/file"},dd91:function(e,t,a){"use strict";var o=a("ecb8"),s=a.n(o);s.a},ecb8:function(e,t,a){},f516:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"material"},[a("h3",{staticClass:"title"},[e._v("基本资料")]),e._v(" "),a("span",{staticClass:"note"},[e._v("*请确保以下内容文字都是英文")]),e._v(" "),a("el-form",{ref:"form",staticClass:"search-box",attrs:{inline:!0,model:e.form,"label-width":"150px",label:"left",rules:e.rules}},[a("el-form-item",{staticClass:"search-item",attrs:{label:"Company name",prop:"companyName"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"Please enter the"},model:{value:e.form.companyName,callback:function(t){e.$set(e.form,"companyName","string"===typeof t?t.trim():t)},expression:"form.companyName"}})],1),e._v(" "),a("el-form-item",{staticClass:"search-item",attrs:{label:"Company profile",prop:"simpleDescription"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"Please enter the"},model:{value:e.form.simpleDescription,callback:function(t){e.$set(e.form,"simpleDescription","string"===typeof t?t.trim():t)},expression:"form.simpleDescription"}})],1),e._v(" "),a("el-form-item",{staticClass:"search-item",attrs:{label:"Jump website",prop:"webUrl"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"Please enter the"},model:{value:e.form.webUrl,callback:function(t){e.$set(e.form,"webUrl","string"===typeof t?t.trim():t)},expression:"form.webUrl"}})],1),e._v(" "),a("el-form-item",{staticClass:"search-item",attrs:{label:"The name",prop:"realName"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"Please enter the"},model:{value:e.form.realName,callback:function(t){e.$set(e.form,"realName","string"===typeof t?t.trim():t)},expression:"form.realName"}})],1),e._v(" "),a("el-form-item",{staticClass:"search-item",attrs:{label:"Personal motto",prop:"motto"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"Please enter the"},model:{value:e.form.motto,callback:function(t){e.$set(e.form,"motto","string"===typeof t?t.trim():t)},expression:"form.motto"}})],1),e._v(" "),a("el-form-item",{staticClass:"search-item",attrs:{label:"Mobile phone no.",prop:"mobilePhone"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"Please enter the"},model:{value:e.form.mobilePhone,callback:function(t){e.$set(e.form,"mobilePhone","string"===typeof t?t.trim():t)},expression:"form.mobilePhone"}})],1),e._v(" "),a("el-form-item",{staticClass:"search-item",attrs:{label:"Email",prop:"email"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"Please enter the"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email","string"===typeof t?t.trim():t)},expression:"form.email"}})],1),e._v(" "),a("el-form-item",{staticClass:"search-item",attrs:{label:"Twitter",prop:"twitter"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"Please enter the"},model:{value:e.form.twitter,callback:function(t){e.$set(e.form,"twitter","string"===typeof t?t.trim():t)},expression:"form.twitter"}})],1),e._v(" "),a("el-form-item",{staticClass:"search-item",attrs:{label:"Facebook",prop:"facebook"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"Please enter the"},model:{value:e.form.facebook,callback:function(t){e.$set(e.form,"facebook","string"===typeof t?t.trim():t)},expression:"form.facebook"}})],1),e._v(" "),a("el-form-item",{staticClass:"search-item",attrs:{label:"LinkedIn",prop:"linkedIn"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"Please enter the"},model:{value:e.form.linkedIn,callback:function(t){e.$set(e.form,"linkedIn","string"===typeof t?t.trim():t)},expression:"form.linkedIn"}})],1),e._v(" "),a("el-form-item",{staticClass:"search-item",attrs:{label:"whatsapp",prop:"whatsapp"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"Please enter the"},model:{value:e.form.whatsapp,callback:function(t){e.$set(e.form,"whatsapp","string"===typeof t?t.trim():t)},expression:"form.whatsapp"}})],1),e._v(" "),a("el-form-item",{staticClass:"search-item",attrs:{label:"Promotional video",prop:"facebook"}},[a("div",{staticClass:"upload-box"},[a("input",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"input",attrs:{type:"file",accept:"video/*"},on:{change:e.fileChange}}),e._v(" "),a("el-button",{attrs:{disabled:e.disableUpload,size:"small",type:"primary"},on:{click:function(t){return e.$refs.input.click()}}},[e._v("\n          上传视频\n        ")]),e._v(" "),a("el-progress",{directives:[{name:"show",rawName:"v-show",value:e.percentage,expression:"percentage"}],staticStyle:{width:"400px"},attrs:{percentage:e.percentage,"stroke-width":20,color:e.customColors,"text-inside":!0}})],1)]),e._v(" "),a("el-form-item",{attrs:{label:"上传照片"}},[a("el-upload",{staticClass:"uploader logo",attrs:{action:e.uploadUrl,name:"multipartFile","show-file-list":!1,"on-success":e.handleVideoSuccess,"before-upload":e.beforeAvatarUpload,"on-preview":e.handlePictureCardPreview}},[e.form.businessPic?a("img",{staticClass:"logo",attrs:{src:e.form.businessPic}}):a("i",{staticClass:"el-icon-picture uploader-icon"})]),e._v(" "),a("p",{staticClass:"upload-tips"},[e._v("只能上传jpg/png文件，建议尺寸为500x500px。")]),e._v(" "),a("input",{attrs:{type:"hidden"}})],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:9}},[a("el-button",{staticClass:"submit",on:{click:e.submitInformation}},[e._v("提交")])],1)],1)],1)],1)},s=[],r=(a("7f7f"),a("4917"),a("bc3a")),i=a.n(r),l=a("99b1"),n=a("f96b");function c(){return n["a"].get("/boss/supplier/web")}function p(e){return n["a"].patch("/boss/supplier/web",e)}var m={components:{},data:function(){return{form:{companyName:"",simpleDescription:"",webUrl:"",realName:"",motto:"",mobilePhone:"",email:"",twitter:"",facebook:"",linkedIn:"",whatsapp:"",videos:[],videoInfo:{videoCoverUrl:"",videoUrl:""},businessPic:""},rules:{companyName:[{required:!0,message:"Please enter the company name",trigger:"blur"}],simpleDescription:[{required:!0,message:"Please enter company profile",trigger:"blur"}]},videoUrl:l["c"],uploadUrl:l["b"],uploadFile:null,percentage:0,uploader:null,disableUpload:!1,disableSubmit:!0,customColors:[{color:"#f56c6c",percentage:20},{color:"#e6a23c",percentage:40},{color:"#5cb87a",percentage:60},{color:"#1989fa",percentage:80},{color:"#6f7ad3",percentage:100}],securityToken:"",accessKeyId:"",accessKeySecret:"",dialogImageUrl:"",dialogVisible:!1}},computed:{},watch:{},created:function(){this.getWebsite()},mounted:function(){},beforeCreate:function(){},beforeMount:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){},activated:function(){},methods:{beforeAvatarUpload:function(e){var t="image/jpeg"===e.type||"image/png"===e.type;return t||this.$message.error("请上传JPG/PNG格式的图片"),t},handleVideoSuccess:function(e,t){if(e.code)return e.message&&this.$warn(e.message);this.$success("上传成功！！！"),this.form.businessPic=e.data},handleVideoRemove:function(){this.videoLoading=!1,this.form.businessPic="",this.form.businessPic=""},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},fileChange:function(){var e=this;return!!event.target.files[0]&&(event.target.files[0].type.match("video.*")?(this.uploadFile=event.target.files[0],this.percentage=0,void(this.uploadFile.size<=10485760?this.getAuth((function(){e.getUploder();var t='{"Vod":{"StorageLocation":"","Title":"'+e.uploadFile.name+'","Description":"默认描述信息暂无","CateId":"19","Tags":"测试视频"}}';e.uploader.addFile(e.uploadFile,"","","",t),e.uploader.startUpload(),e.disableSubmit=!1})):(this.disableSubmit=!0,this.$message.error("上传的文件大小超过10M，请重新上传")))):(this.$message.error("请选择视频文件"),!1))},getUploder:function(){var e=this;e.uploader=new AliyunUpload.Vod({userId:"1402947514567452",partSize:1048576,parallel:5,retryCount:3,retryDuration:2,enableUploadProgress:!0,onUploadFailed:function(t,a,o){e.$message.error("文件上传失败：".concat(o)),e.disableSubmit=!0,e.disableUpload=!1},onUploadSucceed:function(t){console.log(t);var a="https://video.my51share.com/".concat(t.object),o={videoUrl:a,videoId:t.videoId,videoCover:""},s=[];s.push(o),e.form.videos=s,console.log(e.form.videos),e.$message.success("文件上传成功"),e.disableSubmit=!0,e.disableUpload=!1},onUploadProgress:function(t,a,o){e.percentage=+(100*o).toFixed(0)},onUploadTokenExpired:function(e){console.log("onUploadTokenExpired STS临时账号过期了")},onUploadCanceled:function(e){console.log("onUploadCanceled:file:".concat(e.file.name))},onUploadstarted:function(t){var a=e.accessKeyId,o=e.accessKeySecret,s=e.securityToken;e.uploader.setSTSToken(t,a,o,s)},onUploadEnd:function(e){console.log("onUploadEnd: uploaded all the files")}})},getAuth:function(e){var t=this,a=JSON.parse(localStorage.getItem("storeId"))||"023";i.a.get("https://dev.my51share.com/VodStsForApp/"+a).then((function(a){t.securityToken=a.data.credentials.securityToken,t.accessKeyId=a.data.credentials.accessKeyId,t.accessKeySecret=a.data.credentials.accessKeySecret,e()}))},getWebsite:function(){var e=this;c().then((function(t){if(t.code)return t.message&&e.$warn(t.message);e.form=t.data.data}))},submitInformation:function(){var e=this,t=this.form;p(t).then((function(t){if(t.data.code)return t.data.message&&e.$warn(t.data.message);e.$success(t.data.message)}))}}},d=m,u=(a("dd91"),a("2877")),f=Object(u["a"])(d,o,s,!1,null,"0776ee9d",null);t["default"]=f.exports}}]);