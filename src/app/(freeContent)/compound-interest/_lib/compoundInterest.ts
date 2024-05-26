export function getCompoundInterest({
	contribution,
	initialValue,
	monthlyRate,
	periodInMonths,
}: {
	initialValue: number;
	periodInMonths: number;
	contribution: number;
	monthlyRate: number;
}) {
	let totalFinal = initialValue,
		totalInvested = initialValue,
		totalInterest = 0,
		monthInterest = 0;

	const table = [];
	for (let month = 1; month <= periodInMonths; month++) {
		if (month !== 1) {
			totalInvested += contribution;
			totalFinal += contribution;
		}

		monthInterest = totalFinal * monthlyRate;
		totalInterest += monthInterest;
		totalFinal += monthInterest;
		table.push({
			month,
			patrimony: totalFinal,
			totalInterest,
			totalInvested,
			monthInterest,
		});
	}

	return {
		summary: {
			totalInvested,
			patrimony: totalFinal,
			totalInterest,
		},
		table,
	};
}
