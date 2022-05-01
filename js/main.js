$(document).ready(function () {
	//Запрет открытия исходного кода страницы горячими клавишами
	document.addEventListener("keydown", function (e) {
		if (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 117)) {
			// ctrl-u ctrl-f6
			e.preventDefault();
			alert("Доступ к исходному коду запрещён!");
		} else {
			return true;
		}
	});
	// Подключение точек пагинации справа page-nav
	$("#page-nav").onePageNav({
		currentClass: "active-nav",
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: "",
		easing: "swing",
		begin: function () {},
		end: function () {},
		scrollChange: function ($currentListItem) {},
	});
	//Иконка мобильного меню "Гамбургер"
	const toggleMenu = document.querySelector(".toggle-menu"); //Иконка меню "Гамбургер"
	const mobMenu = document.querySelector(".mobile-menu"); // Плашка под мобильное меню
	const overlay = document.querySelector("#overlay"); // overlay
	const bodyEl = document.body.closest("html");

	//Сценарий события клик по "гамбургеру" (появление/исчезание моб. меню, оверлея)
	toggleMenu.addEventListener("click", function () {
		this.classList.toggle("active");
		mobMenu.classList.toggle("active");
		overlay.classList.toggle("active");
		bodyEl.classList.toggle("noscroll");
	});
	//Сценарий события клик по любому элементу (ссылке, иконке и т.д) моб. меню (но не по "гамбургеру")
	mobMenu.addEventListener("click", function () {
		this.classList.remove("active");
		toggleMenu.classList.remove("active");
		overlay.classList.remove("active");
		bodyEl.classList.remove("noscroll");
	});
	//Сценарий события клик по оверлею
	overlay.addEventListener("click", function () {
		this.classList.remove("active");
		toggleMenu.classList.remove("active");
		mobMenu.classList.remove("active");
		bodyEl.classList.remove("noscroll");
	});
	//-фильтрация проектов
	let containerEl = document.querySelector("#portfolio-projects");
	if (containerEl) {
		let mixer = mixitup(containerEl, {
			classNames: {
				block: "",
			},
		});
	}
	//Корректировка размера карточек в процессе фильтрации (отмена/возврат класса portfolio-card--big)
	const filterToggles = document.querySelectorAll(".portfolio-filter button");
	const portfolioBigCards = document.querySelectorAll(".portfolio-card");
	for (let i = 0; i < filterToggles.length; i++) {
		filterToggles[i].addEventListener("click", function () {
			if (i == 0) {
				for (let j = 0; j < 2; j++) {
					portfolioBigCards[j].classList.add("portfolio-card--big");
				}
			} else {
				for (let j = 0; j < 2; j++) {
					portfolioBigCards[j].classList.remove("portfolio-card--big");
				}
			}
		});
	}
	// --------------- Логика работы формы обратной связи -----------------//
	//Скрипт для fake-placeholder'а формы обратной связи
	const formItems = document.querySelectorAll(".form-input");
	for (let item of formItems) {
		const thisParent = item.closest(".form-item-row");
		const thisPlaceholder = thisParent.querySelector(".fake-placeholder");
		//Текстовое поле (input) в фокусе
		item.addEventListener("focus", function () {
			thisPlaceholder.classList.add("active-field");
		});
		//Текстовое поле теряет фокус
		item.addEventListener("blur", function () {
			if (item.value.length > 0) {
				thisPlaceholder.classList.add("active-field");
			} else {
				thisPlaceholder.classList.remove("active-field");
			}
		});
	}
	// Отображение счётчика символов ввода
	let textField = document.querySelector("#form-comment");
	let counterRow = document.querySelector(".contacts-form__char-counter");

	// Текстовое поле в фокусе
	if (textField) {
		textField.addEventListener("focus", function () {
			counterRow.classList.remove("transp-count");
		});
		// Потеря фокуса
		textField.addEventListener("blur", function () {
			counterRow.classList.add("transp-count");
		});
	}

	//Ограничение длины поля "Сообщение"
	let maxCount = 480;
	let counterSpan = document.querySelector("#form-char-counter");
	$(".contact-form textarea").keyup(function () {
		if (this.value.length > maxCount) {
			this.value = this.value.substr(0, maxCount);
			counterRow.style = "color:red; font-weight:700; font-size:16px";
		} else if (this.value.length < maxCount && this.value.length > 420){
			counterRow.style = "color:orange; font-weight:700; font-size:14px";
		} else if (this.value.length == maxCount) {
			counterRow.style = "color:red; font-weight:700; font-size:16px";
		} else if (this.value.length < maxCount) {
			counterRow.removeAttribute("style");
		}
	});
	//Счетчик оставшихся для вода символов (Сообщение)
	$("#form-char-counter").html(maxCount);
	$("#form-comment").keyup(function () {
		let revText = this.value.length;
		if (this.value.length > maxCount) {
			this.value = this.value.substr(0, maxCount);
		}
		let cnt = maxCount - revText;
		if (cnt <= 0) {
			$("#form-char-counter").html("0");
		} else {
			$("#form-char-counter").html(cnt);
		}
	});

	//Проверка на роботов
	let formBlock = document.querySelector(".contact-form"); // форма обратной связи
	let formAllFakePlaceholders = document.querySelectorAll(".contact-form .fake-placeholder"); // все фейковые placeholders
	let callFormPolicy = document.querySelector(".form-checkbox"); // чекбокс политики конфиденциальности
	let botTestRow = document.querySelector("#form-bot-row"); // ячейка с вопросами проверки на ботов
	let botQuestion1Row = document.querySelector("#question-1-row"); // ячейка 1-го вопроса
	let botQuestion2Row = document.querySelector("#question-2-row"); // ячейка 2-го вопроса
	let submitBtn = document.querySelector("#submit-btn"); // кнопка отправки заявки
	let resetBtn = document.querySelector("#reset-btn"); // кнопка очистки формы
	let fakeBotPlaceholder1 = document.querySelector("#form-bot-placeholder-1"); // Фейковый placeholder контрольного вопроса №1
	let fakeBotPlaceholder2 = document.querySelector("#form-bot-placeholder-2"); // Фейковый placeholder контрольного вопроса №2
	let questionInp1 = document.querySelector("#question-inp-1"); // span в который будет вставлен вопрос №1
	let questionInp2 = document.querySelector("#question-inp-2"); // span в который будет вставлен вопрос №2
	let controlQuestion1 = document.querySelector("#form-bot-question-1"); // input контрольного вопроса №1
	let controlQuestion2 = document.querySelector("#form-bot-question-2"); // input контрольного вопроса №2
	let questionToInp2 = `России?`;
	//Для контрольного вопроса №1 (математика)
	let x, y, res;

	//Функция генерации случайных чисел для контрольного вопроса №1 (математика)
	function randomInt() {
		x = Math.round(Math.random() * 10); //Math.round() округляет до ближайшего целого числа
		y = Math.round(Math.random() * 10);
		res = x + y;
		return res;
	}
	// При принятии политики отображается контрольный вопрос №1
	if (callFormPolicy) {
		callFormPolicy.addEventListener("change", function (e) {
			if (e.target.checked == true) {
				randomInt();
				//вставка контрольного вопроса №1 внутрь фейкового placeholder №1
				questionInp1.innerText = `${x} + ${y}?`;
				botTestRow.classList.remove("hidden");
				botQuestion1Row.classList.remove("hidden");
				this.disabled = true;
				// Проверка ответа на конрольный вопрос №1
				controlQuestion1.addEventListener("input", function (e) {
					let inputValue1 = parseInt(e.target.value); // запись в переменную введенного ответа на вопрос с приведением типа к числу
					if (inputValue1 === res) {
						submitBtn.disabled = true;
						botQuestion1Row.classList.add("hidden");
						botQuestion2Row.classList.remove("hidden");
						fakeBotPlaceholder1.classList.remove("active-field");
						controlQuestion1.blur();
						controlQuestion2.focus();
						callFormPolicy.disabled = true;
					} else {
						submitBtn.disabled = true;
						return;
					}
				});
			} else {
				botTestRow.classList.add("hidden");
				botQuestion1Row.classList.add("hidden");
				botQuestion2Row.classList.add("hidden");
			}
		});
	}

	// Формирование Контрольного вопроса №2
	if (questionInp2) {
		questionInp2.innerText = questionToInp2;
	}

	// Проверка ответа на контрольный вопрос №2
	if (controlQuestion2) {
		controlQuestion2.addEventListener("input", function (e) {
			let inputValue2 = e.target.value.toLowerCase();
			if (inputValue2 === "москва") {
				submitBtn.disabled = false;
				botTestRow.classList.add("hidden");
				formBlock.setAttribute("method", "POST"); // Добавление метода отправки данных формы
				formBlock.setAttribute("action", "./php/mail.php"); // Добавление обработчика формы
				botQuestion2Row.classList.add("hidden");
				fakeBotPlaceholder2.classList.remove("active-field");
				controlQuestion2.blur();
			} else {
				submitBtn.disabled = true;
			}
		});
	}

	// Запрет ввода других символов,в т.ч. пробелов, кроме цифр в input контрольного вопроса №1
	if (controlQuestion1) {
		controlQuestion1.addEventListener("input", cleanInpDigit);
	}

	// Функция отсеивающая запретные символы и пробелы
	function cleanInpDigit() {
		this.value = this.value.replace(/[^+0-9]/g, "");
	}

	// Запрет ввода других символов,в т.ч. пробелов, кроме кириллицы в input контрольного вопроса №2
	if (controlQuestion2) {
		controlQuestion2.addEventListener("input", cleanControlQuestionChar);
	}

	// Функция отсеивающая запретные символы и пробелы
	function cleanControlQuestionChar() {
		this.value = this.value.replace(/[^А-Яа-я-]/g, "");
	}

	// Очистка формы по клику на кнопку "Очистить"
	function hideValidationErrLabels(){ // Функция сбора всех меток ваидации контактной формы с последующим их скрытием
		let validationErrLabels = document.querySelectorAll('.contact-form label.error');
		validationErrLabels.forEach(function(item){
			item.style = "display:none";
		});
	}
	if (resetBtn) {
		resetBtn.addEventListener("click", function () {
			callFormPolicy.disabled = false;
			submitBtn.disabled = false;
			formAllFakePlaceholders.forEach(function (item) {
				item.classList.remove("active-field");
			});
			botTestRow.classList.add("hidden");
			botQuestion1Row.classList.add("hidden");
			botQuestion2Row.classList.add("hidden");
			counterRow.removeAttribute("style");
			counterSpan.innerText = maxCount;
			formBlock.removeAttribute("method", "POST"); // Удаление метода отправки данных формы
			formBlock.removeAttribute("action", "./php/mail.php"); // Удаление обработчика формы
			this.blur();
			hideValidationErrLabels();
		});
	}
	//Валидация формы обратной связи
	if($(".contact-form")){
		$(".contact-form").validate({
			rules: {
				userName: {
					required: true,
					minlength: 2,
				},
				email: {
					required: true,
					email: true,
				},
				subject: {
					required: false,
				},
				message: {
					required: true,
				},
				checkbox: {
					required: true,
				},
				botQuestion1: {
					required: true,
					minlength: 1,
					maxlength: 2,
				},
				botQuestion2: {
					required: true,
					minlength: 1,
					maxlength: 6,
				},
			},
			messages: {
				userName: {
					required: "А как к Вам обращаться?!",
					minlength: "Ошибка ввода!",
				},
				email: {
					required: "Обязательно укажите Ваш email!",
					email: "Введен некорректный адрес электронной почты!",
				},
				subject: {
					required: "Тема сообщения не указана!",
				},
				message: {
					required: "А где, собственно, текст Вашего сообщения?!",
				},
				checkbox: {
					required:
						"Чтобы отправить сообщение, нужно принять политику конфиденциальности!",
				},
				botQuestion1: {
					required: "Обязательное поле!",
					minlength: "Ошибка ввода!",
					maxlength: "Ошибка ввода!",
				},
				botQuestion2: {
					required: "Обязательное поле!",
					minlength: "Ошибка ввода!",
					maxlength: "Ошибка ввода!",
				},
			},
			submitHandler: function (form) {
				ajaxFormSubmit();
			},
		});
	}
	//Отправка данных формы обратной связи
	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {
		let string = $(".contact-form").serialize(); // Сохраняем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$(".contact-form").slideUp(800);
				$("#answer").html(html);
			},
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепочку срабатывания остальных функций
		return false;
	}
	// --------------- /Логика работы формы обратной связи -----------------//
	//Появление всех карточек в секции "Портфолио"
	const portfolioLink = document.querySelector(".portfolio-link");
	const portfolioContent = document.querySelector(".portfolio-content");
	const link1 = document.querySelector(".link-1");
	const link2 = document.querySelector(".link-2");

	if (portfolioLink) {
		portfolioLink.addEventListener("click", function () {
			portfolioContent.classList.toggle("show-all");
			link1.classList.toggle("link-1-hide");
			link2.classList.toggle("link-2-show");
		});
	}
	/* Прокручивает страницу вверх при нажатии на кнопку */
	$(window).scroll(function () {
		var height = $(window).scrollTop();
		if ($(this).width() > 319) {
			if ($(this).scrollTop() > 300) {
				$("#back2Top").fadeIn();
			} else {
				$("#back2Top").fadeOut();
			}
		}
	});
	$("#back2Top").click(function (event) {
		event.preventDefault();
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});
	//Защита номера телефона от спама (путем замены ссылки на изображение)
	$("#nashphone1").click(function () {
		$("#nashphone1").html('<a href="tel:+79787300414">+7(978) 730 04 14</a>');
	});
});
