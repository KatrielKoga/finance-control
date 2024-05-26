import { formatCurrency } from '../../../../lib/formatters';
import { DataCard } from '../../_components/DataCard';

export function SnowballEffectSummary({
	summary: {
		dividendPerMonth,
		totalInvested,
		patrimony,
		quotesByContribution,
		quotesByDividends,
	},
}: {
	summary: {
		dividendPerMonth: number;
		totalInvested: number;
		patrimony: number;
		quotesByDividends: number;
		quotesByContribution: number;
	};
}) {
	return (
		<div className="flex justify-center">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 w-full md:w-2/3">
				<DataCard
					title="Dividendo no Último Mês"
					body={formatCurrency(dividendPerMonth)}
				/>
				<DataCard
					title="Total Investido"
					body={formatCurrency(totalInvested)}
				/>
				<DataCard title="Patrimonio Final" body={formatCurrency(patrimony)} />
				<DataCard
					title="Cotas Compradas com Dividendo"
					body={String(quotesByDividends)}
				/>
				<DataCard
					title="Cotas Compradas com Aporte"
					body={String(quotesByContribution)}
				/>
			</div>
		</div>
	);
}
