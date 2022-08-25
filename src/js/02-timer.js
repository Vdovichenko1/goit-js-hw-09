import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const textInput = document.querySelector('#datetime-picker');

const timerEl = document.querySelector('.timer');

timerEl.style.display = 'flex';
timerEl.style.fontSize = '30px';
timerEl.style.justifyContent = 'center';
timerEl.style.margin = '100px 100px';
timerEl.style.color = 'blue';
document.body.style.textAlign = 'center';
startBtn.style.fontSize = '20px';
startBtn.style.cursor = 'pointer';
textInput.style.fontSize = '20px';

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let intervalId;

let selectTime;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0].getTime());
    selectTime = selectedDates[0];
    const current = Date.now();
    if (selectedDates[0].getTime() < current) {
      Notify.warning('Please choose a date in the future');
      startBtn.disabled = true;
    }
    if (selectedDates[0].getTime() >= current) {
      startBtn.disabled = false;
    }
  },
};

function startTimer() {
  startBtn.disabled = true;
  textInput.disabled = true;
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectTime - currentTime;
    const timeObj = convertMs(deltaTime);
    updateClockFace(timeObj);
  }, 1000);
  setTimeout(() => {
    clearInterval(intervalId);
  }, selectTime - Date.now());
}

flatpickr(textInput, options);

startBtn.addEventListener('click', startTimer);

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

// for (let key in objTime) {
//   document.querySelector(`*[data-${key}]`).textContent = addLeadingZero(
//     objTime[key]
//   );
// }

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
