function redirectInit() {
    console.log("redirectInit");

    // First, parse the query string
    var params = {}, queryString = location.hash.substring(1),
        regex = /([^&=]+)=([^&]*)/g, m;
    while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    // store token to browser storage
    localStorage.setItem('token', params['access_token']);

    if (params['error']) {
        console.log("error: ", params['error']);
    } else {
        // invoke callback function in main page
        window.opener.callback_function();
    }

    // close popup window after 2 seconds
    setTimeout(function() {
        window.close();
    }, 2000);
}
      