var minutes = 30;
var seconds = "00";

var secondsDB = 0

var reduceTimer = null

// Select minutes to focus
const twentyFive = document.getElementById("twentyFive")
const thirty = document.getElementById("thirty")
const thirtyFive = document.getElementById("thirtyFive")

function tradeTimerCountdown(event) {
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
          clearInterval(reduceTimer);
          saveSecondsInDatabase(secondsDB)
          minutes = "00";
          seconds = "04";
          minutesHTML.innerHTML = minutes
          secondsHTML.innerHTML = seconds
          ButtonOptions.clear()
          showNotification("Acabou", "Lorem ipsum it dolor.")
        }
      }

      secondsHTML.innerHTML = numberFormatter(seconds)
      minutesHTML.innerHTML = numberFormatter(minutes)
    }

    ButtonOptions.start()

    showNotification("Começou", "Lorem ipsum it dolor.")
  },

  pause() {
    ButtonOptions.pause()
    clearInterval(reduceTimer)
  },

  clear() {
    saveSecondsInDatabase(secondsDB)
    minutes = 30;
    seconds = "00";
    minutesHTML.innerHTML = minutes
    secondsHTML.innerHTML = seconds
    ButtonOptions.clear()
    twentyFive.classList.remove("button__timer__selected")
    thirtyFive.classList.remove("button__timer__selected")
    thirty.classList.add("button__timer__selected");
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

const DatabaseOperations = {
  clear() {
    clearDatabase()
  }
}

getTimer()