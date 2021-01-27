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

  function prefix(number) {
    n = parseInt(number.length - 1);

    let output = ` ${digitAsText(number.charAt(0))} `;
    switch (n) {
      case 2:
        output += "hundra";
        break;
      case 3:
        output += "tusen";
        break;
      case 6:
        if (number.charAt(0) === "1") {
          output += "miljon";
        } else {
          output += "miljoner";
        }
        break;
      case 9:
        if (number.charAt(0) === "1") {
          output += "miljard";
        } else {
          output += "miljarder";
        }
        break;
    }
    return `${output} `;
  }

  function numberToText() {
    let text = "";
    let intNumber;

    // loop
    /*     for (let i = 0; i < number.length; ++i) {
      text += digitAsText(number.charAt(i)) + " ";
    } */

    // reverse loop
    /*     for (let i = number.length - 1; i > -1; --i) {
      text += digitAsText(number.charAt(i)) + " ";
    }
 */

    /* var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety']; */

    /* function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}

document.getElementById('number').onkeyup = function () {
    document.getElementById('words').innerHTML = inWords(document.getElementById('number').value);
};
 */

    const th_val = ["", "tusen", "miljoner", "miljarder", "biljoner", "biljarder", "triljoner", "triljarder", "kvadriljoner"];

    const dg_val = [
      "noll",
      "ett",
      "två",
      "tre",
      "fyra",
      "fem",
      "sex",
      "sju",
      "åtta",
      "nio",
    ];
    const tn_val = [
      "tio",
      "elva",
      "tolv",
      "tretton",
      "fjorton",
      "femton",
      "sexton",
      "sjutton",
      "arton",
      "nitton",
    ];
    const tw_val = [
      "tjugo",
      "trettio",
      "fyrtio",
      "femtio",
      "sextio",
      "sjuttio",
      "åttio",
      "nittio",
    ];
    function toWordsconver(s) {
      // s = s.toString();
      // s = s.replace(/[\, ]/g, "");
      // if (s != parseFloat(s)) return "not a number ";
      let x_val = s.indexOf(".");
      if (x_val == -1) x_val = s.length;
      if (x_val > 25) return "för stort :(";
      const n_val = s.split("");
      let str_val = "";
      let sk_val = 0;
      for (let i = 0; i < x_val; i++) {
        if ((x_val - i) % 3 == 2) {
          if (n_val[i] == "1") {
            str_val += tn_val[Number(n_val[i + 1])] + " ";
            i++;
            sk_val = 1;
          } else if (n_val[i] != 0) {
            str_val += tw_val[n_val[i] - 2] + " ";
            sk_val = 1;
          }
        } else if (n_val[i] != 0) {
          str_val += dg_val[n_val[i]] + " ";
          if ((x_val - i) % 3 == 0) str_val += "hundra ";
          sk_val = 1;
        }
        if ((x_val - i) % 3 == 1) {
          if (sk_val) str_val += th_val[(x_val - i - 1) / 3] + " ";
          sk_val = 0;
        }
      }
      if (x_val != s.length) {
        const y_val = s.length;
        str_val += "komma ";
        for (let i = x_val + 1; i < y_val; i++)
          str_val += dg_val[n_val[i]] + " ";
      }

      str_val = str_val.replace(/ett miljoner/g, 'en miljon');
      str_val = str_val.replace(/ett miljarder/g, 'en miljard');
      str_val = str_val.replace(/ett biljoner/g, 'en biljon');
      str_val = str_val.replace(/ett biljarder/g, 'en biljard');
      str_val = str_val.replace(/ett triljoner/g, 'en triljard');
      str_val = str_val.replace(/ett triljarder/g, 'en triljard');
      str_val = str_val.replace(/ett kvadriljoner/g, 'en kvadriljon');

      return str_val.replace(/\s+/g, " ");
    }

    text = toWordsconver(number);

    // use modulo

    // number = "1234"
    // mindre än 21? nej.
    // lägger "fyra" i stack
    // ändrar number till "1230"
    // är 3 === 0? nej.
    // lägger till "trettio" i stack
    // ändrar number till "1200"
    // är 4 === 0? nej.
    // lägger till "två hundra" i stack
    // ändrar number till "1000"
    // är 1 === 0? nej.
    // lägger till "ett tusen" i stack
    // poppar stacken till let text -> text = "ett tusen två hundra trettiofyra"

    // text += prefix(number);

    /*    if (parseInt(number) < 20) {
      text = digitAsText(number);
    } else {
      let stack = [];

      if (number.charAt(number.length - 1) != 0) {
        stack.push(digitAsText(number.charAt(number.length - 1)));
      }

      intNumber = parseInt(number.substring(number.length-2)) - parseInt(number.charAt(number.length - 1));
      stack.push(tenAsText(intNumber));

      stack.push(prefix(number.substring(1)));
      stack.push(prefix(number.substring(0)));  
      
      console.log(number);
      
      while (stack.length !== 0) {
        text += stack.pop();
      }
    } */

    /* if (parseInt(number) < 20) {
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
    } */

    $("#number-text").html(text);
  }
});
