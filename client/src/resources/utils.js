const FORMATTER = Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

const formatInt = (number) => {
    return isNaN(number) ? "" : FORMATTER.format(number)
}

export {
    formatInt,
}