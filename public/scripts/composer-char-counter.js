$( document ).ready(function() {

	$( "#new-tweet" ).keyup(function() {
	  let counterVal = $(this).parent().find('.counter');
	  counterVal.text(140 - ($(this).val().length));
	});

});