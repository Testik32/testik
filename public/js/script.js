function openBurg() {
  document.querySelector('.burger__menu').classList.toggle('active');
  document.querySelector('html').classList.toggle('hidden')


}



const expanded = false;
const accordionBtn = document.querySelector('.accord-btn');

accordionBtn.addEventListener('click', () => {
  if (expanded) {
    document.querySelector('[data-accordion-animate="collapse"]').beginElement();
  } else {
    document.querySelector('[data-accordion-animate="expand"]').beginElement();
  }
});


function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const isActive = answer.classList.contains('active');


  // Открыть текущий ответ, если он не был активным
  if (!isActive) {
    answer.classList.add('active');
    button.classList.add('active');
    button.querySelector('[data-accordion-animate="expand"]').beginElement();

  }
  else {
    answer.classList.remove('active');
    button.classList.remove('active');
    button.querySelector('[data-accordion-animate="collapse"]').beginElement();
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

  const relShield = document.querySelector('.vect-shield');
  const relGal = document.querySelector('.vect-gal');







  gsap.to(relShield, {
    y: -50,
    duration: 0.8,

    scrollTrigger: {
      trigger: '.vect-shield', // Элемент, который активирует анимацию
      start: 'top 70%', // Начало анимации (20% экрана)
      toggleActions: 'play none none none', // Действия при скролле
      toggleClass: "active",
      once: true,
    },






  });

  gsap.to(relGal, {
    y: -50,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.vect-gal', // Элемент, который активирует анимацию
      start: 'top 80%', // Начало анимации (20% экрана)
      toggleActions: 'play none none none', // Действия при скролле
      toggleClass: "active",
      once: true,
    },
  });

  const apPay = document.querySelector('.apple-pay');








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

      toggleActions: 'play none none none', // Действия при скролле
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

      toggleActions: 'play none none none', // Действия при скролле
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
      toggleActions: 'play none none none', // Действия при скролле
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


document.addEventListener('DOMContentLoaded', () => {



  gsap.to('.hero', {
    y: '300', // Поднимаем ekr2 вверх
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.hero', // Элемент, который активирует анимацию
      start: 'bottom bottom', // Когда нижняя часть hero касается нижней части экрана
      end: 'bottom top', // Когда нижняя часть hero касается верхней части экрана
      scrub: true, // Плавная анимация при скролле
    },
  });


  gsap.to('.ekr2', {
    y: '400', // Поднимаем ekr2 вверх
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.conf', // Элемент, который активирует анимацию
      start: 'bottom bottom', // Когда нижняя часть hero касается нижней части экрана
      end: 'bottom top', // Когда нижняя часть hero касается верхней части экрана
      scrub: true, // Плавная анимация при скролле
    },
  });


});




