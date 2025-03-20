"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/ui/charts"

export default function AnalyticsPage() {
  const [data, setData] = useState({
    enrollment: [],
    performance: [],
    finance: [],
  })

  useEffect(() => {
    // Simulating data fetching
    setTimeout(() => {
      setData({
        enrollment: [
          { month: "Jan", students: 1000 },
          { month: "Feb", students: 1200 },
          { month: "Mar", students: 1100 },
          { month: "Apr", students: 1300 },
          { month: "May", students: 1400 },
          { month: "Jun", students: 1200 },
        ],
        performance: [
          { grade: "A", students: 30 },
          { grade: "B", students: 40 },
          { grade: "C", students: 20 },
          { grade: "D", students: 8 },
          { grade: "F", students: 2 },
        ],
        finance: [
          { month: "Jan", revenue: 50000, expenses: 40000 },
          { month: "Feb", revenue: 55000, expenses: 42000 },
          { month: "Mar", revenue: 60000, expenses: 45000 },
          { month: "Apr", revenue: 58000, expenses: 43000 },
          { month: "May", revenue: 62000, expenses: 46000 },
          { month: "Jun", revenue: 65000, expenses: 48000 },
        ],
      })
    }, 1000) // Simulate a 1-second delay
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 space-y-6"
    >
      <h1 className="text-2xl md:text-3xl font-bold">Analytics Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="enrollment" className="space-y-4">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
              <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
            </TabsList>
            <TabsContent value="enrollment">
              <LineChart data={data.enrollment} xAxis="month" yAxis={["students"]} />
            </TabsContent>
            <TabsContent value="performance">
              <PieChart data={data.performance} category="grade" value="students" />
            </TabsContent>
            <TabsContent value="finance">
              <BarChart data={data.finance} xAxis="month" yAxis={["revenue", "expenses"]} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

