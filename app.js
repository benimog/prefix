$(document).ready(function () {
  let number = "";

  $("#input-field").bind("input propertychange", function () {
    number = $(this).val();
    numberToText();
  });

  $("#copy-button").click(function () {
    copyToClipboard();
    document.getElementById("input-field").focus();
  });

  function copyToClipboard() {
    const str = toWordsconver(number);
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  function toWordsconver(s) {
    const th_val = [
      "",
      "tusen",
      "miljoner",
      "miljarder",
      "biljoner",
      "biljarder",
      "triljoner",
      "triljarder",
      "kvadriljoner",
    ];

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

    s = s.replace(/[\, ]/g, ".");
    if (s != parseFloat(s)) return "Ange ett nummer";
    let x_val = s.indexOf(".");
    if (x_val == -1) x_val = s.length;
    if (x_val > 25) return "För stort :(";
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
      for (let i = x_val + 1; i < y_val; i++) str_val += dg_val[n_val[i]] + " ";
    }

    // str_val = str_val.replace(/tio\ (?=\w)/g, "tio");
    str_val = str_val.replace(/tjugo\ (?=\w)/g, "tjugo");
    str_val = str_val.replace(/trettio\ (?=\w)/g, "trettio");
    str_val = str_val.replace(/fyrtio\ (?=\w)/g, "fyrtio");
    str_val = str_val.replace(/femtio\ (?=\w)/g, "femtio");
    str_val = str_val.replace(/sextio\ (?=\w)/g, "sextio");
    str_val = str_val.replace(/sjuttio\ (?=\w)/g, "sjuttio");
    str_val = str_val.replace(/åttio\ (?=\w)/g, "åttio");
    str_val = str_val.replace(/nittio\ (?=\w)/g, "nittio");

    // str_val = str_val.replace(/hundra\ (?=\w)/g, "hundra");
    /*     str_val = str_val.replace(/ett miljoner/g, "en miljon");
    str_val = str_val.replace(/\wen miljon/g, "en miljoner"); */
    /*     str_val = str_val.replace(/ett miljarder/g, "en miljard");
    str_val = str_val.replace(/\wen miljard/g, "en miljarder");
    str_val = str_val.replace(/ett biljoner/g, "en biljon");
    str_val = str_val.replace(/ett biljarder/g, "en biljard");
    str_val = str_val.replace(/ett triljoner/g, "en triljard");
    str_val = str_val.replace(/ett triljarder/g, "en triljard");
    str_val = str_val.replace(/ett kvadriljoner/g, "en kvadriljon"); */

    for (i = 2; i < th_val.length; ++i) {
      let regex = new RegExp("ett " + th_val[i], "g");
      str_val = str_val.replace(
        regex,
        `oen ${th_val[i].substring(0, th_val[i].length - 2)}`
      );

      /*       let regex2 = new RegExp("\Wen " + th_val[i],"g");
      str_val = str_val.replace(regex2, `en ${th_val[i]}`); */

      /*       regex2 = new RegExp("\wen " + th_val[i].substring(0, th_val[i].length-2),"g");
      str_val = str_val.replace(regex2, `en ${th_val[i]}`) */
    }
    str_val = str_val.replace(/\wen miljon/g, "en miljoner");
    str_val = str_val.replace(/^en miljoner/g, "en miljon");
    str_val = str_val.replace(/\wen miljard/g, "en miljarder"); 
    str_val = str_val.replace(/^en miljarder/g, "en miljard"); 
    str_val = str_val.replace(/\wen biljon/g, "en biljoner"); 
    str_val = str_val.replace(/^en biljoner/g, "en biljon"); 
    str_val = str_val.replace(/\wen biljard/g, "en biljarder"); 
    str_val = str_val.replace(/^en biljarder/g, "en biljard"); 
    str_val = str_val.replace(/\wen triljon/g, "en triljoner"); 
    str_val = str_val.replace(/^en triljoner/g, "en triljon"); 
    str_val = str_val.replace(/\wen triljard/g, "en triljarder");
    str_val = str_val.replace(/^en triljarder/g, "en triljard");
    str_val = str_val.replace(/\wen kvadriljon/g, "en kvadriljoner");  
    str_val = str_val.replace(/^en kvadriljoner/g, "en kvadriljon");  


    /*     for (i = 0; i < tw_val.length; ++i) {
      let regex = new RegExp(tw_val[i] + "\ (?=\w)","g");
      str_val = str_val.replace(regex, tw_val[i]);
      console.log(`i: ${i}; regex: "${regex}"; tw_val[i]: "${tw_val[i]}"; str_val: "${str_val}"`);
    } */

    return str_val.replace(/\s+/g, " ");
  }

  function numberToText() {
    const text = toWordsconver(number);
    $("#number-text").html(text);
  }
});
