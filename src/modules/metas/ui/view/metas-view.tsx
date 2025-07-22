"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Progress } from "@radix-ui/react-progress";
import { AlertTriangle, DollarSign, Plus, Target, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    monthlyRequired: number;
    currentMonthlyContribution: number;
    status: "on-track" | "behind" | "ahead" | "achieved";
}

const MetasView = () => {

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const [goals, setGoals] = useState<Goal[]>([

         {
      id: "1",
      name: "Reserva de Emergência",
      targetAmount: 20000,
      currentAmount: 8500,
      deadline: "2025-12-31",
      monthlyRequired: 1437,
      currentMonthlyContribution: 1200,
      status: "behind"
    },
    {
      id: "2",
      name: "Viagem para Europa",
      targetAmount: 15000,
      currentAmount: 3200,
      deadline: "2026-06-30",
      monthlyRequired: 843,
      currentMonthlyContribution: 400,
      status: "behind"
    },
    {
      id: "3",
      name: "Carro Novo",
      targetAmount: 40000,
      currentAmount: 5800,
      deadline: "2027-06-30",
      monthlyRequired: 1315,
      currentMonthlyContribution: 600,
      status: "behind"
    },
    {
      id: "4",
      name: "Casa Própria",
      targetAmount: 100000,
      currentAmount: 12000,
      deadline: "2030-06-30",
      monthlyRequired: 1467,
      currentMonthlyContribution: 1500,
      status: "on-track"
    }

    ]);

    const handleAddGoal = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const targetAmount = parseFloat(formData.get("targetAmount") as string);
        const currentAmount = parseFloat(formData.get("currentAmount") as string) || 0;
        const deadline = formData.get("deadline") as string;

        const deadlineDate =new Date(deadline);
        const now = new Date();
        const monthsRemaining = Math.max(1, Math.ceil((deadlineDate.getTime() - now.getTime()) / (100 * 60 * 60 * 24 * 30)));
        const monthlyRequired = (targetAmount - currentAmount) / monthsRemaining;

        const newGoal: Goal = {
            id: Date.now().toString(),
            name: formData.get("name") as string,
            targetAmount,
            currentAmount,
            deadline,
            monthlyRequired,
            currentMonthlyContribution: 0,
            status: "behind"
        };

        setGoals([...goals, newGoal]);
        setIsAddDialogOpen(false);
        toast.success("Meta adicionada com sucesso!");
        e.currentTarget.reset();
    };

    const getStatusColor = (status: Goal["status"]) => {
        switch (status) {
            case "achieved": return "bg-green-500";
            case "ahead": return "bg-blue-500";
            case "on-track": return "bg-green-500";
            case "behind": return "bg-yellow-500";
            default: return "bg-gray-500";
        }
    };

    const getStatusText = (status: Goal["status"]) => {
        switch (status) {
            case "achieved": return "Concluída";
            case "ahead": return "Adiantada";
            case "on-track": return "No Prazo";
            case "behind": return "Atrasada";
            default: return "Indefinido";
        }
    };

    const getStatusIcon = (status: Goal["status"]) => {
        switch (status) {
            case "achieved":
            case "ahead":
            case "on-track":
                return <TrendingUp className="h-4 w-4" />;
            case "behind":
                return <AlertTriangle className="h-4 w-4" />;
            default:
                return <Target className="h-4 w-4" />;
        }
    };

    const calculateProgress = (goal: Goal) => {
        return Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
    };

    const calculateMonthsRemaining = (deadline: string) => {
        const deadlineDate = new Date(deadline);
        const now = new Date();
        return Math.max(0, Math.ceil((deadlineDate.getTime() - now.getTime()) / (100 * 60 * 60 * 24 * 30)));
    };

    return (
        <div className="space-y-6 p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Metas e Objetivos</h2>
                    <p className="text-muted-foreground">
                        Acompanhe o progresso dos seus objetivos financeiros
                    </p>
                </div>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="sm:max-w-md"> 
                            <Plus className="h-4 w-4" />
                             Nova Meta
                         </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Nova Meta</DialogTitle>
                            <DialogDescription>Defina um novo objetivo financeiro</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddGoal} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome da Meta</Label>
                                <input
                                    id="name"
                                    name="name"
                                    placeholder="Ex: Viagem para Paris"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="targetAmount">Valor Objetivo</Label>
                                    <input
                                        id="targetAmount"
                                        name="targetAmount"
                                        type="number"
                                        step="0.01"
                                        placeholder="10000.00"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="deadline">Prazo</Label>
                                <input
                                    id="deadline"
                                    name="deadline"
                                    type="date"
                                    required
                                />
                            </div>

                            <div className="flex gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                                    Cancelar
                                </Button>
                                <Button type="submit" className="flex-1">
                                    Criar Meta
                                </Button>
                            </div>
                        </form>
                     </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total em Metas</p>
                                <p className="text-2xl font-bold">
                                    R$ {goals.reduce((sum, goal) => sum + goal.currentAmount, 0).toLocaleString('pt-BR')}
                                </p>
                            </div>
                            <DollarSign className="h-8 w-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Metas Ativas</p>
                                <p className="text-2xl font-bold">{globalThis.length}</p>
                            </div>
                            <Target className="h-8 w-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">No Prazo</p>
                                <p className="text-2xl font-bold">{goals.filter(g => g.status == "on-track").length}</p>
                            </div>
                            <TrendingUp className="h-8 w-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Atrasadas</p>
                                <p className="text-2xl font-bold">{goals.filter(g => g.status === "behind").length}</p>
                            </div>
                            <AlertTriangle className="h-8 w-8 text-yellow-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {goals.map((goal) => {
                    const progress = calculateProgress(goal);
                    const monthsRemaining = calculateMonthsRemaining(goal.deadline);

                    return (
                        <Card key={goal.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{goal.name}</CardTitle>
                                    <Badge variant="secondary" className={`${getStatusColor(goal.status)} text-white`}>
                                        {getStatusIcon(goal.status)}
                                        <span className="ml-1">{getStatusText(goal.status)}</span>
                                    </Badge>
                                </div>
                                <CardDescription>
                                    Meta: R$ {goal.targetAmount.toLocaleString('pt-BR')} |
                                    Prazo: {monthsRemaining} meses
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Progesso</span>
                                        <span>{progress.toFixed(1)}%</span>
                                    </div>
                                    <Progress value={progress} className="h-3" />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>R$ {goal.currentAmount.toLocaleString('pt-BR')}</span>
                                        <span>R$ {goal.targetAmount.toLocaleString('pt-BR')}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="space-y-1">
                                        <p className="text-muted-foreground">Necessário/mês</p>
                                        <p className="font-semibold text-yellow-500">
                                            R$ {goal.monthlyRequired.toLocaleString('pt-BR')}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-muted-foreground">Atual/mês</p>
                                        <p className="font-semibold text-yellow-500">
                                            R$ {goal.currentMonthlyContribution.toLocaleString('pt-BR')}
                                        </p>
                                    </div>
                                </div>

                                {goal.status === "behind" && (
                                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                            <span className="text-sm font-medium text-yellow-500">Ação Necessária</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Aumentar contribuição em R$ {(goal.monthlyRequired - goal.currentMonthlyContribution).toLocaleString('pt-BR')}/mês
                                        </p>
                                    </div>
                                )}

                                {goal.status === "on-track" && (
                                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <TrendingUp className="h-4 w-4 text-green-500" />
                                            <span className="text-sm font-medium text-green-500">No Caminho Certo</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Continue com a contribuição atual para atingir sua meta
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Simulador de Cenários</CardTitle>
                    <CardDescription>
                        veja como mudanças afetariam suas metas
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">💡 Se aumentar investimento em R$ 500/mês:</h4>
                            <ul className="text-sm text-muted-foreground space-y-4">
                                <li>• Reserva Emergência: 6 meses (vs 8 meses)</li>
                                <li>• Viagem Europa: 12 meses (vs 14 meses)</li>
                                <li>• Carro Novo: 22 meses (vs 26 meses)</li>
                            </ul>
                        </div>

                        <div className="p-4 border rounded-lg">
                            <h4 className="font-medium mb-2">💰 Se reduzir gastos em 10%:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                                <li>• Sobra extra: R$ 320/mês</li>
                                <li>• Todas as metas: Antecipação de 2-3 meses</li>
                                <li>• Reserva Emergência: Conclusão em 5 meses</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MetasView;