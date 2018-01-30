/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};



function createTweetElement(twee) {

	var $obj = $("<article>").addClass("feed");

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



var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append("<br>" + "<br>").append($tweet);


});