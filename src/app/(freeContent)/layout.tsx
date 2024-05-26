import { AlignJustify } from 'lucide-react';
import { Nav, NavLink } from '../../components/Nav';

export default function FreeContentLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Nav>
				<NavLink href={'/'}>Home</NavLink>
				<div className="md:flex items-center hidden">
					<NavLink href={'/snowball-effect'}>Efeito Bola de Neve</NavLink>
					<NavLink href={'/compound-interest'}>Juros Compostos</NavLink>
					<NavLink href={'/rate-converter'}>Conversor Taxa de Juros</NavLink>
				</div>
				<NavLink href={'/logged-area'}>
					<AlignJustify />
				</NavLink>
			</Nav>
			<div className="container my-6">{children}</div>
		</>
	);
}
