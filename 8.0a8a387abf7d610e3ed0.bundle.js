(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{54:function(n,e,t){"use strict";var r=t(5);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=r(t(65)),i=r(t(61)),o=r(t(62)),l=r(t(63)),a=r(t(64)),c=r(t(60)),f=t(66);function s(){var n=(0,u.default)(["\n        .shell {\n            box-sizing: border-box;\n            width: 100vw;\n            height: 100%;\n            margin: 0;\n            background-color: #1A1A1A;\n            color: #FBFBD3;\n        }\n        ul {\n            width: 100%;\n            height: 100%;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: center;\n            margin: 0;\n            padding: 0;\n            list-style-type: none;\n        }\n        hr {\n            border: none;\n            width: 65%;\n            max-width: 300px;\n            height: 1px;\n            background-color: rgba(251, 251, 211, 0.1);\n        }\n        li {\n            display: block;\n            padding: 10px;\n            text-transform: uppercase;\n            cursor: pointer;\n        }\n    "]);return s=function(){return n},n}function d(){var n=(0,u.default)(['\n          <section class="shell">\n            <ul>\n              ',"\n            </ul>\n          </section>\n        "]);return d=function(){return n},n}function p(){var n=(0,u.default)(["\n      <router-link path=",">\n        <li>","</li>\n      </router-link>\n    "]);return p=function(){return n},n}function h(){var n=(0,u.default)(["\n        <hr/>\n        <router-link path=",">\n          <li>","</li>\n        </router-link>\n      "]);return h=function(){return n},n}function b(n){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var t,r=(0,c.default)(n);if(e){var u=(0,c.default)(this).constructor;t=Reflect.construct(r,arguments,u)}else t=r.apply(this,arguments);return(0,a.default)(this,t)}}t(32);var v=[{label:"Enviar música",path:"send-song"},{label:"Votar",path:"vote"},{label:"Resultado",path:"results"},{label:"Logout",path:"logout"}],g=function(n){(0,l.default)(t,n);var e=b(t);function t(){return(0,i.default)(this,t),e.apply(this,arguments)}return(0,o.default)(t,[{key:"renderListItem",value:function(n,e){return e>0?(0,f.html)(h(),n.path,n.label):(0,f.html)(p(),n.path,n.label)}},{key:"render",value:function(){return(0,f.html)(d(),v.map(this.renderListItem))}}],[{key:"styles",get:function(){return(0,f.css)(s())}}]),t}(f.LitElement);e.default=g,window.customElements.define("menu-page",g)},62:function(n,e){function t(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}n.exports=function(n,e,r){return e&&t(n.prototype,e),r&&t(n,r),n}},65:function(n,e){n.exports=function(n,e){return e||(e=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(e)}}))}}}]);