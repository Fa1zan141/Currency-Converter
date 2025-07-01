const countryList = {
  AED: "AE", AFN: "AF", ALL: "AL", AMD: "AM", ANG: "AN", AOA: "AO", ARS: "AR",
  AUD: "AU", AZN: "AZ", BAM: "BA", BDT: "BD", BGN: "BG", BHD: "BH", BIF: "BI",
  BMD: "BM", BND: "BN", BOB: "BO", BRL: "BR", BSD: "BS", BTN: "BT", BWP: "BW",
  BYN: "BY", BZD: "BZ", CAD: "CA", CDF: "CD", CHF: "CH", CLP: "CL", CNY: "CN",
  COP: "CO", CRC: "CR", CUP: "CU", CVE: "CV", CZK: "CZ", DJF: "DJ", DKK: "DK",
  DOP: "DO", DZD: "DZ", EGP: "EG", ERN: "ER", ETB: "ET", EUR: "FR", FJD: "FJ",
  FKP: "FK", FOK: "FO", GBP: "GB", GEL: "GE", GGP: "GG", GHS: "GH", GIP: "GI",
  GMD: "GM", GNF: "GN", GTQ: "GT", GYD: "GY", HKD: "HK", HNL: "HN", HRK: "HR",
  HTG: "HT", HUF: "HU", IDR: "ID", ILS: "IL", INR: "IN", IQD: "IQ", IRR: "IR",
  ISK: "IS", JMD: "JM", JOD: "JO", JPY: "JP", KES: "KE", KGS: "KG", KHR: "KH",
  KMF: "KM", KRW: "KR", KWD: "KW", KYD: "KY", KZT: "KZ", LAK: "LA", LBP: "LB",
  LKR: "LK", LRD: "LR", LSL: "LS", LYD: "LY", MAD: "MA", MDL: "MD", MGA: "MG",
  MKD: "MK", MMK: "MM", MNT: "MN", MOP: "MO", MRU: "MR", MUR: "MU", MVR: "MV",
  MWK: "MW", MXN: "MX", MYR: "MY", MZN: "MZ", NAD: "NA", NGN: "NG", NIO: "NI",
  NOK: "NO", NPR: "NP", NZD: "NZ", OMR: "OM", PAB: "PA", PEN: "PE", PGK: "PG",
  PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY", QAR: "QA", RON: "RO", RSD: "RS",
  RUB: "RU", RWF: "RW", SAR: "SA", SBD: "SB", SCR: "SC", SDG: "SD", SEK: "SE",
  SGD: "SG", SHP: "SH", SLL: "SL", SOS: "SO", SRD: "SR", SSP: "SS", STN: "ST",
  SYP: "SY", SZL: "SZ", THB: "TH", TJS: "TJ", TMT: "TM", TND: "TN", TOP: "TO",
  TRY: "TR", TTD: "TT", TWD: "TW", TZS: "TZ", UAH: "UA", UGX: "UG", USD: "US",
  UYU: "UY", UZS: "UZ", VES: "VE", VND: "VN", VUV: "VU", WST: "WS", XAF: "CM",
  XCD: "AG", XOF: "BJ", XPF: "PF", YER: "YE", ZAR: "ZA", ZMW: "ZM", ZWL: "ZW"
};

const fromInput = document.querySelector("#fromInput");
const toInput = document.querySelector("#toInput");
const rate = document.querySelector(".rate");
const btn = document.querySelector("button");
const shuffle = document.querySelector("i");
const currencyCodes = Object.keys(countryList);

fromInput.value = "USD";
toInput.value = "PKR";
updateFlagImage(fromInput, ".FromImage");
updateFlagImage(toInput, ".ToImage");

async function exchangeCurrency() {
  const amount = document.querySelector("input[name='amount']").value;
  const URL = "https://open.er-api.com/v6/latest/USD";
  const response = await fetch(URL);
  const data = await response.json();
  const toRate = data.rates[toInput.value];
  const fromRate = data.rates[fromInput.value];
  const finalAmount = (amount / fromRate) * toRate;
  rate.textContent = `${amount} ${fromInput.value} ~ ${finalAmount} ${toInput.value}`;
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  exchangeCurrency();
});

shuffle.addEventListener("click", () => {
  const temp = fromInput.value;
  fromInput.value = toInput.value;
  toInput.value = temp;
  updateFlagImage(fromInput, ".FromImage");
  updateFlagImage(toInput, ".ToImage");
  exchangeCurrency();
});

function updateFlagImage(inputVal, imgSelector) {
  const code = inputVal.value;
  const countryCode = countryList[code];
  const img = document.querySelector(imgSelector);
  if (countryCode) {
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  }
}

function autocomplete(inp, arr, imgSelector) {
  let currentFocus;
  inp.addEventListener("input", function(e) {
    let a, b, i, val = this.value.toUpperCase();
    closeAllLists();
    if (!val) return false;
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].startsWith(val)) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function(e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          updateFlagImage(inp, imgSelector);
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  inp.addEventListener("keydown", function(e) {
    let x = this.parentNode.querySelector(".autocomplete-items");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    const x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
}

autocomplete(fromInput, currencyCodes, ".FromImage");
autocomplete(toInput, currencyCodes, ".ToImage");
