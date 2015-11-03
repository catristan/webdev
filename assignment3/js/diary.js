
(function (exports, $) {
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
        var $posts = $(".entries");
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

    exports.addTxt = function () {
        $("#add-text").css("display", "block").find("input").focus();
    };
    exports.addEntryButton = function () {
        var subject = $("#add-text input").val();
        if (!subject) {
            alert("Subject is required");
            return;
        }
        var body = $("#add-text textarea").val();
        if (!body) {
            alert("Body is required");
            return;
        }
        addEntry(subject, body);
        exports.cancelEdit();
        showEntries();
    };
    exports.cancelEdit = function () {
        $("#add-text input").val("");
        $("#add-text textarea").val("");
        $("#add-text").hide();
    };
    
    $(showEntries);
})(window, jQuery);
