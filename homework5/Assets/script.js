const time = moment();
var $timeEl = $("#currentDay");
var $todoList = $(".container");
var $button = $("<button>");
var $li = $("<input>");
var input = [];
var currentHour = time.format("h:mm");
$timeEl.text(time.format("dddd MMMM D YYYY"));
console.log(currentHour);

function renderTodos() {
    $todoList.text = "";
    for (var i = 1; i <= 24; i++) {
        var $hourDiv = createHourTodoItem(i);
        $todoList.append($hourDiv);
    }
}
renderTodos();

function createHourTodoItem(hour) {
    var $newDiv = $("<div>");
    $newDiv.attr("id", hour);
    var $button = createButton();
    var $li = createTextInput(hour);
    const $timeLabel = createTimeLabel(hour);
    $newDiv.append($timeLabel);
    $newDiv.append($li);
    $newDiv.append($button);
    return $newDiv;
}

function createTextInput(hour) {
    var $li = $("<input>");
    const color = getColor(hour);
    $li.css("background", color);
    $li.attr("type", "text");
    if (localStorage.getItem("" + hour) != null) {
        $li.attr("value", localStorage.getItem("" + hour));
    }
    return $li;
}

function createButton() {
    var $button = $("<button>");
    $button.attr("class", "btnSubmit");
    $button.text("Save");
    return $button;
}

function createTimeLabel(hour) {
    const label = $("<p>");
    const readableTime = getReadableTime(hour);
    label.css("margin-top", "10px");
    label.text(readableTime);
    return label;
}

function getReadableTime(hour) {
    const hourMoment = moment();
    hourMoment.set("hour", hour);
    return hourMoment.format("h:00 A");
}

function getColor(hour) {
    const currentHour = time.hour();
    if (currentHour < hour) {
        return "red";
    } else if (currentHour === hour) {
        return "green";
    } else {
        return "gray";
    }
}


// var storedInput = JSON.parse(localStorage.setItem("input", JSON.stringify(input)));
$(".btnSubmit").on("click", function(event) {
    event.preventDefault();
    var hour = $(this).parent().attr("id");
    var $inputText = $(this).parent().find("input")[0].value;
    localStorage.setItem(hour, $inputText);
});