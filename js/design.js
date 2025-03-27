import { calculateTotal, costOfHiringTotal } from './logic.js';

const slider = document.getElementById('slider');
const totalCost = document.getElementById('totalCost');
const annualCost = document.getElementById('FTAnnual');
const Awage = document.getElementById('AnnualWage');
const AnnualWageVA = document.getElementById('AnnualWageVA');
const medicalVA = document.getElementById('medicalVA');
const sliderValueDisplay = document.getElementById('sliderValueDisplay');
const sliderDisplay2 = document.getElementById('sliderValueDisplay2');
const btnCommonVA = document.getElementById('btnCommonVA');
const btn12Dollar = document.getElementById('btn12Dollar');
const commonVaSection = document.getElementById('commonVaSection');
const twelveDollarSection = document.getElementById('twelveDollarSection');

function updateUI(value) {
    const cost = calculateTotal(value);
    totalCost.innerText = `$${cost}`;

    const annualValue = calculateTotal(value, true);
    annualCost.innerText = `$${annualValue.toLocaleString()}`;

    if (Awage) {
        const wageValue = calculateTotal(value, true);
        Awage.innerText = `$${wageValue.toLocaleString()}`;
    }

    if(medicalVA) {
        const vaCost = costOfHiringTotal(value, true);
        medicalVA.innerText = `$${vaCost.toLocaleString()}`;
    }

    const percent = (value / slider.max) * 100;
    slider.style.background = `linear-gradient(to right, #189DA4 ${percent}%, #E5E7EB ${percent}%)`;
    
    const sliderRect = slider.getBoundingClientRect();
    const thumbWidth = 24; 
    const thumbOffset = (percent / 100) * (sliderRect.width - thumbWidth);

    sliderValueDisplay.style.left = `${thumbOffset + thumbWidth / 2 - sliderValueDisplay.offsetWidth / 2}px`;
    sliderValueDisplay.innerText = value;
    sliderDisplay2.innerText = value;
}

updateUI(slider.value);
slider.addEventListener('input', () => updateUI(slider.value));

btnCommonVA.addEventListener('click', () => {
    commonVaSection.classList.remove('hidden');
    twelveDollarSection.classList.add('hidden');

    btnCommonVA.classList.add('bg-[#189DA4]', 'text-white');
    btnCommonVA.classList.remove('bg-[#5EB3B7]', 'text-gray-100');

    btn12Dollar.classList.add('bg-[#5EB3B7]', 'text-gray-100');
    btn12Dollar.classList.remove('bg-[#189DA4]', 'text-white');
});

btn12Dollar.addEventListener('click', () => {
    twelveDollarSection.classList.remove('hidden');
    commonVaSection.classList.add('hidden');

    btn12Dollar.classList.add('bg-[#189DA4]', 'text-white');
    btn12Dollar.classList.remove('bg-[#5EB3B7]', 'text-gray-100');

    btnCommonVA.classList.add('bg-[#5EB3B7]', 'text-gray-100');
    btnCommonVA.classList.remove('bg-[#189DA4]', 'text-white');
});


