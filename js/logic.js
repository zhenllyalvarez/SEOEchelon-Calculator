export function calculateTotal(hired, isAnnual = false, isVA = false, isBilingual = false) {
    function getTotalPricePerHour(count) {
        let total = 0;
        
        if (count > 20) {
            total += (count - 20) * 9; // Tier 3: $9/hr for counts above 20
            count = 20;
        }
        if (count > 10) {
            total += (count - 10) * 9.50; // Tier 2: $9.50/hr for counts 11-20
            count = 10;
        }
        total += count * 10; // Tier 1: $10/hr for counts 1-10
        
        return total;
    }
    
    function getBilingualTotalPrice(count) {
        let total = 0;
        
        if (count > 20) {
            total += (count - 20) * 11; // Tier 3: $11/hr for counts above 20
            count = 20;
        }
        if (count > 10) {
            total += (count - 10) * 11.50; // Tier 2: $11.50/hr for counts 11-20
            count = 10;
        }
        total += count * 12; // Tier 1: $12/hr for counts 1-10
        
        return total;
    }
    
    if (isBilingual) {
        const hourlyWage = getBilingualTotalPrice(hired);
        const annualWage = hourlyWage * 2080;
    
        return {
            annualWage,
            totalCost: hourlyWage
        };
    }
    
    if (!isAnnual) return getTotalPricePerHour(hired);
    
    const hoursPerYear = 2080;
    let totalAnnualWage = 0;
    
    // Calculate annual wage based on tiered hourly rates
    if (hired > 20) {
        totalAnnualWage += (hired - 20) * 9 * hoursPerYear; // Tier 3
        totalAnnualWage += 10 * 9.50 * hoursPerYear; // Tier 2
        totalAnnualWage += 10 * 10 * hoursPerYear; // Tier 1
    } else if (hired > 10) {
        totalAnnualWage += (hired - 10) * 9.50 * hoursPerYear; // Tier 2
        totalAnnualWage += 10 * 10 * hoursPerYear; // Tier 1
    } else {
        totalAnnualWage += hired * 10 * hoursPerYear; // Tier 1
    }
    
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
            totalCost
        };
    }
    
    return {
        annualWage: totalAnnualWage,
        payrollTaxes: 0,
        stateUnemploymentTax: 0,
        workersComp: 0,
        officeSupplies: 0,
        paidLeave: 0,
        parkingSpot: 0,
        insurance: 0,
        totalCost: totalAnnualWage
    };
}       