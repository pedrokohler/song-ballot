(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{54:function(n,t,e){"use strict";var r=e(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=r(e(67)),o=r(e(63)),i=r(e(64)),a=r(e(65)),l=r(e(66)),c=r(e(62)),f=e(68);function s(){var n=(0,u.default)(["\n        .shell {\n            box-sizing: border-box;\n            width: 100vw;\n            height: 100%;\n            margin: 0;\n            background-color: #1A1A1A;\n            color: #FBFBD3;\n        }\n        ul {\n            width: 100%;\n            height: 100%;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: center;\n            margin: 0;\n            padding: 0;\n            list-style-type: none;\n        }\n        hr {\n            border: none;\n            width: 65%;\n            max-width: 300px;\n            height: 1px;\n            background-color: rgba(251, 251, 211, 0.1);\n        }\n        li {\n            display: block;\n            padding: 10px;\n            text-transform: uppercase;\n            cursor: pointer;\n        }\n    "]);return s=function(){return n},n}function d(){var n=(0,u.default)(['\n          <section class="shell">\n            <ul>\n              ',"\n            </ul>\n          </section>\n        "]);return d=function(){return n},n}function p(){var n=(0,u.default)(["\n      <router-link path=",">\n        <li>","</li>\n      </router-link>\n    "]);return p=function(){return n},n}function h(){var n=(0,u.default)(["\n        <hr/>\n        <router-link path=",">\n          <li>","</li>\n        </router-link>\n      "]);return h=function(){return n},n}function b(n){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var e,r=(0,c.default)(n);if(t){var u=(0,c.default)(this).constructor;e=Reflect.construct(r,arguments,u)}else e=r.apply(this,arguments);return(0,l.default)(this,e)}}e(32);var g=[{label:"Enviar música",path:"send-song"},{label:"Votar",path:"vote"},{label:"Resultado",path:"results"},{label:"Status da Rodada",path:"round-status"},{label:"Configurações do Bot",path:"bot-settings"},{label:"Logout",path:"logout"}],v=function(n){(0,a.default)(e,n);var t=b(e);function e(){return(0,o.default)(this,e),t.apply(this,arguments)}return(0,i.default)(e,[{key:"renderListItem",value:function(n,t){return t>0?(0,f.html)(h(),n.path,n.label):(0,f.html)(p(),n.path,n.label)}},{key:"render",value:function(){return(0,f.html)(d(),g.map(this.renderListItem))}}],[{key:"styles",get:function(){return(0,f.css)(s())}}]),e}(f.LitElement);t.default=v,window.customElements.define("menu-page",v)},64:function(n,t){function e(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}n.exports=function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}},67:function(n,t){n.exports=function(n,t){return t||(t=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(t)}}))}}}]);