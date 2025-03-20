"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/ui/charts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const financialData = [
  { month: "Jan", income: 50000, expenses: 40000 },
  { month: "Feb", income: 55000, expenses: 42000 },
  { month: "Mar", income: 60000, expenses: 45000 },
  { month: "Apr", income: 58000, expenses: 43000 },
  { month: "May", income: 62000, expenses: 46000 },
  { month: "Jun", income: 65000, expenses: 48000 },
]

const expenseBreakdown = [
  { category: "Salaries", amount: 25000 },
  { category: "Utilities", amount: 5000 },
  { category: "Supplies", amount: 8000 },
  { category: "Maintenance", amount: 7000 },
  { category: "Technology", amount: 3000 },
]

export default function FinancePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 space-y-6"
    >
      <h1 className="text-2xl md:text-3xl font-bold">Financial Overview</h1>
      <Card>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Income vs Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart data={financialData} xAxis="month" yAxis={["income", "expenses"]} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="income">
              <Card>
                <CardHeader>
                  <CardTitle>Income Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart data={financialData} xAxis="month" yAxis={["income"]} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="expenses">
              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row justify-between">
                  <div className="w-full md:w-1/2 mb-4 md:mb-0">
                    <PieChart data={expenseBreakdown} category="category" value="amount" />
                  </div>
                  <div className="w-full md:w-1/2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead>Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {expenseBreakdown.map((item) => (
                          <TableRow key={item.category}>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>${item.amount.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

