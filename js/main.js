new Swiper('.main-slider', {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    slidesPerView: 1   
});

$(document).ready(function(){
    $('.priorities__tab-trigger').click(function(e){
        e.preventDefault();
    
        $('.priorities__tab-trigger').removeClass('priorities__tab-trigger--active');
        $('.priorities__tab-item').removeClass('priorities__tab-item--active');

        $(this).addClass('priorities__tab-trigger--active');
        $($(this).attr('href')).addClass('priorities__tab-item--active')
    });

    $('.priorities__tab-trigger:first').click();

    /** MOBILE MENU **/
    $('.header-mob-menu__btn').click(function(){
        if (document.documentElement.clientWidth < 768) {
            $('body').width($('body').width());
            $('body').css('overflow', 'hidden');
            $('.mobile-menu').addClass('open');
        }
    });
    $('.close_catalog_menu').click(function(){
        $('body').removeAttr('style'); 
        $('.mobile-menu').removeClass('open');
    });

    /** TOPER **/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('#to-top').fadeIn();
        } else {
            $('#to-top').fadeOut();
        }
    });
    $('#to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

    $('.light-fb__btn').click(function(){
        $.fancybox.open({
            src: '#formModal',
            type: 'inline',
            'beforeLoad' : function(){
                $('body').addClass('light-fb');
            },
            'afterClose': function() {
                $('body').removeClass('light-fb');
            }            
        });
    });
})

document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = this;
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  try {
    const response = await fetch('https://formspree.io/f/xnnvvbgv', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Спасибо! Ваше сообщение отправлено.');
      form.reset();
    } else {
      const err = await response.json();
      console.error('Ошибка от Formspree:', err);
      alert('Ошибка при отправке: ' + (err.message || 'Попробуйте позже.'));
    }
  } catch (error) {
    console.error('Сетевая ошибка:', error);
    alert('Сетевая ошибка при отправке формы.');
  }
});
