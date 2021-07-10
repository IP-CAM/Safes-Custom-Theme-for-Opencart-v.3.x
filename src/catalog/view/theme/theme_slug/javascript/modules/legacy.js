(() => {
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
