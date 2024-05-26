'use client';

import { FormEvent, useState } from 'react';
import { z } from 'zod';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../components/ui/select';
import { PeriodType } from '../../_lib/enums';
import { convertRate } from '../../rate-converter/_lib/rateConverter';
import { getCompoundInterest } from '../_lib/compoundInterest';
import CompoundInterestData from './CompoundInterestData';
import { CompoundInterestSummary } from './CompoundInterestSummary';

const compoundInterestSchema = z.object({
	initialValue: z.coerce
		.number({ message: 'Campo Obrigatório' })
		.min(0, { message: 'Campo precisa ser positivo' }),
	contribution: z.coerce
		.number({ message: 'Campo Obrigatório' })
		.min(0, { message: 'Campo precisa ser positivo' }),
	rate: z.coerce
		.number({ message: 'Campo Obrigatório' })
		.min(0.01, { message: 'Valor mínimo é 0,01' }),
	period: z.coerce
		.number({ message: 'Campo Obrigatório' })
		.min(1, { message: 'Valor mínimo é 1' }),
});

export function CompoundInterestForm() {
	const [initialValue, setInitialValue] = useState<number>();
	const [contribution, setContribution] = useState<number>();
	const [rate, setRate] = useState<number>();
	const [rateType, setRateType] = useState<PeriodType>(PeriodType.YEAR);
	const [period, setPeriod] = useState<number>();
	const [periodType, setPeriodType] = useState<PeriodType>(PeriodType.MONTH);
	const [error, setError] = useState<{
		initialValue?: string[];
		contribution?: string[];
		rate?: string[];
		period?: string[];
	}>();
	const [summary, setSummary] = useState<any>();
	const [table, setTable] = useState<any>();

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const result = compoundInterestSchema.safeParse({
			initialValue,
			contribution,
			rate,
			period,
		});

		if (result.success === false) {
			setError(result.error.formErrors.fieldErrors);
		} else {
			setError(undefined);
			const { contribution, initialValue, period, rate } = result.data;

			const periodInMonths =
				periodType === PeriodType.MONTH ? period : period * 12;
			const monthlyRate =
				rateType === PeriodType.YEAR
					? convertRate(rate, PeriodType.MONTH)
					: rate;

			const { summary, table } = getCompoundInterest({
				contribution,
				initialValue,
				monthlyRate,
				periodInMonths,
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
						<Label htmlFor="initialValue">Valor Inicial (R$)</Label>
						<Input
							type="number"
							id="initialValue"
							step={0.01}
							onChange={e => setInitialValue(+e.target.value)}
							value={initialValue}
						/>
						{error?.initialValue && (
							<div className="text-destructive text-sm">
								{error.initialValue}
							</div>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="contribution">Aporte Mensal (R$)</Label>
						<Input
							type="number"
							id="contribution"
							step={0.01}
							onChange={e => setContribution(+e.target.value)}
							value={contribution}
						/>
						{error?.contribution && (
							<div className="text-destructive text-sm">
								{error.contribution}
							</div>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="rate">Taxa de Juros (%)</Label>
						<div className="flex">
							<Input
								className="flex-grow rounded-e-none"
								type="number"
								id="rate"
								step={0.01}
								onChange={e => setRate(+e.target.value)}
								value={rate}
							/>
							<Select
								value={rateType}
								onValueChange={e => setRateType(e as PeriodType)}
								name="toRate"
							>
								<SelectTrigger className="rounded-s-none px-6 w-1/6 min-w-fit">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={PeriodType.MONTH}>Mensal</SelectItem>
									<SelectItem value={PeriodType.YEAR}>Anual</SelectItem>
								</SelectContent>
							</Select>
						</div>
						{error?.rate && (
							<div className="text-destructive text-sm">{error.rate}</div>
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
									<SelectItem value={PeriodType.MONTH}>Meses</SelectItem>
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
					<CompoundInterestSummary summary={summary} />
					<CompoundInterestData table={table} />
				</div>
			)}
		</>
	);
}
