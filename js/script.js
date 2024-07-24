$(document).ready(function(){
    $('.carousel__inner').slick({
        // dots: true,
        speed: 1000,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        // dots: true,
        responsive: [{
            breakpoint: 992,
            settings: {
              dotsClass: 'slick-dots',
              dots: true,
              arrows: false,
              slidesToShow: 1,
              slidesToScroll: 1,

            }
        }]
        // autoplay: true,
        // autoplaySpeed: 2000,
        // fade: true,
        // cssEase: 'linear'
      });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
      $(item).each(function (i) {
        $(this).on('click', function (e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // modal

    $('[data-modal=consultation]').on('click', function() { // получаем данные с дата атрибута consultation
      $('.overlay, #consultation').fadeIn('slow'); // получаем overlay и конкретное модальное окно consultation, и тк он изначально скрыт -> fadeIn
    });
    $('.mymodal__close').on('click', function() { // обращаемся к крестику и закрываем окно
      $('.overlay, #consultation, #order, #thanks').fadeOut('slow'); // закрывать будем все элементы: .overlay, #consultation, #order, #thanks
    });
    $('.button_mini').each(function(i) { // для каждого .button_mini
      $(this).on('click', function() { 
        $('#order .mymodal__descr').text($('.catalog-item__subtitle').eq(i).text()); // получаем текст из .catalog-item__subtitle и записываем его в .mymodal__descr
        $('.overlay, #order').fadeIn('slow');
      })
    });

    // valid

    function validateForms(form) {
      $(form).validate({
        rules: {
          name: 'required',
          phone: 'required',
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: "Пожалуйста, введите свое имя",
          phone: "Пожалуйста, введите свой номер телефона",
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Корректно введите почту (пример: name@domain.com)"
          }
        }
      });
    };
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) { // при отправке формы
      e.preventDefault(); // отменяем стандартное поведение браузера
      $.ajax ({
        type: "POST", // POST - отдача данных
        url: "mailer/smart.php", // путь к PHP
        data: $(this).serialize() // данные с текущей формы (в нужном формате)
      }).done(function(){
        $(this).find("input").val("") // очищаем форму
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');
        $('form').trigger('reset'); // очистка формы
      });
      return false;
    });

    // pageup scroll

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600){
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    // плавный скроллинг вверх

    $("a[href^='#up']").click(function(){ // получаем все ссылки с атрибутом href начинающиеся с #up и запускаем функцию
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });

    new WOW().init();
});
