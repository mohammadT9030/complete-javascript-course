'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});

document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    if (!e.target.closest('.operations__tab')) return;
    [...this.children].forEach(e =>
      e.classList.remove('operations__tab--active')
    );
    e.target
      .closest('.operations__tab')
      .classList.add('operations__tab--active');
    console.log(document.querySelectorAll('.operations__content'));
    document
      .querySelectorAll('.operations__content')
      .forEach(e => e.classList.remove('operations__content--active'));
    document
      .querySelector(
        `.operations__content--${
          e.target.closest('.operations__tab').dataset.tab
        }`
      )
      .classList.add('operations__content--active');
  });

function handleHover(o, e) {
  if (e.target.classList.contains('nav__link')) {
    document.querySelector('#logo').style.opacity = o;
    document
      .querySelectorAll('.nav__link')
      .forEach(link => link !== e.target && (link.style.opacity = o));
  }
}

document
  .querySelector('.nav__links')
  .addEventListener('mouseover', handleHover.bind(this, 0.5));
document
  .querySelector('.nav__links')
  .addEventListener('mouseout', handleHover.bind(this, 1));

// const cor = section1.getBoundingClientRect();

// document.addEventListener('scroll', () =>
//   section1.getBoundingClientRect().y < 0
//     ? document.querySelector('.nav').classList.add('sticky')
//     : document.querySelector('.nav').classList.remove('sticky')
// );

// const observer = new IntersectionObserver(
//   function (e, o) {
//     console.log(e[0].intersectionRatio);
//   },
//   {
//     root: null,
//     threshold: 0.4,
//   }
// );
// observer.observe(section1);

const header = document.querySelector('.header');
const nav_bar = document.querySelector('.nav');
const navHeight = nav_bar.getBoundingClientRect().height;
const observer2 = new IntersectionObserver(
  function (e) {
    // console.log(e[0].intersectionRatio);
    e[0].isIntersecting
      ? nav_bar.classList.remove('sticky')
      : nav_bar.classList.add('sticky');
  },
  { rootMargin: `-${navHeight}px` }
);
observer2.observe(header);

const sectionObserver = new IntersectionObserver(
  function (entry, observer) {
    entry.forEach(e => {
      if (e.isIntersecting) {
        // console.log(e.target.id,'observed');
        e.target.classList.remove('section--hidden');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('section').forEach(e => {
  sectionObserver.observe(e);
  e.classList.add('section--hidden');
});

// Lazy image loading
const images = document.querySelectorAll('.features img');
// console.log(images);
const imageObserver = new IntersectionObserver(function (entries, observer) {
  // console.log('test');
  entries.forEach(e => {
    if (e.isIntersecting) {
      observer.unobserve(e.target);
      e.target.setAttribute('src', e.target.dataset.src);
      e.target.addEventListener('load', e =>
        e.target.classList.remove('lazy-img')
      );
      // console.log(e.target);
    }
  });
});
images.forEach(img => imageObserver.observe(img));

let curSlide = 0;
const slides = document.querySelectorAll('.slide');

const dotsContainer = document.querySelector('.dots');
slides.forEach((s, i) =>
  dotsContainer.insertAdjacentHTML(
    'beforeend',
    `<button data-slide=${i} class="dots__dot"}></button>`
  )
);

dotsContainer.addEventListener('click', function (e) {
  if (!e.target.classList.contains('dots__dot')) return;
  goToSlide(e.target.dataset.slide);
});

function goToSlide(slideNumber) {
  curSlide = slideNumber;
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slideNumber)}%)`;
  });
  [...dotsContainer.children].forEach(e => e.classList.remove('dots__dot--active'));
  dotsContainer.querySelector(`.dots__dot[data-slide="${slideNumber}"]`).classList.add('dots__dot--active');
}

function goNextSlide() {
  goToSlide((curSlide + 1) % slides.length);
}

function goPrevSlide() {
  goToSlide((curSlide - 1 + slides.length) % slides.length);
}

goToSlide(0);

document.querySelector('.slider__btn--right').addEventListener('click', () => {
  goNextSlide();
});

document.querySelector('.slider__btn--left').addEventListener('click', () => {
  goPrevSlide();
});

window.addEventListener('keydown', key => {
  // console.log(key.key);
  if (key.key === 'ArrowRight') goNextSlide();
  else if (key.key === 'ArrowLeft') goPrevSlide();
});
