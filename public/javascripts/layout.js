$(document).ready(function(){

$('#LoginButton').on('click', function(){
    const email = $("#Login-Email").val();
    const password = $("#Login-Password").val();
    var data = {};
    data.email = email;	
    data.password = password;			  
    $.ajax({
        url: 'auth', 
        type: 'POST',
        data: JSON.stringify(data),
        cache: false,
        contentType: 'application/json',
                                
        success: function(data) {
            if (data === 'Invalid username or password'){
                // console.log(data);
                alert(data);
            }
            else{
                // console.log(data);
                location.reload();
            }
        },
    });
})

$('#RegisterButton').on('click', function(){
    const name = $("#Register-name").val();
    const email = $("#Register-email").val();
    const password = $("#Register-password").val();
    var data = {};
    data.name = name;
    data.email = email;	
    data.password = password;			  
    $.ajax({
        url: 'usersRegistration', 
        type: 'POST',
        data: JSON.stringify(data),
        cache: false,
        contentType: 'application/json',
                                
        success: function(data) {
            if (data === 'Already registered user'){
                alert(data);
            }
            else{
                location.reload();
            }
        },
    });
})

$('.index-filtering').on('click', function(e){

    let filter = $(this).text();
    console.log(filter);
    const page = 1;
    var data = {};
    data.filter = filter;	
    data.search_for = '';			  
    data.page = page;
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

$('#filter-search').on('click', function(e){

    const filter = $("#filter").val();
    const search_for_game = $("#search_for_game").val();
    const page = 1;
    var data = {};
    data.filter = filter;				  
    data.search_for = search_for_game; 
    data.page = page;
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

$('#button-bookings').on('click', function(e){
    console.log("Kello");
    $.ajax({
        url: 'bookings/', 
        type: 'GET',
        cache: false,
        contentType: 'application/json',
                                
        success: function(html) {
            // console.log("Success");
            console.log(html);
            $("#gameContainer").html(html);
        }
    });
    
})

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

$(document).on("click", ".page-number", function(e){
    var page = $(this).text();
    const filter = $("#filter").val();
    const search_for_game = $("#search_for_game").val();
    var data = {};
    data.filter = filter;				  
    data.search_for = search_for_game; 
    data.page = page;
    console.log(data);
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
})

$(document).on("click", ".availability", function(e){
    console.log("Hello");
    var id = $(this).attr('id');
    $.ajax({
                url: 'timeSlot/'+id, 
                type: 'GET',
                cache: false,
                contentType: 'application/json',
                                        
                success: function(html) {
                    $('#gameContainer').html(html) ;
                }
            });
})







