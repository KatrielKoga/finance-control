import { PeriodType } from '../../_lib/enums';

export function convertRate(rate: number, toRate: PeriodType) {
	const pow = toRate === PeriodType.MONTH ? 1 / 12 : 12;
	return Math.pow(1 + rate / 100, pow) - 1;
}
