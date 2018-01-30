$( document ).ready(function() {
	console.log('hello!');

	$( "#new-tweet" ).keyup(function() {
	  console.log($(this).val().length);
	});

});