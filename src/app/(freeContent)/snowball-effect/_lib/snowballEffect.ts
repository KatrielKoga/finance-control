export function getSnowballEffectData({
	periodInMonths,
	price,
	dividendYield,
	quotesPerMonth,
}: {
	periodInMonths: number;
	price: number;
	dividendYield: number;
	quotesPerMonth: number;
}) {
	let dividendPerMonth = 0,
		totalDividends = 0,
		quotes = 0,
		quotesByDividends = 0,
		patrimony = 0,
		surplus = 0,
		totalInvested = 0,
		buyOneMore = 0,
		buysWithDividend = 0;
	const table = [];
	const dividendByMonth =
		(Math.pow(1 + dividendYield / 100, 1 / 12) - 1) * price;
	for (let month = 1; month <= periodInMonths; month++) {
		totalInvested += quotesPerMonth * price;
		quotesByDividends += buysWithDividend + buyOneMore;
		quotes = quotes + quotesPerMonth + buysWithDividend + buyOneMore;
		dividendPerMonth = quotes * dividendByMonth;
		totalDividends += dividendPerMonth;
		patrimony = quotes * price;
		buysWithDividend = Math.floor(dividendPerMonth / price);
		surplus = surplus + dividendPerMonth - buysWithDividend * price;
		if (surplus >= price) {
			buyOneMore = 1;
			surplus -= price;
		} else {
			buyOneMore = 0;
		}
		table.push({
			dividendPerMonth,
			totalDividends: buysWithDividend + buyOneMore,
			quotes,
			quotesByDividends,
			patrimony: patrimony + surplus,
			totalInvested,
			month,
		});
	}

	return {
		summary: {
			dividendPerMonth,
			totalInvested,
			patrimony: patrimony + surplus,
			quotesByDividends,
			quotesByContribution: periodInMonths * quotesPerMonth,
		},
		table,
	};
}
