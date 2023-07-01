import React, { useState } from 'react';

const App: React.FC = () => {
  const [number, setNumber] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  const copyToClipboard = () => {
    const text = toWordsConvert(number);
    if (text === 'Ange ett nummer') {
      return;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  function toWordsConvert(s: string): string {
    const th_val: string[] = [
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
  
    const dg_val: string[] = [
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
    const tn_val: string[] = [
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
    const tw_val: string[] = [
      "tjugo",
      "trettio",
      "fyrtio",
      "femtio",
      "sextio",
      "sjuttio",
      "åttio",
      "nittio",
    ];
  
    s = s.replace(/[\, ]/g, "");
    if (isNaN(parseFloat(s))) return "Ange ett nummer";
    let x_val: number = s.indexOf(".");
    if (x_val === -1) x_val = s.length;
    if (x_val > 25) return "För stort :(";
    const n_val: string[] = s.split("");
    let str_val: string = "";
    let sk_val: number = 0;
    for (let i = 0; i < x_val; i++) {
      if ((x_val - i) % 3 === 2) {
        if (n_val[i] === "1") {
          str_val += tn_val[Number(n_val[i + 1])] + " ";
          i++;
          sk_val = 1;
        } else if (n_val[i] !== "0") {
          str_val += tw_val[Number(n_val[i]) - 2] + " ";
          sk_val = 1;
        }
      } else if (n_val[i] !== "0") {
        str_val += dg_val[Number(n_val[i])] + " ";
        if ((x_val - i) % 3 === 0) str_val += "hundra";
        sk_val = 1;
      }
      if ((x_val - i) % 3 === 1) {
        if (sk_val) str_val += th_val[(x_val - i - 1) / 3] + " ";
        sk_val = 0;
      }
    }
    if (x_val !== s.length) {
      const y_val: number = s.length;
      str_val += "komma ";
      for (let i = x_val + 1; i < y_val; i++) str_val += dg_val[Number(n_val[i])] + " ";
    }
  
    str_val = str_val.replace(/tjugo (?=\w)/g, "tjugo");
    str_val = str_val.replace(/trettio (?=\w)/g, "trettio");
    str_val = str_val.replace(/fyrtio (?=\w)/g, "fyrtio");
    str_val = str_val.replace(/femtio (?=\w)/g, "femtio");
    str_val = str_val.replace(/sextio (?=\w)/g, "sextio");
    str_val = str_val.replace(/sjuttio (?=\w)/g, "sjuttio");
    str_val = str_val.replace(/åttio (?=\w)/g, "åttio");
    str_val = str_val.replace(/nittio (?=\w)/g, "nittio");
    for (let i = 2; i < th_val.length; ++i) {
      let regex = new RegExp("ett " + th_val[i], "g");
      str_val = str_val.replace(
        regex,
        `oen ${th_val[i].substring(0, th_val[i].length - 2)}`
      );
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
    return str_val.replace(/\s+/g, " ");
  }

  const numberToText = () => {
    const text = toWordsConvert(number);
    return text;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-4xl w-full py-8 px-6">
        <h1 className="text-7xl text-center mb-8">Storatal.se</h1>
        <div className="mb-6">
          <input
            type="text"
            id="input-field"
            placeholder="Skriv in ett tal med siffror"
            autoComplete="off"
            autoFocus
            className="w-full px-4 py-3 border rounded-md outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white text-xl"
            value={number}
            onChange={handleInputChange}
          />
        </div>
        <p className="text-2xl mb-8">{numberToText()}</p>
        <button
          className="btn btn-primary w-full text-xl"
          onClick={copyToClipboard}
        >
          Kopiera
        </button>
        {copied && (
          <p className="text-green-500 text-center mt-4">Kopierad!</p>
        )}
      </div>
    </div>
  );
};

export default App;