
const formTitles = document.querySelectorAll('.title');
const formDescs = document.querySelectorAll('.description');
const stepNumbers = document.querySelectorAll('.stepNumber');

const planPrices = document.querySelectorAll('.planPrice');
const planGifts = document.querySelectorAll('.planGift');

const nextStepBtn = document.querySelector('.nextStep')
const previousStepButton = document.querySelector('.previousStep');
const switchBtn = document.querySelector('#switchButton');

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

  console.log(formStep);
  
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

/* formStep 1 validation */
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

  }


  if (isFormValid) {
    handleNextStep();
  }
})

switchBtn.addEventListener('change', () => {
  if (switchBtn.checked) {
    planPrices[0].innerHTML = '$90/yr';
    planPrices[1].innerHTML = '$120/yr';
    planPrices[2].innerHTML = '$150/yr';

    planGifts.forEach(gift => {
      gift.classList.add('visible');
    })

  } else {
    planPrices[0].innerHTML = '$9/mo';
    planPrices[1].innerHTML = '$12/mo';
    planPrices[2].innerHTML = '$15/mo';

    planGifts.forEach(gift => {
      gift.classList.remove('visible');
    })
  }
})