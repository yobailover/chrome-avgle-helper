//@ts-check
/// <reference path="./index.d.ts" />

import { M3U8_PATTERN, VIDEO_PAGE_PATTERN } from "./config";
import { getInjectScript } from "./inject_to_player";
import { getDownloadCmdFromM3U8 } from "./m3u8";
import { info, getLogHistoryHTML, error, bindLogCallback, unbindLogCallback, clearLogHistory } from "./logger";

info('Chrome Avgle Helper background script started!');
info(`Extension id: ${chrome.runtime.id}`);

chrome.runtime.onConnect.addListener(port => {
	if (port.name != "popup") {
		error(`unknown connection with name: ${port.name}`);
		return port.disconnect();
	}
	info('log connection established', 'muted');

	bindLogCallback(log => port.postMessage(log));
	port.postMessage(getLogHistoryHTML());

	port.onMessage.addListener(msg => {
		if (msg == 'clear-log') {
			clearLogHistory();
			info('log cleared', 'muted');
			return;
		}
	});
	port.onDisconnect.addListener(() => {
		unbindLogCallback();
		info('log connection disconnected', 'muted');
	});
});

chrome.webRequest.onBeforeRequest.addListener(details => {
	// Ignore extension itself
	if (details.tabId < 0)
		return;

	info(`Captured m3u8 request (method: ${details.method}) from tab(id: ${details.tabId}):` +
		`\n${details.url}`);

	chrome.tabs.get(details.tabId, tab => {
		info(`Tab title: ${tab.title}`);
		info(`Tab URL: ${tab.url}`);
		if (!tab.url.match(VIDEO_PAGE_PATTERN))
			return info("Ignore this tab!");

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
			}, () => { info('Inject script success!'); });
		}
	});

}, { urls: [M3U8_PATTERN] });

/**
 * @param {MessageObject} msg
 * @param {Function} response
 */
function onMessage(msg, _, response) {
	if (msg) console.log(`onMessage: ${msg.name}`);
	if (msg.name == 'get-history-log') {
		return response(getLogHistoryHTML());
	}
}
