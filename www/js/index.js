    // $('.flip').click(function(){
    //     $(this).find('.card').addClass('flipped').mouseleave(function(){
    //         $(this).removeClass('flipped');
    //     });
    //     return false;
    // });

    // $('.card-item').click(function(){
    //     $(this).find('.card').addClass('flipped').mouseleave(function(){
    //         $(this).removeClass('flipped');
    //     });
    //     return false;
    // });    

var selectedItem = '',
    arrItem = [], 
    wrongpoints = 0,
    match_count = 4;

    $('#main-screen').on('click','.btn-gameLevel',function(e) { 

        localStorage.setItem("game-option", $(this).data('level'));
        window.location = "#game-screen";
    }); 

$( document ).on( "pagecreate", "#game-screen", function() {

    $('.card-item').click(function(){

        $(this).find('.card').addClass('flipped');

        arrItem.push($(this).attr('id'));
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
                    alert('Total mistake ' + wrongpoints);
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
           
                wrongpoints +=1;
             }
        }   

        console.log(wrongpoints);        

        return false;
    });    
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

    var arrBlock = ['ui-block-a','ui-block-b','ui-block-c','ui-block-d'];
    var arr = ['A','A','B','B','C','C','D','D'];
    shuffle(arr);


var currentBlock = 0;
    $.each(arr, function( index, value ) {
      
      if(currentBlock >= arrBlock.length)
      {
        currentBlock = 0;
      }
      var block = arrBlock[currentBlock];
      console.log(block);
        $('.card-container').append('<div class="'+block+' block-item"><div class="ui-bar ui-bar-a card-item" id="'+index+'" data-value="'+value+'"><div class="card"><div class="face front"></div><div class="face back">'+value+'</div></div></div></div>');
        currentBlock++;
    });