module.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s="QfWi")}({HteQ:function(t,e){t.exports=require("preact")},"JuI/":function(t,e,n){},QfWi:function(t,e,n){"use strict";n.r(e);n("JuI/");var r=n("HteQ"),i={};function o(t,e){for(var n in e)t[n]=e[n];return t}function a(t,e,n){var r,o=/(?:\?([^#]*))?(#.*)?$/,a=t.match(o),u={};if(a&&a[1])for(var c=a[1].split("&"),l=0;l<c.length;l++){var h=c[l].split("=");u[decodeURIComponent(h[0])]=decodeURIComponent(h.slice(1).join("="))}t=s(t.replace(o,"")),e=s(e||"");for(var p=Math.max(t.length,e.length),f=0;f<p;f++)if(e[f]&&":"===e[f].charAt(0)){var d=e[f].replace(/(^:|[+*?]+$)/g,""),m=(e[f].match(/[+*?]+$/)||i)[0]||"",g=~m.indexOf("+"),y=~m.indexOf("*"),b=t[f]||"";if(!b&&!y&&(m.indexOf("?")<0||g)){r=!1;break}if(u[d]=decodeURIComponent(b),g||y){u[d]=t.slice(f).map(decodeURIComponent).join("/");break}}else if(e[f]!==t[f]){r=!1;break}return(!0===n.default||!1!==r)&&u}function u(t,e){return t.rank<e.rank?1:t.rank>e.rank?-1:t.index-e.index}function c(t,e){return t.index=e,t.rank=function(t){return t.props.default?0:(e=t.props.path,s(e).map(l).join(""));var e}(t),t.props}function s(t){return t.replace(/(^\/+|\/+$)/g,"").split("/")}function l(t){return":"==t.charAt(0)?1+"*+?".indexOf(t.charAt(t.length-1))||4:5}var h=null,p=[],f=[],d={};function m(){var t;return""+((t=h&&h.location?h.location:h&&h.getCurrentLocation?h.getCurrentLocation():"undefined"!=typeof location?location:d).pathname||"")+(t.search||"")}function g(t,e){return void 0===e&&(e=!1),"string"!=typeof t&&t.url&&(e=t.replace,t=t.url),function(t){for(var e=p.length;e--;)if(p[e].canRoute(t))return!0;return!1}(t)&&function(t,e){void 0===e&&(e="push"),h&&h[e]?h[e](t):"undefined"!=typeof history&&history[e+"State"]&&history[e+"State"](null,null,t)}(t,e?"replace":"push"),y(t)}function y(t){for(var e=!1,n=0;n<p.length;n++)!0===p[n].routeTo(t)&&(e=!0);for(var r=f.length;r--;)f[r](t);return e}function b(t){if(t&&t.getAttribute){var e=t.getAttribute("href"),n=t.getAttribute("target");if(e&&e.match(/^\//g)&&(!n||n.match(/^_?self$/i)))return g(e)}}function v(t){if(!(t.ctrlKey||t.metaKey||t.altKey||t.shiftKey||0!==t.button))return b(t.currentTarget||t.target||this),k(t)}function k(t){return t&&(t.stopImmediatePropagation&&t.stopImmediatePropagation(),t.stopPropagation&&t.stopPropagation(),t.preventDefault()),!1}function C(t){if(!(t.ctrlKey||t.metaKey||t.altKey||t.shiftKey||0!==t.button)){var e=t.target;do{if("A"===String(e.nodeName).toUpperCase()&&e.getAttribute("href")){if(e.hasAttribute("native"))return;if(b(e))return k(t)}}while(e=e.parentNode)}}var O=!1;var j=function(t){function e(e){t.call(this,e),e.history&&(h=e.history),this.state={url:e.url||m()},O||("function"==typeof addEventListener&&(h||addEventListener("popstate",(function(){y(m())})),addEventListener("click",C)),O=!0)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.shouldComponentUpdate=function(t){return!0!==t.static||(t.url!==this.props.url||t.onChange!==this.props.onChange)},e.prototype.canRoute=function(t){var e=Object(r.toChildArray)(this.props.children);return this.getMatchingChildren(e,t,!1).length>0},e.prototype.routeTo=function(t){this.setState({url:t});var e=this.canRoute(t);return this.updating||this.forceUpdate(),e},e.prototype.componentWillMount=function(){p.push(this),this.updating=!0},e.prototype.componentDidMount=function(){var t=this;h&&(this.unlisten=h.listen((function(e){t.routeTo(""+(e.pathname||"")+(e.search||""))}))),this.updating=!1},e.prototype.componentWillUnmount=function(){"function"==typeof this.unlisten&&this.unlisten(),p.splice(p.indexOf(this),1)},e.prototype.componentWillUpdate=function(){this.updating=!0},e.prototype.componentDidUpdate=function(){this.updating=!1},e.prototype.getMatchingChildren=function(t,e,n){return t.filter(c).sort(u).map((function(t){var i=a(e,t.props.path,t.props);if(i){if(!1!==n){var u={url:e,matches:i};return o(u,i),delete u.ref,delete u.key,Object(r.cloneElement)(t,u)}return t}})).filter(Boolean)},e.prototype.render=function(t,e){var n=t.children,i=t.onChange,o=e.url,a=this.getMatchingChildren(Object(r.toChildArray)(n),o,!0),u=a[0]||null,c=this.previousUrl;return o!==c&&(this.previousUrl=o,"function"==typeof i&&i({router:this,url:o,previous:c,active:a,current:u})),u},e}(r.Component);j.subscribers=f,j.getCurrentUrl=m,j.route=g,j.Router=j,j.Route=function(t){return Object(r.createElement)(t.component,t)},j.Link=function(t){return Object(r.createElement)("a",o({onClick:v},t))},j.exec=a;var P=function(){function t(){}return t.shuffleArray=function(t){for(var e=[].concat(t),n=e.length-1;n>0;n-=1){var r=Math.floor(Math.random()*(n+1)),i=e[n];e[n]=e[r],e[r]=i}return e},t.times=function(t){return Array.from(Array(t)).map((function(t,e){return e}))},t}(),U=function(){function t(t,e){void 0===e&&(e=!1),this.value=t,this.marked=e}return t.prototype.toggleMark=function(){this.marked=!this.marked},t}();function w(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var A=function(){function t(t){this.height=t.size.height,this.width=t.size.width,this.bingoPool=t.bingoPool,this.ultimatesPool=t.ultimatesPool,this.ultimatesSize=t.ultimatesSize,this.resetField(),this.resetUltimates()}var e,n,r,i=t.prototype;return i.reset=function(){return this.resetUltimates(),this.resetField(),this},i.resetUltimates=function(){return this.ultimates=this.pickUltimates(),this},i.resetField=function(){return this.field=this.generateField(),this},i.generateField=function(){var t=this,e=P.shuffleArray(this.bingoPool);return P.times(this.height).map((function(n){return P.times(t.width).map((function(r){return new U(e[n*t.width+r]||"")}))}))},i.checkRows=function(){return this.field.some((function(t){return t.every((function(t){return t.marked}))}))},i.checkColumns=function(){var t=this;return(this.field[0]||[]).some((function(e,n){return t.field.every((function(t){return t[n].marked}))}))},i.checkUltimates=function(){return this.ultimates.some((function(t){return t.marked}))},i.pickUltimates=function(){var t=P.shuffleArray(this.ultimatesPool);return P.times(this.ultimatesSize).map((function(e){return new U(t[e])}))},e=t,(n=[{key:"neededCellsCount",get:function(){return this.height*this.width}},{key:"isWon",get:function(){return this.checkRows()||this.checkColumns()||this.checkUltimates()}}])&&w(e.prototype,n),r&&w(e,r),t}(),R={title:"Удалённое бинго",help:"Перед вами удалённое бинго — подключайтесь на встречу и кликайте по ячейкам — выигрывает тот, кто первый закроет четыре в ряд. Любая из оранжевых кнопок — мгновенная победа.",youWonAlt:"Ура! Это уверенная победа, самое время включить микрофон и радостно воскликнуть «Бинго»",youWon:"Ура! Это уверенная победа, самое время включить микрофон и радостно воскликнуть «Бинго»",bingoPool:["Слышу слово «Коллеги»","Ребёнок в кадре","Немая болтовня с кем-то вне кадра","Вижу котика","«Сейчас немного подождём остальных»","Собеседник постоянно смотрит в бок","Лишние части тела в кадре","Слышу эхо / себя","2+ участников встречи говорят одновременно","Кто-то пытается усмирить тех, кто говорит одновременно","Приехал курьер","Звук воды на заднем плане","Разговор про коронавирус ","«Надоела удалёнка»","Звук нотификаций и отправленных сообщений","Мигает камера","Собеседник периодически выключает камеру","Собеседник что-то ест","Стильный интерьер","Кто-то говорит с замьюченным микрофоном","Всё зависло","Звуковой лаг","Собеседник в пижаме","Созвон из кровати","«Не расслышал, повтори, пожалуйста»","«Как думаете, это надолго?»","«Больше никого не ждём?»","«Ну тогда всё»","Кто-то сидит на балконе","Сегодня выходной","Уже 22:00 или позже","Вас много, но разговаривают двое","Звуки улицы","Звуки кухни","Звуки ванной","Собеседник звонит из туалета","Полотенце в кадре","«Меня слышно?»","Кончилось время в Zoom","Личное сообщение от того, кто с тобой на звонке","«Я без видео»","Собеседник завис на видео со смешным выражением лица","Проблемы со связью"],ultimatesPool:["Оборвалась связь","Слышу кусок диалога, который предназначался не мне","Корги в кадре","Собеседник отвлёкся на разговор по телефону","2+ доставки за созвон","Детские песни на фоне","Звук перфоратора","Больше двух животных в кадре","Раздетый человек в кадре","Собеседник сменил более двух локаций за звонок"],width:4,height:4,ultimatesSize:2,youWonImages:["https://media.giphy.com/media/hBdKJQwWJ98aI/source.gif","https://media.giphy.com/media/YFis3URdQJ6qA/source.gif","https://media.giphy.com/media/4xpB3eE00FfBm/source.gif","https://media.giphy.com/media/bznNJlqAi4pBC/source.gif","https://media.giphy.com/media/4N3MEvcLjWdiu4MiTx/giphy.gif","https://media.giphy.com/media/XbxZ41fWLeRECPsGIJ/source.gif","https://media.giphy.com/media/5GoVLqeAOo6PK/source.gif","https://media.giphy.com/media/DYH297XiCS2Ck/source.gif"]};function x(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var S=function(t){var e,n;n=t,(e=o).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n;var i;i=o;function o(e){var n;n=t.call(this,e)||this;var r={size:{height:R.height,width:R.width},bingoPool:R.bingoPool,ultimatesSize:R.ultimatesSize,ultimatesPool:R.ultimatesPool};return n.state={game:new A(r)},n.handleResetButton=n.handleResetButton.bind(x(n)),n.handleCellClick=n.handleCellClick.bind(x(n)),n}o.pickRandomImage=function(t){return t[Math.floor(Math.random()*t.length)]};var a=o.prototype;return a.handleResetButton=function(){var t=this.state.game;t.reset(),this.setState({game:t})},a.handleCellClick=function(t){var e=this.state.game;t.toggleMark(),this.setState({game:e})},a.renderBingoBoard=function(){var t=this,e=this.state.game,n={gridTemplateColumns:"repeat("+R.width+", auto)"};return Object(r.h)("section",{class:"bingo-board",style:n},e.field.map((function(e){return e.map((function(e){var n="bingo-card";return e.marked&&(n+=" bingo-card-marked"),Object(r.h)("button",{type:"button",class:n,onClick:function(){return t.handleCellClick(e)}},e.value)}))})))},a.renderUltimatesBoard=function(){var t=this,e=this.state.game,n={gridTemplateColumns:"repeat("+R.ultimatesSize+", 1fr)"};return Object(r.h)("section",{class:"ultimates-board",style:n},e.ultimates.map((function(e){var n="bingo-card ultimate";return e.marked&&(n+=" bingo-card-marked"),Object(r.h)("button",{type:"button",class:n,onClick:function(){return t.handleCellClick(e)}},e.value)})))},a.renderWonImage=function(){return Object(r.h)("p",{class:"you-won"},R.youWon,Object(r.h)("br",null),Object(r.h)("img",{class:"you-won-image",src:o.pickRandomImage(R.youWonImages),alt:R.youWonAlt}))},a.render=function(){var t=this.state.game.isWon,e=R.title,n=R.help;return Object(r.h)("section",{class:"bingo"},Object(r.h)("div",{class:"bingo-title"},e),!t&&Object(r.h)("p",{class:"bingo-help"},n),t&&this.renderWonImage(),!t&&this.renderBingoBoard(),!t&&this.renderUltimatesBoard(),Object(r.h)("footer",null,Object(r.h)("button",{type:"button",class:"reset",onClick:this.handleResetButton},"Заново")))},o}(r.Component);var _=function(t){var e,n;n=t,(e=o).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n;var i;i=o;function o(){for(var e,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))||this).handleRoute=function(t){e.currentUrl=t.url},e}return o.prototype.render=function(){return Object(r.h)("div",{id:"app"},Object(r.h)(S,null))},o}(r.Component);e.default=_}});
//# sourceMappingURL=ssr-bundle.js.map