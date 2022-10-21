const form = document.querySelector('.fourth-test__form');
const inputDirection = document.querySelector('#direction');

const inputTime = document.querySelector('#time');
const inputTimeOptionsArray = Array.from(inputTime.children);

const inputReverseDirection = document.querySelector('#reverse-direction');
const inputReverseDirectionOptionsArray = Array.from(inputReverseDirection.children);

const inputNumberOfTickets = document.querySelector('#number-of-tickets');

//перебрать коолекцию и сделать неактивными элементы, у которых нет указанной строки в значении или активными у которых есть
function checkDisaredOption(array, string) {
  array.forEach((el) => {
    if (!el.value.includes(string)) {
      el.setAttribute('disabled', 'disabled');
    } else {
      el.removeAttribute('disabled');
    }
  });
}

// функция делает активным или неактивным инпут с обратными рейсами
function setEnabledReverseDirectionInput(inputDirection) {
  if (inputDirection.value.includes('Из А в Б и обратно в А')) {
    inputReverseDirection.removeAttribute('disabled');
    inputReverseDirection.setAttribute('required', 'required');
    checkDisaredOption(inputTimeOptionsArray, 'a-b');
  } else {
    inputReverseDirection.setAttribute('disabled', 'disabled');
    inputReverseDirection.removeAttribute('required');
  }
};

// функция возвращает время отправления
function getTime(option) {
  return option.value.split(' ')[0];
}

// функция возвращает время прибытия
function getArrivalTime(option) {
  const timeNumbersArr = getTime(option).split(':');
  let hours = Number(timeNumbersArr[0]);
  let minutes = Number(timeNumbersArr[1]) + 50;

  if (minutes >= 60) {
    hours+=1;
    minutes-=60;
  }

  return hours + ':' + minutes;
}

// функция возвращает время отправления в минутах
function getTimeInMinutes(option) {
  return Number(option.value.split(' ',)[1]);
}

// функция обработчик для слушателя изменения для инпута направления
function trackChangesDirectionInput() {
  if (inputDirection.value.includes('из А в Б')) {
    checkDisaredOption(inputTimeOptionsArray, 'a-b');
  } else if (inputDirection.value.includes('из Б в А')) {
    checkDisaredOption(inputTimeOptionsArray, 'b-a');
  }

  setEnabledReverseDirectionInput(inputDirection);
};

// функция обработчик для слушателя изменения для инпута времени
function trackChangesTimeInput() {
  inputReverseDirectionOptionsArray.forEach((el) => {
    if (getTimeInMinutes(el) > getTimeInMinutes(inputTime) + 50) {
      el.removeAttribute('disabled');
    } else {
      el.setAttribute('disabled', 'disabled');
    }
  });
};

// функция обработчик для сабмита формы
function submitForm(evt) {
  evt.preventDefault();

  const ticketNumber = inputNumberOfTickets.value;
  const direction = inputDirection.value;
  const departureTime = getTime(inputTime);
  const arrivalTime = getArrivalTime(inputTime);
  let totalPrice;
  let timeToTravel;

  if (inputDirection.value === 'Из А в Б и обратно в А') {
    totalPrice = 1200 * ticketNumber;
    timeToTravel = '50 минут в одну сторону и 50 минут обратно.'
  } else {
    totalPrice = 700 * ticketNumber;
    timeToTravel = '50 минут.'
  }

  alert(
    `Вы выбрали ${ticketNumber} билета(-ов) по маршруту ${direction} стоимостью ${totalPrice}р.
Это путешествие займет у вас ${timeToTravel}
Теплоход отправляется в ${departureTime}, а прибудет в ${arrivalTime}.`
  );
};


inputDirection.addEventListener('change', trackChangesDirectionInput);

inputTime.addEventListener('change', trackChangesTimeInput);

form.addEventListener('submit', submitForm);