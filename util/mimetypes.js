// mimetypes.js

module.exports.isFolder = function(mime) {
  if (mime == 'application/vnd.google-apps.folder') {
    return true;
  } else {
    return false;
  }
}

module.exports.isDoc = function(mime) {
  switch (mime) {
    case 'application/vnd.google-apps.document':
      return true;
      break;
    case 'application/vnd.google-apps.spreadsheet':
      return true;
      break;
  }
}
