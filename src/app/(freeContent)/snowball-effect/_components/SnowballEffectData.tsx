import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../../../components/ui/table';
import { formatCurrency } from '../../../../lib/formatters';

export default function SnowballEffectData({
	table,
}: {
	table: {
		dividendPerMonth: number;
		totalDividends: number;
		quotes: number;
		quotesByDividends: number;
		patrimony: number;
		totalInvested: number;
		month: number;
	}[];
}) {
	return (
		<div className="mt-8 flex justify-center">
			<div className="w-full md:w-5/6 flex justify-center max-h-96 overflow-x-scroll relative">
				<Table>
					<TableHeader className="sticky top-0 bg-background">
						<TableRow>
							<TableHead>Mês</TableHead>
							<TableHead>Dividendo no mês</TableHead>
							<TableHead>Cotas</TableHead>
							<TableHead>Cotas por dividendo</TableHead>
							<TableHead>Patrimonio</TableHead>
							<TableHead>Valor Investido</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{table.map((data, i) => (
							<TableRow key={i}>
								<TableCell>{data.month}</TableCell>
								<TableCell>{formatCurrency(data.dividendPerMonth)}</TableCell>
								<TableCell>{data.quotes}</TableCell>
								<TableCell>{data.quotesByDividends}</TableCell>
								<TableCell>{formatCurrency(data.patrimony)}</TableCell>
								<TableCell>{formatCurrency(data.totalInvested)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
