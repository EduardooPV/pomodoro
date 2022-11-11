const { app, Tray, Menu } = require("electron");
const win = require("./createWindow.js");
const { resolve } = require("path")

function createTray() {
  const iconPath = resolve(__dirname, "../", "assets", "icon.png")

  const tray = new Tray(iconPath);

  tray.setToolTip("Pomodoro");

  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Maximizar', click: function () {
        win.show();
      }
    },
    {
      label: 'Minimizar', click: function () {
        win.hide();
      }
    },
    {
      label: 'Fechar', click: function () {
        win.destroy();
        app.quit();
      }
    }
  ]));

  tray.on('click', () => {
    if (win.isVisible()) {
      win.hide()
    } else {
      win.show()
      win.focus()
    }
  })

  return tray
}

module.exports = createTray()