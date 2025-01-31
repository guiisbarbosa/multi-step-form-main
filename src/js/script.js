
const formTitles = document.querySelectorAll('.title');
const formDescs = document.querySelectorAll('.description');
const stepNumbers = document.querySelectorAll('.stepNumber');

const planPrices = document.querySelectorAll('.planPrice');
const planGifts = document.querySelectorAll('.planGift');
const planTypes = document.querySelectorAll('.radioInput');

let selectedTypePayment = 'Monthly'
let selectedTypePlan = 'Arcade'
let selectedPlanPrice

const addons = document.querySelectorAll('.checkboxInput');
const addonsPrices = document.querySelectorAll('.addonPrice');
const selectedAddonsContainer = document.querySelector('.selectedAddons');

let selectedAddons = [];

const selectedPlanTitle = document.querySelector('.selectedPlanTitle');
const selectedPlanPriceContainer = document.querySelector('.selectedPlanPrice');
const totalPrice = document.querySelector('.totalPrice');
const totalPayment = document.querySelector('.totalPayment');

const nextStepBtn = document.querySelector('.nextStep')
const previousStepButton = document.querySelector('.previousStep');
const switchBtn = document.querySelector('#switchButton');
const changePlanBtn = document.querySelector('.changePlan');

let formStep = 0

function handleNextStep() {
  const currentForm = document.querySelector(`.formStep${formStep + 1}`)

  if (formStep <= formTitles.length - 1) {
    currentForm.classList.remove('activeForm');

    formTitles[formStep].classList.remove('visible');
    formDescs[formStep].classList.remove('visible');
    stepNumbers[formStep].classList.remove('activeStep');
  }

  if (formStep <= formTitles.length - 1) {
    formStep++
  }

  const nextForm = document.querySelector(`.formStep${formStep + 1}`)
  nextForm.classList.add('activeForm');

  if (formStep <= formTitles.length - 1) {
    formTitles[formStep].classList.add('visible');
    formDescs[formStep].classList.add('visible');
    stepNumbers[formStep].classList.add('activeStep');
  }

  if (formStep > 0) {
    previousStepButton.classList.add('visible');
  }

  if (formStep === formTitles.length - 1) {
    nextStepBtn.innerHTML = "Confirm"
  }

  if (formStep === formTitles.length) {
    nextStepBtn.classList.add('hidden');
    previousStepButton.classList.add('hidden');
  }

}

function handlePreviousStep() {
  if (formStep > 0) {
    const currentForm = document.querySelector(`.formStep${formStep + 1}`)
    currentForm.classList.remove('activeForm');

    formTitles[formStep].classList.remove('visible');
    formDescs[formStep].classList.remove('visible');
    stepNumbers[formStep].classList.remove('activeStep');

    formStep--


    const previousForm = document.querySelector(`.formStep${formStep + 1}`)
    previousForm.classList.add('activeForm');

    formTitles[formStep].classList.add('visible');
    formDescs[formStep].classList.add('visible');
    stepNumbers[formStep].classList.add('activeStep');

    if (formStep === 0) {
      previousStepButton.classList.remove('visible');
    }
  }

  console.log(formStep);
}

previousStepButton.addEventListener('click', handlePreviousStep);

const inputs = document.querySelectorAll('.input');
const errorMessages = document.querySelectorAll('.errorMessage');


