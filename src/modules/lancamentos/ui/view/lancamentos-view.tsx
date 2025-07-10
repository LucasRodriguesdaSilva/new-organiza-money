"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Filter, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";

interface Transaction {
  id: string;
  date: string;
  type: "income" | "expense";
  category: string;
  subcategory: string;
  description: string;
  amount: number;
  account: string;
}

const lancamentosView = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Dados simulados
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "2025-06-01",
      type: "income",
      category: "Salário",
      subcategory: "Principal",
      description: "Salário Empresa",
      amount: 5000.00,
      account: "Banco do Brasil"
    },
    {
      id: "2",
      date: "2025-06-03",
      type: "expense",
      category: "Moradia",
      subcategory: "Aluguel",
      description: "Aluguel Casa",
      amount: -1200.00,
      account: "Nubank"
    },
    {
      id: "3",
      date: "2025-06-05",
      type: "expense",
      category: "Alimentação",
      subcategory: "Supermercado",
      description: "Compras do Mês",
      amount: -350.00,
      account: "Cartão Nubank"
    },
    {
      id: "4",
      date: "2025-06-07",
      type: "expense",
      category: "Transporte",
      subcategory: "Combustível",
      description: "Gasolina",
      amount: -80.00,
      account: "Cartão Nubank"
    },
    {
      id: "5",
      date: "2025-06-10",
      type: "expense",
      category: "Lazer",
      subcategory: "Restaurante",
      description: "Jantar Família",
      amount: -120.00,
      account: "Cartão Nubank"
    },
    {
      id: "6",
      date: "2025-06-15",
      type: "income",
      category: "Freelance",
      subcategory: "Extra",
      description: "Projeto Web",
      amount: 800.00,
      account: "Nubank"
    }
  ]);

  const categories = {
    income: ["Salário", "Freelance", "Investimentos", "Outros"],
    expense: ["Moradia", "Alimentação", "Transporte", "Saúde", "Lazer", "Vestuário", "Educação", "Outros"]
  };

  const accounts = ["Banco do Brasil", "Nubank", "Cartão Nubank", "Cartão Santander", "Poupança CEF"];

  const handleAddTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const amount = parseFloat(formData.get("amount") as string);
      if (isNaN(amount) || amount <= 0) {
        toast.error("O valor deve ser um número positivo.");
        return;
      }

      const newTransaction: Transaction = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        date: formData.get("date") as string,
        type: formData.get("type") as "income" | "expense",
        category: formData.get("category") as string,
        subcategory: formData.get("subcategory") as string,
        description: formData.get("description") as string,
        amount: amount * (formData.get("type") === "expense" ? -1 : 1),
        account: formData.get("account") as string,
      };

      setTransactions([newTransaction, ...transactions]);
      setIsAddDialogOpen(false);
      toast.success("Lançamento adicionado com sucesso!");
      e.currentTarget.reset();
    } catch (error) {
      toast.error("Erro ao adicionar lançamento");
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalBalance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="space-y-6 p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lançamentos</h2>
          <p className="text-muted-foreground">
            Gerencie todas as suas receitas e despesas
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Transação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Transação</DialogTitle>
              <DialogDescription>
                Adicione uma nova receita ou despesa
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Receita</SelectItem>
                      <SelectItem value="expense">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...categories.income, ...categories.expense].map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subcategory">Subcategoria</Label>
                  <Input
                    id="subcategory"
                    name="subcategory"
                    placeholder="Ex: Supermercado"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Descreva a transação"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Valor</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account">Conta</Label>
                  <Select name="account" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map(account => (
                        <SelectItem key={account} value={account}>{account}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Adicionar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                R$ {transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0).toLocaleString('pt-BR')}
              </div>
              <p className="text-sm text-muted-foreground">Total Receitas</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">
                R$ {Math.abs(transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)).toLocaleString('pt-BR')}
              </div>
              <p className="text-sm text-muted-foreground">Total Despesas</p>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                R$ {totalBalance.toLocaleString('pt-BR')}
              </div>
              <p className="text-sm text-muted-foreground">Saldo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar transações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="income">Receitas</SelectItem>
                <SelectItem value="expense">Despesas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transações</CardTitle>
          <CardDescription>
            {filteredTransactions.length} transação(ões) encontrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                    {transaction.type === 'income' ?
                      <TrendingUp className="h-4 w-4 text-green-500" /> :
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    }
                  </div>
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.category} • {transaction.account}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                    }`}>
                    {transaction.type === 'income' ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default lancamentosView;
