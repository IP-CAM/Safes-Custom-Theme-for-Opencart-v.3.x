(() => {
  const handleCartToggle = (event) => {
    event.preventDefault()
    $('.l-cart').toggleClass('l-cart_visible')
  }

  $('.cart-button, .cart-popup__close').on('click', handleCartToggle)

  const handleAjaxLoginDialogToggle = (event) => {
    event.preventDefault()
    $('.quicklogin__wrapper').toggleClass('quicklogin__wrapper_visible');
  }

  $('.ajax-login-link').on('click', handleAjaxLoginDialogToggle)


  const ajaxLogin = (event) => {
    event.preventDefault();

    $.ajax({
      url: 'index.php?route=account/ajax/login/login',
      type: 'post',
      data: $('#quicklogin input[type=\'email\'], #quicklogin input[type=\'password\']'),
      dataType: 'json',
      beforeSend: function() {
        $('.quicklogin__error').remove();
      },
      complete: function() {
      },
      success: function(json) {
        $(' .ui__group').removeClass('has-error');
        if (json['success'] || (json['islogged'])) {
          location.reload();
        }
        if (json['error']) {
          $('#quicklogin .h-flex').after('<div class="quicklogin__error">' + json['error'] + '</div>');
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
        alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
      }
    });
  }

  $('#js-quicklogin__login').on('click', ajaxLogin);




  /** Legacy */

  // TODO: кажется, это нужно убрать, так как это логика зависимая от модуля
  $('#mobile-search').on('change', function() {
    var value = $(this).val();
    if (value) {
      url = 'index.php?route=product/search&search=' + encodeURIComponent(value);
      location = url;
    }
  });


  var toggleReference = function()  {
    $('.reference__link').html(function(){
      return ($('.reference__full').hasClass('visually-hidden')) ? 'Скрыть' : 'Подробнее'
    });
    $('.reference__full').toggleClass('visually-hidden');
  };

  function toggleSearch() {
    $('.l-header__search').toggleClass('l-header__search_visible');
    $('.search__background').toggle();
    return false;
  }

  function toggleMobilemenu() {
    $('.l-mobile-menu').toggleClass('l-mobile-menu_visible');
    return false;
  }
})()
