<script lang="ts">
  let settings = {};
  const storage = require("electron-json-storage");

  storage.has("settings", (error: string, hasKey: boolean) => {
    if (error) throw error;
    if (hasKey) {
      storage.get("settings", (error: string, data: object) => {
        if (error) throw error;
        settings = data;
      });
    }
  });

  function showFolderDialog() {
    const { dialog } = require("electron").remote;
    const window = require("electron").remote.BrowserWindow;
    dialog
      .showOpenDialog(window.getFocusedWindow(), {
        properties: ["openDirectory"],
      })
      .then((result) => {
        const filePath = result.filePaths[0];
        if (filePath) {
          console.dir(filePath);
          settings["folder"] = filePath;
          storage.set("settings", settings, function (error) {
            if (error) throw error;
          });
        }
      });
  }
</script>

<main>
  <h1>General</h1>
  <ul class="general">
    <li>Music Folder <button on:click={showFolderDialog}>{settings["folder"]}</button></li>
  </ul>
</main>

<style lang="scss">
  main {
    height: 100%;
    width: 100%;
    padding: 20px;
  }
  h1 {
    font-size: 1.6em;
    font-weight: 400;
    color: #ff006b;
  }
  ul {
    margin-top: 10px;
  }
  .general > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      height: 100%;
      width: 50%;
      text-align: left;
      padding: 10px 20px;
      border: none;
      border-radius: 7px;
      cursor: pointer;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 100%;
    }
  }
</style>
