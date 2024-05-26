'use client';

import { FormEvent, ReactNode, useState } from 'react';
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
import { formatPercentage } from '../../../../lib/formatters';
import { PeriodType } from '../../_lib/enums';
import { convertRate } from '../_lib/rateConverter';
import { z } from 'zod';

const rateConverterSchema = z.object({
	rate: z.coerce
		.number({ message: 'Campo Obrigatório' })
		.min(0, { message: 'Valor mínimo é 0' }),
});

export function RateConverterForm() {
	const [rate, setRate] = useState<number>();
	const [toRate, setToRate] = useState(PeriodType.MONTH);
	const [error, setError] = useState<{
		rate?: string[];
	}>();
	const [result, setResult] = useState<ReactNode | null>(null);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		const checkForm = rateConverterSchema.safeParse({
			rate,
		});

		if (checkForm.success === false) {
			setError(checkForm.error.formErrors.fieldErrors);
			setResult(undefined);
		} else {
			setError(undefined);
			const { rate } = checkForm.data;
			const result = convertRate(rate, toRate);

			setResult(
				<>
					<p className="text-center">
						{formatPercentage(rate / 100)} ao
						{toRate === PeriodType.MONTH ? ' ano' : ' mês'} equivale a
						<span className="font-bold text-lg mx-2">
							{formatPercentage(result)}
						</span>
						ao {toRate === PeriodType.MONTH ? 'mês' : 'ano'}
					</p>
				</>
			);
		}
	}

	return (
		<>
			<div className="flex justify-center mt-8">
				<form onSubmit={handleSubmit} className="space-y-6 md:w-2/3 w-full">
					<div className="space-y-2">
						<Label htmlFor="rate">
							Taxa ao {toRate === PeriodType.MONTH ? 'ano' : 'mês'}(%)
						</Label>
						<Input
							type="number"
							value={rate}
							onChange={e => setRate(+e.target.value)}
							id="rate"
							step={0.01}
						/>
						{error?.rate && (
							<div className="text-destructive text-sm">{error.rate}</div>
						)}
					</div>
					<div className="space-y-2">
						<Label>Converter para taxa</Label>
						<Select
							value={toRate}
							onValueChange={e => setToRate(e as PeriodType)}
							name="toRate"
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem defaultChecked={true} value={PeriodType.MONTH}>
									Mensal
								</SelectItem>
								<SelectItem value={PeriodType.YEAR}>Anual</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<Button type="submit">Calcular</Button>
				</form>
			</div>
			{result && (
				<div className="flex justify-center mt-4 items-center">{result}</div>
			)}
		</>
	);
}
