currencyChange()
//changing currencies
let currencyLeft = document.querySelector(".valuesLeft").childNodes;
currencyLeft.forEach((currencyLeft) => {
  currencyLeft.addEventListener("click", (e) => {
    let activeL = document.querySelector(".valuesLeft .clicked");
    activeL.classList.remove("clicked");
    e.target.classList.add("clicked");
  });
});
let currencyRight = document.querySelector(".valuesRight").childNodes;
currencyRight.forEach((currencyRight) => {
  currencyRight.addEventListener("click", (e) => {
    let activeR = document.querySelector(".valuesRight .clicked");
    activeR.classList.remove("clicked");
    e.target.classList.add("clicked");
  });
});

//to convert in real time
document
  .querySelectorAll(".baseCurrency")
  .forEach((item) => (item.onclick = currencyChange));

document
  .querySelectorAll(".targetCurrency")
  .forEach((item) => (item.onclick = currencyChange));

document.getElementById("input").oninput = () => {
  currencyChange();
}


//how converter works
async function currencyChange() {
  const baseCurrencyInput = document.querySelector('.valuesLeft .clicked');
  const targetCurrencyInput = document.querySelector('.valuesRight .clicked');
  const amountInput = document.getElementById('input');

  const baseCurrency = baseCurrencyInput.innerHTML;
  const targetCurrency = targetCurrencyInput.innerHTML;
  const amount = amountInput.value;

  const exchangeRate = await getExchangeRate(baseCurrency, targetCurrency);


  let innerResult = exchangeRate * amount;
  let rTOl = 1 / exchangeRate;
  let lTOr = exchangeRate * 1
  let result = document.getElementById("output");
  let leftRateValue = document.querySelector(".rateL");
  let rightRateValue = document.querySelector(".rateR");
  result.value = innerResult.toFixed(2);
  leftRateValue.textContent = `1 ${baseCurrency} = ${lTOr.toFixed(4)} ${targetCurrency}`;
  rightRateValue.textContent = `1 ${targetCurrency} = ${rTOl.toFixed(4)} ${baseCurrency}`;

};

async function getExchangeRate(baseCurrency, targetCurrency) {
  try {
    const response = await fetch(`https://api.exchangerate.host/latest?base=${baseCurrency}&symbols=${targetCurrency}`);
    const data = await response.json();
    return data.rates[targetCurrency];
  } catch (error) {
    return error;
  }
}

//For Fun =)
let tabs = document.querySelector(".listOfTabs").childNodes;
tabs.forEach((tabs) => {
  tabs.addEventListener("click", (e) => {
    let active = document.querySelector(".listOfTabs .clickedTab");
    active.classList.remove("clickedTab");
    e.target.classList.add("clickedTab");
  });
});
