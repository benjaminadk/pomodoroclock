$(document).ready(function(){
  //open modal on load  
  $('#modal1').modal();
  $('#modal1').modal('open');
  //$('.modal-trigger').leanModal();

  //declare variables
    //work variables
  var displaySecW;
  var displayMinW;
  var clickWorkTime;
  var workTime;
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
  //audio for fun
  var audio = new Audio('https://www.myinstants.com/media/sounds/dramatic-end.mp3');
  var intro = new Audio('https://www.myinstants.com/media/sounds/zelda_theme_snes-cut-mp3.mp3');
  var outro = new Audio('https://www.myinstants.com/media/sounds/ffxiv_level_up.mp3');
  //function to run when work session expires
  
  function switchTime(){
    clickBreakTime = setInterval(timerB,1000);
    
    function timerB(){
    breakTime -= 1;
    displayMinB = Math.floor(breakTime/60);
    displaySecB = (breakTime%60);
    
    if (displaySecB === 0 && displayMinB === 0){
            //when break is over
        clearInterval(clickBreakTime);
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
        outro.play();
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
  $(document).on('change', '#setWorkTime', function(){
    $startButton.removeClass('disabled');

    workTime = ($(this).val()*60);
    initDisplayW = ($(this).val());
   
   $clockDisplay.html(initDisplayW + " Minute Work Session");
  
  
  //listen for start button

  $startButton.on('click',function(){
   intro.play();
   clearInterval(clickWorkTime);
   $bigH.addClass('bighand');
   $midH.addClass('midhand');
   $smallH.addClass('smallhand');
    //toggle buttons and inputs
  
  $('#setWorkTime').prop('disabled',true);
  $startButton.addClass('disabled');
  $resetButton.removeClass('disabled');
  $pauseButton.removeClass('disabled');
 //setup timer
  
  clickWorkTime = setInterval(timer, 1000);
 
  //timing function
  
  function timer(){
    workTime -= 1;
    displayMinW = Math.floor(workTime/60);
    displaySecW = (workTime%60);
    console.log(workTime);
    //logic for the clock
    //when time runs out
    if (displaySecW === 0 && displayMinW === 0){
      //should do something cool here like play a sound or graphics...
         audio.play();
         $clockDisplay.html("Break Time");
         $bigWork.html('');
         clearInterval(clickWorkTime);
         $outerClock.addClass('ring');

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
      $('#setWorkTime').prop('disabled',false);
      workTime = ($('#setWorkTime').val()*60);
      $bigH.removeClass('bighand');
      $midH.removeClass('midhand');
      $smallH.removeClass('smallhand');
      $bigBreak.html('');
      $bigWork.html('');
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