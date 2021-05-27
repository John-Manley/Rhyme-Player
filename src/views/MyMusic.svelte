<script lang="ts">
  import SongItem from "../components/SongItem.svelte";
  import { player } from "../store";

  const storage = require("electron-json-storage");
  const mm = require("music-metadata");
  const fs = require("fs");
  const path = require("path");
  let recentlyPlayed: object[];
  storage.has("recently-played", (error: string, hasKey: boolean) => {
    if (error) throw error;
    if (hasKey) {
      storage.get("recently-played", (error: string, data: object) => {
        if (error) throw error;
        recentlyPlayed = data["recently-played"];
      });
    }
  });
  let songsInfo: object[];
  storage.has("songs-info", (error: string, hasKey: boolean) => {
    if (error) throw error;
    if (hasKey) {
      storage.get("songs-info", (error: string, data: object) => {
        if (error) throw error;
        songsInfo = data["songs-info"];
      });
    }
  });

  var walkSync = function (dir: string, filelist?: string[]) {
    let files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file: string) {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        filelist = walkSync(path.join(dir, file), filelist);
      } else {
        if (
          file.endsWith(".mp3") ||
          file.endsWith(".m4a") ||
          file.endsWith(".webm") ||
          file.endsWith(".wav") ||
          file.endsWith(".aac") ||
          file.endsWith(".ogg") ||
          file.endsWith(".opus")
        ) {
          filelist.push(path.join(dir, file));
        }
      }
    });
    return filelist;
  };

  async function parseFiles(audioFiles: string[]) {
    var titles = [];
    for (const audioFile of audioFiles) {
      // await will ensure the metadata parsing is completed before we move on to the next file
      const metadata = await mm.parseFile(audioFile, { skipCovers: false });
      var data = { howl: null };
      var title = metadata.common.title;
      var artist = metadata.common.artist;
      data["title"] = title ? title : audioFile.split(path.sep).slice(-1)[0];
      data["artist"] = artist ? artist : "Unknown";
      data["file"] = audioFile;
      data["imgSrc"] = metadata.common.picture
        ? `data:${
            metadata.common.picture[0].format
          };base64,${metadata.common.picture[0].data.toString("base64")}`
        : null;
      console.log(metadata);
      titles.push(data);
    }
    return titles;
  }

  async function scanDir(filePath: string) {
    if (!filePath || filePath == "undefined") return;
    var files = walkSync(filePath);
    var names = await parseFiles(files);
    songsInfo = names;
    $player = new Player(songsInfo);
    console.log(names);
  }

  storage.get("folder-path", (error: string, data: string) => {
    if (error) throw error;
    scanDir(data);
  });
</script>

<main>
  {#if recentlyPlayed}
    <h1>Recently Played</h1>
    <div class="recently-played">
      {#each recentlyPlayed as item}
        <SongItem
          artist={item["artist"]}
          title={item["title"]}
          imgSrc={item["imgSrc"]}
        />
      {/each}
    </div>
  {/if}
  {#if songsInfo}
    <div class="songs">
      {#each songsInfo as song}
        <SongItem
          artist={song["artist"]}
          title={song["title"]}
          imgSrc={song["imgSrc"]}
          file={song["file"]}
        />
      {/each}
    </div>
  {/if}
</main>

<style lang="scss">
  main {
    padding: 20px;
    width: 100%;
    height: 100%;

    h1 {
      font-weight: 400;
      font-size: 1.6em;
    }

    .recently-played {
      width: 100%;
      height: 200px;
      border-radius: 10px;
      margin-top: 15px;
      background-color: #ececec;
      overflow-x: scroll;
    }

    .songs {
      display: grid;
      gap: 15px;
      grid-template-columns: repeat(auto-fill, 120px);
    }
  }
</style>
