/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

function createTweetElement(twee) {

	let $obj = $("<article>").addClass("feed");

  //Top of a tweet box with avater, username, and tweeter handle.
	$("<header class='tweetop'>").appendTo($obj)
	.append("<img class='username' src=" + twee.user.avatars.small + " height='50' width='50' >")
	.append("<h2 class='userinfo'>" + twee.user.name + "</h2>")
	.append("<p class='usertag'>" + twee.user.handle + "</p>");

  //Main body of a tweet box that includes the tweet.
	$("<div class='tweebod'>").appendTo($obj)
	.append($("<p class='tweetbody'>").text(twee.content.text));

  //Footer of tweetbox with creation date in days and three buttons
	$("<footer class='tweetfoot'>").appendTo($obj)
	.append("<hr class='tweetfoot'>")
	.append("<p class='tweetfoot'>" + Math.floor((Date.now() - twee.created_at)/86400000) + " Days Ago" + "</p>")
	.append("<div style='float:right; margin-right: 5px'>" +
              "<a href='#' >" +
              "<img class='flags' id='likeButton' src='/images/like.png' height='16' width='20'>" +
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

//function that goes through all tweets in MongoDB and adds them chronologically
function renderTweets(db){
	for(let i = 0; i < db.length; i++){
		let $tweet = createTweetElement(db[i]);
		$('#tweets-container').prepend($tweet).prepend("<br>");
	}
}

//function that loads tweeter feed upon loading page
function loadTweets(){
  $.get("/tweets", function(data) {
    renderTweets(data);
  });
}

loadTweets();

//Functionality upon submiting a new tweet.

$("form").on("submit", function( event ) {
  event.preventDefault();
  let formTweet = $(this).serialize();
    
  //function that adds the user's tweet to the top of the feed. 
  function addLastTweet(data){
    $.get("/tweets", function(data) {
      let $newTweet = createTweetElement(data[data.length - 1]);
      $("#tweets-container").prepend($newTweet).prepend("<br>");
    });
  }

  //verifies that user is not trying to submit an empty tweet
  if(formTweet === "text="){
    alert("You can't tweet an empty tweet!");
    return;
  }
  //verifies that the tweet isn't longer than 140 characters
  else if (formTweet.length > 145){
    alert("Your tweet can't be more than 140 characters!");
    return;
  } 
  else {

    //ajax request to add tweet to MongoDB
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formTweet
      })
    .done(function () {
      addLastTweet();
    }
    );

    $("form")[0].reset(); //reset compose tweet form to default
    $(".counter").text("140");  //reset character counter to 140
  
  }
});

//clicking on the compose button in nav bar will toggle the compose tweet box
$(".composeButton").click(function() {
  $(".new-tweet").slideToggle( "slow", function() {
    $("#new-tweet").select();
  });
});

});