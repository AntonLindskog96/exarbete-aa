export function generateOrderNumber() {

    const prefix = '#';
    const randomNumber = Math.floor(Math.random() * 1000000);
    const paddedNumber = String(randomNumber).padStart(6,'0');
    return `${prefix}${paddedNumber}`
}