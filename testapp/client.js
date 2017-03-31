const $ = require('jquery-browserify');
const ipc = require('electron').ipcRenderer;

$('body').on('click', '#uploadPK', () => {
  ipc.send('upload');
});

ipc.on('file', (event, {file, legality}) => {
  $('#file').val(JSON.stringify(file, undefined, 4));
  $('#legality').val(JSON.stringify(legality, undefined, 4));
});
