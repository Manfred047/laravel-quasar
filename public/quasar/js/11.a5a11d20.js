(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{"02c5":function(r,e,a){"use strict";var t=a("c6dd"),s=a.n(t);s.a},b68b:function(r,e,a){"use strict";a.r(e);var t=function(){var r=this,e=r.$createElement,a=r._self._c||e;return a("q-page",{staticClass:"image-background"},[a("div",{staticClass:"fixed-center register-form"},[a("div",{},[a("q-card",{},[a("q-card-section",[a("validation-observer",{ref:"observer",scopedSlots:r._u([{key:"default",fn:function(e){var t=e.valid;return[a("q-form",{on:{submit:function(r){r.preventDefault()}}},[a("div",{},[a("p",{staticClass:"text-h6 text-center q-pb-sm"},[r._v("\n                  "+r._s(r.$t("register.title"))+"\n                ")])]),a("validation-provider",{attrs:{vid:"username",name:r.$t("register.form.username"),rules:r.form_rules.username},scopedSlots:r._u([{key:"default",fn:function(e){var t=e.errors;return[a("div",{},[a("q-input",{attrs:{id:"username",name:"username",type:"text",label:r.$t("register.form.username"),error:r.hasErrors(t),"error-message":t[0]},model:{value:r.form.username,callback:function(e){r.$set(r.form,"username",e)},expression:"form.username"}})],1)]}}],null,!0)}),a("validation-provider",{attrs:{vid:"email",name:r.$t("register.form.email"),rules:r.form_rules.email},scopedSlots:r._u([{key:"default",fn:function(e){var t=e.errors;return[a("div",{},[a("q-input",{attrs:{id:"email",name:"email",type:"email",label:r.$t("register.form.email"),error:r.hasErrors(t),"error-message":t[0]},model:{value:r.form.email,callback:function(e){r.$set(r.form,"email",e)},expression:"form.email"}})],1)]}}],null,!0)}),a("validation-provider",{attrs:{vid:"email_confirmation",name:r.$t("register.form.email_confirmation"),rules:r.form_rules.email_confirmation},scopedSlots:r._u([{key:"default",fn:function(e){var t=e.errors;return[a("div",{},[a("q-input",{attrs:{id:"email_confirmation",name:"email_confirmation",type:"email",label:r.$t("register.form.email_confirmation"),error:r.hasErrors(t),"error-message":t[0]},model:{value:r.form.email_confirmation,callback:function(e){r.$set(r.form,"email_confirmation",e)},expression:"form.email_confirmation"}})],1)]}}],null,!0)}),a("validation-provider",{attrs:{vid:"password",name:r.$t("register.form.password"),rules:r.form_rules.password},scopedSlots:r._u([{key:"default",fn:function(e){var t=e.errors;return[a("div",{},[a("q-input",{attrs:{id:"password",name:"password",type:"password",label:r.$t("register.form.password"),error:r.hasErrors(t),"error-message":t[0]},model:{value:r.form.password,callback:function(e){r.$set(r.form,"password",e)},expression:"form.password"}})],1)]}}],null,!0)}),a("validation-provider",{attrs:{vid:"password_confirmation",name:r.$t("register.form.password_confirmation"),rules:r.form_rules.password_confirmation},scopedSlots:r._u([{key:"default",fn:function(e){var t=e.errors;return[a("div",{},[a("q-input",{attrs:{id:"password_confirmation",name:"password_confirmation",type:"password",label:r.$t("register.form.password_confirmation"),error:r.hasErrors(t),"error-message":t[0]},model:{value:r.form.password_confirmation,callback:function(e){r.$set(r.form,"password_confirmation",e)},expression:"form.password_confirmation"}})],1)]}}],null,!0)}),a("div",{staticClass:"text-center"},[a("q-btn",{staticClass:"q-mt-md",attrs:{type:"submit",loading:r.loader,disable:!t,label:r.$t("register.title"),color:"teal"},on:{click:r.submit},scopedSlots:r._u([{key:"loading",fn:function(){return[a("q-spinner")]},proxy:!0}],null,!0)})],1)],1)]}}])})],1)],1)],1)])])},s=[],o=(a("5319"),a("c973")),i=a.n(o),n=a("ded3"),l=a.n(n),m=a("2f62"),d=a("b012"),u=a("6fea"),f=a("7bb1"),c=a("039f"),p=a("2ef0"),v=a.n(p),_={name:"Register",components:{ValidationObserver:f["a"],ValidationProvider:c["ValidationProvider"]},computed:l()({},Object(m["c"])("auth",["isAuth"])),methods:{hasErrors(r){return!v.a.isEmpty(r)},submit(){var r=this;return i()((function*(){const e=yield r.$refs.observer.validate();if(!e)return!1;r.register()}))()},register(){this.loader=!0,d["a"].register(this.form).then(r=>{this.$q.notify({message:this.$t("register.success_register"),type:"positive"}),this.$router.replace({name:"public.login"})}).catch(r=>{const e=u["a"].hasErrors(r);e&&u["a"].setErrors(this.$refs.observer,e)}).then(()=>{this.loader=!1})}},data(){return{loader:!1,form:{username:null,email:null,email_confirmation:null,password:null,password_confirmation:null},form_rules:{username:"required|alpha_num|max:50",email:"required|email|max:50",email_confirmation:"required|confirmed:email",password:{required:!0,min:8,regex:/(^[\S]{8,}$)/},password_confirmation:"required|confirmed:password"}}},beforeRouteEnter(r,e,a){a(r=>{r.isAuth&&r.$router.replace({name:"public.index"})})},meta(){return{title:this.$t("page_titles.register_title")}}},b=_,g=(a("02c5"),a("2877")),w=a("9989"),h=a("f09f"),$=a("a370"),q=a("0378"),y=a("27f9"),k=a("9c40"),x=a("0d59"),E=a("eebe"),S=a.n(E),C=Object(g["a"])(b,t,s,!1,null,"60398f6c",null);e["default"]=C.exports;S()(C,"components",{QPage:w["a"],QCard:h["a"],QCardSection:$["a"],QForm:q["a"],QInput:y["a"],QBtn:k["a"],QSpinner:x["a"]})},c6dd:function(r,e,a){}}]);