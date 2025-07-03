
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, TrendingUp, DollarSign, Calendar, Target } from "lucide-react";
import { Item } from "@radix-ui/react-accordion";

const incomeData = [
  { source: "Salário", amount: 5000, month: "Jun", type: "Fixo", growth: 0 },
  { source: "Freelance", amount: 800, month: "Jun", type: "Variável", growth: 15 },
  { source: "Investimentos", amount: 150, month: "Jun", type: "Passivo", growth: 8 },
  { source: "Outros", amount: 50, month: "Jun", type: "Eventual", growth: -20 },
];



const monthlyComparison = [
  { month: "Abr", total: 5500 },
  { month: "Mai", total: 5800 },
  { month: "Jun", total: 6000 },
  { month: "Jul", total: 6360 },
  { month: "Ago", total: 5870 },
];

const maxMonthlyValue = Math.max(...monthlyComparison.map(m => m.total));



export default function ReceitasView() {

    const passiveIncome = incomeData.filter(item => item.type === "Passivo")
    .reduce((sum, item) => sum + item.amount, 0);

    const nextMonthForecast = monthlyComparison.length > 0
    ? monthlyComparison[monthlyComparison.length - 1].total * 1.01 
    : 0;
    
    const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
    const averageGrowth = incomeData.length > 0
    ? incomeData.reduce((sum, item) => sum + item.growth, 0) / incomeData.length
    : 0;
    
    const currentMonthTotal = monthlyComparison[monthlyComparison.length - 1]?.total || 0;
    const previousMonthTotal = monthlyComparison[monthlyComparison.length - 2]?.total || 0;
    const monthlyGrowthPercentage = previousMonthTotal > 0
    ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal * 100).toFixed(1)
    : 0;

    const passiveIncomePercentage = totalIncome > 0
    ? ((passiveIncome / totalIncome) * 100).toFixed(1)
    : 0;

    const generateForecast = (baseAmount: number, months: number) => {
        return Array.from({ length: months }, (_, i) => ({
            month: new Date(new Date().getFullYear(), new Date().getMonth() + i + 1, 1)
                .toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }),
                amount: Math.round(baseAmount * Math.pow(1.01, i + 1))
        }));
    };

    const forecasts = generateForecast(nextMonthForecast, 3);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Receitas</h1>
          <p className="text-muted-foreground mt-1">Gerencie e analise suas fontes de renda</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nova Receita
        </Button>
      </div>

      {/* Resumo das Receitas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {monthlyGrowthPercentage}% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crescimento Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{averageGrowth.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Nos últimos 3 meses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Passiva</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {passiveIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
                {passiveIncomePercentage}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Previsão Próximo Mês</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {nextMonthForecast.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Baseado na média móvel
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Receitas por Fonte */}
      <Card>
        <CardHeader>
          <CardTitle>Receitas por Fonte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {incomeData.map((income, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{income.source}</h3>
                    <p className="text-sm text-muted-foreground">{income.month}</p>
                  </div>
                </div>
                <div className="text-right space-x-4 flex items-center">
                  <Badge variant={income.type === "Fixo" ? "default" : income.type === "Variável" ? "secondary" : "outline"}>
                    {income.type}
                  </Badge>
                  <div className="text-right">
                    <p className="font-semibold">R$ {income.amount.toLocaleString()}</p>
                    <p className={`text-sm ${income.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {income.growth >= 0 ? '+' : ''}{income.growth}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparação Mensal */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyComparison.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="font-medium w-12">{month.month}</span>
                  <Progress 
                    value={(month.total / maxMonthlyValue) * 100} 
                    className="w-48" 
                  />
                </div>
                <span className="font-semibold">R$ {month.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Previsão e Análise */}
      <Card>
        <CardHeader>
          <CardTitle>Análise e Previsões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Próximos 3 Meses</h3>
              <div className="space-y-2">
                {forecasts.map((forecast, index) => (
                    <div key={index} className="flex justify-between">
                        <span>{forecast.month}:</span>
                        <span className="font-semibold">R$ {forecast.amount.toLocaleString()}</span>
                    </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Análise de Variabilidade</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Estabilidade:</span>
                  <Badge variant="secondary">±{Math.abs(averageGrowth).toFixed(1)}%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Classificação:</span>
                  <Badge variant="default">Estável</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Tendência:</span>
                  <Badge variant="default" className="text-green-600">Crescimento</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
