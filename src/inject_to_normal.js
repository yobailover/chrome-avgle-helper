import helper from "./inject_utils";

// display car number
document.querySelectorAll('.video-title').forEach(e => {
	let carName = helper.parseCarNumber(e.innerText);

	let dom = document.createElement('div');
	dom.className = carName ? "text-success" : "text-muted";
	dom.innerHTML = `<b>${carName||"unknown"}</b>`;
	e.parentNode.appendChild(dom);
});
// intercept pop-up advertising
// injectNativeCode(popupInterceptor);

// function popupInterceptor() {
// 	let originalWindowsOpen = window.open;
// 	window.open = (...p) => {
// 		console.log(`Detected window.open: ${JSON.stringify(p)}`);
// 		let handler = originalWindowsOpen(...p);
// 		setTimeout(() => {
// 			handler.close();
// 			console.log('Closed pop-up window!');
// 		}, 15);
// 		return handler;
// 	};
// 	console.log('Pop-up interceptor has been setup!');
// }

// function injectNativeCode(func) { 
// 	let code = func.toString();
// 	let $script = document.createElement('script');
// 	$script.appendChild(document.createTextNode('('+ code +')();'));
// 	(document.body || document.head || document.documentElement).appendChild($script);
// }
