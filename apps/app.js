class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 160;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
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
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.src = "./img/stop.png";
      //SET AN ACTIVE CLASS TO BE USED IN updateTempo
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.src = "./img/play.png";
      this.playBtn.classList.remove("active");
    }
  }

  activePad() {
    this.classList.toggle("active");
  }

  changeSound(event) {
    const selectionName = event.target.name;
    const selectionValue = event.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }

  mute(event) {
    const muteIndex = event.target.getAttribute("data-track");
    event.target.classList.toggle("active");
    if (event.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }

  //CHANGE TEMPO TEXT AND BPM WHEN SLIDING
  changeTempo(event) {
    const tempoText = document.querySelector(".tempo-nb");
    this.bpm = event.target.value;
    tempoText.innerText = event.target.value;
  }

  //SET A NEW INSTANCE OF START WITH UPDATED TEMPO
  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new DrumKit();

//  EVENT LISTENERS

//ADD EVENTS TO PADS, TO ACTIVE THEM AND REMOVE ANIMATION
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

//SET DRUMKIT PLAYER ON THE BUTTON
drumKit.playBtn.addEventListener("click", () => {
  drumKit.updateBtn();
  drumKit.start();
});

//CHANGE SOUND ACCORDING TO SELECT
drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (event) {
    drumKit.changeSound(event);
  });
});

//MUTE BUTTON EVENT
drumKit.muteBtns.forEach((muteBtn) => {
  muteBtn.addEventListener("click", function (event) {
    drumKit.mute(event);
  });
});

//SLIDER EVENTS
drumKit.tempoSlider.addEventListener("input", function (event) {
  drumKit.changeTempo(event);
});

drumKit.tempoSlider.addEventListener("change", function (event) {
  drumKit.updateTempo(event);
});
