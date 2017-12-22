export function getDownloadCmdFromM3U8(m3u8 = '') { 
	let videos = m3u8.split(/[\n\r]+/).filter(line => line && line[0] != '#');
	let count = videos.length;
	let lastVideo = videos[count - 1];
	let matcher = new RegExp(`seg-(${count})-([\\w\\-]+)\\.ts$`);
	let replacer = (_, id, format) => `seg-{1..${id}}-${format}.ts`;

	if (!matcher)
		throw new Error(`Could not match "${matcher.toString()}" from "${lastVideo}"`);
	return 'wget ' + lastVideo.replace(matcher, replacer);
}
