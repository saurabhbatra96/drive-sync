# Google Drive Sync (Alpha)

[![Gitter badge](https://badges.gitter.im/saurabhbatra96/drive-sync.svg)](https://gitter.im/saurabhbatra96/drive-sync?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Aim
To generate a native terminal application which can be used to browse, download/upload files and sync your Google Drive with a local folder.

## Installation
Ensure you have a reasonably updated version of `node` and `npm` on your PC.

Clone this repository and then follow the instructions below:
``` bash
$ git clone https://github.com/saurabhbatra96/drive-sync.git
$ cd drive-sync/
$ npm link
```

## Usage
Currently the working CLI options include:

- **ls** (List Files)
	- `Usage: $ drive-sync ls`
	- `Description: List files in current folder.`

- **cd** (Change Working Directory)
  - `Usage:`
    - `$ drive-sync cd <folder-name>`
    - `$ drive-sync cd ..`
    - `$ drive-sync cd`
  - `Description:`
    - `Change working directory to <folder-name>`
    - `Change working directory to the one above.`
    - `Change working directory to root.`

## Technologies
NodeJS, God knows what else.
