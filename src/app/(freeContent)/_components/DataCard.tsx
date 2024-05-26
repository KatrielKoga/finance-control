import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from '../../../components/ui/card';

type DataCardProps = {
	title: string;
	body: string;
};

export function DataCard({ title, body }: DataCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardDescription>{title}</CardDescription>
			</CardHeader>
			<CardContent className="text-center">
				<h3 className="text-2xl font-bold">{body}</h3>
			</CardContent>
		</Card>
	);
}
