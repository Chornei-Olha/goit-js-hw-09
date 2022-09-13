// Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay) столько раз,
// сколько ввели в поле amount. При каждом вызове передай ей номер создаваемого промиса (position) и задержку
// учитывая введенную пользователем первую задержку (delay) и шаг (step).

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

// Дополни код функции createPromise так, чтобы она возвращала один промис, который выполянется или
// отклоняется через delay времени. Значением промиса должен быть объект, в котором будут свойства
// position и delay со значениями одноименных параметров. Используй начальный код функции для выбора того,
// что нужно сделать с промисом - выполнить или отклонить.

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
let delayEl = document.querySelector('[name=delay]');
let stepEl = document.querySelector('[name=step]');
let amountEl = document.querySelector('[name=amount]');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number(delayEl.value);
  let step = Number(stepEl.value);
  let amount = Number(amountEl.value);

  // Перебираем значения ввода

  for (let position = 1; position <= amount; position += 1) {
    // Функция возвращает один промис
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })

      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

// Функция при сабмите вызывается столько раз, сколько ввели в поле amount

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
