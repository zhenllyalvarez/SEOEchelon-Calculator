import { calculateTotal } from './logic.js';

// DOM Elements
const elements = {
  slider: document.getElementById('slider'),
  totalCost: document.getElementById('totalCost'),
  totalCostBilingual: document.getElementById('totalCostBilingual'),
  totalCostIfNotVA: document.getElementById('totalCostIfNotVA'),
  annualCost: document.getElementById('FTAnnual'),
  Awage: document.getElementById('AnnualWage'),
  AwageVA: document.getElementById('AnnualWageVA'),
  AwageAlltotalValue: document.getElementById('totalValueInVA'),
  PayrollTaxes: document.getElementById('PayrollTaxes'),
  Sut: document.getElementById('SUT'),
  WorkersCompensation: document.getElementById('WorkersCompensation'),
  Osas: document.getElementById('OSAS'),
  PaidLeave: document.getElementById('PaidLeave'),
  ParkingSpot: document.getElementById('ParkingSpot'),
  Insurance: document.getElementById('Insurance'),
  medicalVA: document.getElementById('medicalVA'),
  bilingualMedicalVA: document.getElementById('bilingualMedicalVA'),
  sliderValueDisplay: document.getElementById('sliderValueDisplay'),
  sliderDisplay2: document.getElementById('sliderValueDisplay2'),
  btnCommonVA: document.getElementById('btnCommonVA'),
  btn12Dollar: document.getElementById('btn12Dollar'),
  commonVaSection: document.getElementById('commonVaSection'),
  twelveDollarSection: document.getElementById('twelveDollarSection'),
  slider12: document.getElementById('slider12'),
  sliderValueDisplay12: document.getElementById('sliderValueDisplay12'),
  sliderValueDisplay2Bilingual: document.getElementById('sliderValueDisplay2Bilingual'),
  AnnualWageVABilingual: document.getElementById('AnnualWageVABilingual'),
  totalValueInVABilingual: document.getElementById('totalValueInVABilingual'),
  BilingualVAInHouse: document.getElementById('BilingualVAInHouse'),
  PayrollTaxesBilingual: document.getElementById('PayrollTaxesBilingual'),
  AnnualWageBilingual: document.getElementById('AnnualWageBilingual'),
  SUTBilingual: document.getElementById('SUTBilingual'),
  WorkersCompensationBilingual: document.getElementById('WorkersCompensationBilingual'),
  OSASBilingual: document.getElementById('OSASBilingual'),
  PaidLeaveBilingual: document.getElementById('PaidLeaveBilingual'),
  ParkingSpotBilingual: document.getElementById('ParkingSpotBilingual'),
  InsuranceBilingual: document.getElementById('InsuranceBilingual'),
  totalCostIfNotVABilingual: document.getElementById('totalCostIfNotVABilingual'),
  btnCommonVABilingual: document.getElementById('btnCommonVABilingual'),
  btn12DollarBilingual: document.getElementById('btn12DollarBilingual')
};

// Responsive breakpoints
const breakpoints = {
  mobile: 640,
  tablet: 768,
  desktop: 1024
};

// Initialize
function init() {
  updateUI(elements.slider.value);
  updateSlider12UI(elements.slider12.value);
  setupEventListeners();
  setupResponsiveBehavior();
}

function setupEventListeners() {
  elements.slider.addEventListener('input', () => updateUI(elements.slider.value));
  elements.slider12.addEventListener('input', () => updateSlider12UI(elements.slider12.value));

  elements.btnCommonVA.addEventListener('click', toggleToFullTime);
  elements.btnCommonVABilingual.addEventListener('click', toggleToFullTime);
  elements.btn12Dollar.addEventListener('click', toggleToBilingual);
  elements.btn12DollarBilingual.addEventListener('click', toggleToBilingual);
}

function setupResponsiveBehavior() {
  // Initial check
  handleResponsiveChanges();
  
  // Add resize listener with debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResponsiveChanges, 100);
  });
}

function handleResponsiveChanges() {
  const width = window.innerWidth;
  
  // Adjust slider display for mobile
  if (width < breakpoints.tablet) {
    document.querySelectorAll('.slider-value-display').forEach(display => {
      display.style.fontSize = '12px';
      display.style.padding = '2px 4px';
    });
  } else {
    document.querySelectorAll('.slider-value-display').forEach(display => {
      display.style.fontSize = '';
      display.style.padding = '';
    });
  }
  
  // Recalculate slider positions
  updateSliderDisplay(elements.slider, elements.sliderValueDisplay, elements.sliderDisplay2, elements.slider.value);
  updateSliderDisplay(elements.slider12, elements.sliderValueDisplay12, elements.sliderValueDisplay2Bilingual, elements.slider12.value);
}

