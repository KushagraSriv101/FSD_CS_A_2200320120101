const apiURL = "https://api.exchangerate-api.com/v4/latest/USD";

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");

window.addEventListener("load", () => {
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const rates = data.rates;
      fillCurrencyOptions(rates);
    })
    .catch(() => {
      result.textContent = "Error loading exchange rates";
    });
});

function fillCurrencyOptions(rates) {
  for (let currency in rates) {
    const option1 = new Option(currency, currency);
    const option2 = new Option(currency, currency);
    fromCurrency.add(option1);
    toCurrency.add(option2);
  }
  fromCurrency.value = "USD"; 
  toCurrency.value = "EUR";
}


function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    result.textContent = "Enter a valid amount";
    return;
  }
  
  const from = fromCurrency.value;
  const to = toCurrency.value;

  fetch(`${apiURL}`)
    .then(response => response.json())
    .then(data => {
      const rates = data.rates;
      const convertedAmount = amount * (rates[to] / rates[from]);
      result.textContent = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
    })
    .catch(() => {
      result.textContent = "Conversion error";
    });
}
