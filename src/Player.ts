const { Howl } = require("howler");
const storage = require("electron-json-storage");
import { currentSong } from "./store";

export default class Player {
  index: number = 0;
  songs = [];

  constructor(songs?: object[], index?: number) {
    this.songs = songs;
    this.index = index ? index : this.index;
    this.play();
  }

  play(index?: number) {
    var sound: typeof Howl;
    let self = this;

    index = index ? index : this.index;

    let data = this.songs[index];

    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: [data.file],
        html5: true,
        onplay: function () {
          console.log("Started");
          console.log(this.duration() / 60);
          currentSong.set(data);
        },
        onend: function () {
          console.log("Ended");
          self.index += 1;
          self.play();
        },
      });
    }
    sound.play();

    this.index = index;
  }

  pause() {
    var sound = this.songs[this.index].howl;

    sound.pause();
  }
}
