import Link from 'next/link';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../../components/ui/accordion';
import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';
import { PageHeader } from './_components/PageHeader';
import { ReactNode } from 'react';

export default function Home() {
	return (
		<>
			<PageHeader>App Controle Financeiro</PageHeader>
			<div className="flex justify-center flex-col items-center mt-8">
				<div className="w-full md:w-5/6 space-y-4">
					<div className="flex flex-col items-center gap-4">
						<div className="flex-grow w-full space-y-2">
							<h3 className="text-xl font-bold">Sobre</h3>
							<Separator />
						</div>
						<div className="w-full md:w-5/6">
							<p className="text-sm ml-2">
								<span className="ml-5" />
								Manter um controle financeiro eficiente é fundamental para
								evitar dívidas desnecessárias, planejar para o futuro, tomar
								decisões informadas, atingir objetivos financeiros e reduzir o
								estresse relacionado ao dinheiro. <br />
								<span className="ml-5" />
								Nosso sistema de controle financeiro facilita a gestão das suas
								finanças de forma prática e eficiente, oferecendo monitoramento
								em tempo real, relatórios personalizados, planejamento de
								orçamento, alertas de vencimento e lembretes de pagamentos, além
								de garantir segurança e privacidade das suas informações. <br />
								<span className="ml-5" />
								Com suporte e educação financeira, nossa plataforma proporciona
								as ferramentas necessárias para transformar sua vida financeira,
								ajudando você a alcançar seus sonhos e objetivos financeiros com
								mais segurança e liberdade.
							</p>
						</div>
						<div className="flex-grow w-full space-y-2">
							<h3 className="text-xl font-bold">Funcionalidades</h3>
							<Separator />
						</div>
						<div className="w-full md:w-5/6">
							<Accordion type="multiple">
								<AccordionItem value="snowballEffect">
									<AccordionTrigger>Efeito Bola de Neve</AccordionTrigger>
									<AccordionContent>
										<Content link="/snowball-effect">
											<span className="ml-5" />
											Nosso simulador do efeito bola de neve dos investimentos é
											uma ferramenta poderosa para visualizar como contribuições
											regulares e reinvestimento dos rendimentos podem acelerar
											o crescimento do seu patrimônio ao longo do tempo. <br />
											<span className="ml-5" /> Com uma interface amigável, você
											pode inserir o valor inicial, as contribuições periódicas,
											a taxa de retorno e o período de investimento para ver
											como seu capital se acumula e cresce exponencialmente.
											<br />
											<span className="ml-5" /> Este simulador é ideal para quem
											deseja entender o impacto do investimento contínuo e o
											reinvestimento dos lucros, auxiliando no planejamento
											financeiro e na definição de estratégias de investimento.
											Experimente nosso simulador e veja como pequenas
											contribuições regulares podem levar a grandes resultados
											financeiros.
										</Content>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="compoundInterest">
									<AccordionTrigger>
										Calculador de Juros Compostos
									</AccordionTrigger>
									<AccordionContent>
										<Content link="/compound-interest">
											<span className="ml-5" />
											Nossa calculadora de juros compostos é uma ferramenta
											essencial para quem deseja compreender e projetar o
											crescimento de seus investimentos ao longo do tempo.
											<br />
											<span className="ml-5" /> Com uma interface fácil de usar,
											você pode inserir o valor inicial, a taxa de juros, o
											período de tempo e a frequência de capitalização para
											calcular o montante futuro acumulado. <br />
											<span className="ml-5" /> Esta calculadora ajuda a
											visualizar como os juros compostos potencializam o
											crescimento do seu dinheiro, tornando-a indispensável para
											o planejamento financeiro, avaliação de investimentos e
											definição de metas de poupança. <br />
											<span className="ml-5" /> Entenda o poder dos juros
											compostos e otimize suas finanças com nossa calculadora de
											juros compostos.
										</Content>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="rateConverter">
									<AccordionTrigger>
										Calculador de Juros Compostos
									</AccordionTrigger>
									<AccordionContent>
										<Content link="/rate-converter">
											<span className="ml-5" />
											Nosso conversor de taxa de juros facilita a conversão
											entre taxas anuais e mensais, oferecendo uma ferramenta
											indispensável para quem precisa comparar e entender
											diferentes cenários financeiros.
											<br />
											<span className="ml-5" /> Com uma interface intuitiva, o
											conversor permite que você insira a taxa de juros anual
											para obter a taxa mensal correspondente, ou vice-versa,
											com precisão e rapidez.
										</Content>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function Content({ link, children }: { children: ReactNode; link: string }) {
	return (
		<div className="w-5/6 ml-6">
			<div className="flex flex-col items-center space-y-8 w-full">
				<p>{children}</p>
				<Button asChild className="w-full" size="lg">
					<Link href={link}>Experimente</Link>
				</Button>
			</div>
		</div>
	);
}
