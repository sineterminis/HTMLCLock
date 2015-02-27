function start() {
    getTemp();
    //getAllAlarms();
}

function getTemp() {
    var url = "https://api.forecast.io/forecast/a6277e301335db93d68d05955844979f/-33.8674870,151.2069900?callback=?";

    $.ajax({
        url: url,
        dataType: 'json',
        success: function(response) {
            $( '#forecastLabel' ).html(response.daily.summary);
            $('#forecastIcon').attr("src","img/"+response.daily.icon+".png");
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

var g_userID;
function getAllAlarms(userId) {
    g_userID = userId;
    Parse.initialize("OVhbvBqf5heRgl1rjOiyJlVx60pvulpe8mrvKzeI","0NgvrXuZgZrrpijc6gYsTa8fUTcPIQXsAy1hiaHH");
    
    var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    
    query.equalTo("user", userId); 
    query.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) { 
            console.log( results[i].get("time"));
            insertAlarm(results[i].get("hours"),results[i].get("mins"), results[i].get("ampm"), results[i].get("alarmName"));
          }
        }
    });   
}

function showAlarmPopup() {
    $( "#mask" ).removeClass();
    $( "#popup" ).removeClass();
} 

function hideAlarmPopup() {
    $( "#mask" ).addClass("hide");
    $( "#popup" ).addClass("hide");
} 

function insertAlarm(hours, mins, ampm, alarmName) {
    var a = $("<div>").addClass("flexable");
    var b = $("<div> </div>").addClass("name").html(alarmName);
    var c = $("<div> </div>").addClass("time").html(hours + ":" + mins + ":" + ampm);
    a.append(b,c);
    $("#alarms").append(a);
} 

function addAlarm() {
    ga('send', 'event', 'Alarm', 'Add');

    var hours = $("#hours option:selected").text();
    var mins = $("#mins option:selected").text();
    var ampm = $("#ampm option:selected").text();
    var alarmName = $("#alarmName").val();
    
    var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
      alarmObject.save({"user" : g_userID, "hours": hours, "mins" : mins, "ampm" : ampm, "alarmName": alarmName}, {
      success: function(object) {
        insertAlarm(hours, mins, ampm, alarmName);
        hideAlarmPopup();
      }
    });  
}


function deleteAlarm() {
    ga('send', 'event', 'Alarm', 'Delete');
    
    var name = window.prompt("enter name of alarm to delete", "alarm name");
    
    Parse.initialize("OVhbvBqf5heRgl1rjOiyJlVx60pvulpe8mrvKzeI","0NgvrXuZgZrrpijc6gYsTa8fUTcPIQXsAy1hiaHH");
    
    var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    
    query.equalTo("alarmName", name);   
    query.find({
        success: function(results) {
            for (var i = 0; i < results.length; i++) { 
                var object = results[i];
                object.destroy();
            }
        },
        error : function(err) {
            window.alert(err.message);
        }
    });
   
    setTimeout(function() {     
        location.reload(true);
    }, 200);
 
}


