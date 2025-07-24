"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@radix-ui/react-progress";
import { AlertTriangle, Calendar, Clock, PieChart, Target, TrendingDown, TrendingUp } from "lucide-react";

const spendingTrends = [
    { category: "Alimentação", trend: "+15%", reason: "Delivery aumentou 40%", status: "high" },
    { category: "Lazer", trend: "+15%", reason: "Mais saídas nos fins de semana", status: "high" },
    { category: "Vestuário", trend: "-20%", reason: "Redução de compras desnecessárias", status: "low" },
    { category: "Transporte", trend: "-20%", reason: "Mais home office", status: "low" },
    { category: "Moradia", trend: "±5%", reason: "Custos fixos", status: "stable" },
    { category: "Saúde", trend: "±5%", reason: "Gastos consistentes", status: "stable" },
];

const timePatterns = [
    { time: "12h-14h", type: "Almoços", average: 25, frequency: "Diário" },
    { time: "19h-21h", type: "Jantares e lazer", average: 45, frequency: "Diário" },
];

const dayPatterns = [
    { day: "Segunda", spending: 45, pattern: "Baixo" },
    { day: "Terça", spending: 52, pattern: "Baixo" },
    { day: "Quarta", spending: 48, pattern: "Baixo" },
    { day: "Quinta", spending: 58, pattern: "Médio" },
    { day: "Sexta", spending: 89, pattern: "Alto (+35%)" },
    { day: "Sábado", spending: 125, pattern: "Muito Alto (+50%)" },
    { day: "Domingo", spending: 67, pattern: "Médio" },
];

const savingsOpportunities = [
    { opportunity: "Delivery", current: 280, potential: 150, savings: 130 },
    { opportunity: "Impulso fins de semana", current: 400, potential: 200, savings: 200 },
    { opportunity: "Assinaturas não utilizadas", current: 89, potential: 30, savings: 59 },
];

const monthlyComparison = [
    { month: "Jan", income: 5500, expenses: 3200, savings: 2300, rate: 42 },
    { month: "Fev", income: 5500, expenses: 3400, savings: 2100, rate: 38 },
    { month: "Mar", income: 5500, expenses: 3100, savings: 2400, rate: 44 },
    { month: "Abr", income: 5800, expenses: 3300, savings: 2500, rate: 43 },
    { month: "Mai", income: 5800, expenses: 3150, savings: 2650, rate: 46 },
    { month: "Jun", income: 6000, expenses: 3200, savings: 2800, rate: 47 },
];

const AnalisesView = () => {
  const averageSavingsRate = monthlyComparison.reduce((sum, month) => sum + month.rate, 0) / monthlyComparison.length;
  const totalPotentialSavings = savingsOpportunities.reduce((sum, opp) => sum + opp.savings, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">Análises avançadas do seu comportamento financeiro</p>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa Poupança Média</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{averageSavingsRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Últimos 6 meses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Economia Potencial</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {totalPotentialSavings}</div>
            <p className="text-xs text-muted-foreground">
              por mês identificado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tendência Geral</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Positiva</div>
            <p className="text-xs text-muted-foreground">
              Poupança aumentando
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias Atenção</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-xs text-muted-foreground">
              precisam de controle
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Análise de Tendências */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Tendências (Últimos 6 Meses)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-red-600 mb-3">📈 EM ALTA (+15% vs média)</h3>
              <div className="space-y-2">
                {spendingTrends.filter(trend => trend.status === "high").map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-red-600" />
                      <div>
                        <span className="font-medium">{trend.category}</span>
                        <p className="text-sm text-muted-foreground">{trend.reason}</p>
                      </div>
                    </div>
                    <Badge variant="destructive">{trend.trend}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-green-600 mb-3">📉 EM BAIXA (-20% vs média)</h3>
              <div className="space-y-2">
                {spendingTrends.filter(trend => trend.status === "low").map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingDown className="w-5 h-5 text-green-600" />
                      <div>
                        <span className="font-medium">{trend.category}</span>
                        <p className="text-sm text-muted-foreground">{trend.reason}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{trend.trend}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-blue-600 mb-3">📊 ESTÁVEIS (±5% vs média)</h3>
              <div className="space-y-2">
                {spendingTrends.filter(trend => trend.status === "stable").map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <PieChart className="w-5 h-5 text-blue-600" />
                      <div>
                        <span className="font-medium">{trend.category}</span>
                        <p className="text-sm text-muted-foreground">{trend.reason}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{trend.trend}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Padrões Identificados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Horários de Maior Gasto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timePatterns.map((pattern, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">{pattern.time}</span>
                    <p className="text-sm text-muted-foreground">{pattern.type} • {pattern.frequency}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">R$ {pattern.average}</span>
                    <p className="text-sm text-muted-foreground">média</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Dias de Maior Gasto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dayPatterns.map((day, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{day.day}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        day.pattern.includes("Alto") ? "destructive" : 
                        day.pattern.includes("Médio") ? "secondary" : "outline"
                      }>
                        {day.pattern}
                      </Badge>
                      <span className="font-semibold">R$ {day.spending}</span>
                    </div>
                  </div>
                  <Progress value={(day.spending / 150) * 100} className="w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Oportunidades de Economia */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Oportunidades de Economia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savingsOpportunities.map((opp, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{opp.opportunity}</h3>
                    <p className="text-sm text-muted-foreground">
                      Atual: R$ {opp.current}/mês → Meta: R$ {opp.potential}/mês
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-green-600">-R$ {opp.savings}</span>
                    <p className="text-sm text-muted-foreground">economia/mês</p>
                  </div>
                </div>
                <Progress value={(opp.potential / opp.current) * 100} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">
                  Redução de {Math.round((1 - opp.potential/opp.current) * 100)}% possível
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-800">💰 Potencial Total de Economia</h4>
            <p className="text-lg font-bold text-green-600 mt-1">R$ {totalPotentialSavings}/mês</p>
            <p className="text-sm text-green-700 mt-1">
              Implementando todas as otimizações, você pode economizar R$ {totalPotentialSavings * 12}/ano
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Evolução da Taxa de Poupança */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução da Taxa de Poupança</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyComparison.map((month, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{month.month}/25</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      R$ {month.income.toLocaleString()} - R$ {month.expenses.toLocaleString()}
                    </span>
                    <span className="font-semibold text-green-600">{month.rate}%</span>
                  </div>
                </div>
                <Progress value={month.rate} className="w-full" />
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800">📈 Análise da Tendência</h4>
            <p className="text-sm text-blue-700 mt-1">
              Sua taxa de poupança aumentou de 42% para 47% nos últimos 6 meses. 
              Tendência positiva consistente!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnalisesView;