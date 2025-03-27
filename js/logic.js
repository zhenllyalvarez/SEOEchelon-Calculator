export function calculateTotal(hired, isAnnual = false) {
    function getTotalPricePerHour(count) {
        let total = 0;

        if (count > 20) {
            total += (count - 20) * 9; 
            count = 20;
        }
        if (count > 10) {
            total += (count - 10) * 9.50; 
            count = 10;
        }
        total += count * 10;

        return total;
    }

    if (isAnnual) {
        return 42000 * hired;
    }

    return getTotalPricePerHour(hired);
}


export function costOfHiringTotal(hired, isAnnual = true) {
    function priceHour(count) {
        let total = 0;

        if (count > 20) {
            total += (count - 20) * 9; // 21+ hires at $9/hour
            count = 20;
        }
        if (count > 10) {
            total += (count - 10) * 9.50; // 11–20 hires at $9.50/hour
            count = 10;
        }
        total += count * 10; // 1–10 hires at $10/hour

        return total;
    }

    const hourlyCost = priceHour(hired);

    if (isAnnual) {
        const annualHours = 20800; // Correct annual work hours per person
        return hourlyCost * annualHours;
    }

    return hourlyCost;
}

