// Напиши скрипт, который при сабмите формы вызывает функцию createPromise(position, delay) столько раз,
// сколько ввели в поле amount. При каждом вызове передай ей номер создаваемого промиса (position) и задержку
// учитывая введенную пользователем первую задержку (delay) и шаг (step).

// Дополни код функции createPromise так, чтобы она возвращала один промис, который выполянется или
// отклоняется через delay времени. Значением промиса должен быть объект, в котором будут свойства
// position и delay со значениями одноименных параметров. Используй начальный код функции для выбора того,
// что нужно сделать с промисом - выполнить или отклонить.

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
