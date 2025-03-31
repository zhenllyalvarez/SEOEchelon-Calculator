import { calculateTotal } from './logic.js';

    const slider = document.getElementById('slider');
    const totalCost = document.getElementById('totalCost');
    const totalCostBilingual = document.getElementById('totalCostBilingual');
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
    const bilingualMedicalVA = document.getElementById('bilingualMedicalVA');
    const sliderValueDisplay = document.getElementById('sliderValueDisplay');
    const sliderDisplay2 = document.getElementById('sliderValueDisplay2');
    const btnCommonVA = document.getElementById('btnCommonVA');
    const btn12Dollar = document.getElementById('btn12Dollar');
    const commonVaSection = document.getElementById('commonVaSection');
    const twelveDollarSection = document.getElementById('twelveDollarSection');
    const slider12 = document.getElementById('slider12');
    const sliderValueDisplay12 = document.getElementById('sliderValueDisplay12');
    const sliderValueDisplay2Bilingual = document.getElementById('sliderValueDisplay2Bilingual');
    const AnnualWageVABilingual = document.getElementById('AnnualWageVABilingual');
    const totalValueInVABilingual = document.getElementById('totalValueInVABilingual');
    const BilingualVAInHouse = document.getElementById('BilingualVAInHouse');
    const PayrollTaxesBilingual = document.getElementById('PayrollTaxesBilingual');
    const AnnualWageBilingual = document.getElementById('AnnualWageBilingual');
    const SUTBilingual = document.getElementById('SUTBilingual');
    const WorkersCompensationBilingual = document.getElementById('WorkersCompensationBilingual');
    const OSASBilingual = document.getElementById('OSASBilingual');
    const PaidLeaveBilingual = document.getElementById('PaidLeaveBilingual');
    const ParkingSpotBilingual = document.getElementById('ParkingSpotBilingual');
    const InsuranceBilingual = document.getElementById('InsuranceBilingual');
    const totalCostIfNotVABilingual = document.getElementById('totalCostIfNotVABilingual');

    updateSlider12UI(slider12.value);
    slider12.addEventListener('input', () => updateSlider12UI(slider12.value));

    function updateUI(value, isVA = false) {
        const cost = calculateTotal(value);
        totalCost.innerText = `$${cost}`;

        const annualValues = calculateTotal(value, true, isVA, false);

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
            const vaCost = calculateTotal(value, true, true, false);
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

    function updateSlider12UI(value) {
        const cost = calculateTotal(value, false, false, true);
        totalCostBilingual.innerText = `$${cost.totalCost.toLocaleString()}`;

        const annualValues = calculateTotal(value, true, false, false);

        if (typeof annualValues === 'object') {
            BilingualVAInHouse.innerText = `$${annualValues.annualWage.toLocaleString()}`;
            if(AnnualWageBilingual) AnnualWageBilingual.innerText = `$${annualValues.annualWage.toLocaleString()}`;
            if(PayrollTaxesBilingual) PayrollTaxesBilingual.innerText = `$${annualValues.payrollTaxes.toLocaleString()}`;
            if(SUTBilingual) SUTBilingual.innerText = `$${annualValues.stateUnemploymentTax.toLocaleString()}`;
            if(WorkersCompensationBilingual) WorkersCompensationBilingual.innerText = `$${annualValues.workersComp.toLocaleString()}`;
            if(OSASBilingual) OSASBilingual.innerText = `$${annualValues.officeSupplies.toLocaleString()}`;
            if(PaidLeaveBilingual) PaidLeaveBilingual.innerText = `$${annualValues.paidLeave.toLocaleString()}`;
            if(ParkingSpotBilingual) ParkingSpotBilingual.innerText = `$${annualValues.parkingSpot.toLocaleString()}`;
            if(InsuranceBilingual) InsuranceBilingual.innerText = `$${annualValues.insurance.toLocaleString()}`;
        }

        if(totalCostIfNotVABilingual) {
            totalCostIfNotVABilingual.innerText = `$${annualValues.totalCost.toLocaleString()}`;
        }

        if (bilingualMedicalVA) {
            const vaBilingualCost = calculateTotal(value, true, false, true);

            // Ensure we're accessing the correct property
            bilingualMedicalVA.innerText = `$${vaBilingualCost.annualWage.toLocaleString()}`;
            AnnualWageVABilingual.innerText = `$${vaBilingualCost.annualWage.toLocaleString()}`;
            totalValueInVABilingual.innerText = `$${vaBilingualCost.annualWage.toLocaleString()}`;
        }
        console.log("Bilingual VA Cost:", calculateTotal(value, true, false, true));


        const percent = (value / slider12.max) * 100;
        slider12.style.background = `linear-gradient(to right, #189DA4 ${percent}%, #E5E7EB ${percent}%)`;

        const sliderRect = slider12.getBoundingClientRect();
        const thumbWidth = 24;
        const thumbOffset = (percent / 100) * (sliderRect.width - thumbWidth);

        sliderValueDisplay12.style.left = `${thumbOffset + thumbWidth / 2 - sliderValueDisplay12.offsetWidth / 2}px`;
        sliderValueDisplay12.innerText = value;
        sliderValueDisplay2Bilingual.innerText = value;
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