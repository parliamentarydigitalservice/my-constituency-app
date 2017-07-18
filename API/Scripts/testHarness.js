function testInit(basePath) {
    var refreshFeeds = function() {
        $.ajax({
            type: "GET",
            url: basePath + "api/Data",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                $("textarea#output").text(JSON.stringify(data));

                var datasetSelect = $("select#dataset");
                datasetSelect.find("option").remove();
                $.each(data.feeds, function (i) {
                    datasetSelect.append($("<option></option>")
                        .attr("value", this.Name)
                        .text(this.Name));
                });
            },
            error: function(msg) {
                alert("api error: " + msg);
            }
        });
    };
    refreshFeeds();
    
    $("div.commands").on("click", "button#discover", refreshFeeds);
    $("div.commands").on("click", "button#query", function () {
        $.ajax({
            type: "POST",
            url: basePath + "api/Data/" + $("select#dataset").val(),
            data: $("textarea#input").val(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $("textarea#output").text(JSON.stringify(data));
            },
            error: function (msg) {
                alert("api error: " + msg);
            }
        });
    });
}
