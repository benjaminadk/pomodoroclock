$(document).ready(function(){
  //open modal on load  
  //$('#modal1').modal();
  //$('#modal1').modal('open');
 // $('.modal-trigger').leanModal();
  
  //made these because i couldn't figure out jquery syntax
  //for making sure these values were greater than 0
  //this turns play button on later...a or b.value is simpler 
  //i use these in change listener for worktime but leave the
  //jquery syntax for the break listener a good way to compare
  //while it is longer here...the actual code that does something
  //looks a lot cleaner in regular javascript syntax
  var a = document.getElementById("setWorkTime");
  var b = document.getElementById("setBreakTime");
  //declare variables
    //work variables
  var displaySecW;
  var displayMinW;
  var setWorkTime; 
  var workTime;
  var clickWorkTime;
  var initDisplayW;
    //break variables
  var displaySecB;
  var displayMinB;
  var breakTime;
  var setBreakTime;
  var initDisplayB;
  var clickBreakTime;
 //jquery variables to cut down on queries
  var $startButton = $('#startButton');
  var $clockDisplay = $('#clockDisplay');
  var $breakDisplay = $('#breakDisplay');
  var $pauseButton = $('#pauseButton');
  var $resetButton = $('#resetButton');
  var $bigWork = $('.bigwork');
  var $bigBreak = $('.bigbreak');
   //clock variables
  var $outerClock = $('#outerClock');
  var $bigH = $('#bigH');
  var $midH = $('#midH');
  var $smallH = $('#smallH');
  //define progress ball
  var progBall = document.getElementById('progress');
  console.log(progBall);
  var $progBall = $("progress");
  //audio for fun
  var audio = new Audio('https://www.myinstants.com/media/sounds/dramatic-end.mp3');
  var intro = new Audio('https://www.myinstants.com/media/sounds/zelda_theme_snes-cut-mp3.mp3');
  var outro = new Audio('https://www.myinstants.com/media/sounds/ffxiv_level_up.mp3');
  //function to run when work session expires
  
  function switchTime(){
    clickBreakTime = setInterval(timerB,1000);
    
    function timerB(){
    //decreases breakTime by 1 every 1000 milliseconds aka 1 second
    breakTime -= 1;
    //uses built in math functions to convert raw seconds into minutes and seconds
    displayMinB = Math.floor(breakTime/60);
    displaySecB = (breakTime%60);
    //set the progress ball equal to the break time and start to decrease by 1/sec
    $progBall.removeClass("workStyle");
    $progBall.addClass("breakStyle");
    progBall.max = b.value * 60;
    progBall.value -= 1;
  
    //conditional for when break time runs out 
    if (displaySecB === 0 && displayMinB === 0){
       //when break is over we stop the timer function
        clearInterval(clickBreakTime);
      //clear the big display of break time and stop the clock hand animations
      //the goal is to bring everything back to original state
        $startButton.removeClass('disabled');
        $bigBreak.html('');
        $bigH.removeClass('bighand');
        $midH.removeClass('midhand');
        $smallH.removeClass('smallhand');
        $outerClock.removeClass('ring');
        $outerClock.addClass('rung');
        $clockDisplay.html('Work Session');
        $breakDisplay.html('Break Session');
        $startButton.addClass('disabled');
        $pauseButton.addClass('disabled');
        $progBall.addClass("shrink2");
        //outro.play();
    } 
    else if (displaySecB >= 10){
      $bigBreak.html(displayMinB + ' : ' + displaySecB);
        }
      //the final ten seconds
    else if (displaySecB < 10 && displayMinB === 0){
     $bigBreak.html(' : ' + displaySecB);
    }
      //for when seconds are less then ten and minutes greater than 0
    else{
      $bigBreak.html(displayMinB + ' : 0' + displaySecB);
    }
    }//end of timerB
  } //end of switch funtion
  
  //when user moves slider
  $(document).on('change', a, function(){
    if(a.value > 0 && b.value > 0){
    $startButton.removeClass('disabled');}
    workTime = a.value*60;
    initDisplayW = a.value;
   // workTime = ($(this).val()*60);
   // initDisplayW = ($(this).val());
   
    //set progressball max to equal worktime seconds so 
   //we can increase value of ball by 1 per second
    $progBall.removeClass("breakStyle");
    $progBall.addClass("workStyle");
    progBall.max = workTime;
    
   $clockDisplay.html(initDisplayW + " Minute Work Session");
  
  
  //listen for start button

  $startButton.on('click',function(){
   //legend of zelda plays
   // intro.play();
   //stops any previous timers
    clearInterval(clickWorkTime);
  //sets clock hand animations to go
   $bigH.addClass('bighand');
   $midH.addClass('midhand');
   $smallH.addClass('smallhand');
    //toggle buttons and inputs
  $('#setBreakTime').prop('disabled',true);
  $('#setWorkTime').prop('disabled',true);
  $startButton.addClass('disabled');
  $resetButton.removeClass('disabled');
  $pauseButton.removeClass('disabled');
 //setup timer
  
  clickWorkTime = setInterval(timer, 1000);
 
  //timing function
  
  function timer(){
    //countdown 1 every 1000 milliseconds aka 1 second
    workTime -= 1;
    //gets our minutes and seconds with built in math
    displayMinW = Math.floor(workTime/60);
    displaySecW = (workTime%60);
    //set our ball fill in motion
    progBall.value += 1;
    //logic for the clock
    //when time runs out
    if (displaySecW === 0 && displayMinW === 0){
      //should do something cool here like play a sound or graphics...
        // audio.play();
         $clockDisplay.html("Break Time");
         $bigWork.html('');
         clearInterval(clickWorkTime);
        //animates the clock's outer ring
         $outerClock.addClass('ring');
         $progBall.addClass('shrink');
      //call breakTime
         switchTime();
    }
      //when seconds is greater than ten normal display
    else if (displaySecW >= 10){
      $bigWork.html(displayMinW + ' : ' + displaySecW);
        }
      //the final ten seconds
    else if (displaySecW < 10 && displayMinW === 0){
     $bigWork.html(' : ' + displaySecW);
    }
      //for when seconds are less then ten and minutes greater than 0
    else{
      $bigWork.html(displayMinW + ' : 0' + displaySecW);
    }
  }  //end timer function
    
    //pause button
    
    $pauseButton.on('click', function(){
         intro.pause();
        //timer and buttons
        clearInterval(clickBreakTime);
        clearInterval(clickWorkTime);
        $startButton.removeClass('disabled');
        $pauseButton.addClass('disabled');
        
      //clock
       $bigH.removeClass('bighand');
       $midH.removeClass('midhand');
       $smallH.removeClass('smallhand');
      });
    
    //reset button user must user slider
    
    $resetButton.on('click', function(){
      clearInterval(clickBreakTime);
      clearInterval(clickWorkTime);
      $breakDisplay.html("Break Session");
      $clockDisplay.html("Work Session");
      //user has to interact there is no default yet
      $pauseButton.addClass('disabled');
      $resetButton.addClass('disabled');
      $('#setBreakTime').prop('disabled',false);
      $('#setWorkTime').prop('disabled',false);
      workTime = ($('#setWorkTime').val()*60);
      $bigH.removeClass('bighand');
      $midH.removeClass('midhand');
      $smallH.removeClass('smallhand');
      $outerClock.removeClass('ring');
      $outerClock.removeClass('rung');
      progBall.value = 0;
      $progBall.removeClass('shrink');
      $progBall.removeClass('shrink2');
      $bigBreak.html('');
      $bigWork.html('');
      a.value = 0;
      b.value = 0;
    });
    
    //end of start button click
    });
  
//end of change in work slider
});
  $(document).on('change', '#setBreakTime', function(){
   
    breakTime = ($(this).val()*60);
    initDisplayB = ($(this).val());
   
   $breakDisplay.html(initDisplayB + " Minute Break");
  }); //end break slider change 

   
     

});//doc ready