"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { PortalHeader } from "@/components/portal-header"
import { AccountantSidebar } from "@/components/accountant-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Progress } from "@/components/ui/progress"
import { BarChart, LineChart, PieChart } from "@/components/ui/charts"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Search,
  Download,
  Filter,
  Eye,
  Edit,
  Plus,
  FileText,
  ArrowUpRight,
  Printer,
  Calculator,
} from "lucide-react"

export default function AccountantPortalPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  // Mock data for accountant dashboard
  const recentTransactions = [
    {
      id: "t1",
      description: "School Fees - Form 3",
      amount: 2500,
      type: "Income",
      date: "Mar 15, 2025",
      status: "Completed",
    },
    {
      id: "t2",
      description: "Salary Payment - Teachers",
      amount: 15000,
      type: "Expense",
      date: "Mar 14, 2025",
      status: "Completed",
    },
    {
      id: "t3",
      description: "Textbook Purchase",
      amount: 3200,
      type: "Expense",
      date: "Mar 12, 2025",
      status: "Completed",
    },
    {
      id: "t4",
      description: "School Fees - Form 2",
      amount: 2200,
      type: "Income",
      date: "Mar 10, 2025",
      status: "Completed",
    },
    { id: "t5", description: "Utility Bills", amount: 850, type: "Expense", date: "Mar 08, 2025", status: "Completed" },
  ]

  const pendingPayments = [
    {
      id: "p1",
      description: "School Fees - Student ID: STD2023045",
      amount: 1200,
      dueDate: "Mar 25, 2025",
      status: "Pending",
    },
    {
      id: "p2",
      description: "School Fees - Student ID: STD2023078",
      amount: 1200,
      dueDate: "Mar 28, 2025",
      status: "Pending",
    },
    {
      id: "p3",
      description: "School Fees - Student ID: STD2023112",
      amount: 1200,
      dueDate: "Mar 30, 2025",
      status: "Overdue",
    },
  ]

  const budgetCategories = [
    { category: "Staff Salaries", allocated: 25000, spent: 15000 },
    { category: "Learning Materials", allocated: 10000, spent: 3200 },
    { category: "Facilities", allocated: 8000, spent: 2500 },
    { category: "Administration", allocated: 5000, spent: 2200 },
    { category: "Utilities", allocated: 3000, spent: 850 },
  ]

  const monthlyFinancials = [
    { month: "Jan", income: 35000, expenses: 28000 },
    { month: "Feb", income: 38000, expenses: 30000 },
    { month: "Mar", income: 42000, expenses: 32000 },
  ]

  const incomeDistribution = [
    { source: "School Fees", percentage: 75 },
    { source: "Donations", percentage: 15 },
    { source: "Government Grants", percentage: 10 },
  ]

  const handleViewTransaction = (transactionId: string) => {
    router.push(`/accountant-portal/transactions/${transactionId}`)
    toast({
      title: "Viewing transaction details",
      description: `Navigating to transaction details page.`,
    })
  }

  const handleEditTransaction = (transactionId: string) => {
    router.push(`/accountant-portal/transactions/${transactionId}/edit`)
    toast({
      title: "Editing transaction",
      description: `Navigating to transaction edit page.`,
    })
  }

  const handleAddTransaction = () => {
    router.push("/accountant-portal/transactions/create")
    toast({
      title: "Adding new transaction",
      description: "Navigating to transaction creation page.",
    })
  }

  const handleAdjustBudget = (category: string) => {
    router.push(`/accountant-portal/budget/${category.toLowerCase().replace(/\s+/g, "-")}`)
    toast({
      title: "Adjusting budget",
      description: `Navigating to budget adjustment page for ${category}.`,
    })
  }

  const handleViewBudgetDetails = (category: string) => {
    router.push(`/accountant-portal/budget/${category.toLowerCase().replace(/\s+/g, "-")}/details`)
    toast({
      title: "Viewing budget details",
      description: `Navigating to budget details page for ${category}.`,
    })
  }

  const handleGenerateReport = (reportType: string) => {
    router.push(`/accountant-portal/reports/${reportType}`)
    toast({
      title: "Generating report",
      description: `Navigating to ${reportType} report generation page.`,
    })
  }

  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Downloading report",
      description: `The ${reportType} report is being downloaded.`,
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PortalHeader
        portalName="Accountant Portal"
        userRole="Senior Accountant"
        userName="Jane Smith"
        sidebarContent={<AccountantSidebar />}
        notificationCount={2}
      />

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Financial Dashboard</h2>
              <p className="text-muted-foreground">Welcome back, Jane. Here's an overview of the school's finances.</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => router.push("/accountant-portal/calculator")}>
                <Calculator className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Financial Calculator</span>
              </Button>
              <Button onClick={() => router.push("/accountant-portal/reports")}>
                <FileText className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Reports</span>
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-l-4 border-l-green-500 transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Income (YTD)</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₵115,000</div>
                  <p className="text-xs text-green-500">+8% from last year</p>
                </CardContent>
                <CardFooter className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => router.push("/accountant-portal/income")}
                  >
                    View income details
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-l-4 border-l-red-500 transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses (YTD)</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₵90,000</div>
                  <p className="text-xs text-red-500">+5% from last year</p>
                </CardContent>
                <CardFooter className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => router.push("/accountant-portal/expenses")}
                  >
                    View expense details
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-l-4 border-l-blue-500 transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₵25,000</div>
                  <Progress value={78} className="mt-2" />
                </CardContent>
                <CardFooter className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => router.push("/accountant-portal/balance")}
                  >
                    View balance history
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-l-4 border-l-amber-500 transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₵3,600</div>
                  <p className="text-xs text-muted-foreground">3 pending transactions</p>
                </CardContent>
                <CardFooter className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => router.push("/accountant-portal/payments/pending")}
                  >
                    View pending payments
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="budget">Budget</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Monthly Financial Summary</CardTitle>
                          <CardDescription>Income vs Expenses for the current year</CardDescription>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDownloadReport("monthly-summary")}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download monthly summary report</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <LineChart data={monthlyFinancials} xAxis="month" yAxis={["income", "expenses"]} />
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => router.push("/accountant-portal/analytics/monthly")}
                      >
                        View Detailed Monthly Analysis
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Income Distribution</CardTitle>
                          <CardDescription>Breakdown by source</CardDescription>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDownloadReport("income-distribution")}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download income distribution report</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <PieChart data={incomeDistribution} category="source" value="percentage" />
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => router.push("/accountant-portal/analytics/income")}
                      >
                        View Income Analytics
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Budget Utilization</CardTitle>
                          <CardDescription>Allocated vs Spent by category</CardDescription>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDownloadReport("budget-utilization")}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Download budget utilization report</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <BarChart data={budgetCategories} xAxis="category" yAxis={["allocated", "spent"]} />
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => router.push("/accountant-portal/budget")}
                      >
                        Manage Budget Allocations
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Recent Transactions</CardTitle>
                          <CardDescription>Latest financial activities</CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push("/accountant-portal/transactions")}
                        >
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentTransactions.slice(0, 3).map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center space-x-4">
                              <div
                                className={`rounded-full p-2 ${transaction.type === "Income" ? "bg-green-100" : "bg-red-100"}`}
                              >
                                {transaction.type === "Income" ? (
                                  <TrendingUp
                                    className={`h-4 w-4 ${transaction.type === "Income" ? "text-green-500" : "text-red-500"}`}
                                  />
                                ) : (
                                  <TrendingDown
                                    className={`h-4 w-4 ${transaction.type === "Income" ? "text-green-500" : "text-red-500"}`}
                                  />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{transaction.description}</p>
                                <p className="text-sm text-muted-foreground">{transaction.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-medium ${transaction.type === "Income" ? "text-green-500" : "text-red-500"}`}
                              >
                                {transaction.type === "Income" ? "+" : "-"}₵{transaction.amount.toLocaleString()}
                              </span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleViewTransaction(transaction.id)}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>View transaction details</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={() => router.push("/accountant-portal/transactions")}
                      >
                        View All Transactions
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="transactions">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle>All Transactions</CardTitle>
                        <CardDescription>View and manage all financial transactions</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search transactions..."
                            className="pl-8 w-[200px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <Button variant="outline" size="icon">
                          <Filter className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => handleDownloadReport("transactions")}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button onClick={handleAddTransaction}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Transaction
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <DataTable
                      columns={[
                        { header: "Description", accessorKey: "description" },
                        {
                          header: "Amount",
                          accessorKey: "amount",
                          cell: (info) => {
                            const type = info.row.original.type
                            return (
                              <span className={`font-medium ${type === "Income" ? "text-green-500" : "text-red-500"}`}>
                                {type === "Income" ? "+" : "-"}₵{info.getValue().toLocaleString()}
                              </span>
                            )
                          },
                        },
                        { header: "Type", accessorKey: "type" },
                        { header: "Date", accessorKey: "date" },
                        {
                          header: "Status",
                          accessorKey: "status",
                          cell: (info) => (
                            <Badge variant={info.getValue() === "Completed" ? "default" : "secondary"}>
                              {info.getValue()}
                            </Badge>
                          ),
                        },
                        {
                          header: "Actions",
                          cell: (info) => (
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewTransaction(info.row.original.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditTransaction(info.row.original.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDownloadReport(`transaction-${info.row.original.id}`)}
                              >
                                <Printer className="h-4 w-4" />
                              </Button>
                            </div>
                          ),
                        },
                      ]}
                      data={recentTransactions}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="budget">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle>Budget Management</CardTitle>
                        <CardDescription>Track and manage budget allocations</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleDownloadReport("budget")}>
                          <Download className="mr-2 h-4 w-4" />
                          Download Budget Report
                        </Button>
                        <Button onClick={() => router.push("/accountant-portal/budget/create")}>
                          <Plus className="mr-2 h-4 w-4" />
                          Create New Budget
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <DataTable
                      columns={[
                        { header: "Category", accessorKey: "category" },
                        {
                          header: "Allocated",
                          accessorKey: "allocated",
                          cell: (info) => `₵${info.getValue().toLocaleString()}`,
                        },
                        {
                          header: "Spent",
                          accessorKey: "spent",
                          cell: (info) => `₵${info.getValue().toLocaleString()}`,
                        },
                        {
                          header: "Remaining",
                          cell: (info) => {
                            const allocated = info.row.original.allocated
                            const spent = info.row.original.spent
                            const remaining = allocated - spent
                            return `₵${remaining.toLocaleString()}`
                          },
                        },
                        {
                          header: "Utilization",
                          cell: (info) => {
                            const allocated = info.row.original.allocated
                            const spent = info.row.original.spent
                            const percentage = Math.round((spent / allocated) * 100)
                            return (
                              <div className="w-full">
                                <div className="flex justify-between mb-1">
                                  <span className="text-sm">{percentage}%</span>
                                </div>
                                <Progress value={percentage} />
                              </div>
                            )
                          },
                        },
                        {
                          header: "Actions",
                          cell: (info) => (
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAdjustBudget(info.row.original.category)}
                              >
                                <Edit className="mr-1 h-3 w-3" />
                                Adjust
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewBudgetDetails(info.row.original.category)}
                              >
                                <Eye className="mr-1 h-3 w-3" />
                                Details
                              </Button>
                            </div>
                          ),
                        },
                      ]}
                      data={budgetCategories}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Reports</CardTitle>
                    <CardDescription>Generate and download financial reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Income Statement</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Summary of income, expenses, and net profit for a specific period.
                          </p>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleGenerateReport("income-statement")}
                          >
                            Generate Report
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Balance Sheet</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Overview of assets, liabilities, and equity at a specific point in time.
                          </p>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleGenerateReport("balance-sheet")}
                          >
                            Generate Report
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Cash Flow Statement</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Details of cash inflows and outflows during a specific period.
                          </p>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleGenerateReport("cash-flow")}
                          >
                            Generate Report
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Budget vs Actual</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Comparison of budgeted amounts to actual spending by category.
                          </p>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleGenerateReport("budget-vs-actual")}
                          >
                            Generate Report
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Fee Collection Report</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Summary of school fees collected, pending, and overdue.
                          </p>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handleGenerateReport("fee-collection")}
                          >
                            Generate Report
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Custom Report</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Create a customized report with specific parameters and data points.
                          </p>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => router.push("/accountant-portal/reports/custom")}
                          >
                            Create Custom Report
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

