import { formatCurrency } from '../../../../lib/formatters';
import { DataCard } from '../../_components/DataCard';

export function CompoundInterestSummary({
	summary: { totalInvested, patrimony, totalInterest },
}: {
	summary: {
		totalInterest: number;
		totalInvested: number;
		patrimony: number;
	};
}) {
	return (
		<div className="flex justify-center">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 w-full md:w-2/3">
				<DataCard
					title="Total Investido"
					body={formatCurrency(totalInvested)}
				/>
				<DataCard title="Total em Juros" body={formatCurrency(totalInterest)} />
				<DataCard title="Patrimonio Final" body={formatCurrency(patrimony)} />
			</div>
		</div>
	);
}
