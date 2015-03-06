var clientID;
var responseType;
var callbackFunc;

function init(inputJSON) {
    console.log("init");

    clientID = "a6d75f422f47821";
    responseType = "token";
    callbackFunc = "callback_function";

    console.log("id: ", clientID, " type: ", responseType, " callback function: ", callbackFunc);
}

function login() {
    console.log("login");

    //initiate oauth
    var url = "https://api.imgur.com/oauth2/authorize?client_id=" + clientID + 
              "&response_type=" + responseType + "&state=" + callbackFunc;
    
    // pop up window for oauth
    var myWindow = window.open(url,"mywindow", 
                                "location=1,status=1,scrollbars=1, width=600,height=480");
}