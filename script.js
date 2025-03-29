document.addEventListener('DOMContentLoaded',() => {
    const burgerButton = document.querySelector('.header-burger');
    const burgerMenu = document.querySelector('.burger-menu');
    const reviewsButton = document.querySelector('.reviews-button');
    const reviewsBlock = document.querySelector('.reviews-block');

    // открыть меню
    burgerButton.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
    });

    // закрывать меню когда кликаешь мне поля
    document.addEventListener('click', (e) => {
        if (!burgerMenu.contains(e.target) && !burgerButton.contains(e.target)) {
            burgerMenu.classList.remove('active');
        }
    });

    // группировка отзывов
    reviewsButton.addEventListener('click', () => {
        reviewsBlock.classList.toggle('active');
        document.querySelector('.reviews-group').style.display = 'inline';
    });

    window.addEventListener('resize', () => {
        document.documentElement.getBoundingClientRect().width > 1200 ? burgerMenu.classList.remove('active') : null;
        if (document.documentElement.getBoundingClientRect().width < 1200){
            reviewsBlock.classList.remove('active')
            document.querySelector('.reviews-group').style.display='none'
        }
    })

    // выдвижение описания вопросов
    document.querySelectorAll('.question-topic').forEach(topic => {
        topic.addEventListener('click', () => {
            const question = topic.parentElement;
            question.classList.toggle('active');
        });
    });

    // менять текст футер
    function updateFooter() {
        const footerText = document.querySelector('.footer-text');
        window.innerWidth < 670 ? footerText.textContent = "Наверх" : footerText.textContent = "Вернуться наверх";
    }

    updateFooter();
    window.addEventListener('resize', updateFooter);


    // замена картинок на gif
    const advantageImages = document.querySelectorAll('.advantage-title img');
    advantageImages.forEach((img) => {

        const originalSrc = img.src;
        const gifSrc = originalSrc.replace('.png', '.gif');

        img.addEventListener('mouseenter', () => {
            img.src = gifSrc;
        });

        img.addEventListener('mouseleave', () => {
            img.src = originalSrc;
        });
    });

    // Переключения классов языка
    const languageRu = document.querySelectorAll('.language-blue');
    const languageEn = document.querySelectorAll('.language-default');

    function toggleLanguage() {
        languageRu.forEach(item=> item.classList.toggle('language-blue'))
        languageRu.forEach(item=> item.classList.toggle('language-default'))

        languageEn.forEach(item=> item.classList.toggle('language-blue'))
        languageEn.forEach(item=> item.classList.toggle('language-default'))
    }

    languageRu.forEach(item=> item.addEventListener('click', toggleLanguage))
    languageEn.forEach(item=> item.addEventListener('click', toggleLanguage))

    // Переключения  слайдов
    const buttons = document.querySelectorAll('.working-slider button');
    const contents = document.querySelectorAll('.working-about__content');

    function changeContent(index) {
        contents.forEach((content, i) => {
            content.classList.remove('working-about__content_active', 'working-about__content_left', 'working-about__content_right');
            if (i < index) {
                content.classList.add('working-about__content_left'); // Если контент слева
            } else if (i > index) {
                content.classList.add('working-about__content_right'); // Если контент справа
            }
        });

        // активация текущего контента
        contents[index].classList.add('working-about__content_active');

        buttons.forEach((btn, i) => {
            if (i === index) {
                btn.classList.replace('working-slider__disable','working-slider__active')
            } else {
                btn.classList.replace('working-slider__active','working-slider__disable')
            }
        });
    }
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => changeContent(index));
    });

    // активируем первый элемент
    changeContent(0);

    // свайп комментов
    const reviews = document.querySelectorAll('.review');
    const reviewClasses = ['reviews-third', 'reviews-fourth', 'reviews-first', 'reviews-second'];

    function rotateReviews() {
        reviews.forEach(review => {
            const currentClass = reviewClasses.find(cls => review.classList.contains(cls));

            const nextClassIndex = (reviewClasses.indexOf(currentClass) + 1) % reviewClasses.length;
            const nextClass = reviewClasses[nextClassIndex];

            review.classList.replace(currentClass, nextClass);
        });
    }

    reviews.forEach(review => {
        review.addEventListener('click', rotateReviews);
    });

    // переход по секциям при прокрутке
    const sectionIds = ['start', 'advantages','working', 'tariffs', 'reviews','sale','questions','feedback','footer'];
    const sections = sectionIds.map(id => document.getElementById(id));

    let currentSectionIndex = 0;
    let isThrottled = false;
    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) sections[index].scrollIntoView({ behavior: 'smooth' });
    }

    window.addEventListener('wheel', (event) => {
        if (isThrottled) return;

        // прокручиваем вниз иначе вверх
        event.deltaY > 0 ? currentSectionIndex++ :  currentSectionIndex--;

        //ограничение индексов
        currentSectionIndex = Math.max(0, Math.min(sections.length - 1, currentSectionIndex));
        scrollToSection(currentSectionIndex);
        //
        isThrottled = true;
        setTimeout(() => isThrottled = false, 600);
    });

   // изменение изображений при прокрутке
    const feedbackSection = document.getElementById('feedback');
    const feedbackImage = document.querySelector('.feedback-image');

    const workingImage = document.querySelector('.working-image');

    const saleImage = document.querySelector('.sale-boy');
    const saleCircle = document.querySelector('.sale-circle');

    if (feedbackSection && feedbackImage){
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting)  feedbackImage.classList.add('animate-background');
            });
        },{ threshold: 0.8 });
        observer.observe(feedbackSection)
    }

    if (workingImage){
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting)  {
                    workingImage.classList.add('animate-scale');
                }
            });
        },{ threshold: 0.8 });
        observer.observe(workingImage)}

    if (saleImage && saleCircle){
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting){
                    saleImage.classList.add('animate-rotate');
                    saleCircle.classList.add('animate-circle');
                }
            });
        },{ threshold: 0.5 });
        observer.observe(saleImage)
        observer.observe(saleCircle)
    }

});