nextStepBtn.addEventListener('click', () => {
  let isFormValid = true;

  if (formStep === 0) {
    inputs.forEach((input, i) => {
      if (input.value.trim() === "") {
        errorMessages[i].classList.add('visible');
        input.classList.add('error');
        isFormValid = false
      } else {
        errorMessages[i].classList.remove('visible');
        input.classList.remove('error');
      }
    })
  }

  if (formStep === 1) {
    let isPlanSelected = false

    planTypes.forEach(plan => {
      if (plan.checked) {
        selectedTypePlan = plan.value;
        isPlanSelected = true
      }
    })

    if (selectedTypePayment === 'Yearly') {
      switch (selectedTypePlan) {
        case 'Arcade':
          selectedPlanPrice = 90
          break
        case 'Advanced':
          selectedPlanPrice = 120
          break
        case 'Pro':
          selectedPlanPrice = 150
          break
      }
    }

    if (selectedTypePayment === 'Monthly') {
      switch (selectedTypePlan) {
        case 'Arcade':
          selectedPlanPrice = 9
          break
        case 'Advanced':
          selectedPlanPrice = 12
          break
        case 'Pro':
          selectedPlanPrice = 15
          break
      }
    }

    if (!isPlanSelected) {
      alert('Please select a plan');
      isFormValid = false
    }
  }


    selectedAddons = Array.from(addons)
      .filter(addon => addon.checked)
      .map(addon => ({
        name: addon.name,
        value: addon.value
      }))

    selectedAddonsContainer.innerHTML = ''

    if (selectedAddons.length > 0) {
      selectedAddons.map(addon => {
        const formattedValue = `+$${addon.value}/${selectedTypePayment === 'Yearly' ? 'yr' : 'mo'}`

        selectedAddonsContainer.innerHTML += `<div class="selectedAddon">
                                              <div class="selectedAddonTitle">${addon.name}</div>
                                              <div class="selectedAddonPrice">${formattedValue}</div>
                                            </div>`
      })
    } else {
      selectedAddonsContainer.innerHTML += `<div class="selectedAddon">
                                              <div class="selectedAddonTitle">No addons selected</div>
                                              <div class="selectedAddonPrice"> </div>
                                            </div>`
    }

    selectedPlanTitle.innerHTML = selectedTypePlan
    selectedPlanPriceContainer.innerHTML = `$${selectedPlanPrice}/${selectedTypePayment === 'Yearly' ? 'yr' : 'mo'}`

    function calculateTotalAddonsValue(selectedAddons) {
      const totalAddonsValue = selectedAddons.reduce((total, addon) => {
        return total + Number(addon.value);
      }, 0)
      return totalAddonsValue;
    }

    const totalAddons = calculateTotalAddonsValue(selectedAddons)

      totalPayment.innerHTML = `Total (per ${selectedTypePayment === 'Yearly' ? 'year' : 'month'})`
      totalPrice.innerHTML = `$${selectedPlanPrice + totalAddons}/${selectedTypePayment === 'Yearly' ? 'yr' : 'mo'}`

  if (isFormValid) {
    handleNextStep();
  }
})

switchBtn.addEventListener('change', () => {
  if (switchBtn.checked) {
    selectedTypePayment = 'Yearly'

    planPrices[0].innerHTML = '$90/yr';
    planPrices[1].innerHTML = '$120/yr';
    planPrices[2].innerHTML = '$150/yr';


    planGifts.forEach(gift => {
      gift.classList.add('visible');
    })

    addonsPrices[0].value = 10;
    addonsPrices[1].value = 20;
    addonsPrices[2].value = 20;

    addons[0].value = 10;
    addons[1].value = 20;
    addons[2].value = 20;

    addonsPrices[0].innerHTML = `$${addonsPrices[0].value}/yr`;
    addonsPrices[1].innerHTML = `$${addonsPrices[1].value}/yr`;
    addonsPrices[2].innerHTML = `$${addonsPrices[2].value}/yr`;

  } else {
    selectedTypePayment = 'Monthly'

    planPrices[0].innerHTML = '$9/mo';
    planPrices[1].innerHTML = '$12/mo';
    planPrices[2].innerHTML = '$15/mo';

    planGifts.forEach(gift => {
      gift.classList.remove('visible');
    })

    addonsPrices[0].value = 1;
    addonsPrices[1].value = 2;
    addonsPrices[2].value = 2;

    addons[0].value = 1;
    addons[1].value = 2;
    addons[2].value = 2;

    addonsPrices[0].innerHTML = `$${addonsPrices[0].value}/mo`;
    addonsPrices[1].innerHTML = `$${addonsPrices[1].value}/mo`;
    addonsPrices[2].innerHTML = `$${addonsPrices[2].value}/mo`;
  }
})

changePlanBtn.addEventListener('click', () => {
  const currentStep = document.querySelector('.formStep4.activeForm');
  currentStep.classList.remove('activeForm');

  formTitles[formStep].classList.remove('visible');
  formDescs[formStep].classList.remove('visible');
  stepNumbers[formStep].classList.remove('activeStep');

  formStep = 1;

  const nextStep = document.querySelector(`.formStep${formStep + 1}`);
  if (nextStep) {
    nextStep.classList.add('activeForm');
  }

  formTitles[formStep].classList.add('visible');
  formDescs[formStep].classList.add('visible');
  stepNumbers[formStep].classList.add('activeStep');
});