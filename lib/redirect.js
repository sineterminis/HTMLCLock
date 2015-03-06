function redirectInit() {
    console.log("redirectInit");
    redirectLink = window.location.href;

    // strip out the token from the returned url
    var token = redirectLink.split("#");
    console.log("split token: ", token);
    var cut = token[1].indexOf("&");
    console.log("cut: ", cut);
    var token2 = token[1].substring(0, cut);
    console.log("token: ", token2);
    // strip off "access_token="
    var token3 = token2.substring(13);
    console.log("final token: ", token3);

    // store token to browser storage
    localStorage.setItem('token', token3);

    // invoke callback function in main page
    window.opener.callback_function();

    // close popup window after 2 seconds
    setTimeout(function() {
        window.close();
    }, 2000);
    
    
}
      