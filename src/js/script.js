const formTitles = document.querySelectorAll('.title');
const formDescs = document.querySelectorAll('.description');
const stepNumbers = document.querySelectorAll('.stepNumber');

const planPrices = document.querySelectorAll('.planPrice');
const planGifts = document.querySelectorAll('.planGift');

const switchBtn = document.querySelector('#switchButton');

const nextStepBtn = document.querySelector('.nextStep');
const previousStepButton = document.querySelector('.previousStep');

let formStep = 0

function handleNextStep() {
  if (formStep < formTitles.length){
    formStep++

    formTitles[formStep].classList.add('visible');
    formTitles[formStep - 1].classList.remove('visible');

    formDescs[formStep].classList.add('visible');
    formDescs[formStep - 1].classList.remove('visible');

    stepNumbers[formStep].classList.add('activeStep');
    stepNumbers[formStep - 1].classList.remove('activeStep');

    document.querySelector(`.formStep${formStep + 1}`).classList.add('activeForm');
    document.querySelector(`.formStep${formStep}`).classList.remove('activeForm');

    if(formStep > 0){
      previousStepButton.classList.add('visible');
    }
  }
}

nextStepBtn.addEventListener('click', handleNextStep);

function handlePreviousStep() {
  if (formStep >= 0){
    formStep--

    formTitles[formStep].classList.add('visible');
    formTitles[formStep + 1].classList.remove('visible');

    formDescs[formStep].classList.add('visible');
    formDescs[formStep + 1].classList.remove('visible');

    stepNumbers[formStep].classList.add('activeStep');
    stepNumbers[formStep + 1].classList.remove('activeStep');

    document.querySelector(`.formStep${formStep + 1}`).classList.add('activeForm');
    document.querySelector(`.formStep${formStep + 2}`).classList.remove('activeForm');

    if(formStep === 0){ 
      previousStepButton.classList.remove('visible');
    }
  
previousStepButton.addEventListener('click', handlePreviousStep);

switchBtn.addEventListener('change', () => {
  if (switchBtn.checked) {
    planPrices[0].innerHTML = '$90/yr';
    planPrices[1].innerHTML = '$120/yr';
    planPrices[2].innerHTML = '$150/yr';

    // biome-ignore lint/complexity/noForEach: <explanation>
    planGifts.forEach(gift => {
      gift.classList.add('visible');
    })
    
  } else {
    planPrices[0].innerHTML = '$9/mo';
    planPrices[1].innerHTML = '$12/mo';
    planPrices[2].innerHTML = '$15/mo';

    // biome-ignore lint/complexity/noForEach: <explanation>
    planGifts.forEach(gift => {
      gift.classList.remove('visible');
    })
  }
})
