export const formatMoney = (s) => {
  // n = n > 0 && n <= 20 ? n : 2; 
  const n = 4;
  if (s && s !== null) {
    if (String(s).indexOf('.')> -1) {
      s = parseFloat((s + "").replace(/[^\d\.-]/g,"")).toFixed(n) + "";
      let l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
      let t = "";
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
      } 
      return t.split("").reverse().join("") + "." + r;
    } else {
      s = String(parseFloat((s + "")));
      let l = s.split("").reverse();
      let t = ""; 
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
      } 
      return t.split("").reverse().join("");
    }
  }
    return 0
}