var selectedItem = '',
    tempSelectedId = '',
    arrItem = [], 
    wrongpoints = 0,
    match_count;

    $('#main-screen').on('click','.btn-gameLevel',function(e) { 

        if(localStorage.getItem("game-option") != '')
        {
            localStorage.removeItem('game-option');
        }

        localStorage.setItem("game-option", $(this).data('level'));


       document.location.href="board.html";
    }); 

    $('#game-screen').on('click','.btn-back',function(e) { 
      document.location.href="index.html";
    });

    $('#game-screen').on('click','.card-item',function(e) { 

            $(this).find('.card').addClass('flipped');

            arrItem.push($(this).attr('id'));

            if(tempSelectedId == $(this).attr('id')) {
              return false;
            }
            else
            {
              tempSelectedId = $(this).attr('id');
            }

            if(selectedItem == '')
            {
                selectedItem = $(this).data('value');

            }
            else{
                 if(selectedItem == $(this).data('value'))
                 {
                    arrItem = [];
                    console.log(arrItem);
                    selectedItem = '';
                    match_count -=1;

                    if(match_count == 0)
                    {
                        if(confirm('Total mistake ' + wrongpoints + '. \nDo you want to play again?'))
                        {
                            generateBoard(localStorage.getItem("game-option"));  
                        }
                    }

                 }
                 else
                 {

                    setTimeout(function() {
                 
                        $.each(arrItem, function( index, value ) {
                            console.log(value);
                            $('#'+value).find('.card').removeClass('flipped');
                        });
                       arrItem = [];
                       selectedItem = '';    

                    }, 1000);
                    
                    tempSelectedId = '';
                    wrongpoints +=1;
                 }
            }   

            console.log(wrongpoints);        

            return false;
   
    }); 

    $( document ).on( "pagebeforeshow", "#game-screen", function() {

        generateBoard(localStorage.getItem("game-option"));  
      



       
    });  

    function shuffle(array) {

          var currentIndex = array.length, temporaryValue, randomIndex ;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
    }


    function generateBoard(selectedLevel){
        
      $('#card-container').html();

      arrItem = [];
      selectedItem = '';  
      wrongpoints = 0;

      var arrCardOption = {
                            'easy':{'cardcount':'6','blockcount':'3','grid':'ui-grid-c'},
                            'moderate':{'cardcount':'12','blockcount':'4','grid':'ui-grid-c'},
                            'hard':{'cardcount':'16','blockcount':'4','grid':'ui-grid-c'},
                            'expert':{'cardcount':'20','blockcount':'5','grid':'ui-grid-d'},
                          };


       var arrCardValue = ['A','B','C','D','E','F','G','H','I','J'];

       // var selectedLevel = localStorage.getItem("game-option");
       var cardCount = arrCardOption[selectedLevel]['cardcount'];
       var maxCardValue = arrCardValue[cardCount / 2];
        
        match_count = cardCount / 2;

        var arrCard = [];
        for (i = 0; i < cardCount / 2; i++) { 
         // console.log(arrCardValue[i]);
          arrCard.push(arrCardValue[i]);
          arrCard.push(arrCardValue[i]);
        }

        var arrBlock = ['ui-block-a','ui-block-b','ui-block-c','ui-block-d','ui-block-e'];
        //var arr = ['A','A','B','B','C','C','D','D'];

        shuffle(arrCard);


        var currentBlock = 0;
        var arr_str = [];   
        
        arr_str.push('<div class="'+arrCardOption[selectedLevel]['grid']+'">'); 
//console.log(arrCardOption[selectedLevel]['blockcount']);
        $.each(arrCard, function( index, value ) {
          
          if(currentBlock >= arrCardOption[selectedLevel]['blockcount'])
          {
            currentBlock = 0;
          }
          var block = arrBlock[currentBlock];
          //console.log(block);

                    
            arr_str.push('<div class="'+block+' block-item"><div class="ui-bar ui-bar-a card-item" id="'+index+'" data-value="'+value+'"><div class="card"><div class="face front"></div><div class="face back">'+value+'</div></div></div></div>');

            currentBlock++;
        });

        arr_str.push('</div>');

        $('#card-container').html(arr_str.join(''));

    }