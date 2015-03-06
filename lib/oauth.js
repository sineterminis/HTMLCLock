var clientID;
var responseType;
var callbackFunc;

function init(inputJSON) {
    console.log("init");

    clientID = inputJSON.client_id;
    responseType = inputJSON.responseType;
    callbackFunc = inputJSON.callback;

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