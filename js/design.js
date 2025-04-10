import { calculateTotal } from './logic.js';

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
  btn12DollarBilingual: document.getElementById('btn12DollarBilingual'),
  dropdownRadioHelper: document.getElementById('dropdownRadioHelper'),
  dropdownInformation2: document.getElementById('dropdownInformation2'),
  tierLabel: document.getElementById('tierLabel'),
  tierPrice: document.getElementById('tierPrice'),
  ftTierLabel: document.getElementById('ftTierLabel'),
  ftTierPrice: document.getElementById('ftTierPrice'),
};

const breakpoints = {
  mobile: 640,
  tablet: 768,
  desktop: 1024
};

// Track dropdown states
let dropdownStates = {
  fullTimeVA: false,
  bilingualVA: false
};

function setupEventListeners() {
  elements.slider.addEventListener('input', () => updateUI(elements.slider.value));
  elements.slider12.addEventListener('input', () => updateSlider12UI(elements.slider12.value));

  // Update event listeners for dropdown toggle behavior
  elements.btnCommonVA.addEventListener('click', () => toggleDropdown('fullTimeVA'));
  elements.btnCommonVABilingual.addEventListener('click', () => toggleDropdown('fullTimeVA'));
  elements.btn12Dollar.addEventListener('click', () => toggleDropdown('bilingualVA'));
  elements.btn12DollarBilingual.addEventListener('click', () => toggleDropdown('bilingualVA'));
}

function toggleDropdown(type) {
  if (type === 'fullTimeVA') {
    elements.commonVaSection.classList.remove('hidden');
    elements.twelveDollarSection.classList.add('hidden');
    
    dropdownStates.fullTimeVA = !dropdownStates.fullTimeVA;
    if (dropdownStates.fullTimeVA) {
      const actualHeight = elements.dropdownRadioHelper.scrollHeight + 'px';
      elements.dropdownRadioHelper.style.maxHeight = actualHeight;
      elements.dropdownRadioHelper.style.opacity = '1';
      elements.dropdownRadioHelper.classList.add('show');
      elements.dropdownRadioHelper.parentElement.classList.add('bg-white');
      elements.dropdownInformation2.style.maxHeight = '0';
      elements.dropdownInformation2.style.opacity = '0';
    } else {
      elements.dropdownRadioHelper.style.maxHeight = '0';
      elements.dropdownRadioHelper.style.opacity = '0';
      elements.dropdownRadioHelper.classList.remove('show');
      elements.dropdownRadioHelper.parentElement.classList.remove('bg-white');
      // Automatically show bilingual section when full-time VA is closed
      setTimeout(() => {
        elements.twelveDollarSection.classList.remove('hidden');
        elements.commonVaSection.classList.add('hidden');
        const bilingualHeight = elements.dropdownInformation2.scrollHeight + 'px';
        elements.dropdownInformation2.style.maxHeight = bilingualHeight;
        elements.dropdownInformation2.style.opacity = '1';
        elements.dropdownInformation2.classList.add('show');
        elements.dropdownInformation2.parentElement.classList.add('bg-white');
        dropdownStates.bilingualVA = true;
      }, 400); // Add a delay for smoother transition
    }
    
    elements.dropdownInformation2.classList.remove('show');
    elements.dropdownInformation2.parentElement.classList.remove('bg-white');
    dropdownStates.bilingualVA = false;
    
    toggleButtonStyles(true);
    updateExpandCollapseIcon(elements.btnCommonVA, dropdownStates.fullTimeVA);
    updateExpandCollapseIcon(elements.btnCommonVABilingual, dropdownStates.fullTimeVA);
    updateExpandCollapseIcon(elements.btn12Dollar, false);
    updateExpandCollapseIcon(elements.btn12DollarBilingual, false);
  } else {
    elements.twelveDollarSection.classList.remove('hidden');
    elements.commonVaSection.classList.add('hidden');
    
    dropdownStates.bilingualVA = !dropdownStates.bilingualVA;
    if (dropdownStates.bilingualVA) {
      const actualHeight = elements.dropdownInformation2.scrollHeight + 'px';
      elements.dropdownInformation2.style.maxHeight = actualHeight;
      elements.dropdownInformation2.style.opacity = '1';
      elements.dropdownInformation2.classList.add('show');
      elements.dropdownInformation2.parentElement.classList.add('bg-white');
    } else {
      elements.dropdownInformation2.style.maxHeight = '0';
      elements.dropdownInformation2.style.opacity = '0';
      elements.dropdownInformation2.classList.remove('show');
      elements.dropdownInformation2.parentElement.classList.remove('bg-white');
    }
    
    elements.dropdownRadioHelper.style.maxHeight = '0';
    elements.dropdownRadioHelper.style.opacity = '0';
    elements.dropdownRadioHelper.classList.remove('show');
    elements.dropdownRadioHelper.parentElement.classList.remove('bg-white');
    dropdownStates.fullTimeVA = false;
    
    toggleButtonStyles(false);
    updateExpandCollapseIcon(elements.btn12Dollar, dropdownStates.bilingualVA);
    updateExpandCollapseIcon(elements.btn12DollarBilingual, dropdownStates.bilingualVA);
    updateExpandCollapseIcon(elements.btnCommonVA, false);
    updateExpandCollapseIcon(elements.btnCommonVABilingual, false);
  }
}

