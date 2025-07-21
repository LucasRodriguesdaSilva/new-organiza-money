import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, DollarSign, PieChart, Plus, Target, TrendingUp } from "lucide-react";

interface Investimento {
    product: string;
    amount: number;
    percentage: number;
    yield: number;
    maturity: string;
    risk: 'Baixo' | 'Médio' | 'Alto';
};

const Investimentos: Investimento[] = [
  { product: "CDB Banco X", amount: 15000, percentage: 35, yield: 12.5, maturity: "2026", risk: "Baixo" },
  { product: "Tesouro IPCA+", amount: 12000, percentage: 28, yield: 11.8, maturity: "2030", risk: "Baixo" },
  { product: "LCA Banco Y", amount: 8000, percentage: 19, yield: 10.2, maturity: "2025", risk: "Baixo" },
  { product: "Tesouro Selic", amount: 5000, percentage: 12, yield: 13.2, maturity: "2024", risk: "Baixo" },
  { product: "Ações (ITUB4)", amount: 2500, percentage: 6, yield: 15.8, maturity: "-", risk: "Alto" },
];

interface RetornoMensal {
    month: string;
    amount: number;
    projected?: boolean;
};

const monthlyReturns: RetornoMensal[] = [
    { month: "jun/25", amount: 425 },
    { month: "jul/25", amount: 438 },
    { month: "ago/25", amount: 445 },
    { month: "set/25", amount: 452, projected: true },
];

interface Diversificação {
    fixedIncome: number;
    variableIncome: number; 
    idealFixed: number;
    idealVariable: number;
};

const diversification: Diversificação = {
    fixedIncome: 94,
    variableIncome: 6,
    idealFixed: 75,
    idealVariable: 25
};

const InvestimentosView = () => {
    const totalInvested = Investimentos.reduce((sum, inv) => sum + inv.amount, 0);
    const averageYield = Investimentos.reduce((sum, inv) => sum + (inv.yield * inv.percentage / 100), 0);
    const yearlyProjection = (totalInvested * averageYield) / 100;
    const monthlyIncome = monthlyReturns.filter(month => !month.projected)
        .reduce((sum, month) => sum + month.amount, 0) / monthlyReturns.filter(month => !month.projected).length;

    return (
        <div className="space-y-6 p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Investimentos</h1>
                    <p className="text-muted-foreground mt-1">Gerencie sua carteira de investimentos</p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Novo Investimento
                </Button>
            </div>

            {/* Resumo dos Investimentos */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Investido</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">R$ {totalInvested.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+8.5% no último mês</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rentabilidade Média</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{averageYield.toFixed(1)}%</div>
                        <p className="text-xs text-muted-foreground">ao ano</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Projeção Anual</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {yearlyProjection.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">em rendimentos</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Renda Mensal</CardTitle>
                        <PieChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {Math.round(monthlyIncome)}</div>
                        <p className="text-xs text-muted-foreground">média últimos 3 meses</p>
                    </CardContent>
                </Card>
            </div>

            {/* Carteira de Investimentos */}
            <Card>
                <CardHeader>
                    <CardTitle>Carteira de Investimentos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {Investimentos.map((investimentos, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{investimentos.product}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Vencimento: {investimentos.maturity} • Risco: {investimentos.risk}</p>
                                    </div>
                                </div>
                                <div className="text-right space-x-4 flex items-center">
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">Rentabilidade</p>
                                        <p className="font-semibold text-green-600">{investimentos.yield}% a.a.</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">% Carteira</p>
                                        <p className="font-semibold">{investimentos.percentage}%</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">R$ {investimentos.amount.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Diversificação */}
            <Card>
                <CardHeader>
                    <CardTitle>Análise de Diversificação</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Renda Fixa</span>
                                    <span className="font-semibold">{diversification.fixedIncome}%</span>
                                </div>
                                <progress value={diversification.fixedIncome} className="w-full" />
                                <p className="text-sm text-muted-foreground">
                                    Ideal: {diversification.idealFixed}% - Você está com mais renda fixa que o recomendado
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Renda Variável</span>
                                    <span className="font-semibold">{diversification.variableIncome}%</span>
                                </div>
                                <progress value={diversification.variableIncome} className="w-full" />
                                <p className="text-sm text-muted-foreground">
                                    Ideal: {diversification.idealVariable}% - Considere aumentar exposição em ações/fundos
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <div className="flex items-start space-x-3">
                                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-orange-800">Recomendação de Diversificação</h4>
                                    <p className="text-sm text-orange-700 mt-1">
                                        Considere migrar R$ 5.000 de renda fixa para ações ou fundos de investimento para melhorar
                                        a diversificação da sua carteira.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Rendimentos Mensais */}
            <Card>
                <CardHeader>
                    <CardTitle>Rendimentos Mensais</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {monthlyReturns.map((month, index) => (
                                <div key={index} className="text-center p-4 border rounded-lg">
                                    <p className="text-sm text-muted-foreground">{month.month}</p>
                                    <p className={`text-lg font-semibold ${month.projected ? 'text-blue-600' : 'text-green-600'}`}>
                                        R$ {month.amount}
                                        {month.projected && <span className="text-xs ml-1">(proj.)</span>}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 className="font-medium text-green-800">Projeção Anual</h4>
                            <p className="text-sm text-green-700 mt-1">
                                Baseado na performance atual, você deve receber aproximadamente <strong>R$ 5.280</strong> em rendimentos este ano.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Recomendações */}
            <Card>
                <CardHeader>
                    <CardTitle>Recomendações de Investimento</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="font-medium text-blue-800">Diversificação</h4>
                            <p className="text-sm text-blue-700 mt-1">
                                Sua carteira está muito concentrada em renda fixa. Considere alocar 20-25% em renda variável.
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h4 className="font-medium text-green-800">Prazo</h4>
                            <p className="text-sm text-green-700 mt-1">
                                Sua estratégia de prazo está equilibrada. Continue reinvestindo os vencimentos conforme seu perfil.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default InvestimentosView;
