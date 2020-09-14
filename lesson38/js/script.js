window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');

        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideContent();
                    showTabContent(i);
                }
            });
        }
    });

    //TIMER

    const promoEndDay = '2020-08-29';

    function getTimeRem(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60) % 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // function dayCase(days, selector) {
    //     const timerBlock = document.querySelector(selector),
    //         usedNode = timerBlock.childNodes[2],
    //         Array1 = ['2', '3', '4'],
    //         Array2 = ["0", "5", "6", "7", "8", "9"];

    //     switch (days.length) {

    //         case 1:
    //             if (Array1.includes(days)) {
    //                 usedNode.nodeValue = 'Дня';
    //                 break;
    //             } else if (days == 1) {
    //                 usedNode.nodeValue = 'День';
    //                 break;
    //             }


    //             case 2:

    //                 if (9 < days < 21) {
    //                     usedNode.nodeValue = 'Дней';

    //                 } else {

    //                     const lastDigit = days.charAt(days.length - 1);
    //                     if (Array1.includes(parseInt(lastDigit))) {
    //                         usedNode.nodeValue = 'Дня';

    //                     } else
    //                     if (Array2.includes(parseInt(lastDigit))) {
    //                         usedNode.nodeValue = 'Дней';

    //                     } else if (parseInt(lastDigit) === 1) {
    //                         usedNode.nodeValue = 'День';

    //                     }
    //                 }

    //     }
    // }


    function setTimer(selector, endtime) {
        const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();


        function updateClock() {
            let t = getTimeRem(endtime);
            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);


            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setTimer('.timer', promoEndDay);
    //dayCase(getTimeRem(promoEndDay).days.toString(), '.timer__block');

    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';

    }

    modalTrigger.forEach(btn => {

        btn.addEventListener('click', openModal);

    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('show') && e.code === 'Escape') {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalAfterScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalAfterScroll);
        }
    }

    window.addEventListener('scroll', showModalAfterScroll);

    //Menu card clss

    class MenuCard {
        constructor(src, alt, title, text, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.text}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
            this.parent.append(element);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch: ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        fail: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                `;

            form.insertAdjacentElement('afterend', statusMessage);


            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.fail);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close="">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);

    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json());
    //.then(data => console.log(data));

    slider();

    function slider() {
        const slides = document.querySelectorAll('.offer__slide'),
            arrowPrev = document.querySelector('.offer__slider-prev'),
            arrowNext = document.querySelector('.offer__slider-next'),
            currentSlide = document.querySelector('#current'),
            totalSlides = document.querySelector('#total'),
            slidesWrapper = document.querySelector('.offer__slider-wrapper'),
            slidesField = document.querySelector('.offer__slider-inner'),
            width = window.getComputedStyle(slidesWrapper).width;

        let slideIndex = 1,
            offset = 0;


        if (slides.length < 10) {
            totalSlides.textContent = `0${slides.length}`;
            currentSlide.textContent = `0${slideIndex}`;
        } else {
            totalSlides.textContent = slides.length;
            currentSlide.textContent = slideIndex;
        }

        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';

        slidesWrapper.style.overflow = 'hidden';
        slides.forEach(slide => {
            slide.style.width = width;
        });

        arrowNext.addEventListener('click', () => {
            if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
                offset = 0;
            } else {
                offset += +width.slice(0, width.length - 2);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }

            if(slides.length<10){
                currentSlide.textContent = `0${slideIndex}`;
            }else{
                currentSlide.textContent = slideIndex;
            }
        });

        arrowPrev.addEventListener('click', () => {
            if (offset == 0) {
                offset = +width.slice(0, width.length - 2) * (slides.length - 1);

            } else {
                offset -= +width.slice(0, width.length - 2);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }

            if(slides.length<10){
                currentSlide.textContent = `0${slideIndex}`;
            }else{
                currentSlide.textContent = slideIndex;
            }
        });

        //     initSlider();

        //     function initSlider() {
        //         totalSlides.textContent = `0${slides.length}`;
        //         selectedSlide.textContent = `0${slideIndex}`;
        //         showSlide(slideIndex);
        //     }

        //     function showSlide(index) {
        //         if (index > slides.length) {
        //             slideIndex = 1;
        //         }
        //         if (index < 1) {
        //             slideIndex = slides.length;
        //         }
        //         slides.forEach(slide => {
        //             slide.style.display = 'none';
        //         });
        //         slides[slideIndex - 1].style.display = 'block';
        //     }

        //     function changeSlide(value) {
        //         showSlide(slideIndex += value);
        //         selectedSlide.textContent = `0${slideIndex}`;
        //     }

        //     arrowNext.addEventListener('click', () => {
        //         changeSlide(1);
        //     });

        //     arrowPrev.addEventListener('click', () => {
        //         changeSlide(-1);
        //     });


    }
});