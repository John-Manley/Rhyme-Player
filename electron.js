const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const storage = require("electron-json-storage");

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: require(path.join(__dirname, "node_modules/electron")),
  });
}

let win;

app.on("ready", createWindow);

function createWindow() {
  win = new BrowserWindow({
    title: "Rhyme Player",
    icon: path.join(__dirname, "icon.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  win.loadFile(path.join(__dirname, "public/index.html"));

  storage.has("settings", (error, haskey) => {
    if (error) throw error;
    if (!haskey) {
      let settings = {
        folder: app.getPath("music"),
        theme: "light",
      };
      storage.set("settings", settings, (error) => {
        if (error) throw error;
      });
    }
  });

  if (isDev) {
    win.setMenu(
      Menu.buildFromTemplate([
        {
          label: "Dev Tools",
          click() {
            win.webContents.toggleDevTools();
          },
        },
      ])
    );
    win.on("close", () => {});

    return;
  }

  win.setMenu(null);
}
