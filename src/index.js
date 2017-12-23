//@ts-check

import { M3U8_PATTERN, VIDEO_PAGE_PATTERN } from "./config";
import { getInjectScript } from "./inject_to_player";
import { getDownloadCmdFromM3U8 } from "./m3u8";

console.log('Chrome Avgle Helper background script started!');
console.log(`Extension id: ${chrome.runtime.id}`);

chrome.webRequest.onBeforeRequest.addListener(details => {
	// Ignore extension itself
	if (details.tabId < 0)
		return;	
	
	console.log(`Captured m3u8 request (method: ${details.method}) from tab(id: ${details.tabId}):` +
		`\n${details.url}`);

	chrome.tabs.get(details.tabId, tab => {
		console.log(`Tab title: ${tab.title}`);
		console.log(`Tab URL: ${tab.url}`);
		if (!tab.url.match(VIDEO_PAGE_PATTERN))
			return console.log("Ignore this tab!");
		
		let xhr = new XMLHttpRequest();
		xhr.open('GET', details.url);
		xhr.onload = () => {

			if (xhr.readyState != 4 || xhr.status != 200) { 
				return injectScript(`m3u8 file request failed! ` +
					`(readyState = ${xhr.readyState}; status = ${xhr.status};)\n` +
					`URL:${details.url}`);
			}

			try {
				let command = getDownloadCmdFromM3U8(xhr.responseText);
				injectScript(null, command);
			} catch (ex) { 
				injectScript(ex, null);
			}
			
		};
		xhr.onerror = err => injectScript(err, null);
		xhr.send();

		function injectScript(err, command = null) { 
			if (err)
				if (typeof err != 'string')
					err = `${err.message}\n${err.stack}`;
			chrome.tabs.executeScript(details.tabId, {
				code: getInjectScript(err, command)
			}, () => { console.log('Inject script success!'); });
		}
	});

}, { urls: [M3U8_PATTERN] });
