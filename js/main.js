const toggleMenu = document.querySelector('.toggle-menu');//Иконка меню "Гамбургер"
const mobMenu = document.querySelector('.mobile-menu');// Плашка под мобильное меню

toggleMenu.addEventListener('click', function(){

   this.classList.toggle('active');
   mobMenu.classList.toggle('active');
})