function updateExpandCollapseIcon(button, isExpanded) {
  // Find the SVG element inside the button
  const svg = button.querySelector('svg');
  if (!svg) return;
  
  // Update the path for expand/collapse icon
  const path = svg.querySelector('path');
  if (path) {
    if (isExpanded) {
      // Minus icon (collapse)
      path.setAttribute('d', 'M5 12h14');
    } else {
      // Plus icon (expand)
      path.setAttribute('d', 'M5 12h14m-7 7V5');
    }
  }
}

function setupResponsiveBehavior() {
  handleResponsiveChanges();
  
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResponsiveChanges, 100);
  });
}

function handleResponsiveChanges() {
  const width = window.innerWidth;
  
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

  updateSliderDisplay(elements.slider, elements.sliderValueDisplay, elements.sliderDisplay2, elements.slider.value);
  updateSliderDisplay(elements.slider12, elements.sliderValueDisplay12, elements.sliderValueDisplay2Bilingual, elements.slider12.value);
}

function updateUI(value) {
  const cost = calculateTotal(value);
  elements.totalCost.textContent = `$${cost}`;

  // Update tier labels based on slider value
  updateFTTierLabels(value);

  const annualValues = calculateTotal(value, true, false, false);

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
  const cost = calculateTotal(value, false, false, true);
  elements.totalCostBilingual.textContent = `$${cost.totalCost.toLocaleString()}`;

  // Update tier labels based on slider value
  updateTierLabels(value);

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

  updateSliderDisplay(elements.slider12, elements.sliderValueDisplay12, elements.sliderValueDisplay2Bilingual, value, true);
}

function updateTierLabels(value) {
  if (value <= 10) {
    elements.tierLabel.textContent = 'Tier 1 (1-10)';
    elements.tierPrice.textContent = '$12/hr';
    elements.tierLabel.style.color = '#39660b';
    elements.tierPrice.style.color = '#39660b';
    elements.tierLabel.style.fontWeight = '900';
    elements.tierPrice.style.fontWeight = '900';
  } else if (value <= 20) {
    elements.tierLabel.textContent = 'Tier 2 (11-20)';
    elements.tierPrice.textContent = '$11.5/hr';
    elements.tierLabel.style.color = '#E6B705';
    elements.tierPrice.style.color = '#E6B705';
  } else {
    elements.tierLabel.textContent = 'Tier 3 (21+)';
    elements.tierPrice.textContent = '$11/hr';
    elements.tierLabel.style.color = '#A5111F';
    elements.tierPrice.style.color = '#A5111F';
  }
}

