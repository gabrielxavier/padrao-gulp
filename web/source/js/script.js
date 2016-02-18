$(function() {

	'use strict';

	$('html').removeClass('no-js');

	/**
	/* Seleciona todos elementos que possuem atributo "data-background-image"
	/* e gera "background-image" inline no elemento selecionado.
	/* A imagem será carregada após o body estar completo.
	/* Utilize se a imagem for pesada e/ou necessite atrasar o carregamento da mesma.
	**/
	$('[data-background]').css('background-image', dataBackground);

	/**
	/* Seleciona todos elementos que possuem atributo "data-src"
	/* e gera uma imagem dentro do elemento selecionado.
	/* A imagem será carregada após o body estar completo.
	/* Utilize se a imagem for pesada e/ou necessite atrasar o carregamento da mesma.
	**/
	$('[data-img]').each(dataImg);

	/**
	/* Versão alternativa para navegadores antigos que não suportam "placeholder".
	**/
	$('.lt-ie10 [placeholder]').focus(placeholderFocus).blur(placeholderBlur).trigger('blur');
	$('.lt-ie10 [placeholder]').parents('form').submit(placeholderSubmit);

	inputMasks();

});

function inputMasks() {

	$('input.tel').focus(function() {
		$(this).mask('(99) 9999-9999?9', {
			completed: function() {
				$(this).mask('(99) 99999-9999');
			}
		});
	});

	$('input.cep').mask('99999-999');

}

function dataImg() {
  var $this = $(this),
      obj = eval(['(', $this.attr('data-img'), ')'].join('')),
      keys = Object.keys(obj), img_src, current,
      width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  while(!img_src && keys.length) {
    current = keys.pop();
    if (current <= width) img_src = obj[current];
  }

  if (!$this.has(['.data-img-', current].join('')).length) {
    $this
      .find('.data-img').remove().end()
      .append(
        $(['<img class="data-img data-img-', current, '" src="', img_src, '" />'].join(''))
          .one('load', loadImg)
      );
  }

  function loadImg() {
    $this.addClass('complete');
  }
}

function dataBackground() {
	var obj = eval(['(', $(this).attr('data-background'), ')'].join('')),
			keys = Object.keys(obj), bg, current,
			width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

	while(!bg && keys.length) {
		current = keys.pop();
		if (current <= width) bg = obj[current];
	}

	return ['url(', bg, ')'].join('');
}

function placeholderFocus() {
	var input = $(this);
	if (input.val() == input.attr('placeholder')) {
		input.val('');
		input.removeClass('placeholder');

		if (input.hasClass('password'))
			input.attr('type', 'password').removeClass('password');
	}
}

function placeholderBlur() {
	var input = $(this);
	if (input.val() == '' || input.val() == input.attr('placeholder')) {
		input.addClass('placeholder');
		input.val(input.attr('placeholder'));

		if (input.attr('type') == 'password')
			input.attr('type', 'text').addClass('password');
	}
}

function placeholderSubmit() {
	$(this).find('[placeholder]').each(placeholderEach);
}

function placeholderEach() {
	var input = $(this);
	if (input.val() == input.attr('placeholder'))
		input.val('');
}

function setCookie(name, value, days) {
	var date = new Date();
	date.setDate(date.getDate() + days);

	var cookie = escape(value) + ((days==null) ? '' : '; expires=' + date.toUTCString());
	document.cookie = name + '=' + cookie;
}

function getCookie(name) {
	var cookie = document.cookie;
	var start = cookie.indexOf(" " + name + "=");

	if (start == -1) {
		start = cookie.indexOf(name + "=");
	}

	if (start == -1) {
		cookie = null;
	} else {
		start = cookie.indexOf("=", start) + 1;

		var end = cookie.indexOf(";", start);

		if (end == -1) {
			end = cookie.length;
		}

		cookie = unescape(cookie.substring(start, end));
	}

	return cookie;
}

if (!Object.keys) {
	Object.keys = function(obj) {
		var keys = [];

		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				keys.push(i);
			}
		}

		return keys;
	};
}