function updateUI(value, isVA = false) {
  // Update all cost calculations
  const cost = calculateTotal(value);
  elements.totalCost.textContent = `$${cost}`;

  const annualValues = calculateTotal(value, true, isVA, false);

  if (typeof annualValues === 'object') {
    updateElementText(elements.annualCost, annualValues.totalCost);
    updateElementText(elements.Awage, annualValues.annualWage);
    updateElementText(elements.PayrollTaxes, annualValues.payrollTaxes);
    updateElementText(elements.Sut, annualValues.stateUnemploymentTax);
    updateElementText(elements.WorkersCompensation, annualValues.workersComp);
    updateElementText(elements.Osas, annualValues.officeSupplies);
    updateElementText(elements.PaidLeave, annualValues.paidLeave);
    updateElementText(elements.ParkingSpot, annualValues.parkingSpot);
    updateElementText(elements.Insurance, annualValues.insurance);
  }

  updateElementText(elements.totalCostIfNotVA, annualValues?.totalCost);

  if (elements.medicalVA) {
    const vaCost = calculateTotal(value, true, true, false);
    updateElementText(elements.medicalVA, vaCost.annualWage);
    updateElementText(elements.AwageVA, vaCost.annualWage);
    updateElementText(elements.AwageAlltotalValue, vaCost.annualWage);
  }

  updateSliderDisplay(elements.slider, elements.sliderValueDisplay, elements.sliderDisplay2, value);
}

function updateSlider12UI(value) {
  // Update all bilingual cost calculations
  const cost = calculateTotal(value, false, false, true);
  elements.totalCostBilingual.textContent = `$${cost.totalCost.toLocaleString()}`;

  const annualValues = calculateTotal(value, true, false, false);

  if (typeof annualValues === 'object') {
    updateElementText(elements.BilingualVAInHouse, annualValues.totalCost);
    updateElementText(elements.AnnualWageBilingual, annualValues.annualWage);
    updateElementText(elements.PayrollTaxesBilingual, annualValues.payrollTaxes);
    updateElementText(elements.SUTBilingual, annualValues.stateUnemploymentTax);
    updateElementText(elements.WorkersCompensationBilingual, annualValues.workersComp);
    updateElementText(elements.OSASBilingual, annualValues.officeSupplies);
    updateElementText(elements.PaidLeaveBilingual, annualValues.paidLeave);
    updateElementText(elements.ParkingSpotBilingual, annualValues.parkingSpot);
    updateElementText(elements.InsuranceBilingual, annualValues.insurance);
  }

  updateElementText(elements.totalCostIfNotVABilingual, annualValues?.totalCost);

  if (elements.bilingualMedicalVA) {
    const vaBilingualCost = calculateTotal(value, true, false, true);
    updateElementText(elements.bilingualMedicalVA, vaBilingualCost.annualWage);
    updateElementText(elements.AnnualWageVABilingual, vaBilingualCost.annualWage);
    updateElementText(elements.totalValueInVABilingual, vaBilingualCost.annualWage);
  }

  updateSliderDisplay(elements.slider12, elements.sliderValueDisplay12, elements.sliderValueDisplay2Bilingual, value);
}

function updateElementText(element, value) {
  if (element && value !== undefined) {
    element.textContent = `$${value.toLocaleString()}`;
  }
}

function updateSliderDisplay(sliderElement, displayElement, displayElement2, value) {
  if (!sliderElement || !displayElement) return;
  
  const percent = value;
  const sliderRect = sliderElement.getBoundingClientRect();
  const thumbWidth = 24;
  const thumbOffset = (percent / 100) * (sliderRect.width - thumbWidth);
  
  // Update display text
  displayElement.textContent = value;
  if (displayElement2) displayElement2.textContent = value;
  
  // Position display (responsive)
  if (window.innerWidth < breakpoints.tablet) {
    displayElement.style.left = `${thumbOffset}px`;
    displayElement.style.transform = 'none';
  } else {
    displayElement.style.left = '';
    displayElement.style.transform = `translateX(${thumbOffset}px)`;
  }
  
  // Update slider background (same color scheme for both sliders)
  let background;
  if (value <= 10) {
    background = `linear-gradient(to right, #869874 0% ${percent}%, #E5E7EB ${percent}% 100%)`;
  } else if (value <= 20) {
    background = `linear-gradient(to right, #869874 0% 11%, #E6B705 11% ${percent}%, #E5E7EB ${percent}% 100%)`;
  } else {
    background = `linear-gradient(to right, #869874 0% 11%, #E6B705 11% 21%, #A5111F 21% ${percent}%, #E5E7EB ${percent}% 100%)`;
  }
  sliderElement.style.background = background;
}

function toggleToFullTime() {
  elements.commonVaSection.classList.remove('hidden');
  elements.twelveDollarSection.classList.add('hidden');

  toggleButtonStyles(true);
}

function toggleToBilingual() {
  elements.twelveDollarSection.classList.remove('hidden');
  elements.commonVaSection.classList.add('hidden');

  toggleButtonStyles(false);
}

function toggleButtonStyles(isFullTime) {
  const activeClass = ['bg-[#189DA4]', 'text-white'];
  const inactiveClass = ['bg-[#5EB3B7]', 'text-gray-100'];
  
  const activeButtons = isFullTime 
    ? [elements.btnCommonVA, elements.btnCommonVABilingual]
    : [elements.btn12Dollar, elements.btn12DollarBilingual];
  
  const inactiveButtons = isFullTime
    ? [elements.btn12Dollar, elements.btn12DollarBilingual]
    : [elements.btnCommonVA, elements.btnCommonVABilingual];
  
  activeButtons.forEach(btn => {
    btn.classList.add(...activeClass);
    btn.classList.remove(...inactiveClass);
  });
  
  inactiveButtons.forEach(btn => {
    btn.classList.add(...inactiveClass);
    btn.classList.remove(...activeClass);
  });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);