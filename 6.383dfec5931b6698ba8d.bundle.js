(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{58:function(e,t,n){"use strict";var r=n(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(18)),a=r(n(19)),i=r(n(67)),s=r(n(63)),u=r(n(71)),l=r(n(64)),c=r(n(65)),d=r(n(66)),f=r(n(62)),h=n(68);n(76),n(72),n(70),n(77);var p=r(n(69)),m=r(n(75)),v=n(29),g=n(90);function y(){var e=(0,i.default)(["\n        section {\n            border-radius: 3px;\n            min-height: 200px;\n            height: inherit;\n            width: 90%;\n            min-width: 300px;\n            max-width: 600px;\n            background-color: #FFFFFF;\n            margin-bottom: 20px;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: center;\n            padding: 25px;\n            padding-top: 20px;\n            box-sizing: border-box;\n        }\n\n        h1,h2,h4,h5,h6,p {\n            margin-top: 0;\n            text-align: center;\n        }\n\n        p {\n          margin-bottom: 1.5em;\n        }\n\n        table p {\n          margin-bottom: 0.6em;\n        }\n\n        h5 {\n          margin-bottom: 0.6em;\n        }\n\n        h4 {\n            font-weight: 500;\n            font-size: 1.5em;\n            text-transform: uppercase;\n            margin-bottom: 2em;\n        }\n\n        div {\n            width: 100%;\n            margin-left: auto;\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n        }\n\n        button {\n            margin-bottom: 1em;\n            margin-top: 1em;\n            width: 100px;\n            height: 35px;\n            text-transform: uppercase;\n            background-color: #FBC303;\n            font-weight: 900;\n            font-family: inherit;\n            border: none;\n            border-radius: 3px;\n            vertical-align: baseline;\n            cursor: pointer;\n        }\n      \n        paper-progress {\n          width: 100vw;\n          --paper-progress-active-color: #FBC303;\n        }\n    "]);return y=function(){return e},e}function b(){var e=(0,i.default)(['\n      <tr>\n        <td>\n          <p style="text-align: left">',"</p>\n        </td>\n        <td>\n          <p>","</p>\n        </td>\n        <td>\n          <p>","</p>\n        </td>\n      </tr>\n    "]);return b=function(){return e},e}function E(){var e=(0,i.default)(["\n      <h4>Rodada ","</h4>\n      <h5>Último ganhador</h5>\n      <p>","</p>\n      <h5>Fase atual</h5>\n      <p>","</p>\n      <table>\n          <thead>\n            <tr>\n              <th><h5>Usuário</h5></th>\n              <th><h5>Enviou?</h5></th>\n              <th><h5>Votou?</h5></th>\n            </tr>\n          </thead>\n          <tbody>\n            ","\n          </tbody>\n      </table>\n    "]);return E=function(){return e},e}function x(){var e=(0,i.default)(["\n        <default-background>\n            <section>\n                ",'\n                <div>\n                  <button\n                    @click="','"\n                    ?disabled=',"\n                  >Voltar</button>\n                </div>\n            </section>\n        </default-background>\n    "]);return x=function(){return e},e}function k(){var e=(0,i.default)(['\n        <paper-progress class="blue" indeterminate></paper-progress>\n      ']);return k=function(){return e},e}function R(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,f.default)(e);if(t){var o=(0,f.default)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return(0,d.default)(this,n)}}var w=function(e){(0,c.default)(r,e);var t,n=R(r);function r(){var e;return(0,s.default)(this,r),(e=n.call(this)).isLoading=!0,e}return(0,l.default)(r,[{key:"render",value:function(){return this.isLoading?(0,h.html)(k()):(0,h.html)(x(),this.roundStatusTemplate(),this.handleGoBackClick,this.hasOngoingRequest)}},{key:"roundStatusTemplate",value:function(){return(0,h.html)(E(),this.startDate,v.store.ongoingRound.lastWinner.displayName,(0,g.hasSubmissionPeriodEnded)(v.store.ongoingRound)?"Votação":"Envio de músicas",Array.from(v.store.users.values()).map(this.tableRowTemplate))}},{key:"tableRowTemplate",value:function(e){var t=e.displayName,n=(0,g.hasUserReachedSubmissionLimit)(v.store.ongoingRound,e),r=(0,g.hasUserAlreadyEvaluated)(v.store.ongoingRound,e);return(0,h.html)(b(),t,n?"✔":"",r?"✔":"")}}],[{key:"styles",get:function(){return(0,h.css)(y())}},{key:"properties",get:function(){return{isLoading:{type:Boolean}}}}]),(0,l.default)(r,[{key:"firstUpdated",value:(t=(0,a.default)(o.default.mark((function e(t){return o.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.default)((0,f.default)(r.prototype),"firstUpdated",this).call(this,t);case 2:this.isLoading=!1;case 3:case"end":return e.stop()}}),e,this)}))),function(e){return t.apply(this,arguments)})},{key:"handleGoBackClick",value:function(){this.ownerDocument.defaultView.history.replaceState(null,"","menu")}},{key:"startDate",get:function(){return v.store.ongoingRound.submissionsStartAt.toLocaleDateString()}}]),r}((0,p.default)((0,m.default)(h.LitElement)));t.default=w,window.customElements.define("round-status-page",w)},69:function(e,t,n){"use strict";var r=n(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(e){(0,i.default)(l,e);var t,n,r=(t=l,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,u.default)(t);if(n){var o=(0,u.default)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,s.default)(this,e)});function l(){return(0,o.default)(this,l),r.apply(this,arguments)}return(0,a.default)(l,[{key:"generateAlerts",value:function(){return new Map([[this.alertCodes.HAS_NOT_VOTED,{needsErrorMessage:!1,messageGenerator:function(){return"Você só poderá ver os resultados desta rodada após votar."},onButtonClicked:this.closeModal}],[this.alertCodes.FIRST_ROUND_REACHED,{needsErrorMessage:!1,messageGenerator:function(){return"Você já viu todos os resultados disponíveis."},onButtonClicked:this.closeModal}],[this.alertCodes.EVALUATION_PERIOD_OVER,{needsErrorMessage:!1,messageGenerator:function(){return"O período para votar acabou ".concat(this.endWeekday," às ").concat(this.endTime,".")},onButtonClicked:this.goToMenu}],[this.alertCodes.EVALUATION_PERIOD_NOT_STARTED,{needsErrorMessage:!1,messageGenerator:function(){return"O período para votar começa ".concat(this.startWeekday," às ").concat(this.startTime,".")},onButtonClicked:this.goToMenu}],[this.alertCodes.ALREADY_EVALUATED,{needsErrorMessage:!1,messageGenerator:function(){return"Você já votou esta semana."},onButtonClicked:this.goToMenu}],[this.alertCodes.NO_SONGS,{needsErrorMessage:!1,messageGenerator:function(){return"Não há músicas para votar."},onButtonClicked:this.goToMenu}],[this.alertCodes.EVALUATION_FAILED,{needsErrorMessage:!1,messageGenerator:function(){return"Houve um problema ao tentar enviar seu voto. Tente novamente mais tarde."},onButtonClicked:this.closeModal}],[this.alertCodes.INVALID_SCORE,{needsErrorMessage:!1,messageGenerator:function(){return"Você não pontuou todas as músicas com um valor válido."},onButtonClicked:this.closeModal}],[this.alertCodes.VOTE_SUCCESS,{needsErrorMessage:!1,messageGenerator:function(){return"Voto enviado com sucesso!"},onButtonClicked:this.goToMenu}],[this.alertCodes.SUBMISSION_PERIOD_OVER,{needsErrorMessage:!1,messageGenerator:function(){return"O período para enviar músicas acabou ".concat(this.endWeekdayString," ").concat(this.endTimeString,".")},onButtonClicked:this.goToMenu}],[this.alertCodes.MAX_NUMBER_OF_SONGS,{needsErrorMessage:!1,messageGenerator:function(){return"Você já enviou o número máximo de músicas para esta rodada"},onButtonClicked:this.goToMenu}],[this.alertCodes.INVALID_URL,{needsErrorMessage:!1,messageGenerator:function(){return"O URL que você inseriu não é valido."},onButtonClicked:this.closeModal}],[this.alertCodes.SUBMISSION_SUCCESS,{needsErrorMessage:!1,messageGenerator:function(){return"Música enviada com sucesso! ".concat(this.userSubmissionsSent<this.userSubmissionsLimit?"Você ainda pode enviar mais uma música!":"")},onButtonClicked:this.goToMenu}],[this.alertCodes.SAVE_BOT_SETTINGS_SUCCESS,{needsErrorMessage:!1,messageGenerator:function(){return"Suas configurações do Bot foram salvas com sucesso!"},onButtonClicked:this.goToMenu}],[this.alertCodes.SAVE_BOT_SETTINGS_ERROR,{needsErrorMessage:!1,messageGenerator:function(){return"Houve um problema ao salvar as suas configurações do Bot."},onButtonClicked:this.closeModal}],[this.alertCodes.DUPLICATED_SONG,{needsErrorMessage:!1,messageGenerator:function(){return"A música que você enviou já foi enviada antes. Tente outra música."},onButtonClicked:this.closeModal}],[this.alertCodes.UNEXPECTED_ERROR_GO_MENU,{needsErrorMessage:!0,messageGenerator:function(e){return e},onButtonClicked:this.goToMenu}],[this.alertCodes.UNEXPECTED_ERROR_CLOSE_MODAL,{needsErrorMessage:!0,messageGenerator:function(e){return e},onButtonClicked:this.closeModal}]])}},{key:"openAlertModal",value:function(e,t){var n=this.generateAlerts();if(!n.has(e))throw new Error("openAlertModal: Invalid alertCode. '".concat(e,"' is not valid."));var r=n.get(e),o=r.needsErrorMessage,a=r.messageGenerator,i=r.onButtonClicked;if(o&&!t)throw new Error("openAlertModal: Can't use '".concat(e,"' alert without 'errorMessage' parameter. ")+"Please pass an errorMessage parameter.");var s=a.bind(this)(t);this.insertModalIntoShadowRoot({type:"alert",text:s,onButtonClicked:i.bind(this)})}},{key:"safeOpenAlertModal",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";try{this.openAlertModal(e,t)}catch(e){this.openAlertModal(this.alertCodes.UNEXPECTED_ERROR_GO_MENU,e.message)}}},{key:"insertModalIntoShadowRoot",value:function(e){var t=e.type,n=e.text,r=e.onButtonClicked,o=new Map([["input","input-modal"],["alert","alert-modal"]]);if(o.has(t)){var a=document.createElement(o.get(t)),i=document.createTextNode(n);return a.appendChild(i),a.addEventListener("button-clicked",(function(e){r(e)&&a.remove()})),this.shadowRoot.insertBefore(a,this.shadowRoot.firstChild),a}throw new Error("insertModalIntoShadowRoot: Invalid modal type ".concat(t,".")+"Please insert a valid modal type.")}},{key:"goToMenu",value:function(){return this.ownerDocument.defaultView.history.replaceState(null,"","menu"),!0}},{key:"closeModal",value:function(){return!0}},{key:"alertCodes",get:function(){return{HAS_NOT_VOTED:"has-not-voted",FIRST_ROUND_REACHED:"first-round-reached",EVALUATION_PERIOD_OVER:"evaluation-period-over",EVALUATION_PERIOD_NOT_STARTED:"evaluation-period-not-started",ALREADY_EVALUATED:"already-evaluated",NO_SONGS:"no-songs",EVALUATION_FAILED:"evaluation-failed",INVALID_SCORE:"invalid-score",VOTE_SUCCESS:"evaluation-success",SUBMISSION_PERIOD_OVER:"submission-period-over",MAX_NUMBER_OF_SONGS:"max-number-of-songs",INVALID_URL:"invalid-url",SUBMISSION_SUCCESS:"submission-success",DUPLICATED_SONG:"duplicated-song",UNEXPECTED_ERROR_GO_MENU:"unexpected-error-go-menu",UNEXPECTED_ERROR_CLOSE_MODAL:"unexpected-error-close-modal",SAVE_BOT_SETTINGS_ERROR:"save-bot-settings-error",SAVE_BOT_SETTINGS_SUCCESS:"save-bot-settings-success"}}}],[{key:"isPrototypeOfModalDisplayableMixin",get:function(){return!0}}]),l}(e)};var o=r(n(63)),a=r(n(64)),i=r(n(65)),s=r(n(66)),u=r(n(62))},70:function(e,t,n){"use strict";var r=n(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(67)),a=r(n(63)),i=r(n(64)),s=r(n(65)),u=r(n(66)),l=r(n(62)),c=n(68);function d(){var e=(0,o.default)(["\n            .shell {\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                justify-content: space-between;\n                box-sizing: border-box;\n            }\n            @-webkit-keyframes slide-down {\n                  0% { opacity: 0; -webkit-transform: translate(-50%, -100%); }\n                100% { opacity: 1; -webkit-transform: translate(-50%, -50%); }\n            }\n            @-moz-keyframes slide-down {\n                  0% { opacity: 0; -moz-transform: translate(-50%, -100%); }\n                100% { opacity: 1; -moz-transform: translate(-50%, -50%); }\n            }\n            .backdrop {\n                position: fixed;\n                width: 100vw;\n                height: 100vh;\n                background-color: rgba(26, 26, 26, 0.7);\n                z-index: 1000;\n            }\n\n            .modal {\n                position: fixed;\n                left: 50%;\n                top: 50%;\n                transform: translate(-50%, -50%);\n                max-width: 300px;\n                width: 70%;\n                min-height: 150px;\n                max-height: 80vh;\n                overflow-y: auto;\n                background-color: #FBFBD3;\n                z-index: 1001;\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                justify-content: space-between;\n                border-radius: 3px;\n                padding: 25px;\n                text-align: center;\n                -webkit-animation: slide-down .3s ease-out;\n                -moz-animation: slide-down .3s ease-out;\n            }\n\n            .modal button {\n                width: 100px;\n                height: 35px;\n                text-transform: uppercase;\n                background-color: #FBC303;\n                font-weight: 900;\n                font-family: inherit;\n                border: none;\n                border-radius: 3px;\n                vertical-align: baseline;\n                cursor: pointer;\n            }\n        "]);return d=function(){return e},e}function f(){var e=(0,o.default)(['\n            <div class="shell">\n                <div class="backdrop"></div>\n                <div class="modal">\n                    <p><slot></slot></p>\n                    <button @click="','">ok</button>\n                </div>\n            </div>\n        ']);return f=function(){return e},e}function h(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,l.default)(e);if(t){var o=(0,l.default)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return(0,u.default)(this,n)}}var p=function(e){(0,s.default)(n,e);var t=h(n);function n(){return(0,a.default)(this,n),t.apply(this,arguments)}return(0,i.default)(n,[{key:"handleButtonClick",value:function(){var e=new CustomEvent("button-clicked",{bubbles:!0,composed:!0});this.dispatchEvent(e)}},{key:"render",value:function(){return(0,c.html)(f(),this.handleButtonClick)}}],[{key:"styles",get:function(){return(0,c.css)(d())}}]),n}(c.LitElement);t.default=p,customElements.define("alert-modal",p)},71:function(e,t,n){var r=n(78);function o(t,n,a){return"undefined"!=typeof Reflect&&Reflect.get?e.exports=o=Reflect.get:e.exports=o=function(e,t,n){var o=r(e,t);if(o){var a=Object.getOwnPropertyDescriptor(o,t);return a.get?a.get.call(n):a.value}},o(t,n,a||t)}e.exports=o},72:function(e,t,n){"use strict";var r=n(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(67)),a=r(n(63)),i=r(n(64)),s=r(n(65)),u=r(n(66)),l=r(n(62)),c=n(68),d=r(n(73));function f(){var e=(0,o.default)(["\n        .shell {\n            position: relative;\n            box-sizing: border-box;\n            width: 100vw;\n            min-height: 100%;\n            min-width: 320px;\n            margin: 0;\n        }\n\n        .logo {\n            width: 160px;\n            height: 72px;\n            cursor: pointer;\n        }\n\n        router-link:active, router-link:focus {\n            border: none;\n            outline: none;\n        }\n\n        header {\n            z-index: 20;\n            position: fixed;\n            width: 100%;\n            height: 72px;\n            background-color: #FBC303;\n        }\n\n        header, section {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: space-between;\n        }\n\n        .yellow {\n            position: absolute;\n            z-index: -1;\n            top: 0;\n            left: 0;\n            right: 0;\n            margin: 0 auto;\n            width: 100%;\n            /* max-width: 600px; */\n            height: 30%;\n            max-height: 200px;\n            background-color: #FBC303;\n        }\n        .grey {\n            position: fixed;\n            z-index: -2;\n            top: 0;\n            left: 0;\n            right: 0;\n            margin: 0 auto;\n            width: 100%;\n            /* max-width: 600px; */\n            height: 100%;\n            background-color: #CCCCCC;\n        }\n\n        ::slotted(*:nth-of-type(1)){\n            margin-top: 100px;\n        }\n\n        ::slotted(*) {\n            position: relative;\n            z-index: 19;\n        }\n\n    "]);return f=function(){return e},e}function h(){var e=(0,o.default)(['\n        <section class="shell">\n            <header>\n                <router-link path="menu">\n                    <img class="logo" src=',' alt="song ballot"/>\n                </router-link>\n            </header>\n            <section class="yellow"></section>\n            <section class="grey"></section>\n            <slot></slot>\n        </section>\n    ']);return h=function(){return e},e}function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,l.default)(e);if(t){var o=(0,l.default)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return(0,u.default)(this,n)}}var m=function(e){(0,s.default)(n,e);var t=p(n);function n(){return(0,a.default)(this,n),t.apply(this,arguments)}return(0,i.default)(n,[{key:"render",value:function(){return(0,c.html)(h(),d.default)}}],[{key:"styles",get:function(){return(0,c.css)(f())}}]),n}(c.LitElement);t.default=m,window.customElements.define("default-background",m)},73:function(e,t,n){"use strict";n.r(t),t.default=n.p+"images/horizontal-logo.png"},74:function(e,t,n){"use strict";n.r(t),n.d(t,"observer",(function(){return o}));var r=n(1);function o(e){return class extends e{update(...e){let t;return this._mobxReaction.track(()=>{t=super.update(...e)}),t}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._mobxReaction=new r.c((this.constructor.name||this.nodeName)+".update()",()=>this.requestUpdate()),this.hasUpdated&&this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this._mobxReaction.dispose()}}}},75:function(e,t,n){"use strict";var r=n(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=(0,f.observer)(e);return function(e){(0,l.default)(m,e);var t,n,r,f,p=(t=m,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,d.default)(t);if(n){var o=(0,d.default)(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return(0,c.default)(this,e)});function m(){return(0,i.default)(this,m),p.apply(this,arguments)}return(0,s.default)(m,[{key:"firstUpdated",value:(f=(0,a.default)(o.default.mark((function e(t){return o.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((0,u.default)((0,d.default)(m.prototype),"firstUpdated",this).call(this,t),h.store.ongoingRound){e.next=4;break}return e.next=4,this.refreshOngoingRound();case 4:case"end":return e.stop()}}),e,this)}))),function(e){return f.apply(this,arguments)})},{key:"refreshOngoingRound",value:(r=(0,a.default)(o.default.mark((function e(){return o.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.store.loadOngoingRound();case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),this.safeOpenAlertModal(this.alertCodes.UNEXPECTED_ERROR_GO_MENU,"Ocorreu um erro ao carregar a rodada atual: ".concat(e.t0.message));case 8:case"end":return e.stop()}}),e,this,[[0,5]])}))),function(){return r.apply(this,arguments)})}]),m}(e.isPrototypeOfModalDisplayableMixin?t:(0,p.default)(t))};var o=r(n(18)),a=r(n(19)),i=r(n(63)),s=r(n(64)),u=r(n(71)),l=r(n(65)),c=r(n(66)),d=r(n(62)),f=n(74),h=n(29),p=r(n(69))},77:function(e,t,n){"use strict";var r=n(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(67)),a=r(n(63)),i=r(n(64)),s=r(n(65)),u=r(n(66)),l=r(n(62)),c=n(68);function d(){var e=(0,o.default)(["\n        .shell {\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          justify-content: space-between;\n          box-sizing: border-box;\n        }\n        @-webkit-keyframes slide-down {\n            0% { opacity: 0; -webkit-transform: translate(-50%, -100%); }\n          100% { opacity: 1; -webkit-transform: translate(-50%, -50%); }\n        }\n        @-moz-keyframes slide-down {\n            0% { opacity: 0; -moz-transform: translate(-50%, -100%); }\n          100% { opacity: 1; -moz-transform: translate(-50%, -50%); }\n        }\n        .backdrop {\n          position: fixed;\n          width: 100vw;\n          height: 100vh;\n          background-color: rgba(26, 26, 26, 0.7);\n          z-index: 1000;\n        }\n\n        .modal {\n          position: fixed;\n          left: 50%;\n          top: 50%;\n          transform: translate(-50%, -50%);\n          max-width: 300px;\n          width: 70%;\n          min-height: 200px;\n          max-height: 80vh;\n          overflow-y: auto;\n          background-color: #FBFBD3;\n          z-index: 1001;\n          display: flex;\n          flex-direction: column;\n          align-items: center;\n          justify-content: space-between;\n          border-radius: 3px;\n          padding: 25px;\n          text-align: center;\n          -webkit-animation: slide-down .3s ease-out;\n          -moz-animation: slide-down .3s ease-out;\n        }\n\n        .modal button {\n          width: 100px;\n          height: 35px;\n          text-transform: uppercase;\n          background-color: #FBC303;\n          font-weight: 900;\n          font-family: inherit;\n          border: none;\n          border-radius: 3px;\n          vertical-align: baseline;\n          cursor: pointer;\n        }\n\n        input {\n          height: 1.5em;\n          width: calc(100% - 4px);\n          border-radius: 3px;\n          margin-bottom: 1em;\n          font-family: inherit;\n          border-style: solid;\n          border-width: 1px;\n          font-size: 1em;\n          background-color: #F2F2F2;\n        }\n    "]);return d=function(){return e},e}function f(){var e=(0,o.default)(['\n            <div class="shell" >\n                <div class="backdrop"></div>\n                <div class="modal">\n                    <p><slot></slot></p>\n                    <input type="text" @input="','"/>\n                    <button @click="','">ok</button>\n                </div>\n            </div>\n        ']);return f=function(){return e},e}function h(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,l.default)(e);if(t){var o=(0,l.default)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return(0,u.default)(this,n)}}var p=function(e){(0,s.default)(n,e);var t=h(n);function n(){return(0,a.default)(this,n),t.apply(this,arguments)}return(0,i.default)(n,[{key:"handleClick",value:function(){var e=new CustomEvent("button-clicked",{detail:{inputText:this.inputText},bubbles:!0,composed:!0});this.dispatchEvent(e)}},{key:"handleTextInput",value:function(e){this.inputText=e.target.value}},{key:"render",value:function(){return(0,c.html)(f(),this.handleTextInput,this.handleClick)}}],[{key:"styles",get:function(){return(0,c.css)(d())}}]),n}(c.LitElement);t.default=p,customElements.define("input-modal",p)},78:function(e,t,n){var r=n(62);e.exports=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=r(e)););return e}},90:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.canUserSeePartialResults=t.canUserEvaluate=t.canUserSendSong=t.shouldFinishRound=t.shouldStartRoundEvaluationPeriod=t.generateNewRoundPayload=t.hasUserReachedSubmissionLimit=t.hasUserAlreadyEvaluated=t.getUserSubmissionsCount=t.isLastWinner=t.hasEvaluationsPeriodEnded=t.hasEvaluationsPeriodStarted=t.hasSubmissionPeriodStarted=t.hasSubmissionPeriodEnded=void 0;var r=n(91),o=n(92),a=function(e){return(0,o.now)()>e.submissionsEndAt};t.hasSubmissionPeriodEnded=a;var i=function(e){return(0,o.now)()>e.submissionsStartAt};t.hasSubmissionPeriodStarted=i;var s=function(e){return(0,o.now)()>e.evaluationsStartAt};t.hasEvaluationsPeriodStarted=s;var u=function(e){return(0,o.now)()>e.evaluationsEndAt};t.hasEvaluationsPeriodEnded=u;var l=function(e,t){return e.lastWinner.id===t.id};t.isLastWinner=l;var c=function(e,t){return Array.from(e.submissions.values()).filter((function(e){return e.submitter.id===t.id})).length};t.getUserSubmissionsCount=c;var d=function(e,t){return Array.from(e.evaluations.values()).some((function(e){return e.evaluator.id===t.id}))};t.hasUserAlreadyEvaluated=d;var f=function(e,t){var n=c(e,t);return l(e,t)?n>=2:n>=1};t.hasUserReachedSubmissionLimit=f;t.generateNewRoundPayload=function(e){var t=e.users,n=e.lastWinner,r=e.timestampGenerator;return{submissionsStartAt:r(),submissionsEndAt:r((0,o.getDayOfNextWeekWithTime)("tuesday",15,0,0)),evaluationsStartAt:r((0,o.getDayOfNextWeekWithTime)("tuesday",15,0,1)),evaluationsEndAt:r((0,o.getDayOfNextWeekWithTime)("sunday",23,0,0)),submissions:[],evaluations:[],songs:[],users:t||[],lastWinner:n,voteCount:0}};t.shouldStartRoundEvaluationPeriod=function(e){var t=e.users,n=e.submissions,r=e.lastWinner;return t.length+(r?1:0)===n.length};t.shouldFinishRound=function(e){var t=e.users,n=e.voteCount;return t.length===n};var h=(0,r.and)(i,(0,r.not)(a),(0,r.not)(f));t.canUserSendSong=h;var p=(0,r.and)(s,(0,r.not)(u),(0,r.not)(d));t.canUserEvaluate=p;var m=d;t.canUserSeePartialResults=m},91:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.and=t.not=void 0;t.not=function(e){return function(){return!e.apply(void 0,arguments)}};t.and=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return t.every((function(e){return Boolean(e.apply(void 0,n))}))}}},92:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.now=t.getDayOfNextWeekWithTime=t.getNextDayOfWeek=void 0;var r=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:new Date,r=["sun","mon","tue","wed","thu","fri","sat"].indexOf(e.slice(0,3).toLowerCase());return r<0?null:(n.setHours(0,0,0,0),n.setDate(n.getDate()+!!t+(r+7-n.getDay()-!!t)%7),n)};t.getNextDayOfWeek=r;t.getDayOfNextWeekWithTime=function(e,t,n,o){var a=r("sunday",!1),i=r(e,!0,a);return i.setHours(t,n,o),i};t.now=function(){return Date.now()}}}]);