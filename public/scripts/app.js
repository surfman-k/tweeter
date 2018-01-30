/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

function createTweetElement(twee) {

	let $obj = $("<article>").addClass("feed");

	$("<header class='tweetop'>").appendTo($obj)
	.append("<img class='username' src=" + twee.user.avatars.small + " height='50' width='50' >")
	.append("<h2 class='userinfo'>" + twee.user.name + "</h2>")
	.append("<p class='usertag'>" + twee.user.handle + "</p>");

	$("<div class='tweebod'>").appendTo($obj)
	.append("<p class='tweetbody'>" + twee.content.text + "</p>");

	$("<footer class='tweetfoot'>").appendTo($obj)
	.append("<hr class='tweetfoot'>")
	.append("<p class='tweetfoot'>" + Math.floor((Date.now() - twee.created_at)/86400000) + " Days Ago" + "</p>")
	.append("<div style='float:right; margin-right: 5px'>" +
              "<a href='/like'>" +
              "<img class='flags' src='/images/like.png' height='16' width='20'>" +
              "</a>" +
            "</div>" +
            "<div style='float:right'>" +
              "<a href='/retweet'>" +
              "<img class='flags' src='/images/retweet.png' height='16' width='20'>" +
              "</a>" +
            "</div>" +
            "<div style='float:right'>" +
              "<a href='/flag'>" +
              "<img class='flags' src='/images/flag.png' height='16' width='20'>" +
              "</a>" +
            "</div>");

	return $obj;
}

function renderTweets(db){
	for(let index of db){
		let $tweet = createTweetElement(index);
		$('#tweets-container').append("<br>" + "<br>").append($tweet);
	}
}

$("form").on("submit", function( event ) {
  event.preventDefault();
  let formTweet = $(this).serialize();
  if(formTweet === "text="){
    alert("You can't tweet an empty tweet!");
    return;
  }
  else if (formTweet.length > 145){
    alert("Your tweet can't be more than 140 characters!");
    return;
  } 
  else {
    console.log(formTweet.length - 5);
    $.post("/tweets", formTweet);
  }

});

function loadTweets(){
  $.get("/tweets", function(data) {
    renderTweets(data);
  });
}

loadTweets();




















});