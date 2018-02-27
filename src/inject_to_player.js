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

	let addonCommand = '';
	let endCommand = 'Avgle; // combine video files';

	// add car number for main title
	for (let node of videoTitleDOM.childNodes) {
		if (node.nodeType == Node.TEXT_NODE) {
			let videoTitle = node.textContent;
			let carNumber = utilsContext.parseCarNumber(videoTitle);

			if (carNumber) {
				let carNumDOM = document.createElement('b');
				carNumDOM.className = 'text-success';
				carNumDOM.innerText = carNumber;
				carNumDOM.style.margin = '0 .5em';
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


	let videoColumn = document.querySelector('.video-container').parentNode.parentNode;
	videoColumn.className = "col-lg-12 col-md-12 col-sm-12";
}
