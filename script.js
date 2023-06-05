const from = "RUB";
const to = "USD";

const inputLeft = document.querySelector(".i-have .input-block input");
const inputRight = document.querySelector(".want-to-get .second-input-block input");
inputLeft.value = 5000;
// inputRight.value = 67.6685;

const firstBlock = document.querySelector(".input-block");
const secondBlock = document.querySelector(".second-input-block");

const getCurrencyRate = async (base, symbol) => {
  const response = await fetch(
    `https://api.exchangerate.host/latest?base=${base}&symbols=${symbol}`
  );
  const data = await response.json();

  return data;
};

const leftPElement = document.createElement("p");
const rightPElement = document.createElement("p");

const updateCurrencies = (from, to) => {
  getCurrencyRate(from, to).then((res) => {
    // const pElement = document.createElement("p");
    const rateSymbol = Object.keys(res.rates)[0];
    const rateValue = Object.values(res.rates)[0];
    console.log(rateValue);
    leftPElement.innerText = `1 ${res.base} = ${rateValue} ${rateSymbol}`;
    rightPElement.innerText = `1 ${rateSymbol} = ${(1 / rateValue).toFixed(
      4
    )} ${res.base}`;

    firstBlock.append(leftPElement);
    secondBlock.append(rightPElement);
  });
};

const leftSideBtns = document.querySelectorAll(".left-currencies button");
const rightSideBtns = document.querySelectorAll(".right-currencies button");

leftSideBtns.forEach((btn) => {
  btn.addEventListener("click", changeLeftCurrency);
});

function changeLeftCurrency(e) {
  leftSideBtns.forEach((btn) => {
    btn.classList.remove("active");
  });

  e.target.classList.add("active");
  let from = document.querySelector(".left-currencies .active").innerText;
  let to = document.querySelector(".right-currencies .active").innerText;
  updateCurrencies(from, to);
}

inputLeft.addEventListener("input", (e) => {
  let calculatedValue;
  let from = document.querySelector(".left-currencies .active").innerText;
  let to = document.querySelector(".right-currencies .active").innerText;
  getCurrencyRate(from, to).then((res) => {
    const rateValue = Object.values(res.rates)[0];
    calculatedValue = e.target.value * rateValue;
    inputRight.value = calculatedValue;
    console.log(calculatedValue);
  });
});

inputRight.addEventListener("input", (e) => {
  let calculatedValue;
  let from = document.querySelector(".left-currencies .active").innerText;
  let to = document.querySelector(".right-currencies .active").innerText;
  getCurrencyRate(from, to).then((res) => {
    const rateValue = Object.values(res.rates)[0];
    calculatedValue = e.target.value * (1 / rateValue).toFixed(4);
    inputRight.value = calculatedValue;
    console.log(calculatedValue);
  });
});

updateCurrencies(from, to);
