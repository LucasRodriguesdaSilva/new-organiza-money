
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, CreditCard, Target, AlertTriangle, Settings as SettingsIcon } from "lucide-react";

const categories = [
  { name: "Moradia", budget: 1200, percentage: 30, color: "🟦", active: true },
  { name: "Alimentação", budget: 500, percentage: 12, color: "🟩", active: true },
  { name: "Transporte", budget: 400, percentage: 10, color: "🟨", active: true },
  { name: "Saúde", budget: 300, percentage: 8, color: "🟥", active: true },
  { name: "Lazer", budget: 200, percentage: 5, color: "🟪", active: true },
  { name: "Vestuário", budget: 150, percentage: 4, color: "🟫", active: true },
  { name: "Educação", budget: 200, percentage: 5, color: "🟧", active: true },
  { name: "Investimentos", budget: 1000, percentage: 25, color: "💎", active: true },
  { name: "Outros", budget: 250, percentage: 6, color: "⚪", active: true },
];

const goals = [
  { name: "Reserva Emergência", target: 20000, deadline: "12 meses", monthlyRequired: 1667, current: 8500 },
  { name: "Viagem Europa", target: 15000, deadline: "18 meses", monthlyRequired: 833, current: 3200 },
  { name: "Carro Novo", target: 40000, deadline: "30 meses", monthlyRequired: 1333, current: 5800 },
  { name: "Casa Própria", target: 100000, deadline: "60 meses", monthlyRequired: 1667, current: 0 },
];

const accounts = [
  { name: "Banco do Brasil", type: "Conta Corrente", balance: 2500, active: true },
  { name: "Nubank", type: "Conta Corrente", balance: 1200, active: true },
  { name: "Cartão Nubank", type: "Crédito", limit: 5000, active: true },
  { name: "Cartão Santander", type: "Crédito", limit: 3000, active: true },
  { name: "Poupança CEF", type: "Poupança", balance: 8000, active: true },
];

const systemSettings = {
  notifications: {
    budgetAlerts: true,
    goalReminders: true,
    monthlyReports: true,
    transactionAlerts: false,
  },
  preferences: {
    currency: "BRL",
    dateFormat: "DD/MM/YYYY",
    theme: "dark",
    startOfWeek: "monday",
  },
  limits: {
    dailyTransactionLimit: 1000,
    categoryAlertThreshold: 80,
    emergencyFundMonths: 6,
  }
};

const  ConfiguracoesView = () => {
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground mt-1">Gerencie categorias, metas, contas e preferências do sistema</p>
        </div>
      </div>

      {/* Categorias de Gastos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Categorias de Gastos</CardTitle>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nova Categoria
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800">Orçamento Total Mensal</h3>
                <p className="text-2xl font-bold text-blue-600">R$ {totalBudget.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800">Categorias Ativas</h3>
                <p className="text-2xl font-bold text-green-600">{categories.filter(cat => cat.active).length}</p>
              </div>
            </div>

            <div className="space-y-3">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{category.color}</span>
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.percentage}% do orçamento total</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold">R$ {category.budget.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">mensal</p>
                    </div>
                    <Switch checked={category.active} />
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metas Financeiras */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Metas Financeiras</CardTitle>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nova Meta
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map((goal, index) => {
              const progress = (goal.current / goal.target) * 100;
              const isDelayed = goal.current < (goal.target * 0.3); // Arbitrary delay logic
              
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{goal.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Meta: R$ {goal.target.toLocaleString()} • Prazo: {goal.deadline}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isDelayed && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Atrasado
                        </Badge>
                      )}
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso: R$ {goal.current.toLocaleString()}</span>
                      <span>{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Necessário/mês: R$ {goal.monthlyRequired.toLocaleString()}</span>
                      <span>Faltam: R$ {(goal.target - goal.current).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Contas e Cartões */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Contas e Cartões</CardTitle>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nova Conta
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{account.name}</h3>
                    <p className="text-sm text-muted-foreground">{account.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold">
                      R$ {(account.balance !== undefined ? account.balance : account.limit).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {account.balance ? 'Saldo' : 'Limite'}
                    </p>
                  </div>
                  <Switch checked={account.active} />
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configurações do Sistema */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="budget-alerts">Alertas de Orçamento</Label>
                  <p className="text-sm text-muted-foreground">Avisos quando categorias excedem 80%</p>
                </div>
                <Switch id="budget-alerts" checked={systemSettings.notifications.budgetAlerts} />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="goal-reminders">Lembretes de Metas</Label>
                  <p className="text-sm text-muted-foreground">Notificações mensais sobre progresso</p>
                </div>
                <Switch id="goal-reminders" checked={systemSettings.notifications.goalReminders} />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="monthly-reports">Relatórios Mensais</Label>
                  <p className="text-sm text-muted-foreground">Resumo automático no fim do mês</p>
                </div>
                <Switch id="monthly-reports" checked={systemSettings.notifications.monthlyReports} />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="transaction-alerts">Alertas de Transação</Label>
                  <p className="text-sm text-muted-foreground">Notificação para cada lançamento</p>
                </div>
                <Switch id="transaction-alerts" checked={systemSettings.notifications.transactionAlerts} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferências Gerais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="daily-limit">Limite Diário de Transações</Label>
                <Input 
                  id="daily-limit" 
                  type="number" 
                  value={systemSettings.limits.dailyTransactionLimit}
                  placeholder="1000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alert-threshold">Limite de Alerta (%)</Label>
                <Input 
                  id="alert-threshold" 
                  type="number" 
                  value={systemSettings.limits.categoryAlertThreshold}
                  placeholder="80"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergency-months">Reserva Emergência (Meses)</Label>
                <Input 
                  id="emergency-months" 
                  type="number" 
                  value={systemSettings.limits.emergencyFundMonths}
                  placeholder="6"
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Tema</Label>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Claro</Button>
                  <Button variant="default" size="sm">Escuro</Button>
                  <Button variant="outline" size="sm">Auto</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dados e Backup */}
      <Card>
        <CardHeader>
          <CardTitle>Dados e Backup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Exportar Dados
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Importar Backup
            </Button>
            <Button variant="destructive" className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Limpar Dados
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Backup Recomendado</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Faça backup regular dos seus dados financeiros. Última exportação: Nunca
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ConfiguracoesView;