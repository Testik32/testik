function openBurg() {
  document.querySelector('.burger__menu').classList.toggle('active');
  document.querySelector('html').classList.toggle('hidden')


}




function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const isActive = answer.classList.contains('active');


  // Открыть текущий ответ, если он не был активным
  if (!isActive) {
    answer.classList.add('active');
    button.classList.add('active');
  }
  else {
    answer.classList.remove('active');
    button.classList.remove('active');
  }
}




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
    1:'С какими источниками работаете?',
    2: 'Какой у вас ежемесячный расход на рекламу?',
    3: 'Вы команда или соло?',
    4:'Как вы узнали про нас?',
    5:'Давайте знакомиться'
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
          title.textContent = titles[step];
        }

        // Увеличиваем прогресс
        const progress = document.querySelector('.prog-line-in');
        const currentWidth = parseInt(progress.style.width) || 0;
        progress.style.width = `${currentWidth + 18.75}%`;
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
        progress.style.width = `${currentWidth - 18.75}%`;
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




document.querySelector('.submit-btn').addEventListener('click', async () => {
  const ads = Array.from(document.querySelectorAll('input[name="ads"]:checked')).map(input => input.value);
  const data = {
    ads: ads.join(', '), // Собираем все выбранные значения в строку, разделенную запятыми
    rash: document.querySelector('input[name="rash"]:checked')?.value || '',
    teamOrSolo: document.querySelector('input[name="teamOrSolo"]:checked')?.value || '',
    howKnown: document.querySelector('input[name="howKnown"]:checked')?.value || ''
  };

  try {
    const response = await fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.status === 'success') {
      alert('Данные успешно отправлены!');
    } else {
      alert('Ошибка при отправке данных.');
    }
  } catch (error) {
    console.error(error);
    alert('Ошибка соединения с сервером.');
  }
});































document.addEventListener('DOMContentLoaded', () => {

  const relShield = document.querySelector('.vect-shield');
  const relGal = document.querySelector('.vect-gal');







  gsap.to(relShield, {
    y: -50,
    duration: 0.8,

    scrollTrigger: {
      trigger: '.vect-shield', // Элемент, который активирует анимацию
      start: 'top 70%', // Начало анимации (20% экрана)

      toggleActions: 'play reverse play reverse', // Действия при скролле
      toggleClass: "active",
    },






  });

  gsap.to(relGal, {
    y: -50,
    duration: 0.8,

    scrollTrigger: {
      trigger: '.vect-gal', // Элемент, который активирует анимацию
      start: 'top 80%', // Начало анимации (20% экрана)
      toggleActions: 'play reverse play reverse', // Действия при скролле
      toggleClass: "active",
    },
  });

  const apPay = document.querySelector('.apple-pay');



  gsap.to(relGal, {
    y: -50,
    duration: 0.8,

    scrollTrigger: {
      trigger: '.vect-gal', // Элемент, который активирует анимацию
      start: 'top 80%', // Начало анимации (20% экрана)
      toggleActions: 'play reverse play reverse', // Действия при скролле
      toggleClass: "active",
    },
  });




});

document.addEventListener('DOMContentLoaded', () => {
  const apPayBgRects = document.querySelectorAll('.ap-pay-bg rect');
  const apMockup = document.querySelector('.ap-mockup');
  const apBlur = document.querySelector('.ap-blur');


  // Анимация для .ap-pay-bg rect и .ap-mockup
  gsap.timeline({
    scrollTrigger: {
      trigger: '.apple-pay', // Элемент, который активирует анимацию
      start: 'top 70%', // Начало анимации (20% экрана)

      toggleActions: 'play reverse play reverse', // Действия при скролле
    },
  })
    .to(apPayBgRects, {
      opacity: 0.33,
      duration: 1.5, // Длительность первой части анимации
      ease: 'power1.out',
    })
    .to(apMockup, {
      bottom: '0%',
      duration: 1.5, // Длительность анимации mockup
      ease: 'power1.out',
    }, '<') // Запуск одновременно с предыдущей анимацией
    .to(apPayBgRects, {
      opacity: 1,
      duration: 1.5, // Длительность второй части анимации
      ease: 'power1.out',
    }, '<')
    .to(apBlur, {
      opacity: 1,
      duration: 1.5, // Длительность второй части анимации
      ease: 'power1.out',
    })

});



document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth < 767) {
    $('.tarifs__table').slick({
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      variableWidth: true,
    });
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const interBubble = document.querySelector('.interactive');
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  const move = () => {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    requestAnimationFrame(move);
  };

  window.addEventListener('mousemove', (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
  });

  move();
});






document.addEventListener('DOMContentLoaded', () => {
  const telegBotIco = document.querySelector('.teleg__bot-ico');
  const telegBotTxt = document.querySelector('.teleg__bot-txt');

  // Анимация через GSAP ScrollTrigger
  gsap.timeline({
    scrollTrigger: {
      trigger: '.teleg', // Элемент, который активирует анимацию
      start: 'top 70%', // Начало анимации (20% экрана)

      toggleActions: 'play reverse play reverse', // Действия при скролле
    },
  })
    .to(telegBotIco, {
      width: '95%', // Увеличение ширины
      duration: 1, // Длительность анимации
      ease: 'power1.out',
    },)
    .to(telegBotTxt, {
      display: 'flex', // Установка display:flex
      opacity: 1, // Появление текста
      duration: 1, // Длительность анимации
      ease: 'power1.out',
    }, '>'); // Запуск одновременно с предыдущей анимацией
});






document.addEventListener('DOMContentLoaded', () => {
  const member1 = document.querySelector('.member1');
  const member2 = document.querySelector('.member2');
  const member3 = document.querySelector('.member3');
  const comandBotGrad = document.querySelector('.comand-bot-grad');
  const member2Val = document.querySelector('.member2-val');
  const member3Val = document.querySelector('.member3-val');
  const isSmallScreen = window.innerWidth < 767;








  // Анимация через GSAP ScrollTrigger
  gsap.timeline({
    scrollTrigger: {
      trigger: '.comand', // Элемент, который активирует анимацию
      start: 'top 80%', // Начало анимации (20% экрана)
      end: 'bottom 10%', // Конец анимации
      toggleActions: 'play reverse play reverse', // Действия при скролле
      onLeave: () => {
        resetValues(member2Val); // Сброс значения member2-val
        resetValues(member3Val); // Сброс значения member3-val
      },
      onLeaveBack: () => {
        resetValues(member2Val); // Сброс значения member2-val
        resetValues(member3Val); // Сброс значения member3-val
      },
    },
  })
    .to(member1, {
      y: isSmallScreen ? -25 : -50, // Поднимается вверх
      duration: 0.8, // Длительность анимации
      ease: 'power1.out',
    })
    .to(member2, {
      y: 0, // Спускается вниз
      duration: 0.5, // Длительность анимации
      ease: 'power1.out',
    }, '>') // Задержка в 0.5 секунды после предыдущей анимации
    .to(member3, {
      y: isSmallScreen ? 25 : 50,  // Спускается вниз
      duration: 0.5, // Длительность анимации
      ease: 'power1.out',
    }, '>') // Задержка в 0.5 секунды после предыдущей анимации
    .to(comandBotGrad, {
      opacity: 1, // Появление элемента
      duration: 0.5, // Длительность анимации
      ease: 'power1.out',
    }, '<') // Задержка в 0.5 секунды после предыдущей анимации
    .add(() => {
      // Начало добавления значений после последней анимации
      incrementValues(member2Val, 1, 3, 7); // Для member2-val
      incrementValues(member3Val, 1, 2, 4); // Для member3-val
    });

  // Функция для добавления значений с интервалом
  function incrementValues(element, min, max, targetValue) {
    let currentValue = parseInt(element.textContent, 10) || 0;
    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
      currentValue += randomValue;
      if (currentValue >= targetValue) {
        currentValue = targetValue; // Ограничение значения
        clearInterval(interval); // Остановка интервала
      }
      element.textContent = currentValue; // Обновление значения
    }, 700); // Интервал в 0.7 секунды
  }

  // Функция для сброса значений
  function resetValues(element) {
    element.textContent = 0; // Сброс значения к 0
  }
});





