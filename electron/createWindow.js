const { BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 450,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("../index.html");

  win.on('close', event => {
    event.preventDefault();
    win.hide();
  })

  return win
}

module.exports = createWindow()