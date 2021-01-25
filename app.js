$(document).ready(function () {
  let number;

  document.addEventListener("keyup", keyPush);

  $("#input-field").bind("input propertychange", function () {
    number = $(this).val();
  });

  $("#submit-button").click(function () {
    checkInput();
  });

  function keyPush(evt) {
    switch (evt.keyCode) {
      case 13:
        checkInput();
    }
  }

  function checkInput() {
    if (isNumeric(number)) {
      numberToText();
    } else {
      $("#number-text").html("Skriv in ett nummer");
    }
  }

  function isNumeric(str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  }

  function digitAsText(input) {
    console.log(`input: ${input}`);
    input = parseInt(input);
    switch (input) {
      case 0:
        return "noll";
      case 1:
        return "ett";
      case 2:
        return "två";
      case 3:
        return "tre";
      case 4:
        return "fyra";
      case 5:
        return "fem";
      case 6:
        return "sex";
      case 7:
        return "sju";
      case 8:
        return "åtta";
      case 9:
        return "nio";
      case 10:
        return "tio";
      case 11:
        return "elva";
      case 12:
        return "tolv";
      case 13:
        return "tretton";
      case 14:
        return "fjorton";
      case 15:
        return "femton";
      case 16:
        return "sexton";
      case 17:
        return "sjutton";
      case 18:
        return "arton";
      case 19:
        return "nitton";
    }
  }

  function tenAsText(input) {
    console.log(`input: ${input}`);
    input = parseInt(input);
    switch (input) {
      case 20:
        return "tjugo";
      case 30:
        return "trettio";
      case 40:
        return "fyrtio";
      case 50:
        return "femtio";
      case 60:
        return "sextio";
      case 70:
        return "sjuttio";
      case 80:
        return "åttio";
      case 90:
        return "nittio";
    }
  }

  function numberToText() {
    let text = "";
    let intNumber = parseInt(number);

    // loop
    /*     for (let i = 0; i < number.length; ++i) {
      text += digitAsText(number.charAt(i)) + " ";
    } */

    // reverse loop
    /*     for (let i = number.length - 1; i > -1; --i) {
      text += digitAsText(number.charAt(i)) + " ";
    }
 */

    if (parseInt(number) < 20) {
      text = digitAsText(number);
    } else {
      let stack = [];

      if (number.charAt(number.length - 1) != 0) {
        stack.push(digitAsText(number.charAt(number.length - 1)));
      }
      intNumber = parseInt(number) - parseInt(number.charAt(number.length - 1));
      stack.push(tenAsText(intNumber));

      while (stack.length !== 0) {
        text += stack.pop();
      }
    }

    $("#number-text").html(text);
  }
});
