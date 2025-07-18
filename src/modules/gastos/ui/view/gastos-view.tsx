"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CreditCard, PieChart, Plus, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const expenseCategories = [
    { category: "Moradia", budgeted: 1200, spent: 1200, percentage: 37.5, status: "ok" },
    { category: "Alimentação", budgeted: 500, spent: 635, percentage: 18.8, status: "over" },
    { category: "Transporte", budgeted: 400, spent: 380, percentage: 12.5, status: "under" },
    { category: "Saúde", budgeted: 300, spent: 245, percentage: 9.4, status: "under" },
    { category: "Lazer", budgeted: 200, spent: 290, percentage: 7.8, status: "over" },
    { category: "Vestuário", budgeted: 150, spent: 85, percentage: 6.3, status: "under" },
    { category: "Outros", budgeted: 250, spent: 185, percentage: 7.8, status: "under" },
];

const topExpenses = [
    { description: "Aluguel Casa", amount: 1200, category: "Moradia", date: "03/06" },
    { description: "Compras Supermercado", amount: 350, category: "Alimentação", date: "05/06" },
    { description: "Plano de Saúde", amount: 200, category: "Saúde", date: "01/06" },
    { description: "Combustível Mensal", amount: 180, category: "Transporte", date: "07/06" },
    { description: "Jantar Restaurante", amount: 120, category: "Lazer", date: "10/06" },
    { description: "Curso Online", amount: 180, category: "Educação", date: "15/06" },
    { description: "Academia", amount: 80, category: "Saúde", date: "01/06" },
    { description: "Cinema + Pipoca", amount: 75, category: "Lazer", date: "12/06" },
    { description: "Roupas Trabalho", amount: 85, category: "Vestuário", date: "20/06" },
    { description: "Internet Mensal", amount: 70, category: "Outros", date: "01/06"}
];



const Gastosview = () => {
    const totalBudgeted = expenseCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
    const totalSpent = expenseCategories.reduce((sum, cat) => sum + cat.spent, 0);
    const overBudgetCategories = expenseCategories.filter(cat => cat.status === "over").length;


    return (
        <div className="space-y-6 p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Análise de Gastos</h1>
                    <p className="text-muted-foreground mt-1">Monitore e controle seus gastos por categoria</p>
                </div>
                <button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Novo Gasto
                </button>
            </div>

            {/* Resumo dos gastos */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total dos Gastos</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">R$ {totalSpent.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            de R$ {totalBudgeted.toLocaleString()} orçado
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Status Orçamento</CardTitle>
                        <PieChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">✅ Meta</div>
                        <p className="text-xs text-muted-foreground">
                            Dentro do orçamento geral
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Categorias Acima</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{overBudgetCategories}</div>
                        <p className="text-xs text-muted-foreground">
                            Categorias estão acima do orçado
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Economia Possível</CardTitle>
                        <TrendingDown className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">R$ 320</div>
                        <p className="text-xs text-muted-foreground">
                            reduzindo gastos desnecessários
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Gastos por Categoria */}
            <Card>
                <CardHeader>
                    <CardTitle>Gastos por Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {expenseCategories.map((category, index) => {
                            const percentageSpent = (category.spent / category.budgeted) * 100;
                            const difference = category.spent - category.budgeted;

                            return (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <span className="font-medium w-24">{category.category}</span>
                                            <Badge variant={
                                                category.status === "ok" ? "default" :
                                                category.status === "over" ? "destructive" : "secondary"
                                            }>
                                                {category.status === "ok" ? "✅ Exato" :
                                                category.status === "over" ? `⚠️ +${Math.round(((category.spent - category.budgeted) / category.budgeted) * 100)}%` :
                                                `✅ -${Math.round(((category.budgeted - category.spent) / category.budgeted) * 100)}%`}
                                            </Badge>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">R$ {category.spent.toLocaleString()}</p>
                                            <p className="text-sm text-muted-foreground">de R$ {category.budgeted.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <Progress
                                        value={Math.min(percentageSpent, 100)}
                                        className="w-full"
                                        />
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>{percentageSpent.toFixed(1)}% usado</span>
                                            <span className={difference >= 0 ? "text-green-600" : "text-red-600"}>
                                                {difference >= 0 ? "+" : ""}R$ {difference.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                );
                        }  )}
                    </div>
                </CardContent>
            </Card>

            {/* Top 10 Maiores Gastos */}
            <Card>
                <CardHeader>
                    <CardTitle>Top 10 Maiores Gastos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {topExpenses.map((expense, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-bold text-red-600">{index + 1}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{expense.description}</h3>
                                        <p className="text-sm text-muted-foreground">{expense.category} • {expense.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-red-600">R$ {expense.amount.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Alertas e Recomendações */}
            <Card>
                <CardHeader>
                    <CardTitle>Alertas e Recomendações</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0-5" />
                            <div>
                                <h4 className="font-medium text-orange-800">Categoria "Lazer" 45% acima do orçado</h4>
                                <p className="text-sm text-orange-600">Considere reduzir gastos com entretenimento nos próximos dias.</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                            <div>
                                <h4 className="font-medium text-orange-800">Alimentação 27% acima do orçamento</h4>
                                <p className="text-sm text-orange-700">Muito pedidos de delivery. Tente conzinhar mais em casa.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

};

export default Gastosview;