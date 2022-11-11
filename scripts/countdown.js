var minutes = 30;
var seconds = "00";

var secondsDB = 0

var reduceTimer = null

const playSound = document.getElementById("playSound")
const tradeTimer = document.getElementById("tradeTimer")
playSound.volume = 0.4
tradeTimer.volume = 0.3

// Select minutes to focus
const twentyFive = document.getElementById("twentyFive")
const thirty = document.getElementById("thirty")
const thirtyFive = document.getElementById("thirtyFive")

function tradeTimerCountdown(event) {
  tradeTimer.pause();
  tradeTimer.currentTime = 0;
  tradeTimer.play()
  Countdown.clear()

  minutes = event.target.value
  minutesHTML.innerHTML = minutes

  var buttonsContainClassname = document.getElementsByClassName("button__timer__selected");

  for (var i = 0; i < buttonsContainClassname.length; i++) {
    if (buttonsContainClassname[i].className.includes('button__timer__selected')) {
      buttonsContainClassname[i].className = '';
    }
  }

  let buttonSelected = document.getElementById(event.srcElement.id)

  buttonSelected.classList.toggle("button__timer__selected");
}

// Timers
const minutesHTML = document.getElementById("minutes")
const secondsHTML = document.getElementById("seconds")

// Buttons
const startButton = document.getElementById("startButton")
const stopButton = document.getElementById("stopButton")
const clearButton = document.getElementById("clearButton")

minutesHTML.innerHTML = minutes
secondsHTML.innerHTML = seconds

const Countdown = {
  start() {
    localStorage.setItem("TESTE", true)
    playSound.play()
    stopButton.classList.remove("hideButtonOption")
    clearButton.classList.remove("hideButtonOption")

    reduceTimer = setInterval(reduceMinutesAndSeconds, 1000)

    function reduceMinutesAndSeconds() {
      seconds = seconds - 1;

      secondsDB = secondsDB + 1

      if (seconds <= 0) {
        seconds = 59
        minutes = minutes - 1

        if (minutes <= 0) {
          playSound.play()
          clearInterval(reduceTimer);
          saveInformationInDatabase(secondsDB, 1)
          minutes = 30;
          seconds = 0;
          minutesHTML.innerHTML = minutes
          secondsHTML.innerHTML = seconds
          ButtonOptions.clear()
          showNotification("Parabéns!!", "Você finalizou mais uma sprint, mantenha o foco!")
        }
        
        if (minutes <= 4) {
          showNotification("5 minutos", "Restam cinco minutos, organize suas anotações.")
        }
      }

      secondsHTML.innerHTML = numberFormatter(seconds)
      minutesHTML.innerHTML = numberFormatter(minutes)
    }

    ButtonOptions.start()
  },

  pause() {
    ButtonOptions.pause()
    clearInterval(reduceTimer)
  },

  async clear() {
    minutes = 30;
    seconds = "00";
    minutesHTML.innerHTML = minutes
    secondsHTML.innerHTML = seconds
    ButtonOptions.clear()
    twentyFive.classList.remove("button__timer__selected")
    thirtyFive.classList.remove("button__timer__selected")
    thirty.classList.add("button__timer__selected");
    await saveInformationInDatabase(secondsDB)
    clearInterval(reduceTimer)
  }
}

const ButtonOptions = {
  start() {
    startButton.disabled = true
    stopButton.disabled = false
    stopButton.focus()
    clearButton.disabled = false
  },
  pause() {
    stopButton.disabled = true
    startButton.disabled = false
    startButton.focus()
    clearButton.disabled = false
  },
  clear() {
    startButton.disabled = false
    stopButton.disabled = true
    clearButton.disabled = true
  }
}

getTimer()
getTurns()