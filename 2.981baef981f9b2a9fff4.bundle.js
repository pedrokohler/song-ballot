(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{69:function(e,t,n){"use strict";var r=n(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(e){(0,s.default)(c,e);var t,n,r=(t=c,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,u.default)(t);if(n){var o=(0,u.default)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,i.default)(this,e)});function c(){return(0,o.default)(this,c),r.apply(this,arguments)}return(0,a.default)(c,[{key:"generateAlerts",value:function(){return new Map([[this.alertCodes.HAS_NOT_VOTED,{needsErrorMessage:!1,messageGenerator:function(){return"Você só poderá ver os resultados desta rodada após votar."},onButtonClicked:this.closeModal}],[this.alertCodes.FIRST_ROUND_REACHED,{needsErrorMessage:!1,messageGenerator:function(){return"Você já viu todos os resultados disponíveis."},onButtonClicked:this.closeModal}],[this.alertCodes.EVALUATION_PERIOD_OVER,{needsErrorMessage:!1,messageGenerator:function(){return"O período para votar acabou ".concat(this.endWeekday," às ").concat(this.endTime,".")},onButtonClicked:this.goToMenu}],[this.alertCodes.EVALUATION_PERIOD_NOT_STARTED,{needsErrorMessage:!1,messageGenerator:function(){return"O período para votar começa ".concat(this.startWeekday," às ").concat(this.startTime,".")},onButtonClicked:this.goToMenu}],[this.alertCodes.ALREADY_EVALUATED,{needsErrorMessage:!1,messageGenerator:function(){return"Você já votou esta semana."},onButtonClicked:this.goToMenu}],[this.alertCodes.NO_SONGS,{needsErrorMessage:!1,messageGenerator:function(){return"Não há músicas para votar."},onButtonClicked:this.goToMenu}],[this.alertCodes.EVALUATION_FAILED,{needsErrorMessage:!1,messageGenerator:function(){return"Houve um problema ao tentar enviar seu voto. Tente novamente mais tarde."},onButtonClicked:this.closeModal}],[this.alertCodes.INVALID_SCORE,{needsErrorMessage:!1,messageGenerator:function(){return"Você não pontuou todas as músicas com um valor válido."},onButtonClicked:this.closeModal}],[this.alertCodes.VOTE_SUCCESS,{needsErrorMessage:!1,messageGenerator:function(){return"Voto enviado com sucesso!"},onButtonClicked:this.goToMenu}],[this.alertCodes.SUBMISSION_PERIOD_OVER,{needsErrorMessage:!1,messageGenerator:function(){return"O período para enviar músicas acabou ".concat(this.endWeekdayString," ").concat(this.endTimeString,".")},onButtonClicked:this.goToMenu}],[this.alertCodes.MAX_NUMBER_OF_SONGS,{needsErrorMessage:!1,messageGenerator:function(){return"Você já enviou o número máximo de músicas para esta rodada"},onButtonClicked:this.goToMenu}],[this.alertCodes.INVALID_URL,{needsErrorMessage:!1,messageGenerator:function(){return"O URL que você inseriu não é valido."},onButtonClicked:this.closeModal}],[this.alertCodes.SUBMISSION_SUCCESS,{needsErrorMessage:!1,messageGenerator:function(){return"Música enviada com sucesso! ".concat(this.userSubmissionsSent<this.userSubmissionsLimit?"Você ainda pode enviar mais uma música!":"")},onButtonClicked:this.goToMenu}],[this.alertCodes.SAVE_BOT_SETTINGS_SUCCESS,{needsErrorMessage:!1,messageGenerator:function(){return"Suas configurações do Bot foram salvas com sucesso!"},onButtonClicked:this.goToMenu}],[this.alertCodes.SAVE_BOT_SETTINGS_ERROR,{needsErrorMessage:!1,messageGenerator:function(){return"Houve um problema ao salvar as suas configurações do Bot."},onButtonClicked:this.closeModal}],[this.alertCodes.DUPLICATED_SONG,{needsErrorMessage:!1,messageGenerator:function(){return"A música que você enviou já foi enviada antes. Tente outra música."},onButtonClicked:this.closeModal}],[this.alertCodes.UNEXPECTED_ERROR_GO_MENU,{needsErrorMessage:!0,messageGenerator:function(e){return e},onButtonClicked:this.goToMenu}],[this.alertCodes.UNEXPECTED_ERROR_CLOSE_MODAL,{needsErrorMessage:!0,messageGenerator:function(e){return e},onButtonClicked:this.closeModal}]])}},{key:"openAlertModal",value:function(e,t){var n=this.generateAlerts();if(!n.has(e))throw new Error("openAlertModal: Invalid alertCode. '".concat(e,"' is not valid."));var r=n.get(e),o=r.needsErrorMessage,a=r.messageGenerator,s=r.onButtonClicked;if(o&&!t)throw new Error("openAlertModal: Can't use '".concat(e,"' alert without 'errorMessage' parameter. ")+"Please pass an errorMessage parameter.");var i=a.bind(this)(t);this.insertModalIntoShadowRoot({type:"alert",text:i,onButtonClicked:s.bind(this)})}},{key:"safeOpenAlertModal",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";try{this.openAlertModal(e,t)}catch(e){this.openAlertModal(this.alertCodes.UNEXPECTED_ERROR_GO_MENU,e.message)}}},{key:"insertModalIntoShadowRoot",value:function(e){var t=e.type,n=e.text,r=e.onButtonClicked,o=new Map([["input","input-modal"],["alert","alert-modal"]]);if(o.has(t)){var a=document.createElement(o.get(t)),s=document.createTextNode(n);return a.appendChild(s),a.addEventListener("button-clicked",(function(e){r(e)&&a.remove()})),this.shadowRoot.insertBefore(a,this.shadowRoot.firstChild),a}throw new Error("insertModalIntoShadowRoot: Invalid modal type ".concat(t,".")+"Please insert a valid modal type.")}},{key:"goToMenu",value:function(){return this.ownerDocument.defaultView.history.replaceState(null,"","menu"),!0}},{key:"closeModal",value:function(){return!0}},{key:"alertCodes",get:function(){return{HAS_NOT_VOTED:"has-not-voted",FIRST_ROUND_REACHED:"first-round-reached",EVALUATION_PERIOD_OVER:"evaluation-period-over",EVALUATION_PERIOD_NOT_STARTED:"evaluation-period-not-started",ALREADY_EVALUATED:"already-evaluated",NO_SONGS:"no-songs",EVALUATION_FAILED:"evaluation-failed",INVALID_SCORE:"invalid-score",VOTE_SUCCESS:"evaluation-success",SUBMISSION_PERIOD_OVER:"submission-period-over",MAX_NUMBER_OF_SONGS:"max-number-of-songs",INVALID_URL:"invalid-url",SUBMISSION_SUCCESS:"submission-success",DUPLICATED_SONG:"duplicated-song",UNEXPECTED_ERROR_GO_MENU:"unexpected-error-go-menu",UNEXPECTED_ERROR_CLOSE_MODAL:"unexpected-error-close-modal",SAVE_BOT_SETTINGS_ERROR:"save-bot-settings-error",SAVE_BOT_SETTINGS_SUCCESS:"save-bot-settings-success"}}}],[{key:"isPrototypeOfModalDisplayableMixin",get:function(){return!0}}]),c}(e)};var o=r(n(63)),a=r(n(64)),s=r(n(65)),i=r(n(66)),u=r(n(62))},70:function(e,t,n){"use strict";var r=n(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(67)),a=r(n(63)),s=r(n(64)),i=r(n(65)),u=r(n(66)),c=r(n(62)),l=n(68);function d(){var e=(0,o.default)(["\n            .shell {\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                justify-content: space-between;\n                box-sizing: border-box;\n            }\n            @-webkit-keyframes slide-down {\n                  0% { opacity: 0; -webkit-transform: translate(-50%, -100%); }\n                100% { opacity: 1; -webkit-transform: translate(-50%, -50%); }\n            }\n            @-moz-keyframes slide-down {\n                  0% { opacity: 0; -moz-transform: translate(-50%, -100%); }\n                100% { opacity: 1; -moz-transform: translate(-50%, -50%); }\n            }\n            .backdrop {\n                position: fixed;\n                width: 100vw;\n                height: 100vh;\n                background-color: rgba(26, 26, 26, 0.7);\n                z-index: 1000;\n            }\n\n            .modal {\n                position: fixed;\n                left: 50%;\n                top: 50%;\n                transform: translate(-50%, -50%);\n                max-width: 300px;\n                width: 70%;\n                min-height: 150px;\n                max-height: 80vh;\n                overflow-y: auto;\n                background-color: #FBFBD3;\n                z-index: 1001;\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                justify-content: space-between;\n                border-radius: 3px;\n                padding: 25px;\n                text-align: center;\n                -webkit-animation: slide-down .3s ease-out;\n                -moz-animation: slide-down .3s ease-out;\n            }\n\n            .modal button {\n                width: 100px;\n                height: 35px;\n                text-transform: uppercase;\n                background-color: #FBC303;\n                font-weight: 900;\n                font-family: inherit;\n                border: none;\n                border-radius: 3px;\n                vertical-align: baseline;\n                cursor: pointer;\n            }\n        "]);return d=function(){return e},e}function f(){var e=(0,o.default)(['\n            <div class="shell">\n                <div class="backdrop"></div>\n                <div class="modal">\n                    <p><slot></slot></p>\n                    <button @click="','">ok</button>\n                </div>\n            </div>\n        ']);return f=function(){return e},e}function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,c.default)(e);if(t){var o=(0,c.default)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return(0,u.default)(this,n)}}var h=function(e){(0,i.default)(n,e);var t=p(n);function n(){return(0,a.default)(this,n),t.apply(this,arguments)}return(0,s.default)(n,[{key:"handleButtonClick",value:function(){var e=new CustomEvent("button-clicked",{bubbles:!0,composed:!0});this.dispatchEvent(e)}},{key:"render",value:function(){return(0,l.html)(f(),this.handleButtonClick)}}],[{key:"styles",get:function(){return(0,l.css)(d())}}]),n}(l.LitElement);t.default=h,customElements.define("alert-modal",h)},71:function(e,t,n){var r=n(78);function o(t,n,a){return"undefined"!=typeof Reflect&&Reflect.get?e.exports=o=Reflect.get:e.exports=o=function(e,t,n){var o=r(e,t);if(o){var a=Object.getOwnPropertyDescriptor(o,t);return a.get?a.get.call(n):a.value}},o(t,n,a||t)}e.exports=o},72:function(e,t,n){"use strict";var r=n(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(67)),a=r(n(63)),s=r(n(64)),i=r(n(65)),u=r(n(66)),c=r(n(62)),l=n(68),d=r(n(73));function f(){var e=(0,o.default)(["\n        .shell {\n            position: relative;\n            box-sizing: border-box;\n            width: 100vw;\n            min-height: 100%;\n            min-width: 320px;\n            margin: 0;\n        }\n\n        .logo {\n            width: 160px;\n            height: 72px;\n            cursor: pointer;\n        }\n\n        router-link:active, router-link:focus {\n            border: none;\n            outline: none;\n        }\n\n        header {\n            z-index: 20;\n            position: fixed;\n            width: 100%;\n            height: 72px;\n            background-color: #FBC303;\n        }\n\n        header, section {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: space-between;\n        }\n\n        .yellow {\n            position: absolute;\n            z-index: -1;\n            top: 0;\n            left: 0;\n            right: 0;\n            margin: 0 auto;\n            width: 100%;\n            /* max-width: 600px; */\n            height: 30%;\n            max-height: 200px;\n            background-color: #FBC303;\n        }\n        .grey {\n            position: fixed;\n            z-index: -2;\n            top: 0;\n            left: 0;\n            right: 0;\n            margin: 0 auto;\n            width: 100%;\n            /* max-width: 600px; */\n            height: 100%;\n            background-color: #CCCCCC;\n        }\n\n        ::slotted(*:nth-of-type(1)){\n            margin-top: 100px;\n        }\n\n        ::slotted(*) {\n            position: relative;\n            z-index: 19;\n        }\n\n    "]);return f=function(){return e},e}function p(){var e=(0,o.default)(['\n        <section class="shell">\n            <header>\n                <router-link path="menu">\n                    <img class="logo" src=',' alt="song ballot"/>\n                </router-link>\n            </header>\n            <section class="yellow"></section>\n            <section class="grey"></section>\n            <slot></slot>\n        </section>\n    ']);return p=function(){return e},e}function h(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,c.default)(e);if(t){var o=(0,c.default)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return(0,u.default)(this,n)}}var g=function(e){(0,i.default)(n,e);var t=h(n);function n(){return(0,a.default)(this,n),t.apply(this,arguments)}return(0,s.default)(n,[{key:"render",value:function(){return(0,l.html)(p(),d.default)}}],[{key:"styles",get:function(){return(0,l.css)(f())}}]),n}(l.LitElement);t.default=g,window.customElements.define("default-background",g)},73:function(e,t,n){"use strict";n.r(t),t.default=n.p+"images/horizontal-logo.png"},74:function(e,t,n){"use strict";n.r(t),n.d(t,"observer",(function(){return o}));var r=n(1);function o(e){return class extends e{update(...e){let t;return this._mobxReaction.track(()=>{t=super.update(...e)}),t}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._mobxReaction=new r.c((this.constructor.name||this.nodeName)+".update()",()=>this.requestUpdate()),this.hasUpdated&&this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this._mobxReaction.dispose()}}}},75:function(e,t,n){"use strict";var r=n(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=(0,f.observer)(e);return function(e){(0,c.default)(g,e);var t,n,r,f,h=(t=g,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,d.default)(t);if(n){var o=(0,d.default)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,l.default)(this,e)});function g(){return(0,s.default)(this,g),h.apply(this,arguments)}return(0,i.default)(g,[{key:"firstUpdated",value:(f=(0,a.default)(o.default.mark((function e(t){return o.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((0,u.default)((0,d.default)(g.prototype),"firstUpdated",this).call(this,t),p.store.ongoingRound){e.next=4;break}return e.next=4,this.refreshOngoingRound();case 4:case"end":return e.stop()}}),e,this)}))),function(e){return f.apply(this,arguments)})},{key:"refreshOngoingRound",value:(r=(0,a.default)(o.default.mark((function e(){return o.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.store.loadOngoingRound();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),this.safeOpenAlertModal(this.alertCodes.UNEXPECTED_ERROR_GO_MENU,"Ocorreu um erro ao carregar a rodada atual: ".concat(e.t0.message));case 8:case"end":return e.stop()}}),e,this,[[0,5]])}))),function(){return r.apply(this,arguments)})}]),g}(e.isPrototypeOfModalDisplayableMixin?t:(0,h.default)(t))};var o=r(n(18)),a=r(n(19)),s=r(n(63)),i=r(n(64)),u=r(n(71)),c=r(n(65)),l=r(n(66)),d=r(n(62)),f=n(74),p=n(29),h=r(n(69))},78:function(e,t,n){var r=n(62);e.exports=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=r(e)););return e}},81:function(e,t,n){"use strict";var r=n(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(67)),a=r(n(63)),s=r(n(64)),i=r(n(65)),u=r(n(66)),c=r(n(62)),l=n(68),d=r(n(86)),f=r(n(87));function p(){var e=(0,o.default)(["\n            :host {\n                width: 100%;\n            }\n\n            section {\n                width: 100%;\n                display: flex;\n                flex-direction: row;\n                justify-content: space-between;\n                margin-top: 1em;\n            }\n\n            img {\n                width: 15px;\n                height: 15px;\n                vertical-align: middle;\n            }\n\n            span {\n                display: inline;\n                vertical-align: middle;\n                text-transform: uppercase;\n                margin: 0 10px;\n            }\n\n            button {\n                background-color: transparent;\n                border: none;\n                font-family: inherit;\n                font-weight: 600;\n                cursor: pointer;\n            }\n\n            button:focus {\n                outline: none;\n            }\n\n            button:disabled span {\n                color: #CCCCCC;\n                cursor: not-allowed;\n            }\n\n            button:disabled img {\n                filter: invert(91%) hue-rotate(135deg) brightness(92%) contrast(89%);\n            }\n        "]);return p=function(){return e},e}function h(){var e=(0,o.default)(['\n      <section>\n          <button\n              ?disabled="','"\n              @click="','"\n          >\n              <img src="','" alt="','"/>\n              <span>','</span>\n          </button>\n          <button\n              ?disabled="','"\n              @click="','"\n          >\n              <span>',"</span>\n              <img src=",' alt="','"/>\n          </button>\n      </section>\n    ']);return h=function(){return e},e}function g(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,c.default)(e);if(t){var o=(0,c.default)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return(0,u.default)(this,n)}}var m=function(e){(0,i.default)(n,e);var t=g(n);function n(){return(0,a.default)(this,n),t.apply(this,arguments)}return(0,s.default)(n,[{key:"render",value:function(){return(0,l.html)(h(),this.backwardArrowsDisabled,this.onBackwardArrowsClicked,f.default,this.backwardArrowsAlt,this.backwardArrowsLabel||"voltar",this.forwardArrowsDisabled,this.onForwardArrowsClicked,this.forwardArrowsLabel||"avançar",d.default,this.forwardArrowsAlt)}},{key:"onForwardArrowsClicked",value:function(){var e=new CustomEvent("forward-arrows-clicked",{bubbles:!0,composed:!0});this.dispatchEvent(e)}},{key:"onBackwardArrowsClicked",value:function(){var e=new CustomEvent("backward-arrows-clicked",{bubbles:!0,composed:!0});this.dispatchEvent(e)}}],[{key:"styles",get:function(){return(0,l.css)(p())}},{key:"properties",get:function(){return{forwardArrowsAlt:{type:String},backwardArrowsAlt:{type:String},forwardArrowsDisabled:{type:Boolean},backwardArrowsDisabled:{type:Boolean},forwardArrowsLabel:{type:String},backwardArrowsLabel:{type:String}}}}]),n}(l.LitElement);t.default=m,window.customElements.define("navigation-buttons",m)},86:function(e,t,n){"use strict";n.r(t),t.default=n.p+"images/forward-arrows.png"},87:function(e,t,n){"use strict";n.r(t),t.default=n.p+"images/backward-arrows.png"}}]);