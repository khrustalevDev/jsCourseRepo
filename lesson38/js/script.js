window.addEventListener('DOMContentLoaded', () => {

    // TABS

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

    const promoEndDay = '2020-08-20';

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

    function dayCase(days, selector) {
        const timerBlock = document.querySelector(selector),
            usedNode = timerBlock.childNodes[2],
            Array1 = ['2', '3', '4'],
            Array2 = ["0", "5", "6", "7", "8", "9"];

        switch (days.length) {

            case 1:
                if (Array1.includes(days)) {
                    usedNode.nodeValue = 'Дня';
                }
                else if (days == 1) {
                    usedNode.nodeValue = 'День';
                }

                break;
            case 2:
                const lastDigit = days.charAt(days.length - 1);
                if (Array1.includes(lastDigit)) {
                    usedNode.nodeValue = 'Дня';
                } else
                    if (Array2.includes(lastDigit)) {
                        usedNode.nodeValue = 'Дней';
                    } else if (lastDigit == 1) {
                        usedNode.nodeValue = 'День';
                        break;
                    }
        }
    }


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
    dayCase(getTimeRem(promoEndDay).days.toString(), '.timer__block');

});