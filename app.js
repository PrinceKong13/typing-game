let lastKeyPress;

//Hides the uppercase keyboard
$("#keyboard-upper-container").css("display", "none");

//Displays the uppercase keyboard on pressing shift and hides the lower case one
$(document).keydown(function (event) {
  if (event.which == 16) {
    $("#keyboard-upper-container").css("display", "");
    $("#keyboard-lower-container").css("display", "none");
  }
});

//Hides the upper case keyboard once shift is released and returns the lower case one. Also returns keys to their original color when released
$(document).keyup(function (event) {
  if (event.which == 16) {
    $("#keyboard-upper-container").css("display", "none");
    $("#keyboard-lower-container").css("display", "");
  }
  $("#" + lastKeyPress).css("backgroundColor", "");
});

$(document).keypress(function (event) {
  lastKeyPress = event.which;
  $("#" + lastKeyPress).css("backgroundColor", "gray");
});
