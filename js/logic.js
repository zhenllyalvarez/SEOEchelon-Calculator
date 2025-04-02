export function calculateTotal(hired, isAnnual = false, isVA = false, isBilingual = false) {
    function getTotalPricePerHour(count) {
        const rates = [
            { threshold: 20, rate: 9 },
            { threshold: 10, rate: 9.50 },
            { threshold: 0, rate: 10 }
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
    
    function getBilingualTotalPrice(count) {
        const rates = [
            { threshold: 20, rate: 11 },
            { threshold: 10, rate: 11.50 },
            { threshold: 0, rate: 12 }
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
    
    for (let i = 1; i <= hired; i++) {
        let hourlyRate = 10;

        if (i > 20) {
            hourlyRate = 9;
        } else if (i > 10) {
            hourlyRate = 9.50;
        }
        
        totalAnnualWage += hourlyRate * hoursPerYear;
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