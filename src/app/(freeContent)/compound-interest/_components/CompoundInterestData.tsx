import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../../../components/ui/table';
import { formatCurrency } from '../../../../lib/formatters';

export default function CompoundInterestData({
	table,
}: {
	table: {
		month: number;
		patrimony: number;
		totalInterest: number;
		totalInvested: number;
		monthInterest: number;
	}[];
}) {
	return (
		<div className="mt-8 flex justify-center">
			<div className="w-full md:w-5/6 flex justify-center max-h-96 overflow-x-scroll relative">
				<Table>
					<TableHeader className="sticky top-0 bg-background">
						<TableRow>
							<TableHead>Mês</TableHead>
							<TableHead>Juros</TableHead>
							<TableHead>Total Investido</TableHead>
							<TableHead>Total em Juros</TableHead>
							<TableHead>Patrimonio Final</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{table.map((data, i) => (
							<TableRow key={i}>
								<TableCell>{data.month}</TableCell>
								<TableCell>{formatCurrency(data.monthInterest)}</TableCell>
								<TableCell>{formatCurrency(data.totalInvested)}</TableCell>
								<TableCell>{formatCurrency(data.totalInterest)}</TableCell>
								<TableCell>{formatCurrency(data.patrimony)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
