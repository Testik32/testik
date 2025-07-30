document.querySelectorAll('.lang__switch').forEach((button) => {
  button.addEventListener('click', () => {
    button.querySelector('.lang-vect').classList.toggle('rotate');
    // Найти ближайший lang__switch-another к нажатой кнопке
    const langAnother = button.nextElementSibling; // Если lang__switch-another идет сразу после кнопки
    if (langAnother && langAnother.classList.contains('lang__switch-another')) {
      langAnother.classList.toggle('active');
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const answers = document.querySelectorAll('.q-answer');
  const nextButtons = document.querySelectorAll('.reg-btn-next');
  const prevButtons = document.querySelectorAll('.reg-btn-prev');
  const answerContainers = document.querySelectorAll('.q-answers');

  const titles = {
    1: 'С какими источниками работаете?',
    2: 'Какой у вас ежемесячный расход на рекламу?',
    3: 'Вы команда или соло?',
    4: 'Как вы узнали про нас?',
    5: 'Давайте знакомиться <br> <span class="q-subtitle"> Расскажите о себе и наш менеджер свяжется с вами для подтверждения регистрации в течение 15 минут.</span>' ,
    6: 'Давайте знакомиться <br> <span class="q-subtitle"> Расскажите о себе и наш менеджер свяжется с вами для подтверждения регистрации в течение 15 минут.</span>'
  };

  // Обработка кликов по q-answer
  answers.forEach(answer => {
    answer.addEventListener('click', () => {
      const checkbox = answer.querySelector('.q-check');
      const checkAc = answer.querySelector('.check-ac');
      const parentContainer = answer.closest('.q-answers');
      const checkContainer = answer.querySelector('.checkbox');

      if (parentContainer.classList.contains('radio-inp')) {
        // Если это радио-инпуты, снимаем активность со всех
        parentContainer.querySelectorAll('.q-answer').forEach(a => {
          a.querySelector('.q-check').checked = false;
          a.querySelector('.check-ac').classList.remove('active');
          a.classList.remove('active');
          a.querySelector('.checkbox').classList.remove('active');
        });
        // Добавляем активность только текущему
        checkbox.checked = true;
        checkAc.classList.add('active');
        answer.classList.add('active');
        checkContainer.classList.add('active');
      } else {
        // Для чекбоксов переключаем активность
        checkbox.checked = !checkbox.checked;
        checkAc.classList.toggle('active', checkbox.checked);
        answer.classList.toggle('active', checkbox.checked);

      }

      // Проверяем, можно ли активировать кнопку "Далее"
      const nextButton = parentContainer.querySelector('.reg-btn-next');
      if (nextButton) {
        const hasActive = parentContainer.querySelector('.q-check:checked');
        nextButton.disabled = !hasActive;
      }
    });
  });

  // Обработка кнопки "Далее"
  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentContainer = button.closest('.q-answers');
      const nextContainer = currentContainer.nextElementSibling;

      if (nextContainer) {
        currentContainer.classList.remove('active');
        nextContainer.classList.add('active');

        // Обновляем заголовок
        const step = nextContainer.dataset.answ;
        const title = document.querySelector('.q-top-title');
        if (titles[step]) {
          title.innerHTML = titles[step];
        }

        // Увеличиваем прогресс
        const progress = document.querySelector('.prog-line-in');
        const currentWidth = parseInt(progress.style.width) || 0;
        progress.style.width = `${currentWidth + 19.3125}%`;
      }
    });
  });

  // Обработка кнопки "Назад"
  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      const currentContainer = button.closest('.q-answers');
      const prevContainer = currentContainer.previousElementSibling;

      if (prevContainer) {
        currentContainer.classList.remove('active');
        prevContainer.classList.add('active');

        // Обновляем заголовок
        const step = prevContainer.dataset.answ;
        const title = document.querySelector('.q-top-title');
        if (titles[step]) {
          title.textContent = titles[step];
        }

        // Уменьшаем прогресс
        const progress = document.querySelector('.prog-line-in');
        const currentWidth = parseInt(progress.style.width) || 0;
        progress.style.width = `${currentWidth - 19.3125}%`;
      }
    });
  });

  // Инициализация: скрываем все, кроме первого блока
  answerContainers.forEach((container, index) => {
    if (index !== 0) {
      container.classList.remove('active');
    } else {
      container.classList.add('active');
    }
  });



});




