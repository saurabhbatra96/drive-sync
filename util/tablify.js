//	drive-sync
//  Copyright (C) 2016  Saurabh Batra
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

// tablify.js

var Table = require('cli-table');
var colors = require('colors');

module.exports = function(entity, obj) {
  switch (entity) {
    case 'ls':
      tablifyLs(obj);
      break;
    case 'pwd':
      tablifyPwd(obj);
      break;
  }
}

function tablifyLs(files) {
  var table = new Table({
    chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
         , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
         , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
         , 'right': '' , 'right-mid': '' , 'middle': '\t' }
  });

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (file.name.length>=20){
        file.name=file.name.substring(0,20)+"..";
    }
    file = beautifyLs(file);
    table.push([file.name, file.mimeType]);
  }

  console.log(table.toString());
}

function beautifyLs(file) {
  switch (file.mimeType) {
    case 'application/vnd.google-apps.folder':
      file.name = colors.blue(file.name);
      file.mimeType = colors.blue('Folder');
      break;
    case 'application/zip':
      file.mimeType = colors.green('Zip');
      file.name = colors.green(file.name);
      break;
    case 'application/foobar':
      file.mimeType = colors.red('Unrecognized');
      file.name = colors.red(file.name);
      break;
    case 'application/pdf':
      file.mimeType = colors.red('Pdf');
      file.name = colors.red(file.name);
      break;
    case 'application/vnd.google-apps.document':
      file.mimeType = colors.yellow('Google Doc');
      file.name = colors.yellow(file.name);
      break;
    case 'application/vnd.google-apps.form':
      file.mimeType = colors.yellow('Google Form');
      file.name = colors.yellow(file.name);
      break;
    case 'application/vnd.google-apps.spreadsheet':
      file.mimeType = colors.yellow('Google Sheet');
      file.name = colors.yellow(file.name);
      break;
    case 'image/gif':
      file.mimeType = colors.green('Gif Image');
      file.name = colors.green(file.name);
      break;
    case 'image/jpeg':
      file.mimeType = colors.green('JPEG Image');
      file.name = colors.green(file.name);
      break;
    case 'image/png':
      file.mimeType = colors.green('PNG Image');
      file.name = colors.green(file.name);
      break;
  }
  return file;
}

function tablifyPwd(folder) {
  var table = new Table({
    chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
         , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
         , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
         , 'right': '' , 'right-mid': '' , 'middle': '\t' },
    head: ['Name', 'Last Modified', 'Owner']
  });

  folder.owners[0].displayName = colors.red(folder.owners[0].displayName);
  table.push([folder.name, folder.modifiedTime, folder.owners[0].displayName]);
  console.log(table.toString());
}
