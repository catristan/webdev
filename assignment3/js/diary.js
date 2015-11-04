$(document).ready(function() {
  showEntries();
});

    function showEntries() {
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
            $posts.append($("<article class='post'" + "key=" + i  + ">"  + "</article>").append($(post)));
        });
    }

    function addEntry (subject, body) {
        var data = localStorage.getItem("data");
        if (data) data = JSON.parse(data);
        else data = [];
        body = body.replace(/\n/g, "<br/>");
        var $cont = $("<div></div>");
        $("<h2></h2>").text(subject).appendTo($cont);
        $("<button class='delete'>Delete</button>").appendTo($cont);
        $("<div class='date'></div>").text((new Date).toLocaleString()).appendTo($cont);
        $("<p></p>").html(body).appendTo($cont);
        data.unshift($cont.html());
        localStorage.setItem("data", JSON.stringify(data));
    }


  $(document).on('click', '.delete', function(e){
    var element = $(e.target).closest('article');
    var key = element.attr("key");
    var data = JSON.parse(localStorage.getItem("data"));
    data.splice(key, 1);
    localStorage.setItem("data", JSON.stringify(data));
    element.remove();
  });

   $(document).on('click', '#add-entry-button', function(e) {
        $("#wrapper").removeClass("ui-screen-hidden");
    });

    $(document).on('click', '#ok-button', function(e) {
        var subject = $("#subject").val();
	var body = $("#textarea").val();
        if (!subject) {
            $("#errorSubject").css("display", "block");  
	    return false;
        }
        else if (!body) {
            $("#errorBody").css("display", "block");
	    return false;
        }
        else {
          addEntry(subject, body);
          showEntries();
	}
    });

    $(document).on('click', '#cancel-button', function(e) {
        $("#wrapper").addClass('ui-screen-hidden');
    });
