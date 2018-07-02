# Chrome Avgle Helper

A Chrome extension for a free community  一个给司机用的Chrome插件

## Breaking change in `1.3.0` 版本变动

1. Please **remove** this extension from Chrome firstly if you used this extension before `1.3.0`
2. Load this extension in `chrome://extensions` from directory `extension` (under root directory of this project) again.

中:  
1. 请先从 Chrome 移除旧版本的插件
2. 在 `chrome://extensions` 页面从重新加载这个插件(选择目录 `extension`)

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

0. Clone/Download this repository to local.
	- **How?** (There is a button named **Clone or download** at the top right of this page)
1. Install this Chrome extension
	1. Navigate to `chrome://extensions` in chrome.
	2. Check `Developer mode` on, then click `Load Unpacked Extension`.
	3. Choose the folder `extension` under this project.
2. Copy two bash scripts `Avgle` and `AvgleDownloader` into `/usr/local/bin`.
	- Or other folder which in the `PATH` environment variable (for example: `$HOME/bin`)
	- These are bash scripts. **Only for \*nix OS user included WSL(Windows Subsystem for Linux)**
2. Download video follow command on the online player page by script `AvgleDownloader`
3. Combine video files by script `Avgle`

## TODO

- [ ] Add support for `x**deos` (Download and Merge flow are most same with this)

## License

Sources are licensed under the [GPL-3.0 License](LICENSE).
