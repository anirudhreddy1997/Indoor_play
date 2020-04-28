$(document).ready(function(){

$('#filter-search').on('click', function(e){

    const selected_game = $("#select-filter").val();
    const search_for_game = $("#search_for_game").val();
    var data = {};
    data.game = selected_game;				  
    data.search_for = search_for_game; 
    $.ajax({
        url: 'games/', 
        type: 'POST',
        data: JSON.stringify(data),
        cache: false,
        contentType: 'application/json',
        						
        success: function(html) {
            $('#gameContainer').html(html) ;
        }
    });
});

$('#wishlist-button').on('click', function(e){
    $.ajax({
        url: 'wishlistItems/', 
        type: 'GET',
        cache: false,
        contentType: 'application/json',
                                
        success: function(html) {
            // console.log("Success");
            // console.log(html);
            $("#gameContainer").html(html);
        }
    });
    
})

})

$(document).on("click", ".trash", function(e){
    var game_name = $(this).parent().nextAll('.custom-column-content:first').find('.game-name').text();
    var data = {}
    data.game_name = game_name;
    $.ajax({
                url: 'deleteGame/', 
                type: 'POST',
                data: JSON.stringify(data),
                cache: false,
                contentType: 'application/json',
                                        
                success: function(html) {
                    // console.log('Delete clicked');
                    // console.log(html);
                    $('#gameContainer').html(html) ;
                }
            });
})

$(document).on("click", ".wishlist-trash", function(e){
    
    var game_name = $(this).parent().nextAll('.wishlist-card:first').find('.card-title').text();
    console.log(game_name);
    var data = {}
    data.game_name = game_name;
    $.ajax({
                url: 'deleteWishlist/', 
                type: 'POST',
                data: JSON.stringify(data),
                cache: false,
                contentType: 'application/json',
                                        
                success: function(html) {
                    $('#gameContainer').html(html) ;
                }
            });
})


$(document).on("click", ".wishlist", function(e){
    var game = $(this).parent().nextAll('.custom-column-content:first').find('.game-name').text();
    var data = {}
    data.game = game;
    // console.log(game);
    $.ajax({
                url: 'wishlist/', 
                type: 'POST',
                data: JSON.stringify(data),
                cache: false,
                contentType: 'application/json',
                                        
                success: function(html) {
                    alert(html);
                }
            });
})





