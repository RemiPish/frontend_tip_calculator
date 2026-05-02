const billInput = document.querySelector(".calculator__input__bill input");
const peopleInput = document.querySelector(".calculator__input__people input");
const tipButtons = document.querySelectorAll(".calculator__input__tip__buttons button");
const customTipInput = document.querySelector(".calculator__input__tip__buttons input");
const resetButton = document.querySelector(".calculator__output__reset");

const tipAmountOutput = document.querySelector(
  ".calculator__output__tip .calculator__output__amount"
);
const totalAmountOutput = document.querySelector(
  ".calculator__output__total .calculator__output__amount"
);

const errorMessageBill = document.querySelector(".calculator__input__error__bill");
const errorMessagePeople = document.querySelector(".calculator__input__error__people");

let currentTipPercentage = 0;

function getValues() {
  return {
    bill: Number(billInput.value),
    people: Number(peopleInput.value),
    tip: currentTipPercentage,
  };
}

function setError(input, errorElement, hasError) {
  input.classList.toggle("invalid", hasError);
  errorElement.textContent = hasError ? "Can't be zero" : "";
}

function validate({ bill, people, tip }) {
  const billInvalid = bill <= 0;
  const peopleInvalid = people <= 0;

  setError(billInput, errorMessageBill, billInvalid);
  setError(peopleInput, errorMessagePeople, peopleInvalid);

  return !billInvalid && !peopleInvalid && tip > 0;
}

function calculate({ bill, people, tip }) {
  const tipAmount = (bill * (tip / 100)) / people;
  const totalAmount = bill / people + tipAmount;

  tipAmountOutput.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountOutput.textContent = `$${totalAmount.toFixed(2)}`;
}

function updateCalculator() {
  const values = getValues();

  resetButton.disabled =
    !billInput.value && !peopleInput.value && !customTipInput.value && values.tip === 0;

  if (!validate(values)) {
    tipAmountOutput.textContent = "$0.00";
    totalAmountOutput.textContent = "$0.00";
    return;
  }

  calculate(values);
}

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    currentTipPercentage = Number.parseInt(button.textContent, 10);
    customTipInput.value = "";

    updateCalculator();
  });
});

customTipInput.addEventListener("input", () => {
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  currentTipPercentage = Number(customTipInput.value);

  updateCalculator();
});

billInput.addEventListener("input", updateCalculator);
peopleInput.addEventListener("input", updateCalculator);

resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";
  currentTipPercentage = 0;

  tipButtons.forEach((btn) => btn.classList.remove("active"));

  setError(billInput, errorMessageBill, false);
  setError(peopleInput, errorMessagePeople, false);

  tipAmountOutput.textContent = "$0.00";
  totalAmountOutput.textContent = "$0.00";
  resetButton.disabled = true;
});