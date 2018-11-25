# Chrome Avgle Helper

A Chrome extension for a free community  一个给司机用的Chrome插件

## Notice 注意

**This extension is for research and learning only. Do not use it for illegal purposes**   
You can learn how to create Chrome extension, write Bash script and more from this repository ....

**这个插件仅供用于研究学习. 请勿用于非法用途**   
你可以从这个仓库中学到如何创建 Chrome 插件, 编写 Bash 脚本等等 ...

## Function 功能

1. download video 下载
2. display video number friendly 车牌号

## Install & Usage 安装 & 使用

1. Install `Git` and understand the basic use of `Git`
2. Clone this repository into local computer.
3. Install Chrome extension
	1. Navigate to `chrome://extensions` in chrome.
	2. Check `Developer mode` on, then click `Load Unpacked Extension`.
	3. Choose the folder `extension` under this project.
4. Please read [windows-libs/README.md](windows-libs/README.md) **If you are a Windows user (Windows 用户请读这个文档)**
5. Install download and merger scripts:
	- for Most Linux Systems / OS X / WSL:
		- `./install.sh /usr/local/bin/` or `./install.sh ~/bin`
	- for Windows User (Git Bash / Cygwin):
		- `./install.sh`
6. Usage example:
	1. Download video follow command on the online player page by script `AvgleDownloader`
	2. Combine video files by script `Avgle`

## TODO

- [ ] Add support for `x**deos` (Download and Merge flow are most same with this)

## License

Sources are licensed under the [GPL-3.0 License](LICENSE).
