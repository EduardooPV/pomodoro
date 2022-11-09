const { app, BrowserWindow } = require('electron');

require('electron-reloader')(module)

function App() {
  const win = require("./createWindow.js");
  const tray = require("./createTray.js")
}

app.whenReady().then(App);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    const win = require("./createWindow.js");
  }
});

if (process.platform === "win32") {
  app.setAppUserModelId("Pomoduds");
}
