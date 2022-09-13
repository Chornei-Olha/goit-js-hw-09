// Описан в документации
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

document.querySelector('[data-start]').setAttribute('disabled', '');

const refs = {
  startBtn: document.querySelector('[data-start]'), // Берём кнопку запуска
  timerShow: document.querySelector('.timer'), // Берём блок для показа времени
  days: document.querySelector('[data-days').innerHTML,
  hours: document.querySelector('[data-hours').innerHTML,
  minutes: document.querySelector('[data-minutes').innerHTML,
  seconds: document.querySelector('[data-seconds').innerHTML,
};

refs.startBtn.addEventListener('click', () => {
  timer.start();
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //    Условие если время закончилось то...
    if (selectedDates[0] < Date.now()) {
      // Таймер удаляется
      clearInterval(timer);
      // Выводит сообщение что время закончилось
      Notify.success('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
      endTime = selectedDates[0];
    }
  },
};

class Timer {
  constructor({ onTick }) {
    (this.intervalId = null), (this.isActive = false), (this.onTick = onTick);

    this.init();
  }

  init() {
    const time = this.convertMs(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = endTime - startTime;
      const time = this.convertMs(deltaTime);
      this.onTick(time);
      if (deltaTime <= 1000) {
        clearInterval(this.intervalId);
      }
      const { days, hours, minutes, seconds } = this.convertMs(deltaTime);
      console.log(`${days}':${hours}:${minutes}:${seconds}`);

      document.querySelector('[data-days]').innerHTML = days;
      document.querySelector('[data-hours]').innerHTML = hours;
      document.querySelector('[data-minutes]').innerHTML = minutes;
      document.querySelector('[data-seconds]').innerHTML = seconds;
    }, 1000);
  }

  //   Принимает число, приводит к строке и добавляет в начало 0, если число меньше 2-х знаков
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer({
  onTick: timerShow,
});

function timerShow({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

// Инициализация библиотеки
flatpickr(document.querySelector('#datetime-picker'), options);
