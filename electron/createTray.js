const { Tray } = require("electron");
const { resolve } = require("path")

const iconPath = resolve(__dirname, "../", "assets", "notification.png")

function createTray() {
  const tray = new Tray(iconPath);
  
  tray.setToolTip("Pomodoro");

  return tray
}

module.exports = createTray()