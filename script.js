const baseURL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll("#dropdown select");

const button = document.querySelector("form button");

const fromCurr = document.querySelector("#from select");
const toCurr = document.querySelector("#to select");

const msg = document.querySelector("#msg");

document.addEventListener("load", () => {
    UpdExRate();
})



for(let select of dropdowns) {
    for (currCode in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;

        if(select.name === "from" && currCode === "USD"){
            newOpt.selected = "selected";

        } else if (select.name === "to" && currCode === "PKR"){
            newOpt.selected = "selected";
        }
        select.append(newOpt);

        select.addEventListener("change", (evt) => {
        updFlag(evt.target);
        })
    }
}
const updFlag = (element) => {
let currCode = element.value;
let countryCode = countryList[currCode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src = newSrc;
}

button.addEventListener("click", (evt) => {
    evt.preventDefault();
    UpdExRate();
}
);


const UpdExRate = async() => {
    let amount = document.querySelector("#amount input");
    let amountVal = amount.value;
    if(amountVal === 0 || amountVal < 1) {
        amountVal = 1;
        amount.value = "1";
    }

const URL = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

let finalAmount = amountVal * rate;
msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

// json = fetchJSON(`/currencies/{fromCurrency}`)
// rate = json[fromCurrency][toCurrency]