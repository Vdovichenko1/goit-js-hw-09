import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formInput = document.querySelector('.form');
const createBtn = document.querySelector('button');

const promise = new Promise((resolve, reject) => {});

createBtn.addEventListener('submit', createPromise);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    Notify.warning(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
  });
