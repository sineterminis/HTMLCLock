
function getTemp() {
    var url = "https://api.forecast.io/forecast/a6277e301335db93d68d05955844979f/-33.8674870,151.2069900?callback=?";

    $.ajax({
        url: url,
        dataType: 'json',
        success: function(response) {
            $( '#forecastLabel' ).html(response.daily.summary);
            $('#forecastIcon').attr("src","img/"+response.daily.icon+".png");
            //alert("temp max: " + response.daily.temperatureMax);
            //alert("current temp: " + response.currently.temperature);
            /*
            NOTE: response.daily.temperatureMax was returing undefined, therefore used current temp
            */
            var temp = response.currently.temperature;
            if (temp < 60)
                $( "body" ).addClass("cold");
            if (temp >=60)
                $( "body" ).addClass("chilly");
            if (temp >=70)
                $( "body" ).addClass("nice");            
            if (temp >=80)
                $( "body" ).addClass("warm");
            if (temp >=90)
                $( "body" ).addClass("hot");            
        }
   });
   
  
}    
