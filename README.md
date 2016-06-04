# Google Drive Sync (Beta)

[![Gitter badge](https://badges.gitter.im/saurabhbatra96/drive-sync.svg)](https://gitter.im/saurabhbatra96/drive-sync?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

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

- **ls**
	- Usage: `$ drive-sync ls`
	- Description: List files in current folder.

- **cd**
  - Usage:
    - `$ drive-sync cd <folder-name>`
    - `$ drive-sync cd ..`
    - `$ drive-sync cd`
  - Description:
    - Change working directory to <folder-name>
    - Change working directory to the one above.
    - Change working directory to root.

- **pwd**
	- Usage: `$ drive-sync pwd`
	- Description: Expose information about the current folder.

- **down**
	- Usage:
		- `$ drive-sync down <file-name>`
		- `$ drive-sync down all`
		- `$ drive-sync down all --filter` (Not yet implemented.)
	- Description:
		- Download <file-name> from Drive to the directory you are currently in.
		- Download all the files in the directory you are currently in.
		- Download all files matching the following filters:
			- `image: all files of the type image (png, jpg, gif, svg)`
			- `pdf: all files of the type pdf`
			- `zip: all files of the type zip`
	- `Note: If there are Google Docs in your folder, they will be converted to default formats and exported as well. For advanced options see drive-sync export.`

- **export**
	- Usage: `$ drive-sync export <doc-name> <format>`
	- Description: Export your docs (doc or spreadsheet) in the following supported formats for documents:
		- `html`
		- `pdf`
		- `doc (default)`
		- `txt`

		and for Spreadsheets
		- `xls (default for sheets)`
		- `csv (only exports the first sheet)`

- **logout**
	- Usage: `$ drive-sync logout`
	- Description: Logout from your account.

## License
This program is licensed under the GNU GPL v3 license. Check out License.txt for more details.

## Technologies
NodeJS.
