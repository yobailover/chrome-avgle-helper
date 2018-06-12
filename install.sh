#!/usr/bin/env bash

INSTALL_TO="$1";
SCRIPT_NAME="${BASH_SOURCE[0]}";

function throw() { echo -e "fatal: $1\nexit with code 1"; exit 1; }

if [[ -z "$INSTALL_TO" ]]; then
	echo;
	echo "Usage: $SCRIPT_NAME \${install_to}";
	echo;
	echo '  Install `Avgle` and `AvgleDownloader to special directory`';
	echo "  For example: $SCRIPT_NAME ~/bin";
	echo;
	exit 0;
fi

[[ -d "$INSTALL_TO" ]] || throw "$INSTALL_TO is not a directory!";
[[ -w "$INSTALL_TO" ]] || throw "$INSTALL_TO is not writable!";

# checkout to directory same with this script
__DIRNAME=`cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd`;
pushd "$__DIRNAME" > /dev/null;

cp Avgle            "$INSTALL_TO/" || throw 'Copy `Avgle` failed!';
echo "[~] copied Avgle";

cp AvgleDownloader  "$INSTALL_TO/" || throw 'Copy `AvgleDownloader` failed!';
echo "[~] copied AvgleDownloader";

echo "[+] success: installed to $INSTALL_TO";