document.querySelector('.reg-btn-form').addEventListener('click', () => {
  const currentContainer = document.querySelector('.answ4');
  const nextContainerTeam = document.querySelector('.form-team');
  const nextContainerSolo = document.querySelector('.form-solo');

  // Проверяем, что выбрал пользователь
  const progress = document.querySelector('.prog-line-in');
  const currentWidth = parseInt(progress.style.width) || 0;
  const isTeamSelected = document.querySelector('.team-check:checked');
  const isSoloSelected = document.querySelector('.solo-check:checked');

  if (isTeamSelected) {
    currentContainer.classList.remove('active');
    nextContainerTeam.classList.add('active');
    progress.style.width = `${currentWidth + 19.3125}%`;
  } else if (isSoloSelected) {
    currentContainer.classList.remove('active');
    nextContainerSolo.classList.add('active');
    progress.style.width = `${currentWidth + 19.3125}%`;
  }
});



document.querySelector('.submit-btn').addEventListener('click', async (event) => {

  event.preventDefault(); // Предотвращаем стандартное поведение кнопки

  const formTeam = document.querySelector('.form-team');
  const requiredFields = formTeam.querySelectorAll('[required]');
  let allFieldsFilled = true;

  // Проверяем, что все поля заполнены
  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      allFieldsFilled = false;
      field.classList.add('error'); // Добавляем класс для визуального отображения ошибки
    } else {
      field.classList.remove('error'); // Убираем класс ошибки, если поле заполнено
    }
  });

  if (!allFieldsFilled) {

    return;
  }









  const ads = Array.from(document.querySelectorAll('input[name="ads"]:checked')).map(input => input.value);
  const data = {
    ads: ads.join(', '), // Собираем все выбранные значения в строку, разделенную запятыми
    rash: document.querySelector('input[name="rash"]:checked')?.value || '',
    teamOrSolo: document.querySelector('input[name="teamOrSolo"]:checked')?.value || '',
    howKnown: document.querySelector('input[name="howKnown"]:checked')?.value || '',
    teamName: document.querySelector('input[name="teamName"]')?.value || '',
    countNumber: document.querySelector('input[name="countNumber"]')?.value || '',
    nameMember: document.querySelector('input[name="nameMember"]')?.value || '',
    position: document.querySelector('input[name="position"]')?.value || '',
    tg: document.querySelector('input[name="telegram"]')?.value || '',

  };

  try {
    const response = await fetch(`${window.location.origin}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.status === 'success') {
      formTeam.style.display='none';
      document.querySelector('.q-last').style.display='flex';
      document.querySelector('.q-top').style.display = 'none';
      console.log('Данные успешно отправлены!');
    } else {
      console.log('Ошибка при отправке данных.');
    }
  } catch (error) {
    console.error(error);
    console.log('Ошибка соединения с сервером.');
  }
});









document.querySelector('.submit-btn-solo').addEventListener('click', async (event) => {
  event.preventDefault(); // Предотвращаем стандартное поведение кнопки

  const formSolo = document.querySelector('.form-solo');
  const requiredFields = formSolo.querySelectorAll('[required]');
  let allFieldsFilled = true;

  // Проверяем, что все поля заполнены
  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      allFieldsFilled = false;
      field.classList.add('error'); // Добавляем класс для визуального отображения ошибки
    } else {
      field.classList.remove('error'); // Убираем класс ошибки, если поле заполнено
    }
  });

  if (!allFieldsFilled) {
   
    return;
  }











  const ads = Array.from(document.querySelectorAll('input[name="ads"]:checked')).map(input => input.value);
  const data = {
    ads: ads.join(', '), // Собираем все выбранные значения в строку, разделенную запятыми
    rash: document.querySelector('input[name="rash"]:checked')?.value || '',
    teamOrSolo: document.querySelector('input[name="teamOrSolo"]:checked')?.value || '',
    howKnown: document.querySelector('input[name="howKnown"]:checked')?.value || '',
    nameMember: document.querySelector('input[name="nameMember-solo"]')?.value || '',
    tg: document.querySelector('input[name="telegram-solo"]')?.value || '',

  };

  try {
    const response = await fetch(`${window.location.origin}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.status === 'success') {
      console.log('Данные успешно отправлены!');
      formSolo.style.display = 'none';
      document.querySelector('.q-last').style.display = 'flex';
      document.querySelector('.q-top').style.display = 'none';
    } else {
      console.log('Ошибка при отправке данных.');
    }
  } catch (error) {
    console.error(error);
    console.log('Ошибка соединения с сервером.');
  }
});

document.querySelectorAll('.q-inp-field').forEach((input) => {
  input.addEventListener('input', () => {
    const parent = input.closest('.q-inp');

    // Проверяем, проходит ли значение валидацию
    if (input.checkValidity()) {
     input.classList.add('success'); // Добавляем класс success
      input.classList.remove('error'); // Убираем класс error, если он был
    } else {
      input.classList.remove('success'); // Убираем класс success
      input.classList.add('error'); // Добавляем класс error
    }
  });
});