"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, DollarSign, PiggyBank, Target, TrendingDown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DashboardView = () => {
 
    const currentMonth = "Julho 2025";
    const monthlyData = {
        income: 5800,
        expenses: 3200,
        savings: 2600,
        savingsRate: 44.8
    };

    const expensesByCategory = [
    { category: "🏠 Moradia", amount: 1200, percentage: 37.5, budget: 1200, status: "ok" },
    { category: "🍽️ Alimentação", amount: 635, percentage: 19.8, budget: 500, status: "over" },
    { category: "🚗 Transporte", amount: 380, percentage: 11.9, budget: 400, status: "ok" },
    { category: "💊 Saúde", amount: 245, percentage: 7.7, budget: 300, status: "under" },
    { category: "🎬 Lazer", amount: 290, percentage: 9.1, budget: 200, status: "over" },
    { category: "👕 Vestuário", amount: 85, percentage: 2.7, budget: 150, status: "under" },
    { category: "📱 Outros", amount: 365, percentage: 11.4, budget: 450, status: "ok" },
  ];

    const alerts = [
    { type: "warning", message: 'Categoria "Alimentação" 27% acima do orçado' },
    { type: "warning", message: 'Categoria "Lazer" 45% acima do orçado' },
    { type: "success", message: "Meta de poupança cumprida este mês" },
    { type: "info", message: "Faltam R$ 2.500 para meta 'Viagem 2025'" },
  ];


  const goals = [
    { name: "Reserva de Emergência", current: 8500, target: 20000, progress: 42.5 },
    { name: "Viagem", current: 3200, target: 15000, progress: 21.3 },
    { name: "Carro Novo", current: 5800, target: 40000, progress: 14.5 },
  ];

  return(
    <div className="space-y-6 p-8">
        {/* Header */}
        <div className="space-y-2">
            <h2 className="text-3xL font-bold tracking-tight text-foreground">Dashboard Financeiro</h2>
            <p className="text-muted-foreground">
                Visão geral das suas finanças em {currentMonth}
            </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                    <DollarSign className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-500">
                        R$ {monthlyData.income.toLocaleString('pt-BR')}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        +12% em relação ao mês anterior
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Gastos Totais</CardTitle>
                    <TrendingDown className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-500">
                        R$ {monthlyData.expenses.toLocaleString('pt-BR')}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        -5% em relação ao mês anterior
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Saldo Mensal</CardTitle>
                    <PiggyBank className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-500">
                        R$ {monthlyData.savings.toLocaleString('pt-BR')}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Meta: R$ 2.000 ✅ Superada
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Taxa Poupança</CardTitle>
                    <TrendingUp className="h-4 w-4 text-purple-500"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-purple-500">
                        {monthlyData.savingsRate}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Meta: 30% ✅ Cumprida
                    </p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            {/* Expenses by Category */}
            <Card>
                <CardHeader>
                    <CardTitle>Distribuição de Gastos</CardTitle>
                    <CardDescription>
                        Gastos por categoria em {currentMonth}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {expensesByCategory.map((item, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{item.category}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">R$ {item.amount.toLocaleString('pt-BR')}</span>
                                    <Badge 
                                        variant={item.status === 'over' ? 'destructive' : item.status === 'under' ? 'secondary' : 'default'}
                                        className="text-xs"
                                        >
                                            {item.percentage}%
                                        </Badge>
                                </div>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${
                                        item.status === 'over' ? 'bg-red-500' :
                                        item.status === 'under' ? 'bg-blue-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Goals Progress */}
            <Card>
                <CardHeader>
                    <CardTitle>Progresso das Metas</CardTitle>
                    <CardDescription>Acompanhe o progresso dos seus objetivos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {goals.map((goal,index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{goal.name}</span>
                                <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                            </div>
                            <progress value={goal.progress} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>R$ {goal.current.toLocaleString('pt-BR')}</span>
                                <span>R$ {goal.target.toLocaleString('pt-BR')}</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

        {/* Alerts */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Alertas e Notificações
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {alerts.map((alert, index) => (
                        <div key={index} 
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                            alert.type === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                            alert.type === 'success' ? 'bg-green-500/10 border border-green-500/20' :
                            'bg-blue-500/10 border border-blue-500/20'
                        }`}>
                            {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                            {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                            {alert.type === 'info' && <Target className="h-4 w-4 text-blue-500" />}
                            <span className="text-sm">{alert.message}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
  )
};

export default DashboardView;
