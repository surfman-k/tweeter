const users = {
	fname: "",
	lname: "",
	uname: "",
	pswd: "",
};


$(document).ready(function() {

//Registration functionality

$(".regForm").submit(function(e) {
	e.preventDefault();

  	let currentUser = ($(this).closest('form').serializeArray());
  	console.log(currentUser[0].value);
  	console.log(currentUser[1].value);
  	console.log(currentUser[2].value);
  	console.log(currentUser[3].value);

  	$(".composeButton").show();
	$(".logoutButton").show();
	$(".loginButton").hide();

	$(this).closest('form').hide();
   
	});


if(!users.uname){
	$(".composeButton").hide();
	$(".logoutButton").hide();
}  

$(".logoutButton").click(function() {
	$(".composeButton").hide();
	$(".logoutButton").hide();
	$(".loginButton").show();
});


console.log(users);





















});