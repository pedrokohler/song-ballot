/*! For license information please see 1.d9d27cc26d2dbb355274.bundle.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{65:function(e,t){function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}e.exports=function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}},68:function(e,t){e.exports=function(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}},77:function(e,t,r){"use strict";r.r(t);const n=!(window.ShadyDOM&&window.ShadyDOM.inUse);let i,s;function o(e){i=(!e||!e.shimcssproperties)&&(n||Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)")))}window.ShadyCSS&&void 0!==window.ShadyCSS.cssBuild&&(s=window.ShadyCSS.cssBuild);const a=Boolean(window.ShadyCSS&&window.ShadyCSS.disableRuntime);window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?i=window.ShadyCSS.nativeCss:window.ShadyCSS?(o(window.ShadyCSS),window.ShadyCSS=void 0):o(window.WebComponents&&window.WebComponents.flags);const l=i;class p{constructor(){this.start=0,this.end=0,this.previous=null,this.parent=null,this.rules=null,this.parsedCssText="",this.cssText="",this.atRule=!1,this.type=0,this.keyframesName="",this.selector="",this.parsedSelector=""}}function d(e){return function e(t,r){let n=r.substring(t.start,t.end-1);if(t.parsedCssText=t.cssText=n.trim(),t.parent){let e=t.previous?t.previous.end:t.parent.start;n=r.substring(e,t.start-1),n=function(e){return e.replace(/\\([0-9a-f]{1,6})\s/gi,(function(){let e=arguments[1],t=6-e.length;for(;t--;)e="0"+e;return"\\"+e}))}(n),n=n.replace(f.multipleSpaces," "),n=n.substring(n.lastIndexOf(";")+1);let i=t.parsedSelector=t.selector=n.trim();t.atRule=0===i.indexOf(g),t.atRule?0===i.indexOf(y)?t.type=h.MEDIA_RULE:i.match(f.keyframesRule)&&(t.type=h.KEYFRAMES_RULE,t.keyframesName=t.selector.split(f.multipleSpaces).pop()):0===i.indexOf(m)?t.type=h.MIXIN_RULE:t.type=h.STYLE_RULE}let i=t.rules;if(i)for(let t,n=0,s=i.length;n<s&&(t=i[n]);n++)e(t,r);return t}(function(e){let t=new p;t.start=0,t.end=e.length;let r=t;for(let n=0,i=e.length;n<i;n++)if(e[n]===u){r.rules||(r.rules=[]);let e=r,t=e.rules[e.rules.length-1]||null;r=new p,r.start=n+1,r.parent=e,r.previous=t,e.rules.push(r)}else e[n]===_&&(r.end=n+1,r=r.parent||t);return t}(e=e.replace(f.comments,"").replace(f.port,"")),e)}function c(e,t,r=""){let n="";if(e.cssText||e.rules){let r=e.rules;if(r&&!function(e){let t=e[0];return Boolean(t)&&Boolean(t.selector)&&0===t.selector.indexOf(m)}(r))for(let e,i=0,s=r.length;i<s&&(e=r[i]);i++)n=c(e,t,n);else n=t?e.cssText:function(e){return function(e){return e.replace(f.mixinApply,"").replace(f.varApply,"")}(e=function(e){return e.replace(f.customProp,"").replace(f.mixinProp,"")}(e))}(e.cssText),n=n.trim(),n&&(n="  "+n+"\n")}return n&&(e.selector&&(r+=e.selector+" "+u+"\n"),r+=n,e.selector&&(r+=_+"\n\n")),r}const h={STYLE_RULE:1,KEYFRAMES_RULE:7,MEDIA_RULE:4,MIXIN_RULE:1e3},u="{",_="}",f={comments:/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,port:/@import[^;]*;/gim,customProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,mixinProp:/(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,mixinApply:/@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,varApply:/[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,keyframesRule:/^@[^\s]*keyframes/,multipleSpaces:/\s+/g},m="--",y="@media",g="@",b=/(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,w=/(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,P=/@media\s(.*)/,v=new Set;function C(e){const t=e.textContent;if(!v.has(t)){v.add(t);const e=document.createElement("style");e.setAttribute("shady-unscoped",""),e.textContent=t,document.head.appendChild(e)}}function S(e){return e.hasAttribute("shady-unscoped")}function x(e,t){return e?("string"==typeof e&&(e=d(e)),t&&O(e,t),c(e,l)):""}function E(e){return!e.__cssRules&&e.textContent&&(e.__cssRules=d(e.textContent)),e.__cssRules||null}function O(e,t,r,n){if(!e)return;let i=!1,s=e.type;if(n&&s===h.MEDIA_RULE){let t=e.selector.match(P);t&&(window.matchMedia(t[1]).matches||(i=!0))}s===h.STYLE_RULE?t(e):r&&s===h.KEYFRAMES_RULE?r(e):s===h.MIXIN_RULE&&(i=!0);let o=e.rules;if(o&&!i)for(let e,i=0,s=o.length;i<s&&(e=o[i]);i++)O(e,t,r,n)}function T(e,t){let r=0;for(let n=t,i=e.length;n<i;n++)if("("===e[n])r++;else if(")"===e[n]&&0==--r)return n;return-1}window.ShadyDOM&&window.ShadyDOM.wrap;function A(e){if(void 0!==s)return s;if(void 0===e.__cssBuild){const t=e.getAttribute("css-build");if(t)e.__cssBuild=t;else{const t=function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;if(t instanceof Comment){const e=t.textContent.trim().split(":");if("css-build"===e[0])return e[1]}return""}(e);""!==t&&function(e){const t="template"===e.localName?e.content.firstChild:e.firstChild;t.parentNode.removeChild(t)}(e),e.__cssBuild=t}}return e.__cssBuild||""}function N(e){return""!==A(e)}function k(e,t){for(let r in t)null===r?e.style.removeProperty(r):e.style.setProperty(r,t[r])}function I(e,t){const r=window.getComputedStyle(e).getPropertyValue(t);return r?r.trim():""}const M=/;\s*/m,D=/^\s*(initial)|(inherit)\s*$/,R=/\s*!important/;class L{constructor(){this._map={}}set(e,t){e=e.trim(),this._map[e]={properties:t,dependants:{}}}get(e){return e=e.trim(),this._map[e]||null}}let F=null;class H{constructor(){this._currentElement=null,this._measureElement=null,this._map=new L}detectMixin(e){return function(e){const t=w.test(e)||b.test(e);return w.lastIndex=0,b.lastIndex=0,t}(e)}gatherStyles(e){const t=function(e){const t=[],r=e.querySelectorAll("style");for(let e=0;e<r.length;e++){const i=r[e];S(i)?n||(C(i),i.parentNode.removeChild(i)):(t.push(i.textContent),i.parentNode.removeChild(i))}return t.join("").trim()}(e.content);if(t){const r=document.createElement("style");return r.textContent=t,e.content.insertBefore(r,e.content.firstChild),r}return null}transformTemplate(e,t){void 0===e._gatheredStyle&&(e._gatheredStyle=this.gatherStyles(e));const r=e._gatheredStyle;return r?this.transformStyle(r,t):null}transformStyle(e,t=""){let r=E(e);return this.transformRules(r,t),e.textContent=x(r),r}transformCustomStyle(e){let t=E(e);return O(t,e=>{":root"===e.selector&&(e.selector="html"),this.transformRule(e)}),e.textContent=x(t),t}transformRules(e,t){this._currentElement=t,O(e,e=>{this.transformRule(e)}),this._currentElement=null}transformRule(e){e.cssText=this.transformCssText(e.parsedCssText,e),":root"===e.selector&&(e.selector=":host > *")}transformCssText(e,t){return e=e.replace(b,(e,r,n,i)=>this._produceCssProperties(e,r,n,i,t)),this._consumeCssProperties(e,t)}_getInitialValueForProperty(e){return this._measureElement||(this._measureElement=document.createElement("meta"),this._measureElement.setAttribute("apply-shim-measure",""),this._measureElement.style.all="initial",document.head.appendChild(this._measureElement)),window.getComputedStyle(this._measureElement).getPropertyValue(e)}_fallbacksFromPreviousRules(e){let t=e;for(;t.parent;)t=t.parent;const r={};let n=!1;return O(t,t=>{n=n||t===e,n||t.selector===e.selector&&Object.assign(r,this._cssTextToMap(t.parsedCssText))}),r}_consumeCssProperties(e,t){let r=null;for(;r=w.exec(e);){let n=r[0],i=r[1],s=r.index,o=s+n.indexOf("@apply"),a=s+n.length,l=e.slice(0,o),p=e.slice(a),d=t?this._fallbacksFromPreviousRules(t):{};Object.assign(d,this._cssTextToMap(l));let c=this._atApplyToCssProperties(i,d);e=`${l}${c}${p}`,w.lastIndex=s+c.length}return e}_atApplyToCssProperties(e,t){e=e.replace(M,"");let r=[],n=this._map.get(e);if(n||(this._map.set(e,{}),n=this._map.get(e)),n){let i,s,o;this._currentElement&&(n.dependants[this._currentElement]=!0);const a=n.properties;for(i in a)o=t&&t[i],s=[i,": var(",e,"_-_",i],o&&s.push(",",o.replace(R,"")),s.push(")"),R.test(a[i])&&s.push(" !important"),r.push(s.join(""))}return r.join("; ")}_replaceInitialOrInherit(e,t){let r=D.exec(t);return r&&(t=r[1]?this._getInitialValueForProperty(e):"apply-shim-inherit"),t}_cssTextToMap(e,t=!1){let r,n,i=e.split(";"),s={};for(let e,o,a=0;a<i.length;a++)e=i[a],e&&(o=e.split(":"),o.length>1&&(r=o[0].trim(),n=o.slice(1).join(":"),t&&(n=this._replaceInitialOrInherit(r,n)),s[r]=n));return s}_invalidateMixinEntry(e){if(F)for(let t in e.dependants)t!==this._currentElement&&F(t)}_produceCssProperties(e,t,r,n,i){if(r&&function e(t,r){let n=t.indexOf("var(");if(-1===n)return r(t,"","","");let i=T(t,n+3),s=t.substring(n+4,i),o=t.substring(0,n),a=e(t.substring(i+1),r),l=s.indexOf(",");return-1===l?r(o,s.trim(),"",a):r(o,s.substring(0,l).trim(),s.substring(l+1).trim(),a)}(r,(e,t)=>{t&&this._map.get(t)&&(n=`@apply ${t};`)}),!n)return e;let s=this._consumeCssProperties(""+n,i),o=e.slice(0,e.indexOf("--")),a=this._cssTextToMap(s,!0),l=a,p=this._map.get(t),d=p&&p.properties;d?l=Object.assign(Object.create(d),a):this._map.set(t,l);let c,h,u=[],_=!1;for(c in l)h=a[c],void 0===h&&(h="initial"),d&&!(c in d)&&(_=!0),u.push(`${t}_-_${c}: ${h}`);return _&&this._invalidateMixinEntry(p),p&&(p.properties=l),r&&(o=`${e};${o}`),`${o}${u.join("; ")};`}}H.prototype.detectMixin=H.prototype.detectMixin,H.prototype.transformStyle=H.prototype.transformStyle,H.prototype.transformCustomStyle=H.prototype.transformCustomStyle,H.prototype.transformRules=H.prototype.transformRules,H.prototype.transformRule=H.prototype.transformRule,H.prototype.transformTemplate=H.prototype.transformTemplate,H.prototype._separator="_-_",Object.defineProperty(H.prototype,"invalidCallback",{get:()=>F,set(e){F=e}});var z=H;var j={};const B="_applyShimCurrentVersion",$="_applyShimNextVersion",U=Promise.resolve();function X(e){let t=j[e];t&&function(e){e[B]=e[B]||0,e._applyShimValidatingVersion=e._applyShimValidatingVersion||0,e[$]=(e[$]||0)+1}(t)}function q(e){return e[B]===e[$]}function V(e){return!q(e)&&e._applyShimValidatingVersion===e[$]}function Y(e){e._applyShimValidatingVersion=e[$],e._validating||(e._validating=!0,U.then((function(){e[B]=e[$],e._validating=!1})))}let J,W=null,G=window.HTMLImports&&window.HTMLImports.whenReady||null;function Z(e){requestAnimationFrame((function(){G?G(e):(W||(W=new Promise(e=>{J=e}),"complete"===document.readyState?J():document.addEventListener("readystatechange",()=>{"complete"===document.readyState&&J()})),W.then((function(){e&&e()})))}))}const K="__shadyCSSCachedStyle";let Q=null,ee=null;class te{constructor(){this.customStyles=[],this.enqueued=!1,Z(()=>{window.ShadyCSS.flushCustomStyles&&window.ShadyCSS.flushCustomStyles()})}enqueueDocumentValidation(){!this.enqueued&&ee&&(this.enqueued=!0,Z(ee))}addCustomStyle(e){e.__seenByShadyCSS||(e.__seenByShadyCSS=!0,this.customStyles.push(e),this.enqueueDocumentValidation())}getStyleForCustomStyle(e){if(e[K])return e[K];let t;return t=e.getStyle?e.getStyle():e,t}processStyles(){const e=this.customStyles;for(let t=0;t<e.length;t++){const r=e[t];if(r[K])continue;const n=this.getStyleForCustomStyle(r);if(n){const e=n.__appliedElement||n;Q&&Q(e),r[K]=e}}return e}}te.prototype.addCustomStyle=te.prototype.addCustomStyle,te.prototype.getStyleForCustomStyle=te.prototype.getStyleForCustomStyle,te.prototype.processStyles=te.prototype.processStyles,Object.defineProperties(te.prototype,{transformCallback:{get:()=>Q,set(e){Q=e}},validateCallback:{get:()=>ee,set(e){let t=!1;ee||(t=!0),ee=e,t&&this.enqueueDocumentValidation()}}});const re=new z;class ne{constructor(){this.customStyleInterface=null,re.invalidCallback=X}ensure(){this.customStyleInterface||window.ShadyCSS.CustomStyleInterface&&(this.customStyleInterface=window.ShadyCSS.CustomStyleInterface,this.customStyleInterface.transformCallback=e=>{re.transformCustomStyle(e)},this.customStyleInterface.validateCallback=()=>{requestAnimationFrame(()=>{this.customStyleInterface.enqueued&&this.flushCustomStyles()})})}prepareTemplate(e,t){if(this.ensure(),N(e))return;j[t]=e;let r=re.transformTemplate(e,t);e._styleAst=r}flushCustomStyles(){if(this.ensure(),!this.customStyleInterface)return;let e=this.customStyleInterface.processStyles();if(this.customStyleInterface.enqueued){for(let t=0;t<e.length;t++){let r=e[t],n=this.customStyleInterface.getStyleForCustomStyle(r);n&&re.transformCustomStyle(n)}this.customStyleInterface.enqueued=!1}}styleSubtree(e,t){if(this.ensure(),t&&k(e,t),e.shadowRoot){this.styleElement(e);let t=e.shadowRoot.children||e.shadowRoot.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}else{let t=e.children||e.childNodes;for(let e=0;e<t.length;e++)this.styleSubtree(t[e])}}styleElement(e){this.ensure();let{is:t}=function(e){let t=e.localName,r="",n="";return t?t.indexOf("-")>-1?r=t:(n=t,r=e.getAttribute&&e.getAttribute("is")||""):(r=e.is,n=e.extends),{is:r,typeExtension:n}}(e),r=j[t];if((!r||!N(r))&&r&&!q(r)){V(r)||(this.prepareTemplate(r,t),Y(r));let n=e.shadowRoot;if(n){let e=n.querySelector("style");e&&(e.__cssRules=r._styleAst,e.textContent=x(r._styleAst))}}}styleDocument(e){this.ensure(),this.styleSubtree(document.body,e)}}if(!window.ShadyCSS||!window.ShadyCSS.ScopingShim){const e=new ne;let t=window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface;window.ShadyCSS={prepareTemplate(t,r,n){e.flushCustomStyles(),e.prepareTemplate(t,r)},prepareTemplateStyles(e,t,r){window.ShadyCSS.prepareTemplate(e,t,r)},prepareTemplateDom(e,t){},styleSubtree(t,r){e.flushCustomStyles(),e.styleSubtree(t,r)},styleElement(t){e.flushCustomStyles(),e.styleElement(t)},styleDocument(t){e.flushCustomStyles(),e.styleDocument(t)},getComputedStyleValue:(e,t)=>I(e,t),flushCustomStyles(){e.flushCustomStyles()},nativeCss:l,nativeShadow:n,cssBuild:s,disableRuntime:a},t&&(window.ShadyCSS.CustomStyleInterface=t)}window.ShadyCSS.ApplyShim=re,window.JSCompiler_renameProperty=function(e,t){return e};let ie,se,oe=/(url\()([^)]*)(\))/g,ae=/(^\/[^\/])|(^#)|(^[\w-\d]*:)/;function le(e,t){if(e&&ae.test(e))return e;if("//"===e)return e;if(void 0===ie){ie=!1;try{const e=new URL("b","http://a");e.pathname="c%20d",ie="http://a/c%20d"===e.href}catch(e){}}if(t||(t=document.baseURI||window.location.href),ie)try{return new URL(e,t).href}catch(t){return e}return se||(se=document.implementation.createHTMLDocument("temp"),se.base=se.createElement("base"),se.head.appendChild(se.base),se.anchor=se.createElement("a"),se.body.appendChild(se.anchor)),se.base.href=t,se.anchor.href=e,se.anchor.href||e}function pe(e,t){return e.replace(oe,(function(e,r,n,i){return r+"'"+le(n.replace(/["']/g,""),t)+"'"+i}))}function de(e){return e.substring(0,e.lastIndexOf("/")+1)}const ce=!window.ShadyDOM||!window.ShadyDOM.inUse,he=(Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback,ce&&"adoptedStyleSheets"in Document.prototype&&"replaceSync"in CSSStyleSheet.prototype&&(()=>{try{const e=new CSSStyleSheet;e.replaceSync("");const t=document.createElement("div");return t.attachShadow({mode:"open"}),t.shadowRoot.adoptedStyleSheets=[e],t.shadowRoot.adoptedStyleSheets[0]===e}catch(e){return!1}})());let ue=window.Polymer&&window.Polymer.rootPath||de(document.baseURI||window.location.href);let _e=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0;let fe=window.Polymer&&window.Polymer.setPassiveTouchGestures||!1;let me=window.Polymer&&window.Polymer.strictTemplatePolicy||!1;let ye=window.Polymer&&window.Polymer.allowTemplateFromDomModule||!1;let ge=window.Polymer&&window.Polymer.legacyOptimizations||!1;let be=window.Polymer&&window.Polymer.legacyWarnings||!1;let we=window.Polymer&&window.Polymer.syncInitialRender||!1;let Pe=window.Polymer&&window.Polymer.legacyUndefined||!1;let ve=window.Polymer&&window.Polymer.orderedComputed||!1;let Ce=!0;let Se=window.Polymer&&window.Polymer.removeNestedTemplates||!1;let xe=window.Polymer&&window.Polymer.fastDomIf||!1;let Ee=window.Polymer&&window.Polymer.suppressTemplateNotifications||!1;let Oe=window.Polymer&&window.Polymer.legacyNoObservedAttributes||!1;let Te=window.Polymer&&window.Polymer.useAdoptedStyleSheetsWithBuiltCSS||!1;let Ae=0;function Ne(){}Ne.prototype.__mixinApplications,Ne.prototype.__mixinSet;const ke=function(e){let t=e.__mixinApplications;t||(t=new WeakMap,e.__mixinApplications=t);let r=Ae++;return function(n){let i=n.__mixinSet;if(i&&i[r])return n;let s=t,o=s.get(n);if(!o){o=e(n),s.set(n,o);let t=Object.create(o.__mixinSet||i||null);t[r]=!0,o.__mixinSet=t}return o}};let Ie={},Me={};function De(e,t){Ie[e]=Me[e.toLowerCase()]=t}function Re(e){return Ie[e]||Me[e.toLowerCase()]}class Le extends HTMLElement{static get observedAttributes(){return["id"]}static import(e,t){if(e){let r=Re(e);return r&&t?r.querySelector(t):r}return null}attributeChangedCallback(e,t,r,n){t!==r&&this.register()}get assetpath(){if(!this.__assetpath){const e=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,t=le(this.getAttribute("assetpath")||"",e.baseURI);this.__assetpath=de(t)}return this.__assetpath}register(e){if(e=e||this.id){if(me&&void 0!==Re(e))throw De(e,null),new Error(`strictTemplatePolicy: dom-module ${e} re-registered`);this.id=e,De(e,this),(t=this).querySelector("style")&&console.warn("dom-module %s has style outside template",t.id)}var t}}Le.prototype.modules=Ie,customElements.define("dom-module",Le);function Fe(e){return Le.import(e)}function He(e){const t=pe((e.body?e.body:e).textContent,e.baseURI),r=document.createElement("style");return r.textContent=t,r}function ze(e){const t=e.trim().split(/\s+/),r=[];for(let e=0;e<t.length;e++)r.push(...je(t[e]));return r}function je(e){const t=Fe(e);if(!t)return console.warn("Could not find style data in module named",e),[];if(void 0===t._styles){const e=[];e.push(...$e(t));const r=t.querySelector("template");r&&e.push(...Be(r,t.assetpath)),t._styles=e}return t._styles}function Be(e,t){if(!e._styles){const r=[],n=e.content.querySelectorAll("style");for(let e=0;e<n.length;e++){let i=n[e],s=i.getAttribute("include");s&&r.push(...ze(s).filter((function(e,t,r){return r.indexOf(e)===t}))),t&&(i.textContent=pe(i.textContent,t)),r.push(i)}e._styles=r}return e._styles}function $e(e){const t=[],r=e.querySelectorAll("link[rel=import][type~=css]");for(let e=0;e<r.length;e++){let n=r[e];if(n.import){const e=n.import,r=n.hasAttribute("shady-unscoped");if(r&&!e._unscopedStyle){const t=He(e);t.setAttribute("shady-unscoped",""),e._unscopedStyle=t}else e._style||(e._style=He(e));t.push(r?e._unscopedStyle:e._style)}}return t}function Ue(e){let t=Fe(e);if(t&&void 0===t._cssText){let e=Xe(t),r=t.querySelector("template");r&&(e+=function(e,t){let r="";const n=Be(e,t);for(let e=0;e<n.length;e++){let t=n[e];t.parentNode&&t.parentNode.removeChild(t),r+=t.textContent}return r}(r,t.assetpath)),t._cssText=e||null}return t||console.warn("Could not find style data in module named",e),t&&t._cssText||""}function Xe(e){let t="",r=$e(e);for(let e=0;e<r.length;e++)t+=r[e].textContent;return t}const qe=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:window.ShadyDOM?e=>ShadyDOM.patch(e):e=>e;function Ve(e){return e.indexOf(".")>=0}function Ye(e){let t=e.indexOf(".");return-1===t?e:e.slice(0,t)}function Je(e,t){return 0===e.indexOf(t+".")}function We(e,t){return 0===t.indexOf(e+".")}function Ge(e,t,r){return t+r.slice(e.length)}function Ze(e){if(Array.isArray(e)){let t=[];for(let r=0;r<e.length;r++){let n=e[r].toString().split(".");for(let e=0;e<n.length;e++)t.push(n[e])}return t.join(".")}return e}function Ke(e){return Array.isArray(e)?Ze(e).split("."):e.toString().split(".")}function Qe(e,t,r){let n=e,i=Ke(t);for(let e=0;e<i.length;e++){if(!n)return;n=n[i[e]]}return r&&(r.path=i.join(".")),n}function et(e,t,r){let n=e,i=Ke(t),s=i[i.length-1];if(i.length>1){for(let e=0;e<i.length-1;e++){if(n=n[i[e]],!n)return}n[s]=r}else n[t]=r;return i.join(".")}const tt={},rt=/-[a-z]/g,nt=/([A-Z])/g;function it(e){return tt[e]||(tt[e]=e.indexOf("-")<0?e:e.replace(rt,e=>e[1].toUpperCase()))}function st(e){return tt[e]||(tt[e]=e.replace(nt,"-$1").toLowerCase())}let ot=0,at=0,lt=[],pt=0,dt=!1,ct=document.createTextNode("");new window.MutationObserver((function(){dt=!1;const e=lt.length;for(let t=0;t<e;t++){let e=lt[t];if(e)try{e()}catch(e){setTimeout(()=>{throw e})}}lt.splice(0,e),at+=e})).observe(ct,{characterData:!0});const ht={after:e=>({run:t=>window.setTimeout(t,e),cancel(e){window.clearTimeout(e)}}),run:(e,t)=>window.setTimeout(e,t),cancel(e){window.clearTimeout(e)}},ut={run:e=>(dt||(dt=!0,ct.textContent=pt++),lt.push(e),ot++),cancel(e){const t=e-at;if(t>=0){if(!lt[t])throw new Error("invalid async handle: "+e);lt[t]=null}}},_t=ut,ft=ke(e=>class extends e{static createProperties(e){const t=this.prototype;for(let r in e)r in t||t._createPropertyAccessor(r)}static attributeNameForProperty(e){return e.toLowerCase()}static typeForProperty(e){}_createPropertyAccessor(e,t){this._addPropertyToAttributeMap(e),this.hasOwnProperty(JSCompiler_renameProperty("__dataHasAccessor",this))||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[e]||(this.__dataHasAccessor[e]=!0,this._definePropertyAccessor(e,t))}_addPropertyToAttributeMap(e){this.hasOwnProperty(JSCompiler_renameProperty("__dataAttributes",this))||(this.__dataAttributes=Object.assign({},this.__dataAttributes));let t=this.__dataAttributes[e];return t||(t=this.constructor.attributeNameForProperty(e),this.__dataAttributes[t]=e),t}_definePropertyAccessor(e,t){Object.defineProperty(this,e,{get(){return this.__data[e]},set:t?function(){}:function(t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__dataCounter=0,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let e in this.__dataHasAccessor)this.hasOwnProperty(e)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[e]=this[e],delete this[e])}_initializeInstanceProperties(e){Object.assign(this,e)}_setProperty(e,t){this._setPendingProperty(e,t)&&this._invalidateProperties()}_getProperty(e){return this.__data[e]}_setPendingProperty(e,t,r){let n=this.__data[e],i=this._shouldPropertyChange(e,t,n);return i&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),this.__dataOld&&!(e in this.__dataOld)&&(this.__dataOld[e]=n),this.__data[e]=t,this.__dataPending[e]=t),i}_isPropertyPending(e){return!(!this.__dataPending||!this.__dataPending.hasOwnProperty(e))}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,_t.run(()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())}))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){this.__dataCounter++;const e=this.__data,t=this.__dataPending,r=this.__dataOld;this._shouldPropertiesChange(e,t,r)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(e,t,r)),this.__dataCounter--}_shouldPropertiesChange(e,t,r){return Boolean(t)}_propertiesChanged(e,t,r){}_shouldPropertyChange(e,t,r){return r!==t&&(r==r||t==t)}attributeChangedCallback(e,t,r,n){t!==r&&this._attributeToProperty(e,r),super.attributeChangedCallback&&super.attributeChangedCallback(e,t,r,n)}_attributeToProperty(e,t,r){if(!this.__serializing){const n=this.__dataAttributes,i=n&&n[e]||e;this[i]=this._deserializeValue(t,r||this.constructor.typeForProperty(i))}}_propertyToAttribute(e,t,r){this.__serializing=!0,r=arguments.length<3?this[e]:r,this._valueToNodeAttribute(this,r,t||this.constructor.attributeNameForProperty(e)),this.__serializing=!1}_valueToNodeAttribute(e,t,r){const n=this._serializeValue(t);"class"!==r&&"name"!==r&&"slot"!==r||(e=qe(e)),void 0===n?e.removeAttribute(r):e.setAttribute(r,n)}_serializeValue(e){switch(typeof e){case"boolean":return e?"":void 0;default:return null!=e?e.toString():void 0}}_deserializeValue(e,t){switch(t){case Boolean:return null!==e;case Number:return Number(e);default:return e}}}),mt={};let yt=HTMLElement.prototype;for(;yt;){let e=Object.getOwnPropertyNames(yt);for(let t=0;t<e.length;t++)mt[e[t]]=!0;yt=Object.getPrototypeOf(yt)}const gt=ke(e=>{const t=ft(e);return class extends t{static createPropertiesForAttributes(){let e=this.observedAttributes;for(let t=0;t<e.length;t++)this.prototype._createPropertyAccessor(it(e[t]))}static attributeNameForProperty(e){return st(e)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(e){for(let t in e)this._setProperty(t,e[t])}_ensureAttribute(e,t){const r=this;r.hasAttribute(e)||this._valueToNodeAttribute(r,t,e)}_serializeValue(e){switch(typeof e){case"object":if(e instanceof Date)return e.toString();if(e)try{return JSON.stringify(e)}catch(e){return""}default:return super._serializeValue(e)}}_deserializeValue(e,t){let r;switch(t){case Object:try{r=JSON.parse(e)}catch(t){r=e}break;case Array:try{r=JSON.parse(e)}catch(t){r=null,console.warn("Polymer::Attributes: couldn't decode Array as JSON: "+e)}break;case Date:r=isNaN(e)?String(e):Number(e),r=new Date(r);break;default:r=super._deserializeValue(e,t)}return r}_definePropertyAccessor(e,t){!function(e,t){if(!mt[t]){let r=e[t];void 0!==r&&(e.__data?e._setPendingProperty(t,r):(e.__dataProto?e.hasOwnProperty(JSCompiler_renameProperty("__dataProto",e))||(e.__dataProto=Object.create(e.__dataProto)):e.__dataProto={},e.__dataProto[t]=r))}}(this,e),super._definePropertyAccessor(e,t)}_hasAccessor(e){return this.__dataHasAccessor&&this.__dataHasAccessor[e]}_isPropertyPending(e){return Boolean(this.__dataPending&&e in this.__dataPending)}}}),bt={"dom-if":!0,"dom-repeat":!0};let wt=!1,Pt=!1;function vt(e){(function(){if(!wt){wt=!0;const e=document.createElement("textarea");e.placeholder="a",Pt=e.placeholder===e.textContent}return Pt})()&&"textarea"===e.localName&&e.placeholder&&e.placeholder===e.textContent&&(e.textContent=null)}function Ct(e){let t=e.getAttribute("is");if(t&&bt[t]){let r=e;for(r.removeAttribute("is"),e=r.ownerDocument.createElement(t),r.parentNode.replaceChild(e,r),e.appendChild(r);r.attributes.length;)e.setAttribute(r.attributes[0].name,r.attributes[0].value),r.removeAttribute(r.attributes[0].name)}return e}function St(e,t){let r=t.parentInfo&&St(e,t.parentInfo);if(!r)return e;for(let e=r.firstChild,n=0;e;e=e.nextSibling)if(t.parentIndex===n++)return e}function xt(e,t,r,n){n.id&&(t[n.id]=r)}function Et(e,t,r){if(r.events&&r.events.length)for(let n,i=0,s=r.events;i<s.length&&(n=s[i]);i++)e._addMethodEventListenerToNode(t,n.name,n.value,e)}function Ot(e,t,r,n){r.templateInfo&&(t._templateInfo=r.templateInfo,t._parentTemplateInfo=n)}const Tt=ke(e=>class extends e{static _parseTemplate(e,t){if(!e._templateInfo){let r=e._templateInfo={};r.nodeInfoList=[],r.nestedTemplate=Boolean(t),r.stripWhiteSpace=t&&t.stripWhiteSpace||e.hasAttribute("strip-whitespace"),this._parseTemplateContent(e,r,{parent:null})}return e._templateInfo}static _parseTemplateContent(e,t,r){return this._parseTemplateNode(e.content,t,r)}static _parseTemplateNode(e,t,r){let n=!1,i=e;return"template"!=i.localName||i.hasAttribute("preserve-content")?"slot"===i.localName&&(t.hasInsertionPoint=!0):n=this._parseTemplateNestedTemplate(i,t,r)||n,vt(i),i.firstChild&&this._parseTemplateChildNodes(i,t,r),i.hasAttributes&&i.hasAttributes()&&(n=this._parseTemplateNodeAttributes(i,t,r)||n),n||r.noted}static _parseTemplateChildNodes(e,t,r){if("script"!==e.localName&&"style"!==e.localName)for(let n,i=e.firstChild,s=0;i;i=n){if("template"==i.localName&&(i=Ct(i)),n=i.nextSibling,i.nodeType===Node.TEXT_NODE){let r=n;for(;r&&r.nodeType===Node.TEXT_NODE;)i.textContent+=r.textContent,n=r.nextSibling,e.removeChild(r),r=n;if(t.stripWhiteSpace&&!i.textContent.trim()){e.removeChild(i);continue}}let o={parentIndex:s,parentInfo:r};this._parseTemplateNode(i,t,o)&&(o.infoIndex=t.nodeInfoList.push(o)-1),i.parentNode&&s++}}static _parseTemplateNestedTemplate(e,t,r){let n=e,i=this._parseTemplate(n,t);return(i.content=n.content.ownerDocument.createDocumentFragment()).appendChild(n.content),r.templateInfo=i,!0}static _parseTemplateNodeAttributes(e,t,r){let n=!1,i=Array.from(e.attributes);for(let s,o=i.length-1;s=i[o];o--)n=this._parseTemplateNodeAttribute(e,t,r,s.name,s.value)||n;return n}static _parseTemplateNodeAttribute(e,t,r,n,i){return"on-"===n.slice(0,3)?(e.removeAttribute(n),r.events=r.events||[],r.events.push({name:n.slice(3),value:i}),!0):"id"===n&&(r.id=i,!0)}static _contentForTemplate(e){let t=e._templateInfo;return t&&t.content||e.content}_stampTemplate(e,t){e&&!e.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(e);let r=(t=t||this.constructor._parseTemplate(e)).nodeInfoList,n=t.content||e.content,i=document.importNode(n,!0);i.__noInsertionPoint=!t.hasInsertionPoint;let s=i.nodeList=new Array(r.length);i.$={};for(let e,n=0,o=r.length;n<o&&(e=r[n]);n++){let r=s[n]=St(i,e);xt(0,i.$,r,e),Ot(0,r,e,t),Et(this,r,e)}return i=i,i}_addMethodEventListenerToNode(e,t,r,n){let i=function(e,t,r){return e=e._methodHost||e,function(t){e[r]?e[r](t,t.detail):console.warn("listener method `"+r+"` not defined")}}(n=n||e,0,r);return this._addEventListenerToNode(e,t,i),i}_addEventListenerToNode(e,t,r){e.addEventListener(t,r)}_removeEventListenerFromNode(e,t,r){e.removeEventListener(t,r)}});let At=0;const Nt=[],kt={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},It=/[A-Z]/;function Mt(e,t,r){let n=e[t];if(n){if(!e.hasOwnProperty(t)&&(n=e[t]=Object.create(e[t]),r))for(let e in n){let t=n[e],r=n[e]=Array(t.length);for(let e=0;e<t.length;e++)r[e]=t[e]}}else n=e[t]={};return n}function Dt(e,t,r,n,i,s){if(t){let o=!1;const a=At++;for(let l in r){let p=t[i?Ye(l):l];if(p)for(let t,d=0,c=p.length;d<c&&(t=p[d]);d++)t.info&&t.info.lastRun===a||i&&!Lt(l,t.trigger)||(t.info&&(t.info.lastRun=a),t.fn(e,l,r,n,t.info,i,s),o=!0)}return o}return!1}function Rt(e,t,r,n,i,s,o,a){let l=!1,p=t[o?Ye(n):n];if(p)for(let t,d=0,c=p.length;d<c&&(t=p[d]);d++)t.info&&t.info.lastRun===r||o&&!Lt(n,t.trigger)||(t.info&&(t.info.lastRun=r),t.fn(e,n,i,s,t.info,o,a),l=!0);return l}function Lt(e,t){if(t){let r=t.name;return r==e||!(!t.structured||!Je(r,e))||!(!t.wildcard||!We(r,e))}return!0}function Ft(e,t,r,n,i){let s="string"==typeof i.method?e[i.method]:i.method,o=i.property;s?s.call(e,e.__data[o],n[o]):i.dynamicFn||console.warn("observer method `"+i.method+"` not defined")}function Ht(e,t,r){let n=Ye(t);if(n!==t){return zt(e,st(n)+"-changed",r[t],t),!0}return!1}function zt(e,t,r,n){let i={value:r,queueProperty:!0};n&&(i.path=n),qe(e).dispatchEvent(new CustomEvent(t,{detail:i}))}function jt(e,t,r,n,i,s){let o=(s?Ye(t):t)!=t?t:null,a=o?Qe(e,o):e.__data[t];o&&void 0===a&&(a=r[t]),zt(e,i.eventName,a,o)}function Bt(e,t,r,n,i){let s=e.__data[t];_e&&(s=_e(s,i.attrName,"attribute",e)),e._propertyToAttribute(t,i.attrName,s)}function $t(e,t,r,n){let i=e[kt.COMPUTE];if(i)if(ve){At++;const s=function(e){let t=e.constructor.__orderedComputedDeps;if(!t){t=new Map;const r=e[kt.COMPUTE];let n,{counts:i,ready:s,total:o}=function(e){const t=e.__computeInfo,r={},n=e[kt.COMPUTE],i=[];let s=0;for(let e in t){const n=t[e];s+=r[e]=n.args.filter(e=>!e.literal).length+(n.dynamicFn?1:0)}for(let e in n)t[e]||i.push(e);return{counts:r,ready:i,total:s}}(e);for(;n=s.shift();){t.set(n,t.size);const e=r[n];e&&e.forEach(e=>{const t=e.info.methodInfo;--o,0==--i[t]&&s.push(t)})}if(0!==o){const t=e;console.warn(`Computed graph for ${t.localName} incomplete; circular?`)}e.constructor.__orderedComputedDeps=t}return t}(e),o=[];for(let e in t)Xt(e,i,o,s,n);let a;for(;a=o.shift();)qt(e,"",t,r,a)&&Xt(a.methodInfo,i,o,s,n);Object.assign(r,e.__dataOld),Object.assign(t,e.__dataPending),e.__dataPending=null}else{let s=t;for(;Dt(e,i,s,r,n);)Object.assign(r,e.__dataOld),Object.assign(t,e.__dataPending),s=e.__dataPending,e.__dataPending=null}}const Ut=(e,t,r)=>{let n=0,i=t.length-1,s=-1;for(;n<=i;){const o=n+i>>1,a=r.get(t[o].methodInfo)-r.get(e.methodInfo);if(a<0)n=o+1;else{if(!(a>0)){s=o;break}i=o-1}}s<0&&(s=i+1),t.splice(s,0,e)},Xt=(e,t,r,n,i)=>{const s=t[i?Ye(e):e];if(s)for(let t=0;t<s.length;t++){const o=s[t];o.info.lastRun===At||i&&!Lt(e,o.trigger)||(o.info.lastRun=At,Ut(o.info,r,n))}};function qt(e,t,r,n,i){let s=Kt(e,t,r,n,i);if(s===Nt)return!1;let o=i.methodInfo;return e.__dataHasAccessor&&e.__dataHasAccessor[o]?e._setPendingProperty(o,s,!0):(e[o]=s,!1)}function Vt(e,t,r,n,i,s,o){r.bindings=r.bindings||[];let a={kind:n,target:i,parts:s,literal:o,isCompound:1!==s.length};if(r.bindings.push(a),function(e){return Boolean(e.target)&&"attribute"!=e.kind&&"text"!=e.kind&&!e.isCompound&&"{"===e.parts[0].mode}(a)){let{event:e,negate:t}=a.parts[0];a.listenerEvent=e||st(i)+"-changed",a.listenerNegate=t}let l=t.nodeInfoList.length;for(let r=0;r<a.parts.length;r++){let n=a.parts[r];n.compoundIndex=r,Yt(e,t,a,n,l)}}function Yt(e,t,r,n,i){if(!n.literal)if("attribute"===r.kind&&"-"===r.target[0])console.warn("Cannot set attribute "+r.target+' because "-" is not a valid attribute starting character');else{let s=n.dependencies,o={index:i,binding:r,part:n,evaluator:e};for(let r=0;r<s.length;r++){let n=s[r];"string"==typeof n&&(n=nr(n),n.wildcard=!0),e._addTemplatePropertyEffect(t,n.rootProperty,{fn:Jt,info:o,trigger:n})}}}function Jt(e,t,r,n,i,s,o){let a=o[i.index],l=i.binding,p=i.part;if(s&&p.source&&t.length>p.source.length&&"property"==l.kind&&!l.isCompound&&a.__isPropertyEffectsClient&&a.__dataHasAccessor&&a.__dataHasAccessor[l.target]){let n=r[t];t=Ge(p.source,l.target,t),a._setPendingPropertyOrPath(t,n,!1,!0)&&e._enqueueClient(a)}else{let o=i.evaluator._evaluateBinding(e,p,t,r,n,s);o!==Nt&&function(e,t,r,n,i){i=function(e,t,r,n){if(r.isCompound){let i=e.__dataCompoundStorage[r.target];i[n.compoundIndex]=t,t=i.join("")}"attribute"!==r.kind&&("textContent"!==r.target&&("value"!==r.target||"input"!==e.localName&&"textarea"!==e.localName)||(t=null==t?"":t));return t}(t,i,r,n),_e&&(i=_e(i,r.target,r.kind,t));if("attribute"==r.kind)e._valueToNodeAttribute(t,i,r.target);else{let n=r.target;t.__isPropertyEffectsClient&&t.__dataHasAccessor&&t.__dataHasAccessor[n]?t[kt.READ_ONLY]&&t[kt.READ_ONLY][n]||t._setPendingProperty(n,i)&&e._enqueueClient(t):e._setUnmanagedPropertyToNode(t,n,i)}}(e,a,l,p,o)}}function Wt(e,t){if(t.isCompound){let r=e.__dataCompoundStorage||(e.__dataCompoundStorage={}),n=t.parts,i=new Array(n.length);for(let e=0;e<n.length;e++)i[e]=n[e].literal;let s=t.target;r[s]=i,t.literal&&"property"==t.kind&&("className"===s&&(e=qe(e)),e[s]=t.literal)}}function Gt(e,t,r){if(r.listenerEvent){let n=r.parts[0];e.addEventListener(r.listenerEvent,(function(e){!function(e,t,r,n,i){let s,o=e.detail,a=o&&o.path;a?(n=Ge(r,n,a),s=o&&o.value):s=e.currentTarget[r],s=i?!s:s,t[kt.READ_ONLY]&&t[kt.READ_ONLY][n]||!t._setPendingPropertyOrPath(n,s,!0,Boolean(a))||o&&o.queueProperty||t._invalidateProperties()}(e,t,r.target,n.source,n.negate)}))}}function Zt(e,t,r,n,i,s){s=t.static||s&&("object"!=typeof s||s[t.methodName]);let o={methodName:t.methodName,args:t.args,methodInfo:i,dynamicFn:s};for(let i,s=0;s<t.args.length&&(i=t.args[s]);s++)i.literal||e._addPropertyEffect(i.rootProperty,r,{fn:n,info:o,trigger:i});return s&&e._addPropertyEffect(t.methodName,r,{fn:n,info:o}),o}function Kt(e,t,r,n,i){let s=e._methodHost||e,o=s[i.methodName];if(o){let n=e._marshalArgs(i.args,t,r);return n===Nt?Nt:o.apply(s,n)}i.dynamicFn||console.warn("method `"+i.methodName+"` not defined")}const Qt=[],er=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*))*)?)\\)\\s*)?)(?:]]|}})","g");function tr(e){let t="";for(let r=0;r<e.length;r++){t+=e[r].literal||""}return t}function rr(e){let t=e.match(/([^\s]+?)\(([\s\S]*)\)/);if(t){let e={methodName:t[1],static:!0,args:Qt};if(t[2].trim()){return function(e,t){return t.args=e.map((function(e){let r=nr(e);return r.literal||(t.static=!1),r}),this),t}(t[2].replace(/\\,/g,"&comma;").split(","),e)}return e}return null}function nr(e){let t=e.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),r={name:t,value:"",literal:!1},n=t[0];switch("-"===n&&(n=t[1]),n>="0"&&n<="9"&&(n="#"),n){case"'":case'"':r.value=t.slice(1,-1),r.literal=!0;break;case"#":r.value=Number(t),r.literal=!0}return r.literal||(r.rootProperty=Ye(t),r.structured=Ve(t),r.structured&&(r.wildcard=".*"==t.slice(-2),r.wildcard&&(r.name=t.slice(0,-2)))),r}function ir(e,t,r){let n=Qe(e,r);return void 0===n&&(n=t[r]),n}function sr(e,t,r,n){const i={indexSplices:n};Pe&&!e._overrideLegacyUndefined&&(t.splices=i),e.notifyPath(r+".splices",i),e.notifyPath(r+".length",t.length),Pe&&!e._overrideLegacyUndefined&&(i.indexSplices=[])}function or(e,t,r,n,i,s){sr(e,t,r,[{index:n,addedCount:i,removed:s,object:t,type:"splice"}])}const ar=ke(e=>{const t=Tt(gt(e));return class extends t{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataClientsReady,this.__dataPendingClients,this.__dataToNotify,this.__dataLinkedPaths,this.__dataHasPaths,this.__dataCompoundStorage,this.__dataHost,this.__dataTemp,this.__dataClientsInitialized,this.__data,this.__dataPending,this.__dataOld,this.__computeEffects,this.__computeInfo,this.__reflectEffects,this.__notifyEffects,this.__propagateEffects,this.__observeEffects,this.__readOnly,this.__templateInfo,this._overrideLegacyUndefined}get PROPERTY_EFFECT_TYPES(){return kt}_initializeProperties(){super._initializeProperties(),this._registerHost(),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_registerHost(){if(lr.length){let e=lr[lr.length-1];e._enqueueClient(this),this.__dataHost=e}}_initializeProtoProperties(e){this.__data=Object.create(e),this.__dataPending=Object.create(e),this.__dataOld={}}_initializeInstanceProperties(e){let t=this[kt.READ_ONLY];for(let r in e)t&&t[r]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[r]=this.__dataPending[r]=e[r])}_addPropertyEffect(e,t,r){this._createPropertyAccessor(e,t==kt.READ_ONLY);let n=Mt(this,t,!0)[e];n||(n=this[t][e]=[]),n.push(r)}_removePropertyEffect(e,t,r){let n=Mt(this,t,!0)[e],i=n.indexOf(r);i>=0&&n.splice(i,1)}_hasPropertyEffect(e,t){let r=this[t];return Boolean(r&&r[e])}_hasReadOnlyEffect(e){return this._hasPropertyEffect(e,kt.READ_ONLY)}_hasNotifyEffect(e){return this._hasPropertyEffect(e,kt.NOTIFY)}_hasReflectEffect(e){return this._hasPropertyEffect(e,kt.REFLECT)}_hasComputedEffect(e){return this._hasPropertyEffect(e,kt.COMPUTE)}_setPendingPropertyOrPath(e,t,r,n){if(n||Ye(Array.isArray(e)?e[0]:e)!==e){if(!n){let r=Qe(this,e);if(!(e=et(this,e,t))||!super._shouldPropertyChange(e,t,r))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(e,t,r))return function(e,t,r){let n=e.__dataLinkedPaths;if(n){let i;for(let s in n){let o=n[s];We(s,t)?(i=Ge(s,o,t),e._setPendingPropertyOrPath(i,r,!0,!0)):We(o,t)&&(i=Ge(o,s,t),e._setPendingPropertyOrPath(i,r,!0,!0))}}}(this,e,t),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[e])return this._setPendingProperty(e,t,r);this[e]=t}return!1}_setUnmanagedPropertyToNode(e,t,r){r===e[t]&&"object"!=typeof r||("className"===t&&(e=qe(e)),e[t]=r)}_setPendingProperty(e,t,r){let n=this.__dataHasPaths&&Ve(e),i=n?this.__dataTemp:this.__data;return!!this._shouldPropertyChange(e,t,i[e])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),e in this.__dataOld||(this.__dataOld[e]=this.__data[e]),n?this.__dataTemp[e]=t:this.__data[e]=t,this.__dataPending[e]=t,(n||this[kt.NOTIFY]&&this[kt.NOTIFY][e])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[e]=r),!0)}_setProperty(e,t){this._setPendingProperty(e,t,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(e){this.__dataPendingClients=this.__dataPendingClients||[],e!==this&&this.__dataPendingClients.push(e)}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let e=this.__dataPendingClients;if(e){this.__dataPendingClients=null;for(let t=0;t<e.length;t++){let r=e[t];r.__dataEnabled?r.__dataPending&&r._flushProperties():r._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(e,t){for(let r in e)!t&&this[kt.READ_ONLY]&&this[kt.READ_ONLY][r]||this._setPendingPropertyOrPath(r,e[r],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(e,t,r){let n,i=this.__dataHasPaths;this.__dataHasPaths=!1,$t(this,t,r,i),n=this.__dataToNotify,this.__dataToNotify=null,this._propagatePropertyChanges(t,r,i),this._flushClients(),Dt(this,this[kt.REFLECT],t,r,i),Dt(this,this[kt.OBSERVE],t,r,i),n&&function(e,t,r,n,i){let s,o,a=e[kt.NOTIFY],l=At++;for(let o in t)t[o]&&(a&&Rt(e,a,l,o,r,n,i)||i&&Ht(e,o,r))&&(s=!0);s&&(o=e.__dataHost)&&o._invalidateProperties&&o._invalidateProperties()}(this,n,t,r,i),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(e,t,r){this[kt.PROPAGATE]&&Dt(this,this[kt.PROPAGATE],e,t,r),this.__templateInfo&&this._runEffectsForTemplate(this.__templateInfo,e,t,r)}_runEffectsForTemplate(e,t,r,n){const i=(t,n)=>{Dt(this,e.propertyEffects,t,r,n,e.nodeList);for(let i=e.firstChild;i;i=i.nextSibling)this._runEffectsForTemplate(i,t,r,n)};e.runEffects?e.runEffects(i,t,n):i(t,n)}linkPaths(e,t){e=Ze(e),t=Ze(t),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[e]=t}unlinkPaths(e){e=Ze(e),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[e]}notifySplices(e,t){let r={path:""};sr(this,Qe(this,e,r),r.path,t)}get(e,t){return Qe(t||this,e)}set(e,t,r){r?et(r,e,t):this[kt.READ_ONLY]&&this[kt.READ_ONLY][e]||this._setPendingPropertyOrPath(e,t,!0)&&this._invalidateProperties()}push(e,...t){let r={path:""},n=Qe(this,e,r),i=n.length,s=n.push(...t);return t.length&&or(this,n,r.path,i,t.length,[]),s}pop(e){let t={path:""},r=Qe(this,e,t),n=Boolean(r.length),i=r.pop();return n&&or(this,r,t.path,r.length,0,[i]),i}splice(e,t,r,...n){let i,s={path:""},o=Qe(this,e,s);return t<0?t=o.length-Math.floor(-t):t&&(t=Math.floor(t)),i=2===arguments.length?o.splice(t):o.splice(t,r,...n),(n.length||i.length)&&or(this,o,s.path,t,n.length,i),i}shift(e){let t={path:""},r=Qe(this,e,t),n=Boolean(r.length),i=r.shift();return n&&or(this,r,t.path,0,0,[i]),i}unshift(e,...t){let r={path:""},n=Qe(this,e,r),i=n.unshift(...t);return t.length&&or(this,n,r.path,0,t.length,[]),i}notifyPath(e,t){let r;if(1==arguments.length){let n={path:""};t=Qe(this,e,n),r=n.path}else r=Array.isArray(e)?Ze(e):e;this._setPendingPropertyOrPath(r,t,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(e,t){var r;this._addPropertyEffect(e,kt.READ_ONLY),t&&(this["_set"+(r=e,r[0].toUpperCase()+r.substring(1))]=function(t){this._setProperty(e,t)})}_createPropertyObserver(e,t,r){let n={property:e,method:t,dynamicFn:Boolean(r)};this._addPropertyEffect(e,kt.OBSERVE,{fn:Ft,info:n,trigger:{name:e}}),r&&this._addPropertyEffect(t,kt.OBSERVE,{fn:Ft,info:n,trigger:{name:t}})}_createMethodObserver(e,t){let r=rr(e);if(!r)throw new Error("Malformed observer expression '"+e+"'");Zt(this,r,kt.OBSERVE,Kt,null,t)}_createNotifyingProperty(e){this._addPropertyEffect(e,kt.NOTIFY,{fn:jt,info:{eventName:st(e)+"-changed",property:e}})}_createReflectedProperty(e){let t=this.constructor.attributeNameForProperty(e);"-"===t[0]?console.warn("Property "+e+" cannot be reflected to attribute "+t+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(e,kt.REFLECT,{fn:Bt,info:{attrName:t}})}_createComputedProperty(e,t,r){let n=rr(t);if(!n)throw new Error("Malformed computed expression '"+t+"'");const i=Zt(this,n,kt.COMPUTE,qt,e,r);Mt(this,"__computeInfo")[e]=i}_marshalArgs(e,t,r){const n=this.__data,i=[];for(let s=0,o=e.length;s<o;s++){let{name:o,structured:a,wildcard:l,value:p,literal:d}=e[s];if(!d)if(l){const e=We(o,t),i=ir(n,r,e?t:o);p={path:e?t:o,value:i,base:e?Qe(n,o):i}}else p=a?ir(n,r,o):n[o];if(Pe&&!this._overrideLegacyUndefined&&void 0===p&&e.length>1)return Nt;i[s]=p}return i}static addPropertyEffect(e,t,r){this.prototype._addPropertyEffect(e,t,r)}static createPropertyObserver(e,t,r){this.prototype._createPropertyObserver(e,t,r)}static createMethodObserver(e,t){this.prototype._createMethodObserver(e,t)}static createNotifyingProperty(e){this.prototype._createNotifyingProperty(e)}static createReadOnlyProperty(e,t){this.prototype._createReadOnlyProperty(e,t)}static createReflectedProperty(e){this.prototype._createReflectedProperty(e)}static createComputedProperty(e,t,r){this.prototype._createComputedProperty(e,t,r)}static bindTemplate(e){return this.prototype._bindTemplate(e)}_bindTemplate(e,t){let r=this.constructor._parseTemplate(e),n=this.__preBoundTemplateInfo==r;if(!n)for(let e in r.propertyEffects)this._createPropertyAccessor(e);if(t)if(r=Object.create(r),r.wasPreBound=n,this.__templateInfo){const t=e._parentTemplateInfo||this.__templateInfo,n=t.lastChild;r.parent=t,t.lastChild=r,r.previousSibling=n,n?n.nextSibling=r:t.firstChild=r}else this.__templateInfo=r;else this.__preBoundTemplateInfo=r;return r}static _addTemplatePropertyEffect(e,t,r){(e.hostProps=e.hostProps||{})[t]=!0;let n=e.propertyEffects=e.propertyEffects||{};(n[t]=n[t]||[]).push(r)}_stampTemplate(e,t){t=t||this._bindTemplate(e,!0),lr.push(this);let r=super._stampTemplate(e,t);if(lr.pop(),t.nodeList=r.nodeList,!t.wasPreBound){let e=t.childNodes=[];for(let t=r.firstChild;t;t=t.nextSibling)e.push(t)}return r.templateInfo=t,function(e,t){let{nodeList:r,nodeInfoList:n}=t;if(n.length)for(let t=0;t<n.length;t++){let i=n[t],s=r[t],o=i.bindings;if(o)for(let t=0;t<o.length;t++){let r=o[t];Wt(s,r),Gt(s,e,r)}s.__dataHost=e}}(this,t),this.__dataClientsReady&&(this._runEffectsForTemplate(t,this.__data,null,!1),this._flushClients()),r}_removeBoundDom(e){const t=e.templateInfo,{previousSibling:r,nextSibling:n,parent:i}=t;r?r.nextSibling=n:i&&(i.firstChild=n),n?n.previousSibling=r:i&&(i.lastChild=r),t.nextSibling=t.previousSibling=null;let s=t.childNodes;for(let e=0;e<s.length;e++){let t=s[e];qe(qe(t).parentNode).removeChild(t)}}static _parseTemplateNode(e,r,n){let i=t._parseTemplateNode.call(this,e,r,n);if(e.nodeType===Node.TEXT_NODE){let t=this._parseBindings(e.textContent,r);t&&(e.textContent=tr(t)||" ",Vt(this,r,n,"text","textContent",t),i=!0)}return i}static _parseTemplateNodeAttribute(e,r,n,i,s){let o=this._parseBindings(s,r);if(o){let t=i,s="property";It.test(i)?s="attribute":"$"==i[i.length-1]&&(i=i.slice(0,-1),s="attribute");let a=tr(o);return a&&"attribute"==s&&("class"==i&&e.hasAttribute("class")&&(a+=" "+e.getAttribute(i)),e.setAttribute(i,a)),"attribute"==s&&"disable-upgrade$"==t&&e.setAttribute(i,""),"input"===e.localName&&"value"===t&&e.setAttribute(t,""),e.removeAttribute(t),"property"===s&&(i=it(i)),Vt(this,r,n,s,i,o,a),!0}return t._parseTemplateNodeAttribute.call(this,e,r,n,i,s)}static _parseTemplateNestedTemplate(e,r,n){let i=t._parseTemplateNestedTemplate.call(this,e,r,n);const s=e.parentNode,o=n.templateInfo,a="dom-if"===s.localName,l="dom-repeat"===s.localName;Se&&(a||l)&&(s.removeChild(e),(n=n.parentInfo).templateInfo=o,n.noted=!0,i=!1);let p=o.hostProps;if(xe&&a)p&&(r.hostProps=Object.assign(r.hostProps||{},p),Se||(n.parentInfo.noted=!0));else{let e="{";for(let t in p){Vt(this,r,n,"property","_host_"+t,[{mode:e,source:t,dependencies:[t],hostProp:!0}])}}return i}static _parseBindings(e,t){let r,n=[],i=0;for(;null!==(r=er.exec(e));){r.index>i&&n.push({literal:e.slice(i,r.index)});let s=r[1][0],o=Boolean(r[2]),a=r[3].trim(),l=!1,p="",d=-1;"{"==s&&(d=a.indexOf("::"))>0&&(p=a.substring(d+2),a=a.substring(0,d),l=!0);let c=rr(a),h=[];if(c){let{args:e,methodName:r}=c;for(let t=0;t<e.length;t++){let r=e[t];r.literal||h.push(r)}let n=t.dynamicFns;(n&&n[r]||c.static)&&(h.push(r),c.dynamicFn=!0)}else h.push(a);n.push({source:a,mode:s,negate:o,customEvent:l,signature:c,dependencies:h,event:p}),i=er.lastIndex}if(i&&i<e.length){let t=e.substring(i);t&&n.push({literal:t})}return n.length?n:null}static _evaluateBinding(e,t,r,n,i,s){let o;return o=t.signature?Kt(e,r,n,0,t.signature):r!=t.source?Qe(e,t.source):s&&Ve(r)?Qe(e,r):e.__data[r],t.negate&&(o=!o),o}}}),lr=[];const pr=[];function dr(e){pr.push(e)}const cr=ke(e=>{const t=ft(e);function r(e){const t=Object.getPrototypeOf(e);return t.prototype instanceof i?t:null}function n(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",e))){let t=null;if(e.hasOwnProperty(JSCompiler_renameProperty("properties",e))){const r=e.properties;r&&(t=function(e){const t={};for(let r in e){const n=e[r];t[r]="function"==typeof n?{type:n}:n}return t}(r))}e.__ownProperties=t}return e.__ownProperties}class i extends t{static get observedAttributes(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes",this))){dr(this.prototype);const e=this._properties;this.__observedAttributes=e?Object.keys(e).map(e=>this.prototype._addPropertyToAttributeMap(e)):[]}return this.__observedAttributes}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const e=r(this);e&&e.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const e=n(this);e&&this.createProperties(e)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const e=r(this);this.__properties=Object.assign({},e&&e._properties,n(this))}return this.__properties}static typeForProperty(e){const t=this._properties[e];return t&&t.type}_initializeProperties(){this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return i}),hr=window.ShadyCSS&&window.ShadyCSS.cssBuild,ur=ke(e=>{const t=cr(ar(e));function r(e,t,r,n){if(!hr){const i=t.content.querySelectorAll("style"),s=Be(t),o=function(e){let t=Fe(e);return t?$e(t):[]}(r),a=t.content.firstElementChild;for(let r=0;r<o.length;r++){let i=o[r];i.textContent=e._processStyleText(i.textContent,n),t.content.insertBefore(i,a)}let l=0;for(let t=0;t<s.length;t++){let r=s[t],o=i[l];o!==r?(r=r.cloneNode(!0),o.parentNode.insertBefore(r,o)):l++,r.textContent=e._processStyleText(r.textContent,n)}}if(window.ShadyCSS&&window.ShadyCSS.prepareTemplate(t,r),Te&&hr&&he){const r=t.content.querySelectorAll("style");if(r){let t="";Array.from(r).forEach(e=>{t+=e.textContent,e.parentNode.removeChild(e)}),e._styleSheet=new CSSStyleSheet,e._styleSheet.replaceSync(t)}}}return class extends t{static get polymerElementVersion(){return"3.4.1"}static _finalizeClass(){t._finalizeClass.call(this);const e=((r=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",r))||(r.__ownObservers=r.hasOwnProperty(JSCompiler_renameProperty("observers",r))?r.observers:null),r.__ownObservers);var r;e&&this.createObservers(e,this._properties),this._prepareTemplate()}static _prepareTemplate(){let e=this.template;e&&("string"==typeof e?(console.error("template getter must return HTMLTemplateElement"),e=null):ge||(e=e.cloneNode(!0))),this.prototype._template=e}static createProperties(e){for(let s in e)t=this.prototype,r=s,n=e[s],i=e,n.computed&&(n.readOnly=!0),n.computed&&(t._hasReadOnlyEffect(r)?console.warn(`Cannot redefine computed property '${r}'.`):t._createComputedProperty(r,n.computed,i)),n.readOnly&&!t._hasReadOnlyEffect(r)?t._createReadOnlyProperty(r,!n.computed):!1===n.readOnly&&t._hasReadOnlyEffect(r)&&console.warn(`Cannot make readOnly property '${r}' non-readOnly.`),n.reflectToAttribute&&!t._hasReflectEffect(r)?t._createReflectedProperty(r):!1===n.reflectToAttribute&&t._hasReflectEffect(r)&&console.warn(`Cannot make reflected property '${r}' non-reflected.`),n.notify&&!t._hasNotifyEffect(r)?t._createNotifyingProperty(r):!1===n.notify&&t._hasNotifyEffect(r)&&console.warn(`Cannot make notify property '${r}' non-notify.`),n.observer&&t._createPropertyObserver(r,n.observer,i[n.observer]),t._addPropertyToAttributeMap(r);var t,r,n,i}static createObservers(e,t){const r=this.prototype;for(let n=0;n<e.length;n++)r._createMethodObserver(e[n],t)}static get template(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_template",this))){const e=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:void 0;this._template=void 0!==e?e:this.hasOwnProperty(JSCompiler_renameProperty("is",this))&&function(e){let t=null;if(e&&(!me||ye)&&(t=Le.import(e,"template"),me&&!t))throw new Error("strictTemplatePolicy: expecting dom-module or null template for "+e);return t}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template}return this._template}static set template(e){this._template=e}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const e=this.importMeta;if(e)this._importPath=de(e.url);else{const e=Le.import(this.is);this._importPath=e&&e.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super(),this._template,this._importPath,this.rootPath,this.importPath,this.root,this.$}_initializeProperties(){this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=ue,this.importPath=this.constructor.importPath;let e=function(e){if(!e.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",e))){e.__propertyDefaults=null;let t=e._properties;for(let r in t){let n=t[r];"value"in n&&(e.__propertyDefaults=e.__propertyDefaults||{},e.__propertyDefaults[r]=n)}}return e.__propertyDefaults}(this.constructor);if(e)for(let t in e){let r=e[t];if(this._canApplyPropertyDefault(t)){let e="function"==typeof r.value?r.value.call(this):r.value;this._hasAccessor(t)?this._setPendingProperty(t,e,!0):this[t]=e}}}_canApplyPropertyDefault(e){return!this.hasOwnProperty(e)}static _processStyleText(e,t){return pe(e,t)}static _finalizeTemplate(e){const t=this.prototype._template;if(t&&!t.__polymerFinalized){t.__polymerFinalized=!0;const n=this.importPath;r(this,t,e,n?le(n):""),this.prototype._bindTemplate(t)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(e){const t=qe(this);if(t.attachShadow)return e?(t.shadowRoot||(t.attachShadow({mode:"open",shadyUpgradeFragment:e}),t.shadowRoot.appendChild(e),this.constructor._styleSheet&&(t.shadowRoot.adoptedStyleSheets=[this.constructor._styleSheet])),we&&window.ShadyDOM&&window.ShadyDOM.flushInitial(t.shadowRoot),t.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(e){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,e)}resolveUrl(e,t){return!t&&this.importPath&&(t=le(this.importPath)),le(e,t)}static _parseTemplateContent(e,r,n){return r.dynamicFns=r.dynamicFns||this._properties,t._parseTemplateContent.call(this,e,r,n)}static _addTemplatePropertyEffect(e,r,n){return!be||r in this._properties||n.info.part.signature&&n.info.part.signature.static||n.info.part.hostProp||e.nestedTemplate||console.warn(`Property '${r}' used in template but not declared in 'properties'; attribute will not be observed.`),t._addTemplatePropertyEffect.call(this,e,r,n)}}});class _r{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(e,t){this._asyncModule=e,this._callback=t,this._timer=this._asyncModule.run(()=>{this._timer=null,fr.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),fr.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(e,t,r){return e instanceof _r?e._cancelAsync():e=new _r,e.setConfig(t,r),e}}let fr=new Set;const mr=function(e){fr.add(e)},yr=function(){const e=Boolean(fr.size);return fr.forEach(e=>{try{e.flush()}catch(e){setTimeout(()=>{throw e})}}),e};let gr="string"==typeof document.head.style.touchAction,br="__polymerGesturesHandled",wr="__polymerGesturesTouchAction",Pr=["mousedown","mousemove","mouseup","click"],vr=[0,1,4,2],Cr=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(e){return!1}}();function Sr(e){return Pr.indexOf(e)>-1}let xr=!1;function Er(e){if(!Sr(e)&&"touchend"!==e)return gr&&xr&&fe?{passive:!0}:void 0}!function(){try{let e=Object.defineProperty({},"passive",{get(){xr=!0}});window.addEventListener("test",null,e),window.removeEventListener("test",null,e)}catch(e){}}();let Or=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const Tr=[],Ar={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},Nr={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function kr(e){let t=Array.prototype.slice.call(e.labels||[]);if(!t.length){t=[];let r=e.getRootNode();if(e.id){let n=r.querySelectorAll(`label[for = ${e.id}]`);for(let e=0;e<n.length;e++)t.push(n[e])}}return t}let Ir=function(e){let t=e.sourceCapabilities;var r;if((!t||t.firesTouchEvents)&&(e[br]={skip:!0},"click"===e.type)){let t=!1,n=Hr(e);for(let e=0;e<n.length;e++){if(n[e].nodeType===Node.ELEMENT_NODE)if("label"===n[e].localName)Tr.push(n[e]);else if(r=n[e],Ar[r.localName]){let r=kr(n[e]);for(let e=0;e<r.length;e++)t=t||Tr.indexOf(r[e])>-1}if(n[e]===Rr.mouse.target)return}if(t)return;e.preventDefault(),e.stopPropagation()}};function Mr(e){let t=Or?["click"]:Pr;for(let r,n=0;n<t.length;n++)r=t[n],e?(Tr.length=0,document.addEventListener(r,Ir,!0)):document.removeEventListener(r,Ir,!0)}function Dr(e){let t=e.type;if(!Sr(t))return!1;if("mousemove"===t){let t=void 0===e.buttons?1:e.buttons;return e instanceof window.MouseEvent&&!Cr&&(t=vr[e.which]||0),Boolean(1&t)}return 0===(void 0===e.button?0:e.button)}let Rr={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function Lr(e,t,r){e.movefn=t,e.upfn=r,document.addEventListener("mousemove",t),document.addEventListener("mouseup",r)}function Fr(e){document.removeEventListener("mousemove",e.movefn),document.removeEventListener("mouseup",e.upfn),e.movefn=null,e.upfn=null}Ce&&document.addEventListener("touchend",(function(e){if(!Ce)return;Rr.mouse.mouseIgnoreJob||Mr(!0),Rr.mouse.target=Hr(e)[0],Rr.mouse.mouseIgnoreJob=_r.debounce(Rr.mouse.mouseIgnoreJob,ht.after(2500),(function(){Mr(),Rr.mouse.target=null,Rr.mouse.mouseIgnoreJob=null}))}),!!xr&&{passive:!0});const Hr=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:e=>e.composedPath&&e.composedPath()||[],zr={},jr=[];function Br(e){const t=Hr(e);return t.length>0?t[0]:e.target}function $r(e){let t,r=e.type,n=e.currentTarget.__polymerGestures;if(!n)return;let i=n[r];if(i){if(!e[br]&&(e[br]={},"touch"===r.slice(0,5))){let t=(e=e).changedTouches[0];if("touchstart"===r&&1===e.touches.length&&(Rr.touch.id=t.identifier),Rr.touch.id!==t.identifier)return;gr||"touchstart"!==r&&"touchmove"!==r||function(e){let t=e.changedTouches[0],r=e.type;if("touchstart"===r)Rr.touch.x=t.clientX,Rr.touch.y=t.clientY,Rr.touch.scrollDecided=!1;else if("touchmove"===r){if(Rr.touch.scrollDecided)return;Rr.touch.scrollDecided=!0;let r=function(e){let t="auto",r=Hr(e);for(let e,n=0;n<r.length;n++)if(e=r[n],e[wr]){t=e[wr];break}return t}(e),n=!1,i=Math.abs(Rr.touch.x-t.clientX),s=Math.abs(Rr.touch.y-t.clientY);e.cancelable&&("none"===r?n=!0:"pan-x"===r?n=s>i:"pan-y"===r&&(n=i>s)),n?e.preventDefault():Jr("track")}}(e)}if(t=e[br],!t.skip){for(let r,n=0;n<jr.length;n++)r=jr[n],i[r.name]&&!t[r.name]&&r.flow&&r.flow.start.indexOf(e.type)>-1&&r.reset&&r.reset();for(let n,s=0;s<jr.length;s++)n=jr[s],i[n.name]&&!t[n.name]&&(t[n.name]=!0,n[r](e))}}}function Ur(e,t,r){return!!zr[t]&&(function(e,t,r){let n=zr[t],i=n.deps,s=n.name,o=e.__polymerGestures;o||(e.__polymerGestures=o={});for(let t,r,n=0;n<i.length;n++)t=i[n],Or&&Sr(t)&&"click"!==t||(r=o[t],r||(o[t]=r={_count:0}),0===r._count&&e.addEventListener(t,$r,Er(t)),r[s]=(r[s]||0)+1,r._count=(r._count||0)+1);e.addEventListener(t,r),n.touchAction&&Vr(e,n.touchAction)}(e,t,r),!0)}function Xr(e,t,r){return!!zr[t]&&(function(e,t,r){let n=zr[t],i=n.deps,s=n.name,o=e.__polymerGestures;if(o)for(let t,r,n=0;n<i.length;n++)t=i[n],r=o[t],r&&r[s]&&(r[s]=(r[s]||1)-1,r._count=(r._count||1)-1,0===r._count&&e.removeEventListener(t,$r,Er(t)));e.removeEventListener(t,r)}(e,t,r),!0)}function qr(e){jr.push(e);for(let t=0;t<e.emits.length;t++)zr[e.emits[t]]=e}function Vr(e,t){gr&&e instanceof HTMLElement&&ut.run(()=>{e.style.touchAction=t}),e[wr]=t}function Yr(e,t,r){let n=new Event(t,{bubbles:!0,cancelable:!0,composed:!0});if(n.detail=r,qe(e).dispatchEvent(n),n.defaultPrevented){let e=r.preventer||r.sourceEvent;e&&e.preventDefault&&e.preventDefault()}}function Jr(e){let t=function(e){for(let t,r=0;r<jr.length;r++){t=jr[r];for(let r,n=0;n<t.emits.length;n++)if(r=t.emits[n],r===e)return t}return null}(e);t.info&&(t.info.prevent=!0)}function Wr(e,t,r,n){t&&Yr(t,e,{x:r.clientX,y:r.clientY,sourceEvent:r,preventer:n,prevent:function(e){return Jr(e)}})}function Gr(e,t,r){if(e.prevent)return!1;if(e.started)return!0;let n=Math.abs(e.x-t),i=Math.abs(e.y-r);return n>=5||i>=5}function Zr(e,t,r){if(!t)return;let n,i=e.moves[e.moves.length-2],s=e.moves[e.moves.length-1],o=s.x-e.x,a=s.y-e.y,l=0;i&&(n=s.x-i.x,l=s.y-i.y),Yr(t,"track",{state:e.state,x:r.clientX,y:r.clientY,dx:o,dy:a,ddx:n,ddy:l,sourceEvent:r,hover:function(){return function(e,t){let r=document.elementFromPoint(e,t),n=r;for(;n&&n.shadowRoot&&!window.ShadyDOM;){let i=n;if(n=n.shadowRoot.elementFromPoint(e,t),i===n)break;n&&(r=n)}return r}(r.clientX,r.clientY)}})}function Kr(e,t,r){let n=Math.abs(t.clientX-e.x),i=Math.abs(t.clientY-e.y),s=Br(r||t);!s||Nr[s.localName]&&s.hasAttribute("disabled")||(isNaN(n)||isNaN(i)||n<=25&&i<=25||function(e){if("click"===e.type){if(0===e.detail)return!0;let t=Br(e);if(!t.nodeType||t.nodeType!==Node.ELEMENT_NODE)return!0;let r=t.getBoundingClientRect(),n=e.pageX,i=e.pageY;return!(n>=r.left&&n<=r.right&&i>=r.top&&i<=r.bottom)}return!1}(t))&&(e.prevent||Yr(s,"tap",{x:t.clientX,y:t.clientY,sourceEvent:t,preventer:r}))}qr({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){Fr(this.info)},mousedown:function(e){if(!Dr(e))return;let t=Br(e),r=this;Lr(this.info,(function(e){Dr(e)||(Wr("up",t,e),Fr(r.info))}),(function(e){Dr(e)&&Wr("up",t,e),Fr(r.info)})),Wr("down",t,e)},touchstart:function(e){Wr("down",Br(e),e.changedTouches[0],e)},touchend:function(e){Wr("up",Br(e),e.changedTouches[0],e)}}),qr({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(e){this.moves.length>2&&this.moves.shift(),this.moves.push(e)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,Fr(this.info)},mousedown:function(e){if(!Dr(e))return;let t=Br(e),r=this,n=function(e){let n=e.clientX,i=e.clientY;Gr(r.info,n,i)&&(r.info.state=r.info.started?"mouseup"===e.type?"end":"track":"start","start"===r.info.state&&Jr("tap"),r.info.addMove({x:n,y:i}),Dr(e)||(r.info.state="end",Fr(r.info)),t&&Zr(r.info,t,e),r.info.started=!0)};Lr(this.info,n,(function(e){r.info.started&&n(e),Fr(r.info)})),this.info.x=e.clientX,this.info.y=e.clientY},touchstart:function(e){let t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchmove:function(e){let t=Br(e),r=e.changedTouches[0],n=r.clientX,i=r.clientY;Gr(this.info,n,i)&&("start"===this.info.state&&Jr("tap"),this.info.addMove({x:n,y:i}),Zr(this.info,t,r),this.info.state="track",this.info.started=!0)},touchend:function(e){let t=Br(e),r=e.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:r.clientX,y:r.clientY}),Zr(this.info,t,r))}}),qr({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(e){Dr(e)&&(this.info.x=e.clientX,this.info.y=e.clientY)},click:function(e){Dr(e)&&Kr(this.info,e)},touchstart:function(e){const t=e.changedTouches[0];this.info.x=t.clientX,this.info.y=t.clientY},touchend:function(e){Kr(this.info,e.changedTouches[0],e)}});const Qr=ke(e=>class extends e{_addEventListenerToNode(e,t,r){Ur(e,t,r)||super._addEventListenerToNode(e,t,r)}_removeEventListenerFromNode(e,t,r){Xr(e,t,r)||super._removeEventListenerFromNode(e,t,r)}}),en=/:host\(:dir\((ltr|rtl)\)\)/g,tn=/([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,rn=/:dir\((?:ltr|rtl)\)/,nn=Boolean(window.ShadyDOM&&window.ShadyDOM.inUse),sn=[];let on=null,an="";function ln(){an=document.documentElement.getAttribute("dir")}function pn(e){if(!e.__autoDirOptOut){e.setAttribute("dir",an)}}function dn(){ln(),an=document.documentElement.getAttribute("dir");for(let e=0;e<sn.length;e++)pn(sn[e])}const cn=ke(e=>{nn||on||(ln(),on=new MutationObserver(dn),on.observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]}));const t=gt(e);class r extends t{static _processStyleText(e,r){return e=t._processStyleText.call(this,e,r),!nn&&rn.test(e)&&(e=this._replaceDirInCssText(e),this.__activateDir=!0),e}static _replaceDirInCssText(e){let t=e;return t=t.replace(en,':host([dir="$1"])'),t=t.replace(tn,':host([dir="$2"]) $1'),t}constructor(){super(),this.__autoDirOptOut=!1}ready(){super.ready(),this.__autoDirOptOut=this.hasAttribute("dir")}connectedCallback(){t.prototype.connectedCallback&&super.connectedCallback(),this.constructor.__activateDir&&(on&&on.takeRecords().length&&dn(),sn.push(this),pn(this))}disconnectedCallback(){if(t.prototype.disconnectedCallback&&super.disconnectedCallback(),this.constructor.__activateDir){const e=sn.indexOf(this);e>-1&&sn.splice(e,1)}}}return r.__activateDir=!1,r});function hn(){document.body.removeAttribute("unresolved")}function un(e,t,r){return{index:e,removed:t,addedCount:r}}"interactive"===document.readyState||"complete"===document.readyState?hn():window.addEventListener("DOMContentLoaded",hn);function _n(e,t,r,n,i,s){let o,a=0,l=0,p=Math.min(r-t,s-i);if(0==t&&0==i&&(a=function(e,t,r){for(let n=0;n<r;n++)if(!mn(e[n],t[n]))return n;return r}(e,n,p)),r==e.length&&s==n.length&&(l=function(e,t,r){let n=e.length,i=t.length,s=0;for(;s<r&&mn(e[--n],t[--i]);)s++;return s}(e,n,p-a)),i+=a,s-=l,(r-=l)-(t+=a)==0&&s-i==0)return[];if(t==r){for(o=un(t,[],0);i<s;)o.removed.push(n[i++]);return[o]}if(i==s)return[un(t,[],r-t)];let d=function(e){let t=e.length-1,r=e[0].length-1,n=e[t][r],i=[];for(;t>0||r>0;){if(0==t){i.push(2),r--;continue}if(0==r){i.push(3),t--;continue}let s,o=e[t-1][r-1],a=e[t-1][r],l=e[t][r-1];s=a<l?a<o?a:o:l<o?l:o,s==o?(o==n?i.push(0):(i.push(1),n=o),t--,r--):s==a?(i.push(3),t--,n=a):(i.push(2),r--,n=l)}return i.reverse(),i}(function(e,t,r,n,i,s){let o=s-i+1,a=r-t+1,l=new Array(o);for(let e=0;e<o;e++)l[e]=new Array(a),l[e][0]=e;for(let e=0;e<a;e++)l[0][e]=e;for(let r=1;r<o;r++)for(let s=1;s<a;s++)if(mn(e[t+s-1],n[i+r-1]))l[r][s]=l[r-1][s-1];else{let e=l[r-1][s]+1,t=l[r][s-1]+1;l[r][s]=e<t?e:t}return l}(e,t,r,n,i,s));o=void 0;let c=[],h=t,u=i;for(let e=0;e<d.length;e++)switch(d[e]){case 0:o&&(c.push(o),o=void 0),h++,u++;break;case 1:o||(o=un(h,[],0)),o.addedCount++,h++,o.removed.push(n[u]),u++;break;case 2:o||(o=un(h,[],0)),o.addedCount++,h++;break;case 3:o||(o=un(h,[],0)),o.removed.push(n[u]),u++}return o&&c.push(o),c}function fn(e,t){return _n(e,0,e.length,t,0,t.length)}function mn(e,t){return e===t}function yn(e){return"slot"===e.localName}let gn=class{static getFlattenedNodes(e){const t=qe(e);return yn(e)?(e=e,t.assignedNodes({flatten:!0})):Array.from(t.childNodes).map(e=>yn(e)?qe(e=e).assignedNodes({flatten:!0}):[e]).reduce((e,t)=>e.concat(t),[])}constructor(e,t){this._shadyChildrenObserver=null,this._nativeChildrenObserver=null,this._connected=!1,this._target=e,this.callback=t,this._effectiveNodes=[],this._observer=null,this._scheduled=!1,this._boundSchedule=()=>{this._schedule()},this.connect(),this._schedule()}connect(){yn(this._target)?this._listenSlots([this._target]):qe(this._target).children&&(this._listenSlots(qe(this._target).children),window.ShadyDOM?this._shadyChildrenObserver=window.ShadyDOM.observeChildren(this._target,e=>{this._processMutations(e)}):(this._nativeChildrenObserver=new MutationObserver(e=>{this._processMutations(e)}),this._nativeChildrenObserver.observe(this._target,{childList:!0}))),this._connected=!0}disconnect(){yn(this._target)?this._unlistenSlots([this._target]):qe(this._target).children&&(this._unlistenSlots(qe(this._target).children),window.ShadyDOM&&this._shadyChildrenObserver?(window.ShadyDOM.unobserveChildren(this._shadyChildrenObserver),this._shadyChildrenObserver=null):this._nativeChildrenObserver&&(this._nativeChildrenObserver.disconnect(),this._nativeChildrenObserver=null)),this._connected=!1}_schedule(){this._scheduled||(this._scheduled=!0,ut.run(()=>this.flush()))}_processMutations(e){this._processSlotMutations(e),this.flush()}_processSlotMutations(e){if(e)for(let t=0;t<e.length;t++){let r=e[t];r.addedNodes&&this._listenSlots(r.addedNodes),r.removedNodes&&this._unlistenSlots(r.removedNodes)}}flush(){if(!this._connected)return!1;window.ShadyDOM&&ShadyDOM.flush(),this._nativeChildrenObserver?this._processSlotMutations(this._nativeChildrenObserver.takeRecords()):this._shadyChildrenObserver&&this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),this._scheduled=!1;let e={target:this._target,addedNodes:[],removedNodes:[]},t=this.constructor.getFlattenedNodes(this._target),r=fn(t,this._effectiveNodes);for(let t,n=0;n<r.length&&(t=r[n]);n++)for(let r,n=0;n<t.removed.length&&(r=t.removed[n]);n++)e.removedNodes.push(r);for(let n,i=0;i<r.length&&(n=r[i]);i++)for(let r=n.index;r<n.index+n.addedCount;r++)e.addedNodes.push(t[r]);this._effectiveNodes=t;let n=!1;return(e.addedNodes.length||e.removedNodes.length)&&(n=!0,this.callback.call(this._target,e)),n}_listenSlots(e){for(let t=0;t<e.length;t++){let r=e[t];yn(r)&&r.addEventListener("slotchange",this._boundSchedule)}}_unlistenSlots(e){for(let t=0;t<e.length;t++){let r=e[t];yn(r)&&r.removeEventListener("slotchange",this._boundSchedule)}}};const bn=function(){let e,t;do{e=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),t=yr()}while(e||t)},wn=Element.prototype,Pn=wn.matches||wn.matchesSelector||wn.mozMatchesSelector||wn.msMatchesSelector||wn.oMatchesSelector||wn.webkitMatchesSelector,vn=function(e,t){return Pn.call(e,t)};class Cn{constructor(e){window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.patch(e),this.node=e}observeNodes(e){return new gn(this.node,e)}unobserveNodes(e){e.disconnect()}notifyObserver(){}deepContains(e){if(qe(this.node).contains(e))return!0;let t=e,r=e.ownerDocument;for(;t&&t!==r&&t!==this.node;)t=qe(t).parentNode||qe(t).host;return t===this.node}getOwnerRoot(){return qe(this.node).getRootNode()}getDistributedNodes(){return"slot"===this.node.localName?qe(this.node).assignedNodes({flatten:!0}):[]}getDestinationInsertionPoints(){let e=[],t=qe(this.node).assignedSlot;for(;t;)e.push(t),t=qe(t).assignedSlot;return e}importNode(e,t){let r=this.node instanceof Document?this.node:this.node.ownerDocument;return qe(r).importNode(e,t)}getEffectiveChildNodes(){return gn.getFlattenedNodes(this.node)}queryDistributedElements(e){let t=this.getEffectiveChildNodes(),r=[];for(let n,i=0,s=t.length;i<s&&(n=t[i]);i++)n.nodeType===Node.ELEMENT_NODE&&vn(n,e)&&r.push(n);return r}get activeElement(){let e=this.node;return void 0!==e._activeElement?e._activeElement:e.activeElement}}function Sn(e,t){for(let r=0;r<t.length;r++){let n=t[r];Object.defineProperty(e,n,{get:function(){return this.node[n]},configurable:!0})}}class xn{constructor(e){this.event=e}get rootTarget(){return this.path[0]}get localTarget(){return this.event.target}get path(){return this.event.composedPath()}}Cn.prototype.cloneNode,Cn.prototype.appendChild,Cn.prototype.insertBefore,Cn.prototype.removeChild,Cn.prototype.replaceChild,Cn.prototype.setAttribute,Cn.prototype.removeAttribute,Cn.prototype.querySelector,Cn.prototype.querySelectorAll,Cn.prototype.parentNode,Cn.prototype.firstChild,Cn.prototype.lastChild,Cn.prototype.nextSibling,Cn.prototype.previousSibling,Cn.prototype.firstElementChild,Cn.prototype.lastElementChild,Cn.prototype.nextElementSibling,Cn.prototype.previousElementSibling,Cn.prototype.childNodes,Cn.prototype.children,Cn.prototype.classList,Cn.prototype.textContent,Cn.prototype.innerHTML;let En=Cn;if(window.ShadyDOM&&window.ShadyDOM.inUse&&window.ShadyDOM.noPatch&&window.ShadyDOM.Wrapper){class e extends window.ShadyDOM.Wrapper{}Object.getOwnPropertyNames(Cn.prototype).forEach(t=>{"activeElement"!=t&&(e.prototype[t]=Cn.prototype[t])}),Sn(e.prototype,["classList"]),En=e,Object.defineProperties(xn.prototype,{localTarget:{get(){const e=this.event.currentTarget,t=e&&On(e).getOwnerRoot(),r=this.path;for(let e=0;e<r.length;e++){const n=r[e];if(On(n).getOwnerRoot()===t)return n}},configurable:!0},path:{get(){return window.ShadyDOM.composedPath(this.event)},configurable:!0}})}else!function(e,t){for(let r=0;r<t.length;r++){let n=t[r];e[n]=function(){return this.node[n].apply(this.node,arguments)}}}(Cn.prototype,["cloneNode","appendChild","insertBefore","removeChild","replaceChild","setAttribute","removeAttribute","querySelector","querySelectorAll"]),Sn(Cn.prototype,["parentNode","firstChild","lastChild","nextSibling","previousSibling","firstElementChild","lastElementChild","nextElementSibling","previousElementSibling","childNodes","children","classList"]),function(e,t){for(let r=0;r<t.length;r++){let n=t[r];Object.defineProperty(e,n,{get:function(){return this.node[n]},set:function(e){this.node[n]=e},configurable:!0})}}(Cn.prototype,["textContent","innerHTML","className"]);const On=function(e){if((e=e||document)instanceof En)return e;if(e instanceof xn)return e;let t=e.__domApi;return t||(t=e instanceof Event?new xn(e):new En(e),e.__domApi=t),t},Tn=window.ShadyDOM,An=window.ShadyCSS;function Nn(e,t){return qe(e).getRootNode()===t}const kn=e=>{for(;e;){const t=Object.getOwnPropertyDescriptor(e,"observedAttributes");if(t)return t.get;e=Object.getPrototypeOf(e.prototype).constructor}return()=>[]};ke(e=>{const t=ur(e);let r=kn(t);return class extends t{constructor(){super(),this.__isUpgradeDisabled}static get observedAttributes(){return r.call(this).concat("disable-upgrade")}_initializeProperties(){this.hasAttribute("disable-upgrade")?this.__isUpgradeDisabled=!0:super._initializeProperties()}_enableProperties(){this.__isUpgradeDisabled||super._enableProperties()}_canApplyPropertyDefault(e){return super._canApplyPropertyDefault(e)&&!(this.__isUpgradeDisabled&&this._isPropertyPending(e))}attributeChangedCallback(e,t,r,n){"disable-upgrade"==e?this.__isUpgradeDisabled&&null==r&&(super._initializeProperties(),this.__isUpgradeDisabled=!1,qe(this).isConnected&&super.connectedCallback()):super.attributeChangedCallback(e,t,r,n)}connectedCallback(){this.__isUpgradeDisabled||super.connectedCallback()}disconnectedCallback(){this.__isUpgradeDisabled||super.disconnectedCallback()}}});let In=window.ShadyCSS;const Mn=ke(e=>{const t=Qr(ur(e)),r=hr?t:cn(t),n=kn(r),i={x:"pan-x",y:"pan-y",none:"none",all:"auto"};class s extends r{constructor(){super(),this.isAttached,this.__boundListeners,this._debouncers,this.__isUpgradeDisabled,this.__needsAttributesAtConnected,this._legacyForceObservedAttributes}static get importMeta(){return this.prototype.importMeta}created(){}__attributeReaction(e,t,r){(this.__dataAttributes&&this.__dataAttributes[e]||"disable-upgrade"===e)&&this.attributeChangedCallback(e,t,r,null)}setAttribute(e,t){if(Oe&&!this._legacyForceObservedAttributes){const r=this.getAttribute(e);super.setAttribute(e,t),this.__attributeReaction(e,r,String(t))}else super.setAttribute(e,t)}removeAttribute(e){if(Oe&&!this._legacyForceObservedAttributes){const t=this.getAttribute(e);super.removeAttribute(e),this.__attributeReaction(e,t,null)}else super.removeAttribute(e)}static get observedAttributes(){return Oe&&!this.prototype._legacyForceObservedAttributes?(this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes",this))||(this.__observedAttributes=[],dr(this.prototype)),this.__observedAttributes):n.call(this).concat("disable-upgrade")}_enableProperties(){this.__isUpgradeDisabled||super._enableProperties()}_canApplyPropertyDefault(e){return super._canApplyPropertyDefault(e)&&!(this.__isUpgradeDisabled&&this._isPropertyPending(e))}connectedCallback(){this.__needsAttributesAtConnected&&this._takeAttributes(),this.__isUpgradeDisabled||(super.connectedCallback(),this.isAttached=!0,this.attached())}attached(){}disconnectedCallback(){this.__isUpgradeDisabled||(super.disconnectedCallback(),this.isAttached=!1,this.detached())}detached(){}attributeChangedCallback(e,t,r,n){t!==r&&("disable-upgrade"==e?this.__isUpgradeDisabled&&null==r&&(this._initializeProperties(),this.__isUpgradeDisabled=!1,qe(this).isConnected&&this.connectedCallback()):(super.attributeChangedCallback(e,t,r,n),this.attributeChanged(e,t,r)))}attributeChanged(e,t,r){}_initializeProperties(){if(ge&&this.hasAttribute("disable-upgrade"))this.__isUpgradeDisabled=!0;else{let e=Object.getPrototypeOf(this);e.hasOwnProperty(JSCompiler_renameProperty("__hasRegisterFinished",e))||(this._registered(),e.__hasRegisterFinished=!0),super._initializeProperties(),this.root=this,this.created(),Oe&&!this._legacyForceObservedAttributes&&(this.hasAttributes()?this._takeAttributes():this.parentNode||(this.__needsAttributesAtConnected=!0)),this._applyListeners()}}_takeAttributes(){const e=this.attributes;for(let t=0,r=e.length;t<r;t++){const r=e[t];this.__attributeReaction(r.name,null,r.value)}}_registered(){}ready(){this._ensureAttributes(),super.ready()}_ensureAttributes(){}_applyListeners(){}serialize(e){return this._serializeValue(e)}deserialize(e,t){return this._deserializeValue(e,t)}reflectPropertyToAttribute(e,t,r){this._propertyToAttribute(e,t,r)}serializeValueToAttribute(e,t,r){this._valueToNodeAttribute(r||this,e,t)}extend(e,t){if(!e||!t)return e||t;let r=Object.getOwnPropertyNames(t);for(let n,i=0;i<r.length&&(n=r[i]);i++){let r=Object.getOwnPropertyDescriptor(t,n);r&&Object.defineProperty(e,n,r)}return e}mixin(e,t){for(let r in t)e[r]=t[r];return e}chainObject(e,t){return e&&t&&e!==t&&(e.__proto__=t),e}instanceTemplate(e){let t=this.constructor._contentForTemplate(e);return document.importNode(t,!0)}fire(e,t,r){r=r||{},t=null==t?{}:t;let n=new Event(e,{bubbles:void 0===r.bubbles||r.bubbles,cancelable:Boolean(r.cancelable),composed:void 0===r.composed||r.composed});n.detail=t;let i=r.node||this;return qe(i).dispatchEvent(n),n}listen(e,t,r){e=e||this;let n=this.__boundListeners||(this.__boundListeners=new WeakMap),i=n.get(e);i||(i={},n.set(e,i));let s=t+r;i[s]||(i[s]=this._addMethodEventListenerToNode(e,t,r,this))}unlisten(e,t,r){e=e||this;let n=this.__boundListeners&&this.__boundListeners.get(e),i=t+r,s=n&&n[i];s&&(this._removeEventListenerFromNode(e,t,s),n[i]=null)}setScrollDirection(e,t){Vr(t||this,i[e]||"auto")}$$(e){return this.root.querySelector(e)}get domHost(){let e=qe(this).getRootNode();return e instanceof DocumentFragment?e.host:e}distributeContent(){const e=On(this);window.ShadyDOM&&e.shadowRoot&&ShadyDOM.flush()}getEffectiveChildNodes(){return On(this).getEffectiveChildNodes()}queryDistributedElements(e){return On(this).queryDistributedElements(e)}getEffectiveChildren(){return this.getEffectiveChildNodes().filter((function(e){return e.nodeType===Node.ELEMENT_NODE}))}getEffectiveTextContent(){let e=this.getEffectiveChildNodes(),t=[];for(let r,n=0;r=e[n];n++)r.nodeType!==Node.COMMENT_NODE&&t.push(r.textContent);return t.join("")}queryEffectiveChildren(e){let t=this.queryDistributedElements(e);return t&&t[0]}queryAllEffectiveChildren(e){return this.queryDistributedElements(e)}getContentChildNodes(e){let t=this.root.querySelector(e||"slot");return t?On(t).getDistributedNodes():[]}getContentChildren(e){return this.getContentChildNodes(e).filter((function(e){return e.nodeType===Node.ELEMENT_NODE}))}isLightDescendant(e){return this!==e&&qe(this).contains(e)&&qe(this).getRootNode()===qe(e).getRootNode()}isLocalDescendant(e){return this.root===qe(e).getRootNode()}scopeSubtree(e,t=!1){return function(e,t=!1){if(!Tn||!An)return null;if(!Tn.handlesDynamicScoping)return null;const r=An.ScopingShim;if(!r)return null;const n=r.scopeForNode(e),i=qe(e).getRootNode(),s=e=>{if(!Nn(e,i))return;const t=Array.from(Tn.nativeMethods.querySelectorAll.call(e,"*"));t.push(e);for(let e=0;e<t.length;e++){const s=t[e];if(!Nn(s,i))continue;const o=r.currentScopeForNode(s);o!==n&&(""!==o&&r.unscopeNode(s,o),r.scopeNode(s,n))}};if(s(e),t){const t=new MutationObserver(e=>{for(let t=0;t<e.length;t++){const r=e[t];for(let e=0;e<r.addedNodes.length;e++){const t=r.addedNodes[e];t.nodeType===Node.ELEMENT_NODE&&s(t)}}});return t.observe(e,{childList:!0,subtree:!0}),t}return null}(e,t)}getComputedStyleValue(e){return In.getComputedStyleValue(this,e)}debounce(e,t,r){return this._debouncers=this._debouncers||{},this._debouncers[e]=_r.debounce(this._debouncers[e],r>0?ht.after(r):ut,t.bind(this))}isDebouncerActive(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];return!(!t||!t.isActive())}flushDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.flush()}cancelDebouncer(e){this._debouncers=this._debouncers||{};let t=this._debouncers[e];t&&t.cancel()}async(e,t){return t>0?ht.run(e.bind(this),t):~ut.run(e.bind(this))}cancelAsync(e){e<0?ut.cancel(~e):ht.cancel(e)}create(e,t){let r=document.createElement(e);if(t)if(r.setProperties)r.setProperties(t);else for(let e in t)r[e]=t[e];return r}elementMatches(e,t){return vn(t||this,e)}toggleAttribute(e,t){let r=this;return 3===arguments.length&&(r=arguments[2]),1==arguments.length&&(t=!r.hasAttribute(e)),t?(qe(r).setAttribute(e,""),!0):(qe(r).removeAttribute(e),!1)}toggleClass(e,t,r){r=r||this,1==arguments.length&&(t=!r.classList.contains(e)),t?r.classList.add(e):r.classList.remove(e)}transform(e,t){(t=t||this).style.webkitTransform=e,t.style.transform=e}translate3d(e,t,r,n){n=n||this,this.transform("translate3d("+e+","+t+","+r+")",n)}arrayDelete(e,t){let r;if(Array.isArray(e)){if(r=e.indexOf(t),r>=0)return e.splice(r,1)}else{if(r=Qe(this,e).indexOf(t),r>=0)return this.splice(e,r,1)}return null}_logger(e,t){switch(Array.isArray(t)&&1===t.length&&Array.isArray(t[0])&&(t=t[0]),e){case"log":case"warn":case"error":console[e](...t)}}_log(...e){this._logger("log",e)}_warn(...e){this._logger("warn",e)}_error(...e){this._logger("error",e)}_logf(e,...t){return["[%s::%s]",this.is,e,...t]}}return s.prototype.is="",s}),Dn={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,listeners:!0,hostAttributes:!0},Rn={attached:!0,detached:!0,ready:!0,created:!0,beforeRegister:!0,registered:!0,attributeChanged:!0,behaviors:!0,_noAccessors:!0},Ln=Object.assign({listeners:!0,hostAttributes:!0,properties:!0,observers:!0},Rn);function Fn(e,t,r,n){!function(e,t,r){const n=e._noAccessors,i=Object.getOwnPropertyNames(e);for(let s=0;s<i.length;s++){let o=i[s];if(!(o in r))if(n)t[o]=e[o];else{let r=Object.getOwnPropertyDescriptor(e,o);r&&(r.configurable=!0,Object.defineProperty(t,o,r))}}}(t,e,n);for(let e in Dn)t[e]&&(r[e]=r[e]||[],r[e].push(t[e]))}function Hn(e,t){for(const r in t){const n=e[r],i=t[r];e[r]=!("value"in i)&&n&&"value"in n?Object.assign({value:n.value},i):i}}const zn=Mn(HTMLElement);function jn(e,t,r){let n;const i={};class s extends t{static _finalizeClass(){if(this.hasOwnProperty(JSCompiler_renameProperty("generatedFrom",this))){if(n)for(let e,t=0;t<n.length;t++)e=n[t],e.properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties);e.properties&&this.createProperties(e.properties),e.observers&&this.createObservers(e.observers,e.properties),this._prepareTemplate()}else t._finalizeClass.call(this)}static get properties(){const t={};if(n)for(let e=0;e<n.length;e++)Hn(t,n[e].properties);return Hn(t,e.properties),t}static get observers(){let t=[];if(n)for(let e,r=0;r<n.length;r++)e=n[r],e.observers&&(t=t.concat(e.observers));return e.observers&&(t=t.concat(e.observers)),t}created(){super.created();const e=i.created;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}_registered(){const e=s.prototype;if(!e.hasOwnProperty(JSCompiler_renameProperty("__hasRegisterFinished",e))){e.__hasRegisterFinished=!0,super._registered(),ge&&o(e);const t=Object.getPrototypeOf(this);let r=i.beforeRegister;if(r)for(let e=0;e<r.length;e++)r[e].call(t);if(r=i.registered,r)for(let e=0;e<r.length;e++)r[e].call(t)}}_applyListeners(){super._applyListeners();const e=i.listeners;if(e)for(let t=0;t<e.length;t++){const r=e[t];if(r)for(let e in r)this._addMethodEventListenerToNode(this,e,r[e])}}_ensureAttributes(){const e=i.hostAttributes;if(e)for(let t=e.length-1;t>=0;t--){const r=e[t];for(let e in r)this._ensureAttribute(e,r[e])}super._ensureAttributes()}ready(){super.ready();let e=i.ready;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attached(){super.attached();let e=i.attached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}detached(){super.detached();let e=i.detached;if(e)for(let t=0;t<e.length;t++)e[t].call(this)}attributeChanged(e,t,r){super.attributeChanged();let n=i.attributeChanged;if(n)for(let i=0;i<n.length;i++)n[i].call(this,e,t,r)}}if(r){Array.isArray(r)||(r=[r]);let e=t.prototype.behaviors;n=function e(t,r,n){r=r||[];for(let i=t.length-1;i>=0;i--){let s=t[i];s?Array.isArray(s)?e(s,r):r.indexOf(s)<0&&(!n||n.indexOf(s)<0)&&r.unshift(s):console.warn("behavior is null, check for missing or 404 import")}return r}(r,null,e),s.prototype.behaviors=e?e.concat(r):n}const o=t=>{n&&function(e,t,r){for(let n=0;n<t.length;n++)Fn(e,t[n],r,Ln)}(t,n,i),Fn(t,e,i,Rn)};return ge||o(s.prototype),s.generatedFrom=e,s}const Bn=function(e){let t;return t="function"==typeof e?e:Bn.Class(e),e._legacyForceObservedAttributes&&(t.prototype._legacyForceObservedAttributes=e._legacyForceObservedAttributes),customElements.define(t.is,t),t};function $n(e,t,r,n,i){let s;i&&(s="object"==typeof r&&null!==r,s&&(n=e.__dataTemp[t]));let o=n!==r&&(n==n||r==r);return s&&o&&(e.__dataTemp[t]=r),o}Bn.Class=function(e,t){e||console.warn("Polymer.Class requires `info` argument");let r=t?t(zn):zn;return r=jn(e,r,e.behaviors),r.is=r.prototype.is=e.is,r};const Un=ke(e=>class extends e{_shouldPropertyChange(e,t,r){return $n(this,e,t,r,!0)}}),Xn=ke(e=>class extends e{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(e,t,r){return $n(this,e,t,r,this.mutableData)}});Un._mutablePropertyChange=$n;let qn=null;function Vn(){return qn}Vn.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:Vn,writable:!0}});const Yn=ar(Vn),Jn=Un(Yn);const Wn=ar(class{});function Gn(e,t){for(let r=0;r<t.length;r++){let n=t[r];if(Boolean(e)!=Boolean(n.__hideTemplateChildren__))if(n.nodeType===Node.TEXT_NODE)e?(n.__polymerTextContent__=n.textContent,n.textContent=""):n.textContent=n.__polymerTextContent__;else if("slot"===n.localName)if(e)n.__polymerReplaced__=document.createComment("hidden-slot"),qe(qe(n).parentNode).replaceChild(n.__polymerReplaced__,n);else{const e=n.__polymerReplaced__;e&&qe(qe(e).parentNode).replaceChild(n,e)}else n.style&&(e?(n.__polymerDisplay__=n.style.display,n.style.display="none"):n.style.display=n.__polymerDisplay__);n.__hideTemplateChildren__=e,n._showHideChildren&&n._showHideChildren(e)}}class Zn extends Wn{constructor(e){super(),this._configureProperties(e),this.root=this._stampTemplate(this.__dataHost);let t=[];this.children=t;for(let e=this.root.firstChild;e;e=e.nextSibling)t.push(e),e.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let r=this.__templatizeOptions;(e&&r.instanceProps||!r.instanceProps)&&this._enableProperties()}_configureProperties(e){if(this.__templatizeOptions.forwardHostProp)for(let e in this.__hostProps)this._setPendingProperty(e,this.__dataHost["_host_"+e]);for(let t in e)this._setPendingProperty(t,e[t])}forwardHostProp(e,t){this._setPendingPropertyOrPath(e,t,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(e,t,r){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(e,t,e=>{e.model=this,r(e)});else{let n=this.__dataHost.__dataHost;n&&n._addEventListenerToNode(e,t,r)}}_showHideChildren(e){Gn(e,this.children)}_setUnmanagedPropertyToNode(e,t,r){e.__hideTemplateChildren__&&e.nodeType==Node.TEXT_NODE&&"textContent"==t?e.__polymerTextContent__=r:super._setUnmanagedPropertyToNode(e,t,r)}get parentModel(){let e=this.__parentModel;if(!e){let t;e=this;do{e=e.__dataHost.__dataHost}while((t=e.__templatizeOptions)&&!t.parentModel);this.__parentModel=e}return e}dispatchEvent(e){return!0}}Zn.prototype.__dataHost,Zn.prototype.__templatizeOptions,Zn.prototype._methodHost,Zn.prototype.__templatizeOwner,Zn.prototype.__hostProps;const Kn=Un(Zn);function Qn(e){let t=e.__dataHost;return t&&t._methodHost||t}function ei(e,t,r){let n=r.mutableData?Kn:Zn;ii.mixin&&(n=ii.mixin(n));let i=class extends n{};return i.prototype.__templatizeOptions=r,i.prototype._bindTemplate(e),function(e,t,r,n){let i=r.hostProps||{};for(let t in n.instanceProps){delete i[t];let r=n.notifyInstanceProp;r&&e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:ni(t,r)})}if(n.forwardHostProp&&t.__dataHost)for(let t in i)r.hasHostProps||(r.hasHostProps=!0),e.prototype._addPropertyEffect(t,e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:function(e,t,r){e.__dataHost._setPendingPropertyOrPath("_host_"+t,r[t],!0,!0)}})}(i,e,t,r),i}function ti(e,t,r,n){let i=r.forwardHostProp;if(i&&t.hasHostProps){const a="template"==e.localName;let l=t.templatizeTemplateClass;if(!l){if(a){let e=r.mutableData?Jn:Yn;class n extends e{}l=t.templatizeTemplateClass=n}else{const r=e.constructor;class n extends r{}l=t.templatizeTemplateClass=n}let s=t.hostProps;for(let e in s)l.prototype._addPropertyEffect("_host_"+e,l.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:ri(e,i)}),l.prototype._createNotifyingProperty("_host_"+e);be&&n&&function(e,t,r){const n=r.constructor._properties,{propertyEffects:i}=e,{instanceProps:s}=t;for(let e in i)if(!(n[e]||s&&s[e])){const t=i[e];for(let r=0;r<t.length;r++){const{part:n}=t[r].info;if(!n.signature||!n.signature.static){console.warn(`Property '${e}' used in template but not declared in 'properties'; attribute will not be observed.`);break}}}}(t,r,n)}if(e.__dataProto&&Object.assign(e.__data,e.__dataProto),a)o=l,qn=s=e,Object.setPrototypeOf(s,o.prototype),new o,qn=null,e.__dataTemp={},e.__dataPending=null,e.__dataOld=null,e._enableProperties();else{Object.setPrototypeOf(e,l.prototype);const r=t.hostProps;for(let t in r)if(t="_host_"+t,t in e){const r=e[t];delete e[t],e.__data[t]=r}}}var s,o}function ri(e,t){return function(e,r,n){t.call(e.__templatizeOwner,r.substring("_host_".length),n[r])}}function ni(e,t){return function(e,r,n){t.call(e.__templatizeOwner,e,r,n[r])}}function ii(e,t,r){if(me&&!Qn(e))throw new Error("strictTemplatePolicy: template owner not trusted");if(r=r||{},e.__templatizeOwner)throw new Error("A <template> can only be templatized once");e.__templatizeOwner=t;let n=(t?t.constructor:Zn)._parseTemplate(e),i=n.templatizeInstanceClass;i||(i=ei(e,n,r),n.templatizeInstanceClass=i);const s=Qn(e);ti(e,n,r,s);let o=class extends i{};return o.prototype._methodHost=s,o.prototype.__dataHost=e,o.prototype.__templatizeOwner=t,o.prototype.__hostProps=n.hostProps,o=o,o}function si(e,t){let r;for(;t;)if(r=t.__dataHost?t:t.__templatizeInstance){if(r.__dataHost==e)return r;t=r.__dataHost}else t=qe(t).parentNode;return null}let oi=!1;function ai(){if(ge&&!ce){if(!oi){oi=!0;const e=document.createElement("style");e.textContent="dom-bind,dom-if,dom-repeat{display:none;}",document.head.appendChild(e)}return!0}return!1}const li=Qr(Xn(ar(HTMLElement)));customElements.define("dom-bind",class extends li{static get observedAttributes(){return["mutable-data"]}constructor(){if(super(),me)throw new Error("strictTemplatePolicy: dom-bind not allowed");this.root=null,this.$=null,this.__children=null}attributeChangedCallback(e,t,r,n){this.mutableData=!0}connectedCallback(){ai()||(this.style.display="none"),this.render()}disconnectedCallback(){this.__removeChildren()}__insertChildren(){qe(qe(this).parentNode).insertBefore(this.root,this)}__removeChildren(){if(this.__children)for(let e=0;e<this.__children.length;e++)this.root.appendChild(this.__children[e])}render(){let e;if(!this.__children){if(e=e||this.querySelector("template"),!e){let t=new MutationObserver(()=>{if(e=this.querySelector("template"),!e)throw new Error("dom-bind requires a <template> child");t.disconnect(),this.render()});return void t.observe(this,{childList:!0})}this.root=this._stampTemplate(e),this.$=this.root.$,this.__children=[];for(let e=this.root.firstChild;e;e=e.nextSibling)this.__children[this.__children.length]=e;this._enableProperties()}this.__insertChildren(),this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}});class pi{constructor(e){this.value=e.toString()}toString(){return this.value}}function di(e){if(e instanceof pi)return e.value;throw new Error("non-literal value passed to Polymer's htmlLiteral function: "+e)}const ci=function(e,...t){const r=document.createElement("template");return r.innerHTML=t.reduce((t,r,n)=>t+function(e){if(e instanceof HTMLTemplateElement)return e.innerHTML;if(e instanceof pi)return di(e);throw new Error("non-template value passed to Polymer's html function: "+e)}(r)+e[n+1],e[0]),r},hi=ur(HTMLElement),ui=Xn(hi);class _i extends ui{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!Ee,readOnly:!0},initialCount:{type:Number},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"},notifyDomChange:{type:Boolean},reuseChunkedInstances:{type:Boolean}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__renderStartTime=null,this.__itemsArrayChanged=!1,this.__shouldMeasureChunk=!1,this.__shouldContinueChunking=!1,this.__chunkingId=0,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null,this._templateInfo}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let e=0;e<this.__instances.length;e++)this.__detachInstance(e)}connectedCallback(){if(super.connectedCallback(),ai()||(this.style.display="none"),this.__isDetached){this.__isDetached=!1;let e=qe(qe(this).parentNode);for(let t=0;t<this.__instances.length;t++)this.__attachInstance(t,e)}}__ensureTemplatized(){if(!this.__ctor){const e=this;let t=this.template=e._templateInfo?e:this.querySelector("template");if(!t){let e=new MutationObserver(()=>{if(!this.querySelector("template"))throw new Error("dom-repeat requires a <template> child");e.disconnect(),this.__render()});return e.observe(this,{childList:!0}),!1}let r={};r[this.as]=!0,r[this.indexAs]=!0,r[this.itemsIndexAs]=!0,this.__ctor=ii(t,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:r,forwardHostProp:function(e,t){let r=this.__instances;for(let n,i=0;i<r.length&&(n=r[i]);i++)n.forwardHostProp(e,t)},notifyInstanceProp:function(e,t,r){if((n=this.as)===(i=t)||Je(n,i)||We(n,i)){let n=e[this.itemsIndexAs];t==this.as&&(this.items[n]=r);let i=Ge(this.as,`${JSCompiler_renameProperty("items",this)}.${n}`,t);this.notifyPath(i,r)}var n,i}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(e){if("string"==typeof e){let t=e,r=this.__getMethodHost();return function(){return r[t].apply(r,arguments)}}return e}__sortChanged(e){this.__sortFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__filterChanged(e){this.__filterFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(e){return Math.ceil(1e3/e)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__handleObservedPaths(e){if(this.__sortFn||this.__filterFn)if(e){if(this.__observePaths){let t=this.__observePaths;for(let r=0;r<t.length;r++)0===e.indexOf(t[r])&&this.__debounceRender(this.__render,this.delay)}}else this.__debounceRender(this.__render,this.delay)}__itemsChanged(e){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(e.path,e.value)||("items"===e.path&&(this.__itemsArrayChanged=!0),this.__debounceRender(this.__render))}__debounceRender(e,t=0){this.__renderDebouncer=_r.debounce(this.__renderDebouncer,t>0?ht.after(t):ut,e.bind(this)),mr(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),bn()}__render(){if(!this.__ensureTemplatized())return;let e=this.items||[];const t=this.__sortAndFilterItems(e),r=this.__calculateLimit(t.length);this.__updateInstances(e,r,t),this.initialCount&&(this.__shouldMeasureChunk||this.__shouldContinueChunking)&&(cancelAnimationFrame(this.__chunkingId),this.__chunkingId=requestAnimationFrame(()=>this.__continueChunking())),this._setRenderedItemCount(this.__instances.length),Ee&&!this.notifyDomChange||this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}__sortAndFilterItems(e){let t=new Array(e.length);for(let r=0;r<e.length;r++)t[r]=r;return this.__filterFn&&(t=t.filter((t,r,n)=>this.__filterFn(e[t],r,n))),this.__sortFn&&t.sort((t,r)=>this.__sortFn(e[t],e[r])),t}__calculateLimit(e){let t=e;const r=this.__instances.length;if(this.initialCount){let n;!this.__chunkCount||this.__itemsArrayChanged&&!this.reuseChunkedInstances?(t=Math.min(e,this.initialCount),n=Math.max(t-r,0),this.__chunkCount=n||1):(n=Math.min(Math.max(e-r,0),this.__chunkCount),t=Math.min(r+n,e)),this.__shouldMeasureChunk=n===this.__chunkCount,this.__shouldContinueChunking=t<e,this.__renderStartTime=performance.now()}return this.__itemsArrayChanged=!1,t}__continueChunking(){if(this.__shouldMeasureChunk){const e=performance.now()-this.__renderStartTime,t=this._targetFrameTime/e;this.__chunkCount=Math.round(this.__chunkCount*t)||1}this.__shouldContinueChunking&&this.__debounceRender(this.__render)}__updateInstances(e,t,r){const n=this.__itemsIdxToInstIdx={};let i;for(i=0;i<t;i++){let t=this.__instances[i],s=r[i],o=e[s];n[s]=i,t?(t._setPendingProperty(this.as,o),t._setPendingProperty(this.indexAs,i),t._setPendingProperty(this.itemsIndexAs,s),t._flushProperties()):this.__insertInstance(o,i,s)}for(let e=this.__instances.length-1;e>=i;e--)this.__detachAndRemoveInstance(e)}__detachInstance(e){let t=this.__instances[e];const r=qe(t.root);for(let e=0;e<t.children.length;e++){let n=t.children[e];r.appendChild(n)}return t}__attachInstance(e,t){let r=this.__instances[e];t.insertBefore(r.root,this)}__detachAndRemoveInstance(e){this.__detachInstance(e),this.__instances.splice(e,1)}__stampInstance(e,t,r){let n={};return n[this.as]=e,n[this.indexAs]=t,n[this.itemsIndexAs]=r,new this.__ctor(n)}__insertInstance(e,t,r){const n=this.__stampInstance(e,t,r);let i=this.__instances[t+1],s=i?i.children[0]:this;return qe(qe(this).parentNode).insertBefore(n.root,s),this.__instances[t]=n,n}_showHideChildren(e){for(let t=0;t<this.__instances.length;t++)this.__instances[t]._showHideChildren(e)}__handleItemPath(e,t){let r=e.slice(6),n=r.indexOf("."),i=n<0?r:r.substring(0,n);if(i==parseInt(i,10)){let e=n<0?"":r.substring(n+1);this.__handleObservedPaths(e);let s=this.__itemsIdxToInstIdx[i],o=this.__instances[s];if(o){let r=this.as+(e?"."+e:"");o._setPendingPropertyOrPath(r,t,!1,!0),o._flushProperties()}return!0}}itemForElement(e){let t=this.modelForElement(e);return t&&t[this.as]}indexForElement(e){let t=this.modelForElement(e);return t&&t[this.indexAs]}modelForElement(e){return si(this.template,e)}}customElements.define(_i.is,_i);class fi extends hi{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"},notifyDomChange:{type:Boolean}}}constructor(){super(),this.__renderDebouncer=null,this._lastIf=!1,this.__hideTemplateChildren__=!1,this.__template,this._templateInfo}__debounceRender(){this.__renderDebouncer=_r.debounce(this.__renderDebouncer,ut,()=>this.__render()),mr(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback();const e=qe(this).parentNode;e&&(e.nodeType!=Node.DOCUMENT_FRAGMENT_NODE||qe(e).host)||this.__teardownInstance()}connectedCallback(){super.connectedCallback(),ai()||(this.style.display="none"),this.if&&this.__debounceRender()}__ensureTemplate(){if(!this.__template){const e=this;let t=e._templateInfo?e:qe(e).querySelector("template");if(!t){let e=new MutationObserver(()=>{if(!qe(this).querySelector("template"))throw new Error("dom-if requires a <template> child");e.disconnect(),this.__render()});return e.observe(this,{childList:!0}),!1}this.__template=t}return!0}__ensureInstance(){let e=qe(this).parentNode;if(this.__hasInstance()){let t=this.__getInstanceNodes();if(t&&t.length){if(qe(this).previousSibling!==t[t.length-1])for(let r,n=0;n<t.length&&(r=t[n]);n++)qe(e).insertBefore(r,this)}}else{if(!e)return!1;if(!this.__ensureTemplate())return!1;this.__createAndInsertInstance(e)}return!0}render(){bn()}__render(){if(this.if){if(!this.__ensureInstance())return}else this.restamp&&this.__teardownInstance();this._showHideChildren(),Ee&&!this.notifyDomChange||this.if==this._lastIf||(this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this._lastIf=this.if)}__hasInstance(){}__getInstanceNodes(){}__createAndInsertInstance(e){}__teardownInstance(){}_showHideChildren(){}}const mi=xe?class extends fi{constructor(){super(),this.__instance=null,this.__syncInfo=null}__hasInstance(){return Boolean(this.__instance)}__getInstanceNodes(){return this.__instance.templateInfo.childNodes}__createAndInsertInstance(e){const t=this.__dataHost||this;if(me&&!this.__dataHost)throw new Error("strictTemplatePolicy: template owner not trusted");const r=t._bindTemplate(this.__template,!0);r.runEffects=(e,t,r)=>{let n=this.__syncInfo;if(this.if)n&&(this.__syncInfo=null,this._showHideChildren(),t=Object.assign(n.changedProps,t)),e(t,r);else if(this.__instance)if(n||(n=this.__syncInfo={runEffects:e,changedProps:{}}),r)for(const e in t){const t=Ye(e);n.changedProps[t]=this.__dataHost[t]}else Object.assign(n.changedProps,t)},this.__instance=t._stampTemplate(this.__template,r),qe(e).insertBefore(this.__instance,this)}__syncHostProperties(){const e=this.__syncInfo;e&&(this.__syncInfo=null,e.runEffects(e.changedProps,!1))}__teardownInstance(){const e=this.__dataHost||this;this.__instance&&(e._removeBoundDom(this.__instance),this.__instance=null,this.__syncInfo=null)}_showHideChildren(){const e=this.__hideTemplateChildren__||!this.if;this.__instance&&Boolean(this.__instance.__hidden)!==e&&(this.__instance.__hidden=e,Gn(e,this.__instance.templateInfo.childNodes)),e||this.__syncHostProperties()}}:class extends fi{constructor(){super(),this.__ctor=null,this.__instance=null,this.__invalidProps=null}__hasInstance(){return Boolean(this.__instance)}__getInstanceNodes(){return this.__instance.children}__createAndInsertInstance(e){this.__ctor||(this.__ctor=ii(this.__template,this,{mutableData:!0,forwardHostProp:function(e,t){this.__instance&&(this.if?this.__instance.forwardHostProp(e,t):(this.__invalidProps=this.__invalidProps||Object.create(null),this.__invalidProps[Ye(e)]=!0))}})),this.__instance=new this.__ctor,qe(e).insertBefore(this.__instance.root,this)}__teardownInstance(){if(this.__instance){let e=this.__instance.children;if(e&&e.length){let t=qe(e[0]).parentNode;if(t){t=qe(t);for(let r,n=0;n<e.length&&(r=e[n]);n++)t.removeChild(r)}}this.__invalidProps=null,this.__instance=null}}__syncHostProperties(){let e=this.__invalidProps;if(e){this.__invalidProps=null;for(let t in e)this.__instance._setPendingProperty(t,this.__dataHost[t]);this.__instance._flushProperties()}}_showHideChildren(){const e=this.__hideTemplateChildren__||!this.if;this.__instance&&Boolean(this.__instance.__hidden)!==e&&(this.__instance.__hidden=e,this.__instance._showHideChildren(e)),e||this.__syncHostProperties()}};customElements.define(mi.is,mi);let yi=ke(e=>{let t=ur(e);return class extends t{static get properties(){return{items:{type:Array},multi:{type:Boolean,value:!1},selected:{type:Object,notify:!0},selectedItem:{type:Object,notify:!0},toggle:{type:Boolean,value:!1}}}static get observers(){return["__updateSelection(multi, items.*)"]}constructor(){super(),this.__lastItems=null,this.__lastMulti=null,this.__selectedMap=null}__updateSelection(e,t){let r=t.path;if(r==JSCompiler_renameProperty("items",this)){let r=t.base||[],n=this.__lastItems;if(e!==this.__lastMulti&&this.clearSelection(),n){let e=fn(r,n);this.__applySplices(e)}this.__lastItems=r,this.__lastMulti=e}else if(t.path==JSCompiler_renameProperty("items",this)+".splices")this.__applySplices(t.value.indexSplices);else{let e=r.slice((JSCompiler_renameProperty("items",this)+".").length),t=parseInt(e,10);e.indexOf(".")<0&&e==t&&this.__deselectChangedIdx(t)}}__applySplices(e){let t=this.__selectedMap;for(let r=0;r<e.length;r++){let n=e[r];t.forEach((e,r)=>{e<n.index||(e>=n.index+n.removed.length?t.set(r,e+n.addedCount-n.removed.length):t.set(r,-1))});for(let e=0;e<n.addedCount;e++){let r=n.index+e;t.has(this.items[r])&&t.set(this.items[r],r)}}this.__updateLinks();let r=0;t.forEach((e,n)=>{e<0?(this.multi?this.splice(JSCompiler_renameProperty("selected",this),r,1):this.selected=this.selectedItem=null,t.delete(n)):r++})}__updateLinks(){if(this.__dataLinkedPaths={},this.multi){let e=0;this.__selectedMap.forEach(t=>{t>=0&&this.linkPaths(`${JSCompiler_renameProperty("items",this)}.${t}`,`${JSCompiler_renameProperty("selected",this)}.${e++}`)})}else this.__selectedMap.forEach(e=>{this.linkPaths(JSCompiler_renameProperty("selected",this),`${JSCompiler_renameProperty("items",this)}.${e}`),this.linkPaths(JSCompiler_renameProperty("selectedItem",this),`${JSCompiler_renameProperty("items",this)}.${e}`)})}clearSelection(){this.__dataLinkedPaths={},this.__selectedMap=new Map,this.selected=this.multi?[]:null,this.selectedItem=null}isSelected(e){return this.__selectedMap.has(e)}isIndexSelected(e){return this.isSelected(this.items[e])}__deselectChangedIdx(e){let t=this.__selectedIndexForItemIndex(e);if(t>=0){let e=0;this.__selectedMap.forEach((r,n)=>{t==e++&&this.deselect(n)})}}__selectedIndexForItemIndex(e){let t=this.__dataLinkedPaths[`${JSCompiler_renameProperty("items",this)}.${e}`];if(t)return parseInt(t.slice((JSCompiler_renameProperty("selected",this)+".").length),10)}deselect(e){let t=this.__selectedMap.get(e);if(t>=0){let r;this.__selectedMap.delete(e),this.multi&&(r=this.__selectedIndexForItemIndex(t)),this.__updateLinks(),this.multi?this.splice(JSCompiler_renameProperty("selected",this),r,1):this.selected=this.selectedItem=null}}deselectIndex(e){this.deselect(this.items[e])}select(e){this.selectIndex(this.items.indexOf(e))}selectIndex(e){let t=this.items[e];this.isSelected(t)?this.toggle&&this.deselectIndex(e):(this.multi||this.__selectedMap.clear(),this.__selectedMap.set(t,e),this.__updateLinks(),this.multi?this.push(JSCompiler_renameProperty("selected",this),t):this.selected=this.selectedItem=t)}}})(hi);class gi extends yi{static get is(){return"array-selector"}static get template(){return null}}customElements.define(gi.is,gi);const bi=new te;window.ShadyCSS||(window.ShadyCSS={prepareTemplate(e,t,r){},prepareTemplateDom(e,t){},prepareTemplateStyles(e,t,r){},styleSubtree(e,t){bi.processStyles(),k(e,t)},styleElement(e){bi.processStyles()},styleDocument(e){bi.processStyles(),k(document.body,e)},getComputedStyleValue:(e,t)=>I(e,t),flushCustomStyles(){},nativeCss:l,nativeShadow:n,cssBuild:s,disableRuntime:a}),window.ShadyCSS.CustomStyleInterface=bi;const wi=window.ShadyCSS.CustomStyleInterface;class Pi extends HTMLElement{constructor(){super(),this._style=null,wi.addCustomStyle(this)}getStyle(){if(this._style)return this._style;const e=this.querySelector("style");if(!e)return null;this._style=e;const t=e.getAttribute("include");return t&&(e.removeAttribute("include"),e.textContent=function(e){let t=e.trim().split(/\s+/),r="";for(let e=0;e<t.length;e++)r+=Ue(t[e]);return r}(t)+e.textContent),this.ownerDocument!==window.document&&window.document.head.appendChild(this),this._style}}let vi;window.customElements.define("custom-style",Pi),vi=Un._mutablePropertyChange;Boolean,Mn(HTMLElement).prototype;const Ci=ci`
<custom-style>
  <style is="custom-style">
    [hidden] {
      display: none !important;
    }
  </style>
</custom-style>
<custom-style>
  <style is="custom-style">
    html {

      --layout: {
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
      };

      --layout-inline: {
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
      };

      --layout-horizontal: {
        @apply --layout;

        -ms-flex-direction: row;
        -webkit-flex-direction: row;
        flex-direction: row;
      };

      --layout-horizontal-reverse: {
        @apply --layout;

        -ms-flex-direction: row-reverse;
        -webkit-flex-direction: row-reverse;
        flex-direction: row-reverse;
      };

      --layout-vertical: {
        @apply --layout;

        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
      };

      --layout-vertical-reverse: {
        @apply --layout;

        -ms-flex-direction: column-reverse;
        -webkit-flex-direction: column-reverse;
        flex-direction: column-reverse;
      };

      --layout-wrap: {
        -ms-flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
      };

      --layout-wrap-reverse: {
        -ms-flex-wrap: wrap-reverse;
        -webkit-flex-wrap: wrap-reverse;
        flex-wrap: wrap-reverse;
      };

      --layout-flex-auto: {
        -ms-flex: 1 1 auto;
        -webkit-flex: 1 1 auto;
        flex: 1 1 auto;
      };

      --layout-flex-none: {
        -ms-flex: none;
        -webkit-flex: none;
        flex: none;
      };

      --layout-flex: {
        -ms-flex: 1 1 0.000000001px;
        -webkit-flex: 1;
        flex: 1;
        -webkit-flex-basis: 0.000000001px;
        flex-basis: 0.000000001px;
      };

      --layout-flex-2: {
        -ms-flex: 2;
        -webkit-flex: 2;
        flex: 2;
      };

      --layout-flex-3: {
        -ms-flex: 3;
        -webkit-flex: 3;
        flex: 3;
      };

      --layout-flex-4: {
        -ms-flex: 4;
        -webkit-flex: 4;
        flex: 4;
      };

      --layout-flex-5: {
        -ms-flex: 5;
        -webkit-flex: 5;
        flex: 5;
      };

      --layout-flex-6: {
        -ms-flex: 6;
        -webkit-flex: 6;
        flex: 6;
      };

      --layout-flex-7: {
        -ms-flex: 7;
        -webkit-flex: 7;
        flex: 7;
      };

      --layout-flex-8: {
        -ms-flex: 8;
        -webkit-flex: 8;
        flex: 8;
      };

      --layout-flex-9: {
        -ms-flex: 9;
        -webkit-flex: 9;
        flex: 9;
      };

      --layout-flex-10: {
        -ms-flex: 10;
        -webkit-flex: 10;
        flex: 10;
      };

      --layout-flex-11: {
        -ms-flex: 11;
        -webkit-flex: 11;
        flex: 11;
      };

      --layout-flex-12: {
        -ms-flex: 12;
        -webkit-flex: 12;
        flex: 12;
      };

      /* alignment in cross axis */

      --layout-start: {
        -ms-flex-align: start;
        -webkit-align-items: flex-start;
        align-items: flex-start;
      };

      --layout-center: {
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      };

      --layout-end: {
        -ms-flex-align: end;
        -webkit-align-items: flex-end;
        align-items: flex-end;
      };

      --layout-baseline: {
        -ms-flex-align: baseline;
        -webkit-align-items: baseline;
        align-items: baseline;
      };

      /* alignment in main axis */

      --layout-start-justified: {
        -ms-flex-pack: start;
        -webkit-justify-content: flex-start;
        justify-content: flex-start;
      };

      --layout-center-justified: {
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
      };

      --layout-end-justified: {
        -ms-flex-pack: end;
        -webkit-justify-content: flex-end;
        justify-content: flex-end;
      };

      --layout-around-justified: {
        -ms-flex-pack: distribute;
        -webkit-justify-content: space-around;
        justify-content: space-around;
      };

      --layout-justified: {
        -ms-flex-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
      };

      --layout-center-center: {
        @apply --layout-center;
        @apply --layout-center-justified;
      };

      /* self alignment */

      --layout-self-start: {
        -ms-align-self: flex-start;
        -webkit-align-self: flex-start;
        align-self: flex-start;
      };

      --layout-self-center: {
        -ms-align-self: center;
        -webkit-align-self: center;
        align-self: center;
      };

      --layout-self-end: {
        -ms-align-self: flex-end;
        -webkit-align-self: flex-end;
        align-self: flex-end;
      };

      --layout-self-stretch: {
        -ms-align-self: stretch;
        -webkit-align-self: stretch;
        align-self: stretch;
      };

      --layout-self-baseline: {
        -ms-align-self: baseline;
        -webkit-align-self: baseline;
        align-self: baseline;
      };

      /* multi-line alignment in main axis */

      --layout-start-aligned: {
        -ms-flex-line-pack: start;  /* IE10 */
        -ms-align-content: flex-start;
        -webkit-align-content: flex-start;
        align-content: flex-start;
      };

      --layout-end-aligned: {
        -ms-flex-line-pack: end;  /* IE10 */
        -ms-align-content: flex-end;
        -webkit-align-content: flex-end;
        align-content: flex-end;
      };

      --layout-center-aligned: {
        -ms-flex-line-pack: center;  /* IE10 */
        -ms-align-content: center;
        -webkit-align-content: center;
        align-content: center;
      };

      --layout-between-aligned: {
        -ms-flex-line-pack: justify;  /* IE10 */
        -ms-align-content: space-between;
        -webkit-align-content: space-between;
        align-content: space-between;
      };

      --layout-around-aligned: {
        -ms-flex-line-pack: distribute;  /* IE10 */
        -ms-align-content: space-around;
        -webkit-align-content: space-around;
        align-content: space-around;
      };

      /*******************************
                Other Layout
      *******************************/

      --layout-block: {
        display: block;
      };

      --layout-invisible: {
        visibility: hidden !important;
      };

      --layout-relative: {
        position: relative;
      };

      --layout-fit: {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-scroll: {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
      };

      --layout-fullbleed: {
        margin: 0;
        height: 100vh;
      };

      /* fixed position */

      --layout-fixed-top: {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      };

      --layout-fixed-right: {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
      };

      --layout-fixed-bottom: {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
      };

      --layout-fixed-left: {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
      };

    }
  </style>
</custom-style>`;Ci.setAttribute("style","display: none;"),document.head.appendChild(Ci.content);var Si=document.createElement("style");Si.textContent="[hidden] { display: none !important; }",document.head.appendChild(Si);const xi=ci`
<custom-style>
  <style is="custom-style">
    html {

      /* Material Design color palette for Google products */

      --google-red-100: #f4c7c3;
      --google-red-300: #e67c73;
      --google-red-500: #db4437;
      --google-red-700: #c53929;

      --google-blue-100: #c6dafc;
      --google-blue-300: #7baaf7;
      --google-blue-500: #4285f4;
      --google-blue-700: #3367d6;

      --google-green-100: #b7e1cd;
      --google-green-300: #57bb8a;
      --google-green-500: #0f9d58;
      --google-green-700: #0b8043;

      --google-yellow-100: #fce8b2;
      --google-yellow-300: #f7cb4d;
      --google-yellow-500: #f4b400;
      --google-yellow-700: #f09300;

      --google-grey-100: #f5f5f5;
      --google-grey-300: #e0e0e0;
      --google-grey-500: #9e9e9e;
      --google-grey-700: #616161;

      /* Material Design color palette from online spec document */

      --paper-red-50: #ffebee;
      --paper-red-100: #ffcdd2;
      --paper-red-200: #ef9a9a;
      --paper-red-300: #e57373;
      --paper-red-400: #ef5350;
      --paper-red-500: #f44336;
      --paper-red-600: #e53935;
      --paper-red-700: #d32f2f;
      --paper-red-800: #c62828;
      --paper-red-900: #b71c1c;
      --paper-red-a100: #ff8a80;
      --paper-red-a200: #ff5252;
      --paper-red-a400: #ff1744;
      --paper-red-a700: #d50000;

      --paper-pink-50: #fce4ec;
      --paper-pink-100: #f8bbd0;
      --paper-pink-200: #f48fb1;
      --paper-pink-300: #f06292;
      --paper-pink-400: #ec407a;
      --paper-pink-500: #e91e63;
      --paper-pink-600: #d81b60;
      --paper-pink-700: #c2185b;
      --paper-pink-800: #ad1457;
      --paper-pink-900: #880e4f;
      --paper-pink-a100: #ff80ab;
      --paper-pink-a200: #ff4081;
      --paper-pink-a400: #f50057;
      --paper-pink-a700: #c51162;

      --paper-purple-50: #f3e5f5;
      --paper-purple-100: #e1bee7;
      --paper-purple-200: #ce93d8;
      --paper-purple-300: #ba68c8;
      --paper-purple-400: #ab47bc;
      --paper-purple-500: #9c27b0;
      --paper-purple-600: #8e24aa;
      --paper-purple-700: #7b1fa2;
      --paper-purple-800: #6a1b9a;
      --paper-purple-900: #4a148c;
      --paper-purple-a100: #ea80fc;
      --paper-purple-a200: #e040fb;
      --paper-purple-a400: #d500f9;
      --paper-purple-a700: #aa00ff;

      --paper-deep-purple-50: #ede7f6;
      --paper-deep-purple-100: #d1c4e9;
      --paper-deep-purple-200: #b39ddb;
      --paper-deep-purple-300: #9575cd;
      --paper-deep-purple-400: #7e57c2;
      --paper-deep-purple-500: #673ab7;
      --paper-deep-purple-600: #5e35b1;
      --paper-deep-purple-700: #512da8;
      --paper-deep-purple-800: #4527a0;
      --paper-deep-purple-900: #311b92;
      --paper-deep-purple-a100: #b388ff;
      --paper-deep-purple-a200: #7c4dff;
      --paper-deep-purple-a400: #651fff;
      --paper-deep-purple-a700: #6200ea;

      --paper-indigo-50: #e8eaf6;
      --paper-indigo-100: #c5cae9;
      --paper-indigo-200: #9fa8da;
      --paper-indigo-300: #7986cb;
      --paper-indigo-400: #5c6bc0;
      --paper-indigo-500: #3f51b5;
      --paper-indigo-600: #3949ab;
      --paper-indigo-700: #303f9f;
      --paper-indigo-800: #283593;
      --paper-indigo-900: #1a237e;
      --paper-indigo-a100: #8c9eff;
      --paper-indigo-a200: #536dfe;
      --paper-indigo-a400: #3d5afe;
      --paper-indigo-a700: #304ffe;

      --paper-blue-50: #e3f2fd;
      --paper-blue-100: #bbdefb;
      --paper-blue-200: #90caf9;
      --paper-blue-300: #64b5f6;
      --paper-blue-400: #42a5f5;
      --paper-blue-500: #2196f3;
      --paper-blue-600: #1e88e5;
      --paper-blue-700: #1976d2;
      --paper-blue-800: #1565c0;
      --paper-blue-900: #0d47a1;
      --paper-blue-a100: #82b1ff;
      --paper-blue-a200: #448aff;
      --paper-blue-a400: #2979ff;
      --paper-blue-a700: #2962ff;

      --paper-light-blue-50: #e1f5fe;
      --paper-light-blue-100: #b3e5fc;
      --paper-light-blue-200: #81d4fa;
      --paper-light-blue-300: #4fc3f7;
      --paper-light-blue-400: #29b6f6;
      --paper-light-blue-500: #03a9f4;
      --paper-light-blue-600: #039be5;
      --paper-light-blue-700: #0288d1;
      --paper-light-blue-800: #0277bd;
      --paper-light-blue-900: #01579b;
      --paper-light-blue-a100: #80d8ff;
      --paper-light-blue-a200: #40c4ff;
      --paper-light-blue-a400: #00b0ff;
      --paper-light-blue-a700: #0091ea;

      --paper-cyan-50: #e0f7fa;
      --paper-cyan-100: #b2ebf2;
      --paper-cyan-200: #80deea;
      --paper-cyan-300: #4dd0e1;
      --paper-cyan-400: #26c6da;
      --paper-cyan-500: #00bcd4;
      --paper-cyan-600: #00acc1;
      --paper-cyan-700: #0097a7;
      --paper-cyan-800: #00838f;
      --paper-cyan-900: #006064;
      --paper-cyan-a100: #84ffff;
      --paper-cyan-a200: #18ffff;
      --paper-cyan-a400: #00e5ff;
      --paper-cyan-a700: #00b8d4;

      --paper-teal-50: #e0f2f1;
      --paper-teal-100: #b2dfdb;
      --paper-teal-200: #80cbc4;
      --paper-teal-300: #4db6ac;
      --paper-teal-400: #26a69a;
      --paper-teal-500: #009688;
      --paper-teal-600: #00897b;
      --paper-teal-700: #00796b;
      --paper-teal-800: #00695c;
      --paper-teal-900: #004d40;
      --paper-teal-a100: #a7ffeb;
      --paper-teal-a200: #64ffda;
      --paper-teal-a400: #1de9b6;
      --paper-teal-a700: #00bfa5;

      --paper-green-50: #e8f5e9;
      --paper-green-100: #c8e6c9;
      --paper-green-200: #a5d6a7;
      --paper-green-300: #81c784;
      --paper-green-400: #66bb6a;
      --paper-green-500: #4caf50;
      --paper-green-600: #43a047;
      --paper-green-700: #388e3c;
      --paper-green-800: #2e7d32;
      --paper-green-900: #1b5e20;
      --paper-green-a100: #b9f6ca;
      --paper-green-a200: #69f0ae;
      --paper-green-a400: #00e676;
      --paper-green-a700: #00c853;

      --paper-light-green-50: #f1f8e9;
      --paper-light-green-100: #dcedc8;
      --paper-light-green-200: #c5e1a5;
      --paper-light-green-300: #aed581;
      --paper-light-green-400: #9ccc65;
      --paper-light-green-500: #8bc34a;
      --paper-light-green-600: #7cb342;
      --paper-light-green-700: #689f38;
      --paper-light-green-800: #558b2f;
      --paper-light-green-900: #33691e;
      --paper-light-green-a100: #ccff90;
      --paper-light-green-a200: #b2ff59;
      --paper-light-green-a400: #76ff03;
      --paper-light-green-a700: #64dd17;

      --paper-lime-50: #f9fbe7;
      --paper-lime-100: #f0f4c3;
      --paper-lime-200: #e6ee9c;
      --paper-lime-300: #dce775;
      --paper-lime-400: #d4e157;
      --paper-lime-500: #cddc39;
      --paper-lime-600: #c0ca33;
      --paper-lime-700: #afb42b;
      --paper-lime-800: #9e9d24;
      --paper-lime-900: #827717;
      --paper-lime-a100: #f4ff81;
      --paper-lime-a200: #eeff41;
      --paper-lime-a400: #c6ff00;
      --paper-lime-a700: #aeea00;

      --paper-yellow-50: #fffde7;
      --paper-yellow-100: #fff9c4;
      --paper-yellow-200: #fff59d;
      --paper-yellow-300: #fff176;
      --paper-yellow-400: #ffee58;
      --paper-yellow-500: #ffeb3b;
      --paper-yellow-600: #fdd835;
      --paper-yellow-700: #fbc02d;
      --paper-yellow-800: #f9a825;
      --paper-yellow-900: #f57f17;
      --paper-yellow-a100: #ffff8d;
      --paper-yellow-a200: #ffff00;
      --paper-yellow-a400: #ffea00;
      --paper-yellow-a700: #ffd600;

      --paper-amber-50: #fff8e1;
      --paper-amber-100: #ffecb3;
      --paper-amber-200: #ffe082;
      --paper-amber-300: #ffd54f;
      --paper-amber-400: #ffca28;
      --paper-amber-500: #ffc107;
      --paper-amber-600: #ffb300;
      --paper-amber-700: #ffa000;
      --paper-amber-800: #ff8f00;
      --paper-amber-900: #ff6f00;
      --paper-amber-a100: #ffe57f;
      --paper-amber-a200: #ffd740;
      --paper-amber-a400: #ffc400;
      --paper-amber-a700: #ffab00;

      --paper-orange-50: #fff3e0;
      --paper-orange-100: #ffe0b2;
      --paper-orange-200: #ffcc80;
      --paper-orange-300: #ffb74d;
      --paper-orange-400: #ffa726;
      --paper-orange-500: #ff9800;
      --paper-orange-600: #fb8c00;
      --paper-orange-700: #f57c00;
      --paper-orange-800: #ef6c00;
      --paper-orange-900: #e65100;
      --paper-orange-a100: #ffd180;
      --paper-orange-a200: #ffab40;
      --paper-orange-a400: #ff9100;
      --paper-orange-a700: #ff6500;

      --paper-deep-orange-50: #fbe9e7;
      --paper-deep-orange-100: #ffccbc;
      --paper-deep-orange-200: #ffab91;
      --paper-deep-orange-300: #ff8a65;
      --paper-deep-orange-400: #ff7043;
      --paper-deep-orange-500: #ff5722;
      --paper-deep-orange-600: #f4511e;
      --paper-deep-orange-700: #e64a19;
      --paper-deep-orange-800: #d84315;
      --paper-deep-orange-900: #bf360c;
      --paper-deep-orange-a100: #ff9e80;
      --paper-deep-orange-a200: #ff6e40;
      --paper-deep-orange-a400: #ff3d00;
      --paper-deep-orange-a700: #dd2c00;

      --paper-brown-50: #efebe9;
      --paper-brown-100: #d7ccc8;
      --paper-brown-200: #bcaaa4;
      --paper-brown-300: #a1887f;
      --paper-brown-400: #8d6e63;
      --paper-brown-500: #795548;
      --paper-brown-600: #6d4c41;
      --paper-brown-700: #5d4037;
      --paper-brown-800: #4e342e;
      --paper-brown-900: #3e2723;

      --paper-grey-50: #fafafa;
      --paper-grey-100: #f5f5f5;
      --paper-grey-200: #eeeeee;
      --paper-grey-300: #e0e0e0;
      --paper-grey-400: #bdbdbd;
      --paper-grey-500: #9e9e9e;
      --paper-grey-600: #757575;
      --paper-grey-700: #616161;
      --paper-grey-800: #424242;
      --paper-grey-900: #212121;

      --paper-blue-grey-50: #eceff1;
      --paper-blue-grey-100: #cfd8dc;
      --paper-blue-grey-200: #b0bec5;
      --paper-blue-grey-300: #90a4ae;
      --paper-blue-grey-400: #78909c;
      --paper-blue-grey-500: #607d8b;
      --paper-blue-grey-600: #546e7a;
      --paper-blue-grey-700: #455a64;
      --paper-blue-grey-800: #37474f;
      --paper-blue-grey-900: #263238;

      /* opacity for dark text on a light background */
      --dark-divider-opacity: 0.12;
      --dark-disabled-opacity: 0.38; /* or hint text or icon */
      --dark-secondary-opacity: 0.54;
      --dark-primary-opacity: 0.87;

      /* opacity for light text on a dark background */
      --light-divider-opacity: 0.12;
      --light-disabled-opacity: 0.3; /* or hint text or icon */
      --light-secondary-opacity: 0.7;
      --light-primary-opacity: 1.0;

    }

  </style>
</custom-style>
`;xi.setAttribute("style","display: none;"),document.head.appendChild(xi.content);Bn({_template:ci`
    <style>
      :host {
        display: block;
        width: 200px;
        position: relative;
        overflow: hidden;
      }

      :host([hidden]), [hidden] {
        display: none !important;
      }

      #progressContainer {
        @apply --paper-progress-container;
        position: relative;
      }

      #progressContainer,
      /* the stripe for the indeterminate animation*/
      .indeterminate::after {
        height: var(--paper-progress-height, 4px);
      }

      #primaryProgress,
      #secondaryProgress,
      .indeterminate::after {
        @apply --layout-fit;
      }

      #progressContainer,
      .indeterminate::after {
        background: var(--paper-progress-container-color, var(--google-grey-300));
      }

      :host(.transiting) #primaryProgress,
      :host(.transiting) #secondaryProgress {
        -webkit-transition-property: -webkit-transform;
        transition-property: transform;

        /* Duration */
        -webkit-transition-duration: var(--paper-progress-transition-duration, 0.08s);
        transition-duration: var(--paper-progress-transition-duration, 0.08s);

        /* Timing function */
        -webkit-transition-timing-function: var(--paper-progress-transition-timing-function, ease);
        transition-timing-function: var(--paper-progress-transition-timing-function, ease);

        /* Delay */
        -webkit-transition-delay: var(--paper-progress-transition-delay, 0s);
        transition-delay: var(--paper-progress-transition-delay, 0s);
      }

      #primaryProgress,
      #secondaryProgress {
        @apply --layout-fit;
        -webkit-transform-origin: left center;
        transform-origin: left center;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        will-change: transform;
      }

      #primaryProgress {
        background: var(--paper-progress-active-color, var(--google-green-500));
      }

      #secondaryProgress {
        background: var(--paper-progress-secondary-color, var(--google-green-100));
      }

      :host([disabled]) #primaryProgress {
        background: var(--paper-progress-disabled-active-color, var(--google-grey-500));
      }

      :host([disabled]) #secondaryProgress {
        background: var(--paper-progress-disabled-secondary-color, var(--google-grey-300));
      }

      :host(:not([disabled])) #primaryProgress.indeterminate {
        -webkit-transform-origin: right center;
        transform-origin: right center;
        -webkit-animation: indeterminate-bar var(--paper-progress-indeterminate-cycle-duration, 2s) linear infinite;
        animation: indeterminate-bar var(--paper-progress-indeterminate-cycle-duration, 2s) linear infinite;
      }

      :host(:not([disabled])) #primaryProgress.indeterminate::after {
        content: "";
        -webkit-transform-origin: center center;
        transform-origin: center center;

        -webkit-animation: indeterminate-splitter var(--paper-progress-indeterminate-cycle-duration, 2s) linear infinite;
        animation: indeterminate-splitter var(--paper-progress-indeterminate-cycle-duration, 2s) linear infinite;
      }

      @-webkit-keyframes indeterminate-bar {
        0% {
          -webkit-transform: scaleX(1) translateX(-100%);
        }
        50% {
          -webkit-transform: scaleX(1) translateX(0%);
        }
        75% {
          -webkit-transform: scaleX(1) translateX(0%);
          -webkit-animation-timing-function: cubic-bezier(.28,.62,.37,.91);
        }
        100% {
          -webkit-transform: scaleX(0) translateX(0%);
        }
      }

      @-webkit-keyframes indeterminate-splitter {
        0% {
          -webkit-transform: scaleX(.75) translateX(-125%);
        }
        30% {
          -webkit-transform: scaleX(.75) translateX(-125%);
          -webkit-animation-timing-function: cubic-bezier(.42,0,.6,.8);
        }
        90% {
          -webkit-transform: scaleX(.75) translateX(125%);
        }
        100% {
          -webkit-transform: scaleX(.75) translateX(125%);
        }
      }

      @keyframes indeterminate-bar {
        0% {
          transform: scaleX(1) translateX(-100%);
        }
        50% {
          transform: scaleX(1) translateX(0%);
        }
        75% {
          transform: scaleX(1) translateX(0%);
          animation-timing-function: cubic-bezier(.28,.62,.37,.91);
        }
        100% {
          transform: scaleX(0) translateX(0%);
        }
      }

      @keyframes indeterminate-splitter {
        0% {
          transform: scaleX(.75) translateX(-125%);
        }
        30% {
          transform: scaleX(.75) translateX(-125%);
          animation-timing-function: cubic-bezier(.42,0,.6,.8);
        }
        90% {
          transform: scaleX(.75) translateX(125%);
        }
        100% {
          transform: scaleX(.75) translateX(125%);
        }
      }
    </style>

    <div id="progressContainer">
      <div id="secondaryProgress" hidden\$="[[_hideSecondaryProgress(secondaryRatio)]]"></div>
      <div id="primaryProgress"></div>
    </div>
