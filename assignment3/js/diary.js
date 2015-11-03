$(document).ready(function() {
  showEntries();
  addAttr();
});

$(document).bind('mobileinit',function(){
    $.mobile.changePage.defaults.changeHash = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});

function addAttr(){
  var add = document.getElementsByTagName("ARTICLE");
  var section = document.getElementsByTagName("SECTION");
  $(add).attr("data-role", "collapsible");
  $(section).attr("data-role", "collapsibleset");
}

    function showEntries () {
        var data = localStorage.getItem("data");
        if (!data) {
            data = [
                "<p>There are currently no entries in this diary, but go ahead and add one — it will be AWESOME!!!</p>"
            ];
        }
        else {
            data = JSON.parse(data);
        }
        var $posts = $("#entries");
        $posts.empty();
        $.each(data, function (i, post) {
            $posts.append($("<article class='post'></article>").append($(post)));
        });
    }

    function addEntry (subject, body) {
        var data = localStorage.getItem("data");
        if (data) data = JSON.parse(data);
        else data = [];
        body = body.replace(/\n/g, "<br/>");
        var $cont = $("<div></div>");
        $("<h2></h2>").text(subject).appendTo($cont);
        $("<div class='date'></div>").text((new Date).toLocaleString()).appendTo($cont);
        $("<p></p>").html(body).appendTo($cont);
        data.unshift($cont.html());
        localStorage.setItem("data", JSON.stringify(data));
    }

   $(document).on('click', '#add-entry-button', function(e) {
        $("#add-text").css("display", "block").find("input").focus();
    });
    $(document).on('click', '#okButton', function(e) {
        var subject = $("#subject").val();
	var body = $("#textarea").val();
        if (!subject) {
            $("#errorSubject").css("display", "block");
	    $("#add-text").css("display", "block").find("input").focus();
        }
        if (!body) {
            $("#errorBody").css("display", "block");
	    $("#add-text").css("display", "block").find("textarea").focus();
        }
        if (subject && body) {
          addEntry(subject, body);
          cancelEdit();
          showEntries();
	}
    });
    $(document).on('click', '#cancelButton', function(e) {
        $("#add-text").hide();
    });
