export function calculateTotal(value) {
    let total = 0;

    if(value <= 10) {
        total = value * 10;
    } else if (value <= 20) {
        total = value * 9.50;
    } else {
        total = value * 9;
    }
    return total;
}