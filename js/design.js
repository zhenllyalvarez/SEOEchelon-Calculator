import { calculateTotal } from './logic.js';

const slider = document.getElementById('slider');
const totalCost = document.getElementById('totalCost');
const sliderValueDisplay = document.getElementById('sliderValueDisplay');
const btnCommonVA = document.getElementById('btnCommonVA');
const btn12Dollar = document.getElementById('btn12Dollar');
const commonVaSection = document.getElementById('commonVaSection');
const twelveDollarSection = document.getElementById('twelveDollarSection');

function updateUI(value) {
    const cost = calculateTotal(value);
    totalCost.innerText = `$${cost}`;

    const percent = (value / slider.max) * 100;
    slider.style.background = `linear-gradient(to right, #FB923C ${percent}%, #E5E7EB ${percent}%)`;
    
    const sliderRect = slider.getBoundingClientRect();
    const thumbWidth = 24; 
    const thumbOffset = (percent / 100) * (sliderRect.width - thumbWidth);

    sliderValueDisplay.style.left = `${thumbOffset + thumbWidth / 2 - sliderValueDisplay.offsetWidth / 2}px`;
    sliderValueDisplay.innerText = value;
}

// Initialize on load
updateUI(slider.value);
slider.addEventListener('input', () => updateUI(slider.value));

// Toggle between sections & button styles
btnCommonVA.addEventListener('click', () => {
    commonVaSection.classList.remove('hidden');
    twelveDollarSection.classList.add('hidden');

    btnCommonVA.classList.add('bg-orange-500', 'text-white');
    btnCommonVA.classList.remove('bg-gray-200', 'text-black');

    btn12Dollar.classList.add('bg-gray-200', 'text-black');
    btn12Dollar.classList.remove('bg-orange-500', 'text-white');
});

btn12Dollar.addEventListener('click', () => {
    twelveDollarSection.classList.remove('hidden');
    commonVaSection.classList.add('hidden');

    btn12Dollar.classList.add('bg-orange-500', 'text-white');
    btn12Dollar.classList.remove('bg-gray-200', 'text-black');

    btnCommonVA.classList.add('bg-gray-200', 'text-black');
    btnCommonVA.classList.remove('bg-orange-500', 'text-white');
});
