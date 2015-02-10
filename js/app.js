
$(document).ready(function(){
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	/*variables and functions */
  	function randNumber() { 
  		return Math.floor((Math.random() * 100)+ 1);
  	}

  	var allGuesses = [];
    var numGuess = 0;
  	var Num = randNumber();
    
    $('#userGuess').focus();
    /*------New Game Function-------------*/
    function newGame () {
      allGuesses = [];
      numGuess = 0;
      $('#guessList li').remove();
      $('#count').text(numGuess);
      Num = randNumber();
      $('#userGuess').focus();
      $('#feedback').text('A new game has been started, make your first guess!');
    }

  	/*------User Feedback Function---------*/
  	function userFeedback() {
  		var userGuess = $('#userGuess').val();
      var abThisGuess = Math.abs(userGuess - Num);
      var abPreviousGuess = Math.abs((allGuesses[numGuess - 1]) - Num);
      
  		/*check user input is correct type*/
  		if(+userGuess == NaN || +userGuess % 1 !== 0 || +userGuess > 100 || +userGuess < 1) {
        $('#feedback').text('Please enter a valid number between 1 and 100');
        
  		} else  {
  			if(+userGuess == Num) {
          $('#feedback').text('Awesome! ' + Num + ' was the answer! You won!!');
          setTimeout(newGame, 4000);
  			} else {
  				if(numGuess == 0){
  					/*first guess*/
            $('#feedback').text('Good first guess, keep going!');
            allGuesses.push(userGuess);
  				} else {
  					/*2nd guess and on*/
  					allGuesses.push(userGuess);
            
  					/*If this guess is further away than the last guess*/
  					if(abThisGuess > abPreviousGuess) {
              $('#feedback').text('You are getting colder :(');
  					} else if (abThisGuess < abPreviousGuess) {
              $('#feedback').text('You are getting warmer!!!!!!');
  					} else {
              $('#feedback').text('You are exactly the same distance from the correct number, but on the other side of the number');
  				  }
  				

  			   }
           $('#count').text(numGuess + 1);
           $('#guessList').append('<li>' + userGuess + '</li>');
           numGuess = numGuess + 1;
  		  }
        
      }


  	 }
    /*-------End User Feedback Function-------*/

  	/*run userFeedback on button press*/
  	$('#guessButton').on('click', function(event) {
      event.preventDefault();
  		userFeedback();
      $('#userGuess').val('');
      $('#userGuess').focus();
  	});
    /*run userFeedback on button enter*/
    $('#guessButton').on('keyup', function(event) {
      event.preventDefault();
      if(event.keyCode == "13") {
        userFeedback();
        $('#userGuess').val('');
      }
    });

    /*start new game when user clicks new game*/
    $('#newGame').on('click', function() {
      newGame();
    });

});


