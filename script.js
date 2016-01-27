$(document).ready(function(){
	
	$(".js-form").on("submit",function(event){
    	event.preventDefault();

	 	$.ajax({
		  	type: 'GET',
		  	url: 'https://api.spotify.com/v1/search?type=track&query=' + $(".js-input").val(),
		 	success: function(response){
		      	console.log(response);
		        showInfoTrack(response);		
		    },
		    error: function(){ 
		    	console.log("Ohhhhhh");
		    }
	  	});
	});

	function showInfoTrack(response){
		$(".title").html(response.tracks.items[0].name);
		$(".author").html(response.tracks.items[0].artists[0].name);
		$("img").attr("src", response.tracks.items[0].album.images[0].url);
		$("audio").attr("src", response.tracks.items[0].preview_url);	
		$(".btn-play").removeClass("playing");
	}

	$(".btn-play").click(function(){
		$(".btn-play").toggleClass("playing");

		$(".btn-play").hasClass("playing") 
			? $('.js-player').trigger('play') 
			: $('.js-player').trigger('pause');
	}); 


	// Define a function to print the player's current time
	function printTime () {
	  
	  var current = $('.js-player').prop('currentTime');
	  console.debug('Current time: ' + current); 

	}

	// Have printTime be called when the time is updated
	$('.js-player').on('timeupdate', printTime);


		
	
});	