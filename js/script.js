'use  strict';

let toggleMenu = document.querySelector('.page-header__toggle-menu');
let menu = document.querySelector('.main-nav');

toggleMenu.addEventListener('click', function(e) {
  e.preventDefault();
  this.classList.toggle('active');
  menu.classList.toggle('active');
});

