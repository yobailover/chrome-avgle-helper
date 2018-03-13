(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s;})({1:[function(require,module,exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});const M3U8_PATTERN=exports.M3U8_PATTERN='*://*.ahcdn.com/*.m3u8';const VIDEO_PAGE_PATTERN=exports.VIDEO_PAGE_PATTERN=/(https|http):\/\/avgle.com\/video\/\d+\//;},{}],2:[function(require,module,exports){"use strict";var _config=require("./config");var _inject_to_player=require("./inject_to_player");var _logger=require("./logger");(0,_logger.info)('Chrome Avgle Helper background script started!');(0,_logger.info)(`Extension id: ${chrome.runtime.id}`);chrome.runtime.onConnect.addListener(port=>{if(port.name!="popup"){(0,_logger.error)(`unknown connection with name: ${port.name}`);return port.disconnect();}(0,_logger.info)('log connection established','muted');(0,_logger.bindLogCallback)(log=>port.postMessage(log));port.postMessage((0,_logger.getLogHistoryHTML)());port.onMessage.addListener(msg=>{if(msg=='clear-log'){(0,_logger.clearLogHistory)();(0,_logger.info)('log cleared','muted');return;}});port.onDisconnect.addListener(()=>{(0,_logger.unbindLogCallback)();(0,_logger.info)('log connection disconnected','muted');});});chrome.webRequest.onBeforeRequest.addListener(details=>{if(details.tabId<0)return;(0,_logger.info)(`Captured m3u8 request (method: ${details.method}) from tab(id: ${details.tabId}):`+`\n${details.url}`);chrome.tabs.get(details.tabId,tab=>{(0,_logger.info)(`Tab title: ${tab.title}`);(0,_logger.info)(`Tab URL: ${tab.url}`);if(!tab.url.match(_config.VIDEO_PAGE_PATTERN))return(0,_logger.info)("Ignore this tab!");let m3u8URL=details.url;let m3u8URLBase64=btoa(m3u8URL);injectScript(null,{m3u8URLBase64,tabURL:tab.url});function injectScript(err,parameters={}){if(err&&typeof err!='string')err='message'in err?`${err.message}\n${err.stack}`:String(err);chrome.tabs.executeScript(details.tabId,{code:(0,_inject_to_player.getInjectScript)(err,parameters)},()=>{(0,_logger.info)('Inject script success!');});}});},{urls:[_config.M3U8_PATTERN]});},{"./config":1,"./inject_to_player":3,"./logger":5}],3:[function(require,module,exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.getInjectScript=getInjectScript;var _inject_utils=require('./inject_utils');var _inject_utils2=_interopRequireDefault(_inject_utils);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function getInjectScript(errorStr,paramters){const injectHelperName='chromeAvgleHelper';return`
		${_inject_utils2.default.getInjectCodes(injectHelperName)};
		(${inject2player.toString()})(
			${injectHelperName},
			${JSON.stringify(errorStr)},
			${JSON.stringify(paramters)}
		);`;}function inject2player(utilsContext,errorStr,paramters={}){let tabURL=String(paramters.tabURL||''),m3u8URLBase64=String(paramters.m3u8URLBase64||'');let videoTitleDOM=document.querySelector('.container .row .col-lg-12 h1');let command='';for(let node of videoTitleDOM.childNodes){if(node.nodeType==Node.TEXT_NODE){let videoTitle=node.textContent;let carNumber=utilsContext.parseCarNumber(videoTitle);if(!carNumber){let avgleId=tabURL.match(/\/(\d+)\//);carNumber=`avgle-${avgleId?avgleId[1]:'unknown'}`;}else if(!document.querySelector('.chrome-avgle-extension.car-number')){let carNumDOM=document.createElement('b');carNumDOM.className='text-success chrome-avgle-extension car-number';carNumDOM.innerText=carNumber;carNumDOM.style.margin='0 .5em';node.parentNode.insertBefore(carNumDOM,node);}command=[`mkdir ${carNumber};`,`cd ${carNumber};`,`AvgleDownloader ${carNumber} ${m3u8URLBase64};`,`Avgle; // combine video files`].join('\n');break;}}let injectDiv=document.createElement('div');injectDiv.className='col-lg-12';if(errorStr){injectDiv.className+=" alert-danger";injectDiv.innerHTML=`
			Get Download Command Failed:
			<pre><code>${errorStr}</code></pre>
		`;}else{injectDiv.innerHTML=`
			Download Command:<br/>
			<pre><code>${command}</code></pre>
		`;}let injectContainer=videoTitleDOM.parentNode.parentNode;injectContainer.appendChild(injectDiv);let videoColumn=document.querySelector('.video-container').parentNode.parentNode;videoColumn.className="col-lg-12 col-md-12 col-sm-12";}},{"./inject_utils":4}],4:[function(require,module,exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});let exportFunctions={getInjectCodes,parseCarNumber};exports.default=exportFunctions;function getInjectCodes(wrapperName){let result=`window.${wrapperName} = {};`;result+=Object.keys(exportFunctions).map(funcName=>{let funcBody=exportFunctions[funcName].toString();return`${wrapperName}.${funcName} = ${funcBody};`;}).join('');return result;}function parseCarNumber(str=''){const matchers=[[/10musume[\-_\s](\d{6})[\-_\s](\d{2})/i,match=>`10musume-${match[1]}-${match[2]}`],[/fc2[\s\-_]?ppv[\s\-_]?(\d+)/i,match=>`FC2-PPV-${match[1]}`],[/S-Cute\s+(\w+)\s+#(\d+)/i,match=>`S-Cute-${match[1]}-${match[2]}`],[/Heydouga[\-_\s]?(\d+)[\-_\s]?(\d+)/i,match=>`Heydouga-${match[1]}-${match[2]}`],[/heyzo[\-_\s]?(\d+)/i,match=>`heyzo-${match[1]}`],[/(\d+)[\-_\s](\d+)[\-_\s]Carib(?:bean(?:com)?)?/i,match=>`carib-${match[1]}-${match[2]}`],[/Carib(?:bean(?:com)?)?[\-_\s]?(\d+)[\-_\s]?(\d+)/i,match=>`carib-${match[1]}-${match[2]}`],/\w+-\d+/i,[/(\w{8,})[\-_\s](\d{5,})[\-_\s](\d{3,})/,match=>`${match[1]}-${match[2]}-${match[3]}`]];for(let matcher of matchers){if(Array.isArray(matcher)){let result=str.match(matcher[0]);if(result)return matcher[1](result);}else{let result=str.match(matcher);if(result)return result[0];}}return null;}},{}],5:[function(require,module,exports){'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.bindLogCallback=bindLogCallback;exports.unbindLogCallback=unbindLogCallback;exports.info=info;exports.error=error;exports.clearLogHistory=clearLogHistory;exports.getLogHistoryHTML=getLogHistoryHTML;const MAX_HISTORY=1000;const AVG_HISTORY=700;let history=[];let logCallback=undefined;function push2history(content,type="info"){let ctx={t:Date.now(),c:content,type};if(history.length>=MAX_HISTORY)history=history.slice(MAX_HISTORY-AVG_HISTORY);history.push(ctx);if(logCallback)logCallback(logItem2html(ctx));return ctx;}let escapeMap={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'};let escape=text=>text.replace(/[&<>"'`=\/]/g,matched=>escapeMap[matched]);function bindLogCallback(callback){logCallback=callback;}function unbindLogCallback(){logCallback=undefined;}function logItem2html(item){let d=new Date(item.t);let part=item.c.split(/(https?:\/\/\S+)/).map(ctx=>ctx.match(/^https?:\/\//)?`<a href="${encodeURI(ctx)}" target="_blank">${escape(decodeURI(ctx))}</a>`:escape(ctx));return`<div class="${item.type}">
		<span class="prefix">${escape(d.toLocaleDateString()+" "+d.toLocaleTimeString())}</span>
		${part.join('')}
	</div>`;}function info(content,type="info"){console.log(content);push2history(content,type);}function error(content){console.error(content);push2history(content,"error");}function clearLogHistory(){history=[];}function getLogHistoryHTML(){return history.map(logItem2html).join('\n');}},{}]},{},[2]);
//# sourceMappingURL=index.js.map