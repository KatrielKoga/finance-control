const PERCENTAGE_FORMATTER = Intl.NumberFormat('pt-BR', {
	style: 'percent',
	minimumFractionDigits: 2,
});

export function formatPercentage(number: number) {
	return PERCENTAGE_FORMATTER.format(number);
}

const CURRENCY_FORMATTER = Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
});

export function formatCurrency(amount: number) {
	return CURRENCY_FORMATTER.format(amount);
}
