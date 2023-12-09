export function dollarStringToNumber(dollarString){
    const lastDollarIndex = dollarString.lastIndexOf('$');

    if (lastDollarIndex !== -1) {
        const result = dollarString.slice(lastDollarIndex + 1).replace(/,/g, '');
        return Number(result);
    }
    return Number(dollarString).replace(/,/g, '');
}