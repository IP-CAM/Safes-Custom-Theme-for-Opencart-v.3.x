//Отключаем ховеры при прокрутке
var body = document.body,
    timer;
window.addEventListener('scroll', function() {
  clearTimeout(timer);
  if(!body.classList.contains('h-disable-hover')) {
    body.classList.add('h-disable-hover')
  }
  timer = setTimeout(function(){
    body.classList.remove('h-disable-hover')
  }, 500);
}, false);

//Загружаем иконки
;(function(window, document) {
	'use strict';
  if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return true;
	var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
      request,
      data,
      insertIT = function() {
      	document.body.insertAdjacentHTML('afterbegin', data);
      },
      insert = function() {
      	if (document.body) insertIT();
        else document.addEventListener('DOMContentLoaded', insertIT);
      };
			if (isLocalStorage && localStorage.getItem('sprites')) {
        data = localStorage.getItem('sprites');
				insert();
				return true;
	    }
    try {
    	request = new XMLHttpRequest();
      request.open('GET', 'catalog/view/theme/tvoiseif/image/icons.svg', true);
      request.onload = function() {
      	if (request.status >= 200 && request.status < 400) {
        	data = request.responseText;
        	insert();
					if (isLocalStorage) {
						localStorage.setItem('sprites', data);
					}
      	}
  		}
      request.send();
    }
    catch(e){}
}(window, document));


var autohideCart; //Таймер скрытия автоматического скрытия корзины

// Разобрать переменные из Url
function getURLVar(key) {
	var value = [];
	var query = String(document.location).split('?');
	if (query[1]) {
		var part = query[1].split('&');
		for (i = 0; i < part.length; i++) {
			var data = part[i].split('=');
			if (data[0] && data[1]) {
				value[data[0]] = data[1];
			}
		}
		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	}
}
// Корзина
var cart = {
	'update': function(key, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/edit',
			type: 'post',
			data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#js-cart__button').html('<svg class="button__icon"><use xlink:href="#i-cart"></use></svg>' + json['total']);
				}, 100);
				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
			},
			complete: function() {
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#js-cart__button').html('<svg class="button__icon"><use xlink:href="#i-cart"></use></svg>' + json['total']);
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > table').load('index.php?route=common/cart/info table');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	}
}

// Поиск в мобильном меню
$('#mobile-search').on('change', function() {
	var value = $(this).val();
	if (value) {
		url = 'index.php?route=product/search&search=' + encodeURIComponent(value);
		location = url;
	}
});

//Быстрый вход
$('#js-quicklogin__login').on('click', function(event) {
	event.preventDefault();
	$.ajax({
		url: 'index.php?route=account/quick/login',
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
});

// Переключатели
function toggleReference() {
	$('.reference__link').html(function(){
		return ($('.reference__full').hasClass('visually-hidden')) ? 'Скрыть' : 'Подробнее'
	});
	$('.reference__full').toggleClass('visually-hidden');
};
function toggleCart() {
	$('.l-cart').toggleClass('l-cart_visible');
	return false;
}
function toggleSearch() {
	$('.l-header__search').toggleClass('l-header__search_visible');
	$('.search__background').toggle();
	return false;
}
function toggleMobilemenu() {
	$('.l-mobile-menu').toggleClass('l-mobile-menu_visible');
	return false;
}
function toggleQuicklogin() {
	$('.quicklogin__wrapper').toggleClass('quicklogin__wrapper_visible');
	return false;
}
