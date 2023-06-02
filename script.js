
const from = "RUB";
const to = "USD";

const inputLeft = document.querySelector(".i-have .input-block input");
const inputRight = document.querySelector(".want-to-get .second-input-block input");
inputLeft.value = 5000;
inputRight.value = 67.6685;

const getCurrencyRate = async (base, symbol) => {
  const response = await fetch(
    `https://api.exchangerate.host/latest?base=${base}&symbols=${symbol}`
  );
  const data = await response.json();

  return data;
};

const firstBlock = document.querySelector(".input-block");

getCurrencyRate(from, to).then((res) => {
  const pElement = document.createElement("p");
  const rateSymbol = Object.keys(res.rates)[0];
  const rateValue = Object.values(res.rates)[0];
  console.log(rateValue);
  pElement.innerText = `1 ${res.base} = ${rateValue} ${rateSymbol}`;

  firstBlock.append(pElement);
});

const secondBlock = document.querySelector(".second-input-block");

getCurrencyRate(to, from).then((res) => {
  const pElement = document.createElement("p");
  const rateSymbol = Object.keys(res.rates)[0];
  const rateValue = Object.values(res.rates)[0];
  console.log(rateValue);
  pElement.innerText = `1 ${res.base} = ${rateValue} ${rateSymbol}`;

  secondBlock.append(pElement);
});

inputLeft.addEventListener("keyup", (e) => {
  let calculatedValue;
  getCurrencyRate(from, to).then((res) => {
    const rateValue = Object.values(res.rates)[0];
    calculatedValue = e.target.value * rateValue;
    inputRight.value = calculatedValue;
    console.log(calculatedValue);
  });
});
inputRight.addEventListener("keyup", (e) => {
  let calculatedValue;
  getCurrencyRate(to, from).then((res) => {
    const rateValue = Object.values(res.rates)[0];
    calculatedValue = e.target.value * rateValue;
    inputLeft.value = calculatedValue;
    console.log(calculatedValue);
  });
});


