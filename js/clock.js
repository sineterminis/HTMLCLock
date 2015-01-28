function getTime() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  m = addZero(m);
  s = addZero(s);
  var t = h + ":" + m + ":" + s
  document.getElementById("clock").innerHTML = t;
  var l = setTimeout(function(){getTime()}, 500);
}

function addZero(d) {
  if (d < 10) {
    d = "0" + d;
  }
  return d;
}


