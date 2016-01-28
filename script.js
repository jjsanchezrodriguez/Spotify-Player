$(document).ready(function(){

	var currentArtist;

	$(".js-form").on("submit",function(event){
    	event.preventDefault();

	 	$.ajax({
		  	type: 'GET',
		  	url: 'https://api.spotify.com/v1/search?type=track&query=' + $(".js-input").val(),
		 	success: function(response){
		        showInfoTrack(response);
		    },
		    error: function(){ 
		    	console.log("Ohhhhhh");
		    }
	  	});
	});


	function showInfoTrack(response){
		currentArtist=response.tracks.items[0].artists[0].id;
		$(".title").html(response.tracks.items[0].name);
		$(".author").html('<a id="artistInfo" data-toggle="modal" href="#myModal">' 
    	+ response.tracks.items[0].artists[0].name + '</a>');
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


	function printTime () {
	  var current = $('.js-player').prop('currentTime');
	  
	  $("progress").attr("value", current);

	  if(current >= $("progress").attr("max")){
	  	$(".btn-play").removeClass("playing");
	  	$('.js-player').trigger('stop') 
	  }	
	}

	$('.js-player').on('timeupdate', printTime);

	$(".author").on("click",function(event){
    	event.preventDefault();
	 	$.ajax({
		  	type: 'GET',
		  	url: 'https://api.spotify.com/v1/artists/' + currentArtist,
		 	success: function(response){
		      	showArtist(response);
		    },
		    error: function(){ 
		    	console.log("Ohhhhhh");
		    }
	  	});
	});

	function showArtist(response){
		$('.modal-body').html('');
		$('.modal-body').append('<h4> Name: '  + response.name + '</h4>');
		$('.modal-body').append('<h4> Followers: '  + response.followers.total + '</h4>');	
	}


});	