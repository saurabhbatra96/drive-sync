// tablify.js
var Table = require('cli-table');
var colors = require('colors');

module.exports = function(entity, obj) {
  switch (entity) {
    case 'ls':
      tablifyLs(obj);
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
      file.mimeType = colors.green('Image Gif');
      file.name = colors.green(file.name);
      break;
    case 'image/jpeg':
      file.mimeType = colors.green('Image JPEG');
      file.name = colors.green(file.name);
      break;
    case 'image/png':
      file.mimeType = colors.green('Image PNG');
      file.name = colors.green(file.name);
      break;
  }
  return file;
}
