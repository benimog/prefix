$(document).ready(function () {
  let number = "";

  $("#input-field").bind("input propertychange", function () {
    number = $(this).val();
    numberToText();
  });

  $("#copy-button").click(function () {
    copyToClipboard();
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

    str_val = str_val.replace(/tio\ (?=\w)/g, "tio");
    str_val = str_val.replace(/ett miljoner/g, "en miljon");
    str_val = str_val.replace(/ett miljarder/g, "en miljard");
    str_val = str_val.replace(/ett biljoner/g, "en biljon");
    str_val = str_val.replace(/ett biljarder/g, "en biljard");
    str_val = str_val.replace(/ett triljoner/g, "en triljard");
    str_val = str_val.replace(/ett triljarder/g, "en triljard");
    str_val = str_val.replace(/ett kvadriljoner/g, "en kvadriljon");

    return str_val.replace(/\s+/g, " ");
  }

  function numberToText() {
    const text = toWordsconver(number);
    $("#number-text").html(text);
  }
});
