import { calculateTotal } from './logic.js';

const slider = document.getElementById('slider');
const totalCost = document.getElementById('totalCost');
const sliderValueDisplay = document.getElementById('sliderValueDisplay');

function updateUI(value) {
    const cost = calculateTotal(value);
    totalCost.innerText = `$${cost}`;

    // Calculate percentage for background fill
    const percent = (value / slider.max) * 100;
    slider.style.background = `linear-gradient(to right, #FB923C ${percent}%, #E5E7EB ${percent}%)`;
    
    // Get slider position and adjust for the width of the thumb
    const sliderRect = slider.getBoundingClientRect();
    const thumbWidth = 24; // Slider thumb width
    const thumbOffset = (percent / 100) * (sliderRect.width - thumbWidth);

    // Center the value display below the slider thumb
    sliderValueDisplay.style.left = `${thumbOffset + thumbWidth / 2 - sliderValueDisplay.offsetWidth / 2}px`;
    sliderValueDisplay.innerText = value;
}

// Initialize on load
updateUI(slider.value);
slider.addEventListener('input', () => updateUI(slider.value));
