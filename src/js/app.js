import Swiper, { Navigation } from 'swiper';

import * as flsFunc from './moduls/func.js';
import { cart } from './moduls/cart.js';

flsFunc.isWebp();
cart();

document.getElementById('smoke').playbackRate = 1.5;

const swiper = new Swiper('.hero__swiper', {
    modules: [Navigation],
    loop: true,
    slidesPerView: 3,
    speed: 1500,
    centeredSlides: true,
    allowTouchMove: false,
    navigation: {
        nextEl: '.hero__navigation__next',
        prevEl: '.hero__navigation__prev',
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
          allowTouchMove: true,
        },
        991.98: {
            slidesPerView: 3,
            allowTouchMove: false,
        }
      }
});

