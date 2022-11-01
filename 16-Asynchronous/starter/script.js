'use strict';

// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// ///////////////////////////////////////
// function renderCountry(data, className = '') {
//   const html = `
//     <article class="country ${className}">
//       <img class="country__img" src=${data.flags.svg} />
//       <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1_000_000
//         ).toFixed(1)}M people</p>
//         <p class="country__row"><span>🗣️</span>${
//           Object.values(data.languages)[0]
//         }</p>
//         <p class="country__row"><span>💰</span>${
//           Object.values(data.currencies)[0].name
//         }</p>
//       </div>
//     </article>
//   `;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// }

// // function getCountryData(country, getNeighbor = false) {
// //   const request = new XMLHttpRequest();

// //   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

// //   request.send();

// //   request.addEventListener('load', e => {
// //     const [data] = JSON.parse(request.responseText);

// //     console.log(data);
// //     renderCountry(data);

// //     if (!getNeighbor) return;

// //     const request2 = new XMLHttpRequest();
// //     if (!data.borders) return;
// //     request2.open(
// //       'GET',
// //       `https://restcountries.com/v3.1/name/${data.borders[0]}`
// //     );
// //     request2.send();
// //     request2.addEventListener('load', e => {
// //       const [data2] = JSON.parse(request2.responseText);
// //       console.log(data2);
// //       renderCountry(data2, 'neighbour');
// //     });
// //   });
// // }

// function renderError(err) {
//   countriesContainer.insertAdjacentText(
//     'beforeend',
//     `Something went wrong! (${err.message}). Try again!`
//   );
// }

// function getPosition() {
//   return new Promise((resolve, reject) =>
//     navigator.geolocation.getCurrentPosition(resolve, reject)
//   );
// }

// function getJSON(url, errorMessage) {
//   return fetch(url).then(Response => {
//     if (!Response.ok) throw new Error(`${errorMessage} ${Response.status}`);
//     return Response.json();
//   });
// }

// function getCountryData() {
//   getPosition().then(pos => console.log(pos))
// getJSON(`https://restcountries.com/v3.1/name/${1}`, 'Country not found')
//   .then(data => {
//     renderCountry(data[0]);
//     if (!data[0].borders) throw new Error('the Country has no neighbors!');
//     const neighbour = Object.values(data[0].borders)[0];
//     // console.log(neighbour);
//     return getJSON(
//       `https://restcountries.com/v3.1/name/${2}`,
//       'Country not found'
//     );
//   })
//   .then(data => {
//     console.log(data[0]);
//     getNeighbour && renderCountry(data[0], 'neighbour');
//   })
//   .catch(err => {
//     console.error(`${err} @@@`);
//     renderError(err);
//   })
//   .finally(() => (countriesContainer.style.opacity = 1));
// }

// // getCountryData('irn');
// // getCountryData('turkey');
// // getCountryData('iraq', true);
// // getCountryData('spain');
// getCountryData('alsdfj;l');

// btn.addEventListener('click', getCountryData);

// lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('starting...');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) resolve({ a: 3, b: 4 });
//     else reject(new Error('this is an Error!'));
//   }, 3000);
// });

// lotteryPromise.then(
//   res => console.log(res),
//   err => console.warn(err)
// );

// wait = second =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(1234);
//       resolve();
//     }, second * 1000);
//   });

// wait(2)
//   .then(() => {
//     console.log('2sec');
//     return wait(2);
//   })
//   .then(() => {
//     console.log('2sec');
//     return wait(3.5);
//   })
//   .then(() => {
//     console.log('3.5sec');
//     return wait(1);
//   })
//   .then(() => console.log('1sec'));

// const imageContainer = document.querySelector('.images');
// const image = document.createElement('img');
// const image2 = document.createElement('img');
// const image3 = document.createElement('img');

// image.src = './img/img-1.jpg';
// image.style.display = 'none';
// imageContainer.append(image);

// image.addEventListener('load', () => {
//   image.style.display = 'block';
//   setTimeout(() => {
//     image.style.display = 'none';
//     setTimeout(() => {
//       image2.src = './img/img-2.jpg';
//       image2.style.display = 'none';
//       imageContainer.append(image2);
//     }, 1000);
//   }, 1000);
// });

// image2.addEventListener('load', () => {
//   image2.style.display = 'block';
//   setTimeout(() => {
//     image2.style.display = 'none';
//     setTimeout(() => {
//       image3.src = './img/img-3.jpg';
//       image3.style.display = 'none';
//       imageContainer.append(image3);
//     }, 1000);
//   }, 1000);
// });

// image3.addEventListener('load', () => {
//   image3.style.display = 'block';
//   setTimeout(() => {
//     image3.style.display = 'none';
//   }, 1000);
// });

// const imageContainer = document.querySelector('.images');
// const image = document.createElement('img');
// const image2 = document.createElement('img');
// const image3 = document.createElement('img');

// image.src = './img/img-1.jpg';
// imageContainer.append(image);

// image.addEventListener('load', () => {
//   setTimeout(() => {
//     image.style.display = 'none';
//     image2.src = './img/img-2.jpg';
//     imageContainer.append(image2);
//   }, 1000);
// });

// image2.addEventListener('load', () => {
//   setTimeout(() => {
//     image2.style.display = 'none';
//     image3.src = './img/img-3.jpg';
//     imageContainer.append(image3);
//   }, 1000);
// });

// image3.addEventListener('load', () => {
//   setTimeout(() => {
//     image3.style.display = 'none';
//   }, 1000);
// });

const imageContainer = document.querySelector('.images');

function createImage(path) {
  const newImgEl = document.createElement('img');
  newImgEl.src = path;
  return new Promise(function (resolve, reject) {
    newImgEl.addEventListener('load', () => {
      imageContainer.append(newImgEl);
      setTimeout(() => {
        newImgEl.style.display = 'none';
        resolve();
      }, 1000);
    });
    newImgEl.addEventListener('error', () => {
      reject(new Error('image not found'));
    });
  });
}

function wait(seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
}

// createImage('./img/img-1.jpg')
//   .then(() => wait(1))
//   .then(() => createImage('./img/img-2.jpg'))
//   .then(() => wait(1))
//   .then(() => createImage('./img/img-3.jpg'))
//   .catch(err => console.warn(err.message));

// createImage('./img/img-2.jpg');
// createImage('./img/img-3.jpg');

// async function showImages() {
//   await createImage('./img/img-1.jpg')
//   await wait(1)
//   await createImage('./img/img-2.jpg')
//   await wait(1)
//   await createImage('./img/img-3.jpg')
// }
// showImages()

function getPosition() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}

async function whereAmI() {
  // get goe coordinates
  const { latitude: lat, longitude: lng } = (await getPosition()).coords;
  console.log(lat, lng);

  // reverse geocoding
  const country = await fetch(`https://geocode.xyz/${15},${35}?geoit=json`);
  console.log(country);
}

whereAmI();
