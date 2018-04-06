# Chrome Avgle Helper

A Chrome extension for a free community  一个给司机用的Chrome插件

## Notice 注意

En:
1. **This extension is for research and learning only. Do not use it for illegal purposes**
2. **Because free community need advertising for maintaining.** So I will not include any function around removing advertising in it. (exclude mining advertising)

中:
1. **这个插件仅供用于研究学习. 请勿用于非法用途**
2. **免费的社区需要靠广告来持续下去.** 所以我不会在这个插件中加入任何移除广告的功能(除了会挖矿的广告)

## Function 功能

1. download video 下载
2. display video number friendly 车牌号

## Usage

1. Install this Chrome extension
	1. Navigate to `chrome://extensions` in chrome.
	2. Check `Developer mode` on, then click `Load Unpacked Extension`.
	3. Choose this project folder.
2. Copy two bash scripts `Avgle` and `AvgleDownloader` into `/usr/local/bin`.
	- Or other folder which in the `PATH` environment variable (for example: `$HOME/bin`)
	- These are bash scripts. **Only for \*nix OS user included WSL(Windows Subsystem for Linux)**
2. Download video follow command on the online player page by script `AvgleDownloader`
3. Combine video files by script `Avgle`

## License

Sources are licensed under the [GPL-3.0 License](LICENSE).
