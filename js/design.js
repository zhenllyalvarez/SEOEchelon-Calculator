import { calculateTotal } from './logic.js';

const slider = document.getElementById('slider');
const totalCost = document.getElementById('totalCost');
const totalCostIfNotVA = document.getElementById('totalCostIfNotVA');
const annualCost = document.getElementById('FTAnnual');
const Awage = document.getElementById('AnnualWage');
const AwageVA = document.getElementById('AnnualWageVA');
const AwageAlltotalValue = document.getElementById('totalValueInVA');
const PayrollTaxes = document.getElementById('PayrollTaxes');
const Sut = document.getElementById('SUT');
const WorkersCompensation = document.getElementById('WorkersCompensation');
const Osas = document.getElementById('OSAS');
const PaidLeave = document.getElementById('PaidLeave');
const ParkingSpot = document.getElementById('ParkingSpot');
const Insurance = document.getElementById('Insurance');
const medicalVA = document.getElementById('medicalVA');
const sliderValueDisplay = document.getElementById('sliderValueDisplay');
const sliderDisplay2 = document.getElementById('sliderValueDisplay2');
const btnCommonVA = document.getElementById('btnCommonVA');
const btn12Dollar = document.getElementById('btn12Dollar');
const commonVaSection = document.getElementById('commonVaSection');
const commonVaSectionTable = document.getElementById('commonVaSectionTable');
const twelveDollarSection = document.getElementById('twelveDollarSection');
const twelveDollarSectionTable = document.getElementById('twelveDollarSectionTable');

function updateUI(value, isVA = false) {
    const cost = calculateTotal(value);
    totalCost.innerText = `$${cost}`;

    const annualValues = calculateTotal(value, true, isVA);


    if (typeof annualValues === 'object') {
        annualCost.innerText = `$${annualValues.annualWage.toLocaleString()}`;
        if (Awage) Awage.innerText = `$${annualValues.annualWage.toLocaleString()}`;
        if (PayrollTaxes) PayrollTaxes.innerText = `$${annualValues.payrollTaxes.toLocaleString()}`;
        if (Sut) Sut.innerText = `$${annualValues.stateUnemploymentTax.toLocaleString()}`;
        if (WorkersCompensation) WorkersCompensation.innerText = `$${annualValues.workersComp.toLocaleString()}`;
        if (Osas) Osas.innerText = `$${annualValues.officeSupplies.toLocaleString()}`;
        if (PaidLeave) PaidLeave.innerText = `$${annualValues.paidLeave.toLocaleString()}`;
        if (ParkingSpot) ParkingSpot.innerText = `$${annualValues.parkingSpot.toLocaleString()}`;
        if (Insurance) Insurance.innerText = `$${annualValues.insurance.toLocaleString()}`;
    }

    if(totalCostIfNotVA) {
        totalCostIfNotVA.innerText = `$${annualValues.totalCost.toLocaleString()}`;
    }

    if (medicalVA) {
        const vaCost = calculateTotal(value, true, true);
        medicalVA.innerText = `$${vaCost.annualWage.toLocaleString()}`;
        AwageVA.innerText = `$${vaCost.annualWage.toLocaleString()}`;
        AwageAlltotalValue.innerText = `$${vaCost.annualWage.toLocaleString()}`;
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
    commonVaSectionTable.classList.remove('hidden');
    twelveDollarSection.classList.add('hidden');
    twelveDollarSectionTable.classList.add('hidden');

    btnCommonVA.classList.add('bg-[#189DA4]', 'text-white');
    btnCommonVA.classList.remove('bg-[#5EB3B7]', 'text-gray-100');

    btn12Dollar.classList.add('bg-[#5EB3B7]', 'text-gray-100');
    btn12Dollar.classList.remove('bg-[#189DA4]', 'text-white');
});

btn12Dollar.addEventListener('click', () => {
    twelveDollarSection.classList.remove('hidden');
    twelveDollarSectionTable.classList.remove('hidden');
    commonVaSection.classList.add('hidden');
    commonVaSectionTable.classList.add('hidden');

    btn12Dollar.classList.add('bg-[#189DA4]', 'text-white');
    btn12Dollar.classList.remove('bg-[#5EB3B7]', 'text-gray-100');

    btnCommonVA.classList.add('bg-[#5EB3B7]', 'text-gray-100');
    btnCommonVA.classList.remove('bg-[#189DA4]', 'text-white');
});