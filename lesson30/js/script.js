/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img'),
        promo = document.querySelector('.promo__bg'),
        genre = promo.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        form = document.querySelector('.add'),
        addFilmBtn = form.querySelector('button'),
        input = form.querySelector('.adding__input'),
        checkBox = form.querySelector('[type="checkbox"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let newFilm = input.value;
        const favorite = checkBox.checked;
        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            if (favorite) {
                console.log('Добавлен любимый фильм!');
            }
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            listPrint(movieDB.movies, movieList);
        }
        e.target.reset();
    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const pageFix = () => {
        genre.textContent = 'драма';
        promo.style.backgroundImage = 'url("img/bg.jpg")';
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    function listPrint(films, parent) {
        parent.innerHTML = '';
        sortArr(films);
        films.forEach((movie, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i+1} ${movie}
                <div class="delete"></div>
                </li>`;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                listPrint(films, parent);
            });
        });
    }

    deleteAdv(adv);
    pageFix();
    listPrint(movieDB.movies, movieList);
});



