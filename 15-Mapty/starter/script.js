'use strict';

let id = 0;

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  constructor(cords, distance, duration) {
    this.cords = cords;
    this.distance = distance;
    this.duration = duration;
    this.date = new Date();
    this.id = id++;
    this.numberOfClicks = 0;
  }
  get dateString() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
     'August', 'September', 'October', 'November', 'December'];
    return months[this.date.getMonth()] + ' ' + this.date.getDate();
  }
  click() {
    this.numberOfClicks++;
    app.setLocalStorage();
  }
}

class Running extends Workout {
  constructor(cords, distance, duration, cadence) {
    super(cords, distance, duration);
    this.cadence = cadence;
    this.emoji = '🏃‍♂️';
    this.type = 'running';
  }
  get pace() {
    return this.duration / this.distance; // min / km
  }
  get discripteion() {
    return 'Running on ' + this.dateString;
  }
  get popupContent() {
    return '🏃‍♂️ ' + this.discripteion;
  }
}

class Cycling extends Workout {
  constructor(cords, distance, duration, elevationGain) {
    super(cords, distance, duration);
    this.elevationGain = elevationGain;
    this.emoji = '🚴‍♂️';
    this.type = 'cycling';
  }
  get speed() {
    return (this.distance / this.duration) * 60; // km / h
  }
  get discripteion() {
    return 'Cycling on ' + this.dateString;
  }
  get popupContent() {
    return '🚴‍♂️ ' + this.discripteion;
  }
}

const app = {
  _map: new L.Map('map', {
    key: 'web.ac74fbdaf0904d199c6bc12092ac9dc9',
    maptype: 'standard-night',
    poi: true,
    traffic: false,
    center: [35.699739, 51.338097],
    zoom: 14,
  }),
  _workouts: [],
  _mapZoomLevel: 17,
  constructor() {
    this._getLocalStorage();
    this._findLocation();
    this._map.on('click', this._handleClick.bind(this));
    form.addEventListener('submit', this._createNewWorkoutFromForm.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToMarker.bind(this));
  },
  _findLocation() {
    console.log('finding location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          console.log('location found:', latitude, longitude);
          console.log(
            `https://www.google.com/maps/@${latitude},${longitude},16z`
          );
          this._map.setView([latitude, longitude], this._mapZoomLevel);
          L.marker([latitude, longitude])
            .addTo(this._map)
            .bindPopup(
              L.popup({
                closeOnClick: false,
                autoClose: false,
              })
            )
            .setPopupContent('your Location!')
            .openPopup();
        },
        function () {
          alert('cant get your location');
        }
      );
    }
  },
  _handleClick(mapEvent) {
    // Add marker
    this._marker && this._marker.remove();
    const { lat: latitude, lng: longitude } = mapEvent.latlng;
    this._marker = L.marker([latitude, longitude]).addTo(this._map);
    // Show form
    form.style.transition = 'all 0.5s, transform 1ms';
    form.classList.remove('hidden');
    inputDistance.focus();
  },
  _areInputsNumber(...inputs) {
    return inputs.every(input => Number.isFinite(input));
  },
  _areInputsPositive(...inputs) {
    return inputs.every(input => input > 0);
  },
  _createNewWorkoutFromForm(e) {
    e.preventDefault();

    const cords = Object.values(this._marker.getLatLng());
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    if (inputType.value === 'running') {
      const cadence = +inputCadence.value;
      if (!this._areInputsNumber(distance, duration, cadence))
        return alert('inputs have to be positive numbers!');
      if (!this._areInputsPositive(distance, duration, cadence))
        return alert('inputs have to be positive numbers!');
      this._createNewWorkout('running', cords, distance, duration, cadence);
    }

    if (inputType.value === 'cycling') {
      const elevation = +inputElevation.value;
      if (!this._areInputsNumber(distance, duration, elevation))
        return alert('inputs have to be positive numbers!');
      if (!this._areInputsPositive(distance, duration))
        return alert('inputs have to be positive numbers!');
      this._createNewWorkout('cycling', cords, distance, duration, elevation);
    }
  },
  _createNewWorkout(type, cords, distance, duration, thirdParam) {
    const workout =
      type === 'running'
        ? new Running(cords, distance, duration, thirdParam)
        : new Cycling(cords, distance, duration, thirdParam);

    this._workouts.push(workout);

    // clear inputs
    console.log('new workout');
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';

    // hide form
    form.style.transition = 'all 0s, transform 0ms';
    form.classList.add('hidden');

    const marker = L.marker(cords).addTo(this._map);
    console.log(cords);
    // add popup to the marker
    marker
      .bindPopup(
        L.popup({
          minWidth: 100,
          maxWith: 200,
          closeOnClick: false,
          autoClose: false,
          className: `${type}-popup`,
        })
      )
      .setPopupContent(workout.popupContent)
      .openPopup();

    // render workout
    let html = `
        <li class="workout workout--${type}" data-id="${
      this._workouts.at(-1).id
    }">
          <h2 class="workout__title">${workout.discripteion}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.emoji}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
      `;

    if (type === 'running')
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
      `;

    if (type === 'cycling')
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
      `;
    form.insertAdjacentHTML('afterend', html);
    this.setLocalStorage();
  },
  _toggleElevationField() {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  },
  _moveToMarker(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    const workoutObj = this._workouts.find(
      work => work.id == workoutEl.dataset.id
    );
    this._map.setView(workoutObj.cords, this._mapZoomLevel, {
      animate: true ,pan: { duration: 1 },
    });
    workoutObj.click();
  },
  setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this._workouts));
  },
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;
    data.forEach(workout => {
      if (workout.type === 'running')
        this._createNewWorkout(
          workout.type,
          workout.cords,
          workout.distance,
          workout.duration,
          workout.cadence
        );
      else
        this._createNewWorkout(
          workout.type,
          workout.cords,
          workout.distance,
          workout.duration,
          workout.elevationGain
        );
    });
    console.log(data);
  },
};

app.constructor();
