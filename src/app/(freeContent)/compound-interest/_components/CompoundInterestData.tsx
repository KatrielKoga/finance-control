import { TabsContent } from '@radix-ui/react-tabs';
import {
	CartesianGrid,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../../../components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
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
			<div className="w-full md:w-5/6 flex justify-center">
				<Tabs defaultValue="table" className="w-full">
					<TabsList className="w-full">
						<TabsTrigger value="table" className="w-full">
							Tabela
						</TabsTrigger>
						<TabsTrigger value="chart" className="w-full">
							Gráfico
						</TabsTrigger>
					</TabsList>
					<TabsContent value="table">{renderTable(table)}</TabsContent>
					<TabsContent value="chart">{renderChart(table)}</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

function renderTable(
	table: {
		month: number;
		patrimony: number;
		totalInterest: number;
		totalInvested: number;
		monthInterest: number;
	}[]
) {
	return (
		<div className="max-h-96 overflow-x-scroll flex p-1 mt-4">
			<Table>
				<TableHeader className="sticky top-0 bg-secondary">
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
	);
}

function renderChart(
	table: {
		month: number;
		patrimony: number;
		totalInterest: number;
		totalInvested: number;
		monthInterest: number;
	}[]
) {
	const pieData = [
		{
			label: 'Total Investido',
			value: table[table.length - 1].totalInvested,
		},
		{
			label: 'Total em Juros',
			value: table[table.length - 1].totalInterest,
		},
	];
	return (
		<div className="max-h-96 overflow-x-scroll flex flex-col mt-4 items-end gap-4">
			<ResponsiveContainer width="90%" minHeight={300}>
				<LineChart data={table} {...{ overflow: 'visible' }}>
					<CartesianGrid />
					<XAxis dataKey={'month'} />
					<YAxis tickFormatter={value => formatCurrency(value)} />
					<Tooltip
						formatter={value => formatCurrency(value as number)}
						labelFormatter={value => `Mês ${value}`}
					/>
					<Line dataKey={'totalInvested'} name="Total Investido" dot={false} />
					<Line
						dataKey={'patrimony'}
						name="Patrimonio Total"
						stroke="green"
						dot={false}
					/>
				</LineChart>
			</ResponsiveContainer>
			<ResponsiveContainer width="90%" minHeight={300}>
				<LineChart data={table} {...{ overflow: 'visible' }}>
					<CartesianGrid />
					<XAxis dataKey={'month'} />
					<YAxis tickFormatter={value => formatCurrency(value)} />
					<Tooltip
						formatter={value => formatCurrency(value as number)}
						labelFormatter={value => `Mês ${value}`}
					/>
					<Line dataKey={'monthInterest'} name="Juros no Mês" dot={false} />
				</LineChart>
			</ResponsiveContainer>
			<ResponsiveContainer width="90%" minHeight={300}>
				<PieChart>
					<Tooltip formatter={value => formatCurrency(value as number)} />
					<Pie
						data={pieData}
						label={item => item.label}
						name="Valor"
						dataKey={'value'}
					/>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
