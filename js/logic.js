export function calculateTotal(hired, isAnnual = false, isVA = false) {
    function getTotalPricePerHour(count) {
        const rates = [
            { threshold: 20, rate: 9 },     // 21+ hires get $9/hour
            { threshold: 10, rate: 9.50 },  // 11-20 hires get $9.50/hour
            { threshold: 0, rate: 10 }      // 1-10 hires get $10/hour
        ];
        
        let total = 0;
        for (const { threshold, rate } of rates) {
            if (count > threshold) {
                total += (count - threshold) * rate;
                count = threshold;
            }
        }
        return total;
    }

    if (!isAnnual) return getTotalPricePerHour(hired);

    const hoursPerYear = 2080; // 40 hours per week * 52 weeks
    let totalAnnualWage = 0;

    // Calculate VA wage based on correct tiered discounting
    for (let i = 1; i <= hired; i++) {
        let hourlyRate = 10; // Default rate for first 10 hires

        if (i > 20) {
            hourlyRate = 9; // Beyond 20 hires
        } else if (i > 10) {
            hourlyRate = 9.50; // 11-20 hires
        }

        totalAnnualWage += hourlyRate * hoursPerYear;
    }

    // If not VA, use the default wage structure
    if (!isVA) {
        const payrollTaxes = 3465 * hired;
        const stateUnemploymentTax = 1260 * hired;
        const workersComp = 420 * hired;
        const officeSupplies = 1577 * hired;
        const paidLeave = 2423 * hired;
        const parkingSpot = 183 * hired;
        const insurance = 5061 * hired;

        const totalCost = (42000 * hired) + payrollTaxes + stateUnemploymentTax + workersComp +
                          officeSupplies + paidLeave + parkingSpot + insurance;

        return {
            annualWage: 42000 * hired,
            payrollTaxes,
            stateUnemploymentTax,
            workersComp,
            officeSupplies,
            paidLeave,
            parkingSpot,
            insurance,
            totalCost // New total cost field
        };
    }

    // Return corrected VA annual wage based on actual rates
    return {
        annualWage: totalAnnualWage,
        payrollTaxes: 0,
        stateUnemploymentTax: 0,
        workersComp: 0,
        officeSupplies: 0,
        paidLeave: 0,
        parkingSpot: 0,
        insurance: 0,
        totalCost: totalAnnualWage // VA total cost is just the wage
    };
}
