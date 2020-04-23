$(document).ready(function(){
$('#adults').on('click', function(e){
    $("#dropdownMenuButton").html("Adults");
    var data = {};
    data.game = "Adults";				   
    $.ajax({
        url: 'games/', 
        type: 'POST',
        data: JSON.stringify(data),
        cache: false,
        contentType: 'application/json',
        						
        success: function(html) {
            console.log(html);
            $('#gameContainer').html(html) ;
        }
    });
});

})