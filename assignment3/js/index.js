$(document).ready(function(){
  addAttr();
});

$(document).bind('mobileinit',function(){
    $.mobile.changePage.defaults.changeHash = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
    $.mobile.changePage.allowSamePageTransition = true;
    $.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
});

function addAttr(){
  var add = document.getElementsByTagName("ARTICLE");
  var section = document.getElementsByTagName("SECTION");
  $(add).attr("data-role", "collapsible");
  $(section).attr("data-role", "collapsibleset");
}