function updateFTTierLabels(value) {
  if (value <= 10) {
    elements.ftTierLabel.textContent = 'Tier 1 (1-10)';
    elements.ftTierPrice.textContent = '$10/hr';
    elements.ftTierLabel.style.color = '#39660b';
    elements.ftTierPrice.style.color = '#39660b';
    elements.ftTierLabel.style.fontWeight = '900';
    elements.ftTierPrice.style.fontWeight = '900';
  } else if (value <= 20) {
    elements.ftTierLabel.textContent = 'Tier 2 (11-20)';
    elements.ftTierPrice.textContent = '$9.50/hr';
    elements.ftTierLabel.style.color = '#E6B705';
    elements.ftTierPrice.style.color = '#E6B705';
  } else {
    elements.ftTierLabel.textContent = 'Tier 3 (21+)';
    elements.ftTierPrice.textContent = '$9/hr';
    elements.ftTierLabel.style.color = '#A5111F';
    elements.ftTierPrice.style.color = '#A5111F';
  }
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
  const thumbOffset = ((percent - 1) / 39) * (sliderRect.width - thumbWidth);  // Changed to use 39 as range (40-1)

  displayElement.textContent = value;
  if (displayElement2) displayElement2.textContent = value;

  if (window.innerWidth < breakpoints.tablet) {
    displayElement.style.left = `${thumbOffset}px`;
    displayElement.style.transform = 'none';
  } else {
    displayElement.style.left = '';
    displayElement.style.transform = `translateX(${thumbOffset}px)`;
  }

  let background;
  if (value <= 10) {
    background = `linear-gradient(to right, #869874 0% ${((percent-1)/39)*100}%, #E5E7EB ${((percent-1)/39)*100}% 100%)`;
  } else if (value <= 20) {
    background = `linear-gradient(to right, #869874 0% ${(9.3/39)*100}%, #E6B705 ${(9.3/39)*100}% ${((percent-1)/39)*100}%, #E5E7EB ${((percent-1)/39)*100}% 100%)`;
  } else {
    background = `linear-gradient(to right, #869874 0% ${(9.3/39)*100}%, #E6B705 ${(9.3/39)*100}% ${(19/39)*100}%, #A5111F ${(19/39)*100}% ${((percent-1)/39)*100}%, #E5E7EB ${((percent-1)/39)*100}% 100%)`;
  }
  sliderElement.style.background = background;
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

function init() {
  // Initial setup
  elements.dropdownRadioHelper.classList.remove('show');
  elements.dropdownInformation2.classList.add('show');
  elements.dropdownRadioHelper.parentElement.classList.remove('bg-white');
  elements.dropdownInformation2.parentElement.classList.add('bg-white');
  
  // Set initial states
  elements.commonVaSection.classList.add('hidden');
  elements.twelveDollarSection.classList.remove('hidden');
  dropdownStates.bilingualVA = true;
  dropdownStates.fullTimeVA = false;
  
  // Add transition styles with slower, smoother animations
  const transitionStyle = 'max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  elements.dropdownRadioHelper.style.transition = transitionStyle;
  elements.dropdownInformation2.style.transition = transitionStyle;
  elements.dropdownRadioHelper.style.overflow = 'hidden';
  elements.dropdownInformation2.style.overflow = 'hidden';
  
  // Set initial heights
  elements.dropdownRadioHelper.style.maxHeight = '0';
  elements.dropdownInformation2.style.maxHeight = '2000px';
  
  // Set initial button styles
  toggleButtonStyles(false);
  
  // Set initial icons
  updateExpandCollapseIcon(elements.btn12Dollar, true);
  updateExpandCollapseIcon(elements.btn12DollarBilingual, true);
  updateExpandCollapseIcon(elements.btnCommonVA, false);
  updateExpandCollapseIcon(elements.btnCommonVABilingual, false);
  
  updateUI(elements.slider.value);
  updateSlider12UI(elements.slider12.value);
  setupEventListeners();
  setupResponsiveBehavior();
}

document.addEventListener('DOMContentLoaded', init);