import helper from "./inject_utils";

export function getInjectScript(errorStr, commandDisplay) { 
	const injectHelperName = 'chromeAvgleHelper';
	
	return `
		${helper.getInjectCodes(injectHelperName)};
		(${inject2player.toString()})(
			${injectHelperName},
			${JSON.stringify(errorStr)}, 
			${JSON.stringify(commandDisplay)}
		);`;
}

function inject2player(utilsContext, errorStr, commandDisplay) {
	let videoTitleDOM = document.querySelector('.container .row .col-lg-12 h1');

	// delete inner functions
	window.alert = null;
	window.open = null;

	// remove advertising
	// iframe
	for (let adIframe of document.querySelectorAll('iframe')) 
		adIframe.parentNode.removeChild(adIframe);
	// clickable video
	for (let video of document.querySelectorAll('a>video'))
		video.parentNode.removeChild(video);	
	// remove hover ad on video
	let e = document.querySelector('#blocked-if');
	e.parentNode.removeChild(e);

	let addonCommand = '';
	let endCommand = 'Avgle; // combine video files';
	
	// get car number
	for (let node of videoTitleDOM.childNodes) {
		if (node.nodeType == Node.TEXT_NODE) {
			let videoTitle = node.textContent;
			let carNumber = utilsContext.parseCarNumber(videoTitle);
			
			if (carNumber) {
				let carNumDOM = document.createElement('b');
				carNumDOM.className = 'text-success';
				carNumDOM.innerText = carNumber;
				node.parentNode.insertBefore(carNumDOM, node);
				
				addonCommand = `mkdir ${carNumber};\ncd ${carNumber};`;
			}
			break;
		}	
	}	

	let injectDiv = document.createElement('div');
	injectDiv.className = 'col-lg-12';
	if (errorStr) { 
		injectDiv.className += " alert-danger";
		injectDiv.innerHTML = `
			Get Download Command Failed:
			<pre><code>${errorStr}</code></pre>
		`;
	} else {
		injectDiv.innerHTML = `
			Download Command:<br/>
			<pre><code>${addonCommand}\n${commandDisplay}\n${endCommand}</code></pre>
		`;
	}

	let injectContainer = videoTitleDOM.parentNode.parentNode; // .row
	injectContainer.appendChild(injectDiv);

	// remove all script
	for (let script of document.querySelectorAll('script'))
		script.parentNode.removeChild(script);
	
	// remove aside advertising
	let asideAd = document.querySelector('#ps32-container').parentNode;
	let mainRow = asideAd.parentNode;
	mainRow.removeChild(asideAd);
	for(let e of mainRow.childNodes) 
		e.className = 'col-lg-12';
	
}