`,is:"paper-progress",behaviors:[{properties:{value:{type:Number,value:0,notify:!0,reflectToAttribute:!0},min:{type:Number,value:0,notify:!0},max:{type:Number,value:100,notify:!0},step:{type:Number,value:1,notify:!0},ratio:{type:Number,value:0,readOnly:!0,notify:!0}},observers:["_update(value, min, max, step)"],_calcRatio:function(e){return(this._clampValue(e)-this.min)/(this.max-this.min)},_clampValue:function(e){return Math.min(this.max,Math.max(this.min,this._calcStep(e)))},_calcStep:function(e){if(e=parseFloat(e),!this.step)return e;var t=Math.round((e-this.min)/this.step);return this.step<1?t/(1/this.step)+this.min:t*this.step+this.min},_validateValue:function(){var e=this._clampValue(this.value);return this.value=this.oldValue=isNaN(e)?this.oldValue:e,this.value!==e},_update:function(){this._validateValue(),this._setRatio(100*this._calcRatio(this.value))}}],properties:{secondaryProgress:{type:Number,value:0},secondaryRatio:{type:Number,value:0,readOnly:!0},indeterminate:{type:Boolean,value:!1,observer:"_toggleIndeterminate"},disabled:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_disabledChanged"}},observers:["_progressChanged(secondaryProgress, value, min, max, indeterminate)"],hostAttributes:{role:"progressbar"},_toggleIndeterminate:function(e){this.toggleClass("indeterminate",e,this.$.primaryProgress)},_transformProgress:function(e,t){var r="scaleX("+t/100+")";e.style.transform=e.style.webkitTransform=r},_mainRatioChanged:function(e){this._transformProgress(this.$.primaryProgress,e)},_progressChanged:function(e,t,r,n,i){e=this._clampValue(e),t=this._clampValue(t);var s=100*this._calcRatio(e),o=100*this._calcRatio(t);this._setSecondaryRatio(s),this._transformProgress(this.$.secondaryProgress,s),this._transformProgress(this.$.primaryProgress,o),this.secondaryProgress=e,i?this.removeAttribute("aria-valuenow"):this.setAttribute("aria-valuenow",t),this.setAttribute("aria-valuemin",r),this.setAttribute("aria-valuemax",n)},_disabledChanged:function(e){this.setAttribute("aria-disabled",e?"true":"false")},_hideSecondaryProgress:function(e){return 0===e}})}}]);