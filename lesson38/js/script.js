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
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

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

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('show') && e.code === 'Escape') {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalAfterScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalAfterScroll);
        }
    }

    window.addEventListener('scroll', showModalAfterScroll);

    //Menu card clss

    class MenuCard {
        constructor(src, alt, title, text, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `<div class="menu__item">
            <img src="img/tabs/vegy.jpg" alt="vegy">
            <h3 class="menu__item-subtitle">Меню "Фитнес"</h3>
            <div class="menu__item-descr">Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих
                овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной
                ценой
                и высоким качеством!
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>229</span> грн/день</div>
            </div>
        </div>`;


        }
    }
});