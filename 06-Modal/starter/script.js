'use strict';

const modalBtns = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const closeBtn = document.querySelector('.close-modal');

function openModal() {
  [modal, overlay].forEach(e => {
    e.classList.remove('hidden');
  });
}

function closeModal() {
  [modal, overlay].forEach(e => {
    e.classList.add('hidden');
  });
}

modalBtns.forEach(e => {
  e.addEventListener('click', () => {
    openModal();
  });
});

closeBtn.addEventListener('click', () => {
  closeModal();
});
document.addEventListener('click', e => {
  if (e.target.className === 'overlay') closeModal();
});
