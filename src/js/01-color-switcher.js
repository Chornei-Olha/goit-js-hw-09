// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body>
// на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop»,
// изменение цвета фона должно останавливаться.
// Пока изменение темы запущено, кнопка «Start» будет не активна (disabled).

// const colors = ['#red', '#orange', '#yellow', '#green', '#blue'];

// Инициализация
const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

// Введем переменную таймера
let timerId = null;

// Функция генерации случайного числа
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Функция показа случайного цвета
function changeColor() {
  timerId = setInterval(() => {
    const colorRandom = getRandomHexColor();
    bodyEl.style.background = colorRandom;
    startBtn.disabled = true;
  }, 1000);
}

// Вешаем слушателей на кнопки
startBtn.addEventListener('click', changeColor);

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
});
