const { BrowserWindow } = require("electron");
const path = require("path")

function createWindow() {
  const win = new BrowserWindow({
    width: 450,
    height: 600,
    icon: path.join(__dirname, "../", "assets", "icon.png"),
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