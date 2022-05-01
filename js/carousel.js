$(document).ready(function(){
    //Плагин owlCarusel (Сертификаты)
	$(".owl-carousel").owlCarousel({
		responsiveClass: true,
		nav: false,
		navSpeed: 500,
		autoplaySpeed: 1000,
		dots: false,
		navText: ["", ""],
		loop: true,
		autoplay: true,
		autoplayTimeout: 3000,
		margin: 5,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			},
			768: {
				items: 2,
			},
			1200: {
				items: 3,
			},
		},
	});
});