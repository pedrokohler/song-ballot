(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{59:function(n,t,e){"use strict";var r=e(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(e(65)),i=r(e(61)),a=r(e(62)),u=r(e(63)),c=r(e(64)),l=r(e(60)),s=e(66),d=e(75);e(72);var f=e(29),p=e(22);e(88),e(68),e(89);var h=r(e(90));function g(){var n=(0,o.default)(['\n      <alert-modal\n        @button-clicked="','"\n      >\n        Você precisa ser incluído em um grupo. Solicite a sua inclusão antes de prosseguir.\n      </alert-modal>']);return g=function(){return n},n}function b(){var n=(0,o.default)(['\n            <section class="shell">\n              <header>\n                <img class="logo" src=',' alt="song ballot"/>\n              </header>\n              <section>\n                <google-sign-in-button @click=',"></google-sign-in-button>\n              </section>\n            </section>\n          "]);return b=function(){return n},n}function m(){var n=(0,o.default)(['\n      <section>\n        <paper-progress class="blue" indeterminate></paper-progress>\n      </section>\n      ']);return m=function(){return n},n}function v(){var n=(0,o.default)(['\n      .shell {\n        box-sizing: border-box;\n        width: 100vw;\n        height: 100%;\n        min-width: 320px;\n        background-image: url("images/background.jpg");\n        background-size: cover;\n        margin: 0;\n      }\n\n      .logo {\n        width: 320px;\n        height: 145px;\n      }\n\n      google-sign-in-button {\n        margin-bottom: 70px;\n      }\n\n      header, section {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: space-between;\n      }\n\n      paper-progress {\n        width: 100%;\n        --paper-progress-active-color: #FBC303;\n      }\n\n      @media only screen and (max-width: 600px) {\n        .shell {\n          background-size: cover;\n          background-position: 40% 10%;\n          background-repeat: no-repeat;\n        }\n      }\n    ']);return v=function(){return n},n}function w(n){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var e,r=(0,l.default)(n);if(t){var o=(0,l.default)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.default)(this,e)}}var x=function(n){(0,u.default)(e,n);var t=w(e);function e(){var n;return(0,i.default)(this,e),(n=t.call(this)).window=n.ownerDocument.defaultView,n}return(0,a.default)(e,null,[{key:"styles",get:function(){return(0,s.css)(v())}}]),(0,a.default)(e,[{key:"render",value:function(){var n=this,t=new URLSearchParams(this.window.location.search).get("redirectTo");return f.store.authStateChecked?f.store.currentUser?f.store.currentGroup?(this.window.history.pushState(null,"",t||"menu"),""):(0,s.html)(g(),(function(){return n.window.history.pushState(null,"","logout")})):(0,s.html)(b(),h.default,p.handleGoogleSignIn):(0,s.html)(m())}}]),e}((0,d.observer)(s.LitElement));t.default=x,window.customElements.define("login-page",x)},68:function(n,t,e){"use strict";var r=e(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(e(65)),i=r(e(61)),a=r(e(62)),u=r(e(63)),c=r(e(64)),l=r(e(60)),s=e(66);function d(){var n=(0,o.default)(["\n            .shell {\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                justify-content: space-between;\n                box-sizing: border-box;\n            }\n            @-webkit-keyframes slide-down {\n                  0% { opacity: 0; -webkit-transform: translate(-50%, -100%); }\n                100% { opacity: 1; -webkit-transform: translate(-50%, -50%); }\n            }\n            @-moz-keyframes slide-down {\n                  0% { opacity: 0; -moz-transform: translate(-50%, -100%); }\n                100% { opacity: 1; -moz-transform: translate(-50%, -50%); }\n            }\n            .backdrop {\n                position: fixed;\n                width: 100vw;\n                height: 100vh;\n                background-color: rgba(26, 26, 26, 0.7);\n                z-index: 1000;\n            }\n\n            .modal {\n                position: fixed;\n                left: 50%;\n                top: 50%;\n                transform: translate(-50%, -50%);\n                max-width: 300px;\n                width: 70%;\n                min-height: 150px;\n                max-height: 80vh;\n                overflow-y: auto;\n                background-color: #FBFBD3;\n                z-index: 1001;\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                justify-content: space-between;\n                border-radius: 3px;\n                padding: 25px;\n                text-align: center;\n                -webkit-animation: slide-down .3s ease-out;\n                -moz-animation: slide-down .3s ease-out;\n            }\n\n            .modal button {\n                width: 100px;\n                height: 35px;\n                text-transform: uppercase;\n                background-color: #FBC303;\n                font-weight: 900;\n                font-family: inherit;\n                border: none;\n                border-radius: 3px;\n                vertical-align: baseline;\n                cursor: pointer;\n            }\n        "]);return d=function(){return n},n}function f(){var n=(0,o.default)(['\n            <div class="shell">\n                <div class="backdrop"></div>\n                <div class="modal">\n                    <p><slot></slot></p>\n                    <button @click="','">ok</button>\n                </div>\n            </div>\n        ']);return f=function(){return n},n}function p(n){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var e,r=(0,l.default)(n);if(t){var o=(0,l.default)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.default)(this,e)}}var h=function(n){(0,u.default)(e,n);var t=p(e);function e(){return(0,i.default)(this,e),t.apply(this,arguments)}return(0,a.default)(e,[{key:"handleButtonClick",value:function(){var n=new CustomEvent("button-clicked",{bubbles:!0,composed:!0});this.dispatchEvent(n)}},{key:"render",value:function(){return(0,s.html)(f(),this.handleButtonClick)}}],[{key:"styles",get:function(){return(0,s.css)(d())}}]),e}(s.LitElement);t.default=h,customElements.define("alert-modal",h)},88:function(n,t,e){"use strict";var r=e(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(e(65)),i=r(e(61)),a=r(e(62)),u=r(e(63)),c=r(e(64)),l=r(e(60)),s=e(66);function d(){var n=(0,o.default)(["\n        button {\n            height: 40px;\n            border-width: 0;\n            background: white;\n            color: #737373;\n            border-radius: 5px;\n            white-space: nowrap;\n            box-shadow: 1px 1px 0px 1px rgba(0,0,0,0.05);\n            transition-property: background-color, box-shadow;\n            transition-duration: 150ms;\n            transition-timing-function: ease-in-out;\n            padding: 0;\n            cursor: pointer;\n        }\n        button:focus,\n        button:hover {\n            box-shadow: 1px 4px 5px 1px rgba(0,0,0,0.1);\n        }\n        button:active {\n            background-color: #e5e5e5;\n            box-shadow: none;\n            transition-duration: 10ms;\n            border: none;\n        }\n        .icon {\n            display: inline-block;\n            vertical-align: middle;\n            margin: 8px 0 8px 8px;\n            width: 18px;\n            height: 18px;\n            box-sizing: border-box;\n        }\n        .text {\n            display: inline-block;\n            vertical-align: middle;\n            padding: 0 24px;\n            font-size: 14px;\n            font-weight: bold;\n            font-family: 'Roboto',arial,sans-serif;\n        }\n    "]);return d=function(){return n},n}function f(){var n=(0,o.default)(['\n        <button type="button" class="google-button">\n            <span class="icon">\n                <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg"><path d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z" id="Shape" fill="#EA4335"/><path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05"/><path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4"/><path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853"/></svg>\n            </span>\n            <span class="text">Entrar com o Google</span>\n        </button>\n    ']);return f=function(){return n},n}function p(n){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}();return function(){var e,r=(0,l.default)(n);if(t){var o=(0,l.default)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.default)(this,e)}}var h=function(n){(0,u.default)(e,n);var t=p(e);function e(){return(0,i.default)(this,e),t.apply(this,arguments)}return(0,a.default)(e,[{key:"render",value:function(){return(0,s.html)(f())}}],[{key:"styles",get:function(){return(0,s.css)(d())}}]),e}(s.LitElement);t.default=h,window.customElements.define("google-sign-in-button",h)},89:function(n,t,e){"use strict";e.r(t),t.default=e.p+"images/background.jpg"},90:function(n,t,e){"use strict";e.r(t),t.default=e.p+"images/vertical-logo.png"}}]);