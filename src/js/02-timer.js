import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  startBtn: document.querySelector('[data-start]'), // Берём кнопку запуска
  timerShow: document.querySelector('.timer'), // Берём блок для показа времени
  days: document.querySelector('[data-days').innerHTML,
  hours: document.querySelector('[data-hours').innerHTML,
  minutes: document.querySelector('[data-minutes').innerHTML,
  seconds: document.querySelector('[data-seconds').innerHTML,
};
let endTime = null;

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
//   Принимает число, приводит к строке и добавляет в начало 0, если число меньше 2-х знаков
function pad(value) {
  return String(value).padStart(2, '0');
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
      endTime = selectedDates[0];
    }
  },
};
flatpickr(document.querySelector('#datetime-picker'), options);

class Timer {
  constructor() {
    (this.intervalId = null),
      (this.isActive = false),
      (refs.startBtn.disabled = true);
  }

  start() {
    if (this.isActive) {
      return;
    }
    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = endTime - startTime;
      const time = convertMs(deltaTime);
      if (deltaTime <= 1000) {
        clearInterval(this.intervalId);
      }
      this.timerShow(time);
    }, 1000);
  }
  timerShow({ days, hours, minutes, seconds }) {
    refs.days.textContent = pad(days);
    refs.hours.textContent = pad(hours);
    refs.minutes.textContent = pad(minutes);
    refs.seconds.textContent = pad(seconds);
  }
}
const timer = new Timer();
refs.startBtn.addEventListener('click', () => timer.start());
