const electron = require('electron');
const app = electron.app;
const ipc = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const pkparse = require('pkparse');
const legalityCheck = require('../..');

let mainWindow;

ipc.on('upload', (event) => {
  const dialog = electron.dialog;
  dialog.showOpenDialog((fileNames) => {
    if (fileNames) {
      readFile(fileNames[0]);
    }
  });

  const readFile = (filepath) => {
    const file = pkparse.parseFile(filepath, {gen: 7, parseNames: true});
    delete file._rawFile;
    const legality = legalityCheck(file);
    event.sender.send('file', {file, legality});
  };
});

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
