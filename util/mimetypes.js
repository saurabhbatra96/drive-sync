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

module.exports.isSupportedMime = function(mime) {
  switch (mime) {
    case 'html':
      return true;
      break;
    case 'pdf':
      return true;
      break;
    case 'doc':
      return true;
      break;
    case 'txt':
      return true;
      break;
    case 'xls':
      return true;
      break;
    case 'csv':
      return true;
      break;
  }
}

module.exports.convertMime = function(mime) {
  switch (mime) {
    case 'html':
      return 'text/html';
      break;
    case 'pdf':
      return 'application/pdf';
      break;
    case 'doc':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      break;
    case 'txt':
      return 'text/plain';
      break;
    case 'excel':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      break;
    case 'csv':
      return 'text/csv';
      break;
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'doc';
      break;
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return 'xls';
      break;
  }
}

module.exports.getDefault = function(mime) {
  switch (mime) {
    case 'application/vnd.google-apps.document':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      break;
    case 'application/vnd.google-apps.spreadsheet':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      break;
  }
}
