class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }

  repeat() {
    //SET CURRENT PLAYING PADS
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //LOOP OVER THE PADS...
    activeBars.forEach((bar) => {
      //...TO ANIMATE THEM
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //...TO CHECK IF ACTIVE AND PLAY SOUND
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        } else if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        } else if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    //SET INTERVAL BASED ON BPM TO CALL REPEAT FONCTION
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
      this.playBtn.src = "./img/stop.png";
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.playBtn.src = "./img/play.png";
    }
  }

  activePad() {
    this.classList.toggle("active");
  }
}

const drumKit = new DrumKit();

//ADD EVENTS TO PADS, TO ACTIVE THEM AND REMOVE ANIMATION
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

//SET DRUMKIT PLAYER ON THE BUTTON
drumKit.playBtn.addEventListener("click", () => {
  drumKit.start();
});
