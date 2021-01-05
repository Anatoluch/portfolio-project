$(document).ready(function () {
// Подключение точек пагинации справа page-nav
$('#page-nav').onePageNav({
   currentClass: 'active-nav',
   changeHash: false,
   scrollSpeed: 750,
   scrollThreshold: 0.5,
   filter: '',
   easing: 'swing',
   begin: function () {},
   end: function () {},
   scrollChange: function ($currentListItem) {}
});
//Иконка мобильного меню "Гамбургер"
const toggleMenu = document.querySelector('.toggle-menu');//Иконка меню "Гамбургер"
const mobMenu = document.querySelector('.mobile-menu');// Плашка под мобильное меню
const overlay = document.querySelector('#overlay');// overlay
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
      //Скрипт для fake-placeholder'а формы обратной связи
      const formItems = document.querySelectorAll('.form-input');
      for(let item of formItems){
         const thisParent = item.closest('.form-item-row');
         const thisPlaceholder = thisParent.querySelector('.fake-placeholder');
         //Текстовое поле (input) в фокусе
         item.addEventListener('focus', function(){
            thisPlaceholder.classList.add('active-field');
         });
         //Текстовое поле теряет фокус
         item.addEventListener('blur', function(){
            if(item.value.length > 0){
               thisPlaceholder.classList.add('active-field');
            }
            else{
               thisPlaceholder.classList.remove('active-field');
            }
         })
      }
      //Валидация формы обратной связи
      $('.contact-form').validate({
         rules: {
            email: {
               required:true,
               email:true
            },
            subject: {
               required: false
            },
            message: {
               required: true
            }
         },
         messages: {
            email: {
               required: 'Обязательно укажите Ваш email!',
               email: 'Введен некорректный адрес электронной почты!'
            },
            subject: {
               required: 'Тема сообщения не указана!'
            },
            message: {
               required: 'А где, собственно, текст Вашего сообщения?!'
            }
         },
         submitHandler: function (form) {
            ajaxFormSubmit();
         }
      })
   //Отправка данных формы обратной связи
   	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $(".contact-form").serialize(); // Соханяем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$(".contact-form").slideUp(800);
				$('#answer').html(html);
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}
})