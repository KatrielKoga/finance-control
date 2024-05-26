'use client';

import { FormEvent, useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';

import { Button } from '../../../../components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../components/ui/select';
import { PeriodType } from '../../_lib/enums';
import { getSnowballEffectData } from '../_lib/snowballEffect';
import SnowballEffectData from './SnowballEffectData';
import { SnowballEffectSummary } from './SnowballEffectSummary';
import { z } from 'zod';

const snowballEffectSchema = z.object({
	price: z.coerce
		.number({ message: 'Campo Obrigatório' })
		.min(0.01, { message: 'Valor mínimo é 0,01' }),
	dividendYield: z.coerce
		.number({ message: 'Campo Obrigatório' })
		.min(0.01, { message: 'Valor mínimo é 0,01' }),
	period: z.coerce
		.number({ message: 'Campo Obrigatório' })
		.min(1, { message: 'Valor mínimo é 1' }),
	quotesPerMonth: z.coerce
		.number({ message: 'Campo Obrigatório' })
		.min(1, { message: 'Valor mínimo é 1' }),
});

export function SnowballEffectForm() {
	const [price, setPrice] = useState<number>();
	const [dividendYield, setDividendYield] = useState<number>();
	const [quotesPerMonth, setQuotesPerMonth] = useState<number>();
	const [period, setPeriod] = useState<number>();
	const [periodType, setPeriodType] = useState<PeriodType>(PeriodType.MONTH);
	const [error, setError] = useState<{
		price?: string[];
		dividendYield?: string[];
		period?: string[];
		quotesPerMonth?: string[];
	}>();
	const [summary, setSummary] = useState<any>();
	const [table, setTable] = useState<any>();

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		const result = snowballEffectSchema.safeParse({
			price,
			dividendYield,
			period,
			quotesPerMonth,
		});

		if (result.success === false) {
			setError(result.error.formErrors.fieldErrors);
		} else {
			setError(undefined);

			const { price, dividendYield, period, quotesPerMonth } = result.data;

			const periodInMonths =
				periodType === PeriodType.MONTH ? period : period * 12;

			const { summary, table } = getSnowballEffectData({
				dividendYield,
				periodInMonths,
				price,
				quotesPerMonth,
			});

			setSummary(summary);
			setTable(table);
		}
	}

	return (
		<>
			<div className="flex justify-center mt-8">
				<form onSubmit={handleSubmit} className="space-y-6 w-full md:w-2/3">
					<div className="space-y-2">
						<Label htmlFor="price">Preço do Ativo (R$)</Label>
						<Input
							type="number"
							id="price"
							step={0.01}
							onChange={e => setPrice(+e.target.value)}
							value={price}
						/>
						{error?.price && (
							<div className="text-destructive text-sm">{error.price}</div>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="dividendYield">Dividend Yield (%)</Label>
						<Input
							type="number"
							id="dividendYield"
							step={0.01}
							onChange={e => setDividendYield(+e.target.value)}
							value={dividendYield}
						/>
						{error?.dividendYield && (
							<div className="text-destructive text-sm">
								{error.dividendYield}
							</div>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="quotesPerMonth">Cotas compradas pro mês</Label>
						<Input
							type="number"
							id="quotesPerMonth"
							onChange={e => setQuotesPerMonth(+e.target.value)}
							value={quotesPerMonth}
						/>
						{error?.quotesPerMonth && (
							<div className="text-destructive text-sm">
								{error.quotesPerMonth}
							</div>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="period">Período</Label>
						<div className="flex">
							<Input
								className="flex-grow rounded-e-none"
								type="number"
								id="period"
								onChange={e => setPeriod(+e.target.value)}
								value={period}
							/>
							<Select
								value={periodType}
								onValueChange={e => setPeriodType(e as PeriodType)}
								name="toRate"
							>
								<SelectTrigger className="rounded-s-none px-6 w-1/6 min-w-fit">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem defaultChecked={true} value={PeriodType.MONTH}>
										Meses
									</SelectItem>
									<SelectItem value={PeriodType.YEAR}>Anos</SelectItem>
								</SelectContent>
							</Select>
						</div>
						{error?.period && (
							<div className="text-destructive text-sm">{error.period}</div>
						)}
					</div>
					<Button type="submit">Calcular</Button>
				</form>
			</div>
			{summary && (
				<div>
					<SnowballEffectSummary summary={summary} />
					<SnowballEffectData table={table} />
				</div>
			)}
		</>
	);
}
