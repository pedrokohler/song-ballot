(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{56:function(e,t,n){"use strict";var r=n(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(65)),o=r(n(61)),i=r(n(62)),s=r(n(63)),u=r(n(64)),c=r(n(60)),l=n(66);n(72),n(70),n(68),n(78);var d=r(n(71)),f=r(n(69)),h=r(n(86)),v=n(19);function m(){var e=(0,a.default)(["\n        .shell {\n            border-radius: 3px;\n            min-height: 200px;\n            height: inherit;\n            width: 90%;\n            min-width: 300px;\n            max-width: 600px;\n            background-color: #FFFFFF;\n            margin-bottom: 20px;\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            justify-content: space-between;\n            padding: 25px;\n            padding-top: 20px;\n            box-sizing: border-box;\n        }\n\n        h1,h2,h3,h4,h5,h6,p {\n            margin-top: 0;\n            margin-bottom: 0.6em;\n            text-align: center;\n        }\n\n        h3, div {\n            margin-right: auto;\n        }\n\n        hr {\n            border: none;\n            width: 85%;\n            height: 1px;\n            margin-bottom: 20px;\n            background-color: rgba(0, 0, 0, 0.2);\n        }\n\n        h4 {\n            font-weight: 500;\n            text-transform: uppercase;\n        }\n\n        .song-title {\n            text-transform: none;\n            margin-right: auto;\n        }\n\n        div h4 {\n            margin-bottom: 0;\n            text-transform: none;\n        }\n\n        div h6 {\n            margin-top: 0;\n            font-weight: 400;\n            text-align: left;\n            margin-bottom: 1em;\n        }\n\n        input[type=number] {\n            height: 1.5em;\n            width: 120px;\n            border-radius: 3px;\n            margin-bottom: 1em;\n            font-family: inherit;\n            border-style: solid;\n            border-width: 1px;\n            font-size: 1em;\n            background-color: #F2F2F2;\n            text-align: center;\n        }\n\n        label {\n          font-size: 0.75em;\n          margin-bottom: 1em;\n          display: inline-flex;\n          align-items: center;\n        }\n\n        iframe {\n            width: 100%;\n            height: 300px;\n            max-height: 50%;\n            margin-bottom: 1em;\n        }\n\n        paper-progress {\n            width: 100vw;\n            --paper-progress-active-color: #FBC303;\n        }\n    "]);return m=function(){return e},e}function g(){var e=(0,a.default)(["\n        <label>","</label>\n        <label>Nota ","</label>\n        <label>","</label>\n        <hr/>\n      "]);return g=function(){return e},e}function p(){var e=(0,a.default)(["\n      ",'\n      <navigation-buttons\n        forwardArrowsAlt="confirmar voto"\n        forwardArrowsLabel="confirmar"\n        ?forwardArrowsDisabled="','"\n        @forward-arrows-clicked="','"\n\n        backwardArrowsAlt="voltar à votação"\n        ?backwardArrowsDisabled="','"\n        @backward-arrows-clicked="','"\n      >\n      </navigation-buttons>\n    ']);return p=function(){return e},e}function b(){var e=(0,a.default)(['\n        <navigation-buttons\n          forwardArrowsAlt="ir para próxima música"\n          ?forwardArrowsDisabled="','"\n          forwardArrowsLabel="próxima"\n          @forward-arrows-clicked="','"\n\n          backwardArrowsAlt="ir para música anterior"\n          forwardArrowsLabel="anterior"\n          ?backwardArrowsDisabled="','"\n          @backward-arrows-clicked="','"\n        >\n        </navigation-buttons>\n      ']);return b=function(){return e},e}function y(){var e=(0,a.default)(['\n        <navigation-buttons\n          forwardArrowsAlt="ver resumo das notas"\n          forwardArrowsLabel="resumo"\n          ?forwardArrowsDisabled="','"\n          @forward-arrows-clicked="','"\n\n          backwardArrowsAlt="ir para música anterior"\n          ?backwardArrowsDisabled="','"\n          @backward-arrows-clicked="','"\n        >\n        </navigation-buttons>\n      ']);return y=function(){return e},e}function w(){var e=(0,a.default)(['\n        <h4 class="song-title">',"</h4>\n        <iframe src=",' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n        <input\n            type="number" max='," min=","\n            @input=","\n            .value=",'\n        />\n        <label>\n          <input\n            type="checkbox"\n            @change=',"\n            .checked=","\n          />\n          Eu já escutei essa música\n        </label>\n        ","\n      "]);return w=function(){return e},e}function S(){var e=(0,a.default)([""]);return S=function(){return e},e}function k(){var e=(0,a.default)(['\n        <default-background>\n            <section class="shell">\n                <h3>Votar</h3>\n                <h4>Semana ',"</h4>\n                <p>O limite para votação é até "," de ","</p>\n                <hr/>\n                ","\n            </section>\n        </default-background>\n    "]);return k=function(){return e},e}function I(){var e=(0,a.default)(['\n        <paper-progress class="blue" indeterminate></paper-progress>\n      ']);return I=function(){return e},e}function E(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,c.default)(e);if(t){var a=(0,c.default)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,u.default)(this,n)}}var A=function(e){(0,s.default)(n,e);var t=E(n);function n(){return(0,o.default)(this,n),t.apply(this,arguments)}return(0,i.default)(n,[{key:"render",value:function(){return this.isLoading?(0,l.html)(I()):(0,l.html)(k(),this.roundStartDate,this.endTime,this.endWeekday,this.showOverview?this.overviewTemplate():this.videoTemplate())}},{key:"videoTemplate",value:function(){return this.currentSubmission?(0,l.html)(w(),this.currentSubmission.song.title,this.currentSubmission.song.url,v.MAX_SCORE_ALLOWED,v.MIN_SCORE_ALLOWED,this.handleScoreInput,this.score,this.handleIsFamousInput,this.isFamous,this.videoTemplateNavigation()):(0,l.html)(S())}},{key:"videoTemplateNavigation",value:function(){var e=this;return this.submissionIndex>=this.submissions.length-1?(0,l.html)(y(),!1,(function(){e.showOverview=!0}),this.submissionIndex<=0,(function(){e.submissionIndex-=1})):(0,l.html)(b(),!1,(function(){e.submissionIndex+=1}),this.submissionIndex<=0,(function(){e.submissionIndex-=1}))}},{key:"overviewTemplate",value:function(){var e=this;return(0,l.html)(p(),this.submissions.map((function(t){var n;return(0,l.html)(g(),null===(n=t.song)||void 0===n?void 0:n.title,e.getScoreFromLocalStorage(null==t?void 0:t.id)||"inválida","true"===e.getIsFamousFromLocalStorage(null==t?void 0:t.id)?"Famosa":"")})),this.hasOngoingRequest,this.handleConfirmationClick.bind(this),this.hasOngoingRequest,(function(){e.showOverview=!1}))}}],[{key:"styles",get:function(){return(0,l.css)(m())}}]),n}((0,h.default)((0,f.default)((0,d.default)(l.LitElement))));t.default=A,window.customElements.define("vote-page",A)},76:function(e,t,n){var r=n(30),a=n(77),o=n(23),i=n(31);e.exports=function(e,t){return r(e)||a(e,t)||o(e,t)||i()}},77:function(e,t){e.exports=function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var i,s=e[Symbol.iterator]();!(r=(i=s.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==s.return||s.return()}finally{if(a)throw o}}return n}}},86:function(e,t,n){"use strict";var r=n(5);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(e){(0,d.default)(k,e);var t,n,r,b,y,w,S=(t=k,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,h.default)(t);if(n){var a=(0,h.default)(this).constructor;e=Reflect.construct(r,arguments,a)}else e=r.apply(this,arguments);return(0,f.default)(this,e)});function k(){var e;return(0,u.default)(this,k),(e=S.call(this)).window=e.ownerDocument.defaultView,e.hasOngoingRequest=!1,e.isLoading=!0,e.showOverview=!1,e.roundStartDate="",e.endTime="",e.endWeekday="",e}return(0,l.default)(k,null,[{key:"properties",get:function(){return{isLoading:{type:Boolean},hasOngoingRequest:{type:Boolean},submissionIndex:{type:Number},score:{type:Number},isFamous:{type:Boolean},showOverview:{type:Boolean}}}}]),(0,l.default)(k,[{key:"firstUpdated",value:(w=(0,s.default)(i.default.mark((function e(t){return i.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,c.default)((0,h.default)(k.prototype),"firstUpdated",this).call(this,t);case 2:this.setupAndCheckPageBasedOnOngoingRound(),this.isLoading=!1;case 4:case"end":return e.stop()}}),e,this)}))),function(e){return w.apply(this,arguments)})},{key:"setupAndCheckPageBasedOnOngoingRound",value:function(){var e=g.store.ongoingRound,t=e.submissionsStartAt,n=e.evaluationsStartAt,r=e.evaluationsEndAt;this.setDateStrings({submissionsStartAt:t,evaluationsStartAt:n,evaluationsEndAt:r});var a=this.checkForErrors(this.getCheckFunctionsMap());return a?(this.safeOpenAlertModal(a),a):(this.onInitialChecksPassed(),null)}},{key:"onInitialChecksPassed",value:function(){this.setSubmissions(),this.submissionIndex=0}},{key:"getCheckFunctionsMap",value:function(){var e=g.store.ongoingRound,t=e.evaluationsStartAt,n=e.evaluationsEndAt,r=this.getOtherUsersSubmissions(g.store.currentUser,g.store.submissions);return new Map([[this.hasEvaluationPeriodEnded(n),this.alertCodes.EVALUATION_PERIOD_OVER],[this.isBeforeEvaluationPeriodStarted(t),this.alertCodes.EVALUATION_PERIOD_NOT_STARTED],[this.hasUserAlreadyEvaluated(g.store.currentUser,g.store.ongoingRound.evaluations),this.alertCodes.ALREADY_EVALUATED],[this.hasNoOtherSubmissions(r),this.alertCodes.NO_SONGS]])}},{key:"checkForErrors",value:function(e){var t=Array.from(e.entries()).find((function(e){return!0===(0,(0,o.default)(e,1)[0])()}))||[];return(0,o.default)(t,2)[1]}},{key:"setDateStrings",value:function(e){var t=e.submissionsStartAt,n=e.evaluationsStartAt,r=e.evaluationsEndAt;this.roundStartDate=t.toLocaleDateString(),this.endTime=r.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),this.startTime=n.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),this.endWeekday=r.toLocaleString(void 0,{weekday:"long"}),this.startWeekday=n.toLocaleString(void 0,{weekday:"long"})}},{key:"hasEvaluationPeriodEnded",value:function(e){return function(){return Date.now()>e}}},{key:"isBeforeEvaluationPeriodStarted",value:function(e){return function(){return Date.now()<e}}},{key:"hasUserAlreadyEvaluated",value:function(e,t){return function(){return Array.from(t.values()).some((function(t){return t.evaluator.id===e.id}))}}},{key:"hasNoOtherSubmissions",value:function(e){return function(){return 0===e.length}}},{key:"getOtherUsersSubmissions",value:function(e,t){return Array.from(t.values()).filter((function(t){return t.submitter.id!==e.id}))}},{key:"setSubmissions",value:function(){var e;this.submissions=(e=this.getOtherUsersSubmissions(g.store.currentUser,g.store.ongoingRound.submissions)).reduceRight((function(e,t,n){var r=Math.floor(Math.random()*(n+1)),a=[e[r],e[n]];return e[n]=a[0],e[r]=a[1],e}),e)}},{key:"refreshScreenSubmissionEvaluation",value:function(){var e,t=((null===(e=this.submissions)||void 0===e?void 0:e[this.submissionIndex])||{}).id;this.score=this.getScore(t),this.isFamous=this.getIsFamous(t)}},{key:"updated",value:function(e){e.has("submissionIndex")&&this.refreshScreenSubmissionEvaluation()}},{key:"getScore",value:function(e){return this.getScoreFromLocalStorage(e)||""}},{key:"getScoreLocalStorageKey",value:function(e){return"".concat(e,"-").concat(g.store.currentUser.id,"-score")}},{key:"getIsFamousLocalStorageKey",value:function(e){return"".concat(e,"-").concat(g.store.currentUser.id,"-is-famous")}},{key:"getScoreFromLocalStorage",value:function(e){var t=this.window.localStorage.getItem(this.getScoreLocalStorageKey(e));return Number(t)}},{key:"getIsFamous",value:function(e){return"true"===this.getIsFamousFromLocalStorage(e)}},{key:"getIsFamousFromLocalStorage",value:function(e){return this.window.localStorage.getItem(this.getIsFamousLocalStorageKey(e))}},{key:"handleIsFamousInput",value:function(e){var t=e.target.checked;this.setCurrentIsFamousInMemory(t),this.setCurrentIsFamousInLocalStorage(t)}},{key:"setCurrentIsFamousInLocalStorage",value:function(e){this.window.localStorage.setItem(this.getIsFamousLocalStorageKey(this.currentSubmission.id),e)}},{key:"setCurrentIsFamousInMemory",value:function(e){this.isFamous=e}},{key:"handleScoreInput",value:function(e){var t=e.target.value,n=this.formatScoreValue(t);this.setCurrentScoreInMemory(n),this.setCurrentScoreInLocalStorage(n),this.setCurrentScoreInInputField(e,n)}},{key:"setCurrentScoreInLocalStorage",value:function(e){this.window.localStorage.setItem(this.getScoreLocalStorageKey(this.currentSubmission.id),e)}},{key:"setCurrentScoreInInputField",value:function(e,t){e.target.value=t}},{key:"setCurrentScoreInMemory",value:function(e){this.score=e}},{key:"formatScoreValue",value:function(e){return this.isScoreInputAllowed(e)?e:(0,p.adjustScoreValue)(e)}},{key:"isScoreInputAllowed",value:function(e){return(0,p.isValidScore)(e)||""===e}},{key:"handleConfirmationClick",value:(y=(0,s.default)(i.default.mark((function e(){return i.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.hasOngoingRequest=!0,e.next=3,this.refreshOngoingRound();case 3:if(!this.setupAndCheckPageBasedOnOngoingRound()){e.next=7;break}return this.runPostTransactionCleanup(),e.abrupt("return");case 7:return e.next=9,this.handleEvaluation();case 9:this.hasOngoingRequest=!1;case 10:case"end":return e.stop()}}),e,this)}))),function(){return y.apply(this,arguments)})},{key:"handleEvaluation",value:(b=(0,s.default)(i.default.mark((function e(){var t,n,r,a;return i.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=this.getSanitizedEvaluationsPayload(),n=t.map((function(e){return e.id})),r=this.submissions.map((function(e){return e.id})),a=this.getRoundReference(g.store.ongoingRound.id),e.next=7,m.db.runTransaction(this.evaluationTransaction({roundReference:a,submissionsIds:r,evaluationsIds:n,evaluations:t}));case 7:this.updateStore(t),this.runPostTransactionCleanup(),this.safeOpenAlertModal(this.alertCodes.VOTE_SUCCESS),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),this.checkAndTreatEvaluationError(e.t0);case 15:case"end":return e.stop()}}),e,this,[[0,12]])}))),function(){return b.apply(this,arguments)})},{key:"checkAndTreatEvaluationError",value:function(e){this.isScoreError(e)?this.safeOpenAlertModal(this.alertCodes.INVALID_SCORE):this.safeOpenAlertModal(this.alertCodes.UNEXPECTED_ERROR_CLOSE_MODAL,e.message)}},{key:"isScoreError",value:function(e){return e.message.indexOf("/score")>0}},{key:"getSanitizedEvaluationsPayload",value:function(){var e=this;return this.submissions.map((function(t){var n=g.store.createEvaluationModel({submission:t,score:e.getScore(t.id),ratedFamous:e.getIsFamous(t.id)});return(0,v.getSnapshot)(n)}))}},{key:"updateStore",value:function(e){this.submissions.forEach((function(t){var n=e.find((function(e){return e.song===t.song.id})),r=g.store.addEvaluation(n);t.addEvaluation(r.id),g.store.ongoingRound.addEvaluation(r.id)}))}},{key:"evaluationTransaction",value:function(e){var t=this,n=e.roundReference,r=e.submissionsIds,a=e.evaluations,o=e.evaluationsIds;return function(){var e=(0,s.default)(i.default.mark((function e(s){var u,c,l;return i.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.getSubmissionsAndRoundData({roundReference:n,submissionsIds:r,transaction:s});case 3:return u=e.sent,c=u.round,l=u.roundEvaluations,u.submissions.forEach(t.persistEvaluationAndUpdateSubmission({evaluations:a,transaction:s})),e.next=10,t.persistUpdatedRound({round:c,roundReference:n,roundEvaluations:l,evaluationsIds:o,transaction:s});case 10:e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),t.safeOpenAlertModal(t.alertCodes.EVALUATION_FAILED);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}()}},{key:"getSubmissionsAndRoundData",value:(r=(0,s.default)(i.default.mark((function e(t){var n,r,a,o,s,u;return i.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.roundReference,r=t.submissionsIds,a=t.transaction,e.next=3,a.get(n);case 3:return o=e.sent,s=o.data().evaluations||[],e.next=7,this.getSubmissions({submissionsIds:r,transaction:a});case 7:return u=e.sent,e.abrupt("return",{round:o,roundEvaluations:s,submissions:u});case 9:case"end":return e.stop()}}),e,this)}))),function(e){return r.apply(this,arguments)})},{key:"persistEvaluationAndUpdateSubmission",value:function(e){var t=this,n=e.evaluations,r=e.transaction;return function(){var e=(0,s.default)(i.default.mark((function e(a){var o,s,u,c;return i.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=a.data(),s=o.evaluations,u=n.find((function(e){return e.song===o.song})),c=t.getEvaluationReference(u.id),e.next=6,t.persistUpdatedSubmission({submission:a,oldSubmissionEvaluationsIds:s,newSubmissionEvaluation:u,transaction:r});case 6:return e.next=8,t.persistEvaluation({evaluation:u,evaluationReference:c,transaction:r});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}},{key:"getSubmissions",value:function(e){var t=this,n=e.submissionsIds,r=e.transaction;return Promise.all(n.map(function(){var e=(0,s.default)(i.default.mark((function e(n){var a,o;return i.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.getSubmissionReference(n),o=r.get(a),e.abrupt("return",o);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))}},{key:"persistUpdatedSubmission",value:function(e){var t=e.submission,n=e.oldSubmissionEvaluationsIds,r=e.newSubmissionEvaluation;return e.transaction.update(t.ref.parent.doc(t.id),{evaluations:[].concat((0,a.default)(n),[r.id])})}},{key:"persistEvaluation",value:function(e){var t=e.evaluation,n=e.evaluationReference;return e.transaction.set(n,t)}},{key:"persistUpdatedRound",value:function(e){var t=e.round,n=e.roundReference,r=e.roundEvaluations,o=e.evaluationsIds;return e.transaction.update(n,{evaluations:[].concat((0,a.default)(r),(0,a.default)(o)),voteCount:t.data().voteCount+1})}},{key:"runPostTransactionCleanup",value:function(){var e=this;this.submissions.forEach((function(t){e.window.localStorage.removeItem(e.getScoreLocalStorageKey(t.id)),e.window.localStorage.removeItem(e.getIsFamousLocalStorageKey(t.id))}))}},{key:"getEvaluationReference",value:function(e){return this.groupReference.collection("evaluations").doc(e).withConverter(m.DateConverter)}},{key:"getSubmissionReference",value:function(e){return this.groupReference.collection("submissions").doc(e).withConverter(m.DateConverter)}},{key:"getRoundReference",value:function(e){return this.groupReference.collection("rounds").doc(e).withConverter(m.DateConverter)}},{key:"groupReference",get:function(){return m.db.collection("groups").doc(g.store.currentGroup)}},{key:"currentSubmission",get:function(){var e;return null===(e=this.submissions)||void 0===e?void 0:e[this.submissionIndex]}}]),k}(e)};var a=r(n(13)),o=r(n(76)),i=r(n(18)),s=r(n(21)),u=r(n(61)),c=r(n(67)),l=r(n(62)),d=r(n(63)),f=r(n(64)),h=r(n(60)),v=n(6),m=n(22),g=n(29),p=n(19)}}]);