import '/main.css'
import * as ToastNotifications from './ToastNotifications'

const minutiDisplay = document.getElementById('minutiDisplay')
const secondiDisplay = document.getElementById('secondiDisplay')

const minutiInput = document.getElementById('minutiInput')
const secondiInput = document.getElementById('secondiInput')

const avvioBtn = document.getElementById('avvioBtn')
const resetBtn = document.getElementById('resetBtn')

avvioBtn.onclick = () => { startCountdown() }

resetBtn.onclick = () => {
  resetCountdown()

  ToastNotifications.create('Reset eseguito con successo!', 'success')
  
  hideCountdown()
  showinputFields()

  switchAvvioBtnStatus()
  showAvvioBtn()  
}

// App states: start, stop, pause
// Default state: stop
let countdownStatus = 'stop'

// Stop state
let minuti, secondi, timerId, audio = undefined

// Checks if an input is not empty and its HTML validation is respected
const validate = field => (field.value !== '' && field.checkValidity())

// Checks if all input fields are valid
const manageInputFields = () => {
  if (!validate(minutiInput) || !validate(secondiInput)) {
    ToastNotifications.create('Campi invalidi / vuoti', 'error')
    return false
  }
  
  ToastNotifications.create('Countdown creato con successo!', 'success')
  return true
}

const startCountdown = () => {
  switch(countdownStatus) {
    case 'stop': {
      if (!manageInputFields()) return
      countdownStatus = 'start'

      // UI
      switchAvvioBtnStatus()
      showCountdown()
      hideInputFields()

      // LOGIC
      minuti = parseInt(minutiInput.value)
      secondi = parseInt(secondiInput.value)
      setTimerId()
    }
    break
    case 'start': {
      countdownStatus = 'pause'
      avvioBtn.innerText = 'RIPRENDI ▶'
    }
    break
    case 'pause': {
      countdownStatus = 'start'
      avvioBtn.innerText = 'FERMA ⏸︎'
    }
    break
  }
}

const updateCountdownDisplay = () => {
  minutiDisplay.style.setProperty('--value', minuti)
  secondiDisplay.style.setProperty('--value', secondi)
}

// Sets variables to their original state
const resetCountdown = () => {
  pauseAudio()
  clearInterval(timerId)

  // Reset to default state
  countdownStatus = 'stop'
  minuti, secondi, timerId, audio = undefined
}

// Actual countdown logic
const setTimerId = () => {
  timerId = setInterval(() => {
    if (countdownStatus !== 'start') return
    
    if (secondi === 0 && minuti === 0) {
      playAudio()
      hideAvvioBtn()
      
      countdownStatus = 'stop'
      clearInterval(timerId)
    } else if (secondi === 0) {
      secondi = 59
      minuti--
    } else {
      secondi--
    }

    updateCountdownDisplay()
  }, 1000)
}

const playAudio = () => {
  audio = new Audio('/alarm.wav')
  audio.play()
}

const pauseAudio = () => {
  if (typeof(audio) != 'undefined' || audio != null) audio.pause()
}

const switchAvvioBtnStatus = () => {
  switch(countdownStatus) {
    case 'start': avvioBtn.innerText = 'FERMA ⏸︎' 
    break
    case 'pause': avvioBtn.innerText = 'RIPRENDI ▶'
    break
    case 'stop': avvioBtn.innerText = 'AVVIA ⏵'
    break
  }
}

const showAvvioBtn = () => avvioBtn.classList.remove('hidden')

const hideAvvioBtn = () => avvioBtn.classList.add('hidden')

const showCountdown = () => document.getElementById('countdown').classList.remove('hidden')

const hideCountdown = () => document.getElementById('countdown').classList.add('hidden')

const showinputFields = () => {
  document.getElementById('inputFields').classList.remove('hidden')
  minutiInput.value = ''
  secondiInput.value = ''
}

const hideInputFields = () => document.getElementById('inputFields').classList.add('hidden')