$(document).ready(function () {
   const toggleMenu = document.querySelector('.toggle-menu');//Иконка меню "Гамбургер"
const mobMenu = document.querySelector('.mobile-menu');// Плашка под мобильное меню
const overlay = document.querySelector('#overlay');// overlae
const bodyEl = document.body;

//Сценарий события клик по "гамбургеру" (появление/исчезание моб. меню, оверлея)
toggleMenu.addEventListener('click', function(){
   this.classList.toggle('active');
   mobMenu.classList.toggle('active');
   overlay.classList.toggle('active');
   bodyEl.classList.toggle('noscroll');
});
//Сценарий события клик по любому элементу (ссылке, иконке и т.д) моб. меню (но не по "гамбургеру")
mobMenu.addEventListener('click', function(){
   this.classList.remove('active');
   toggleMenu.classList.remove('active');
   overlay.classList.remove('active');
   bodyEl.classList.remove('noscroll');
});
//Сценарий события клик по оверлею
overlay.addEventListener('click', function(){
   this.classList.remove('active');
   toggleMenu.classList.remove('active');
   mobMenu.classList.remove('active');
   bodyEl.classList.remove('noscroll');
});
   //-фильтрация проектов
   let containerEl = document.querySelector('#portfolio-projects');

      let mixer = mixitup(containerEl, {
         classNames: {
            block: ""
         }
      });
      //Корректировка размера карточек в процессе фильтрации (отмена/возврат класса portfolio-card--big)
      const filterToggles = document.querySelectorAll('.portfolio-filter button');
      const portfolioBigCards = document.querySelectorAll('.portfolio-card');
      for (let i=0; i < filterToggles.length; i++) {
         filterToggles[i].addEventListener('click', function (){
            if (i == 0) {
               for (let j = 0; j < 2; j++) {
                  portfolioBigCards[j].classList.add('portfolio-card--big')
               }
               } else {
                  for (let j = 0; j < 2; j++) {
                     portfolioBigCards[j].classList.remove('portfolio-card--big')
                  }
            }
         });
      }

})