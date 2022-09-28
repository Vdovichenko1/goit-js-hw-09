import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formInput = document.querySelector('.form');

formInput.addEventListener('submit', promiseEl);

function promiseEl(e) {
  e.preventDefault();
  const { delay, step, amount } = e.target;
  let delayEl = Number(delay.value);
  let stepEl = Number(step.value);
  let amountEl = Number(amount.value);

  for (let i = 1; i <= amountEl; i++) {
    createPromise(i, delayEl)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          position: 'center-center',
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          position: 'center-center',
        });
      });
    delayEl += stepEl;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
