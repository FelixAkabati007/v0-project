"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sparkles, AlertTriangle, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Types for our insights
type InsightType = "performance" | "attendance" | "behavior" | "resource"
type InsightSeverity = "positive" | "neutral" | "warning" | "critical"

interface Insight {
  id: string
  type: InsightType
  title: string
  description: string
  severity: InsightSeverity
  timestamp: string
  metric?: {
    current: number
    previous: number
    unit: string
  }
}

export default function AIInsights() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [activeTab, setActiveTab] = useState<InsightType>("performance")
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // Load initial insights
  useEffect(() => {
    loadInsights()
  }, [])

  const loadInsights = async () => {
    setIsLoading(true)

    // In a real app, this would fetch from an API
    // For demo, we'll use mock data
    setTimeout(() => {
      setInsights([
        {
          id: "1",
          type: "performance",
          title: "Math scores improving in Grade 10",
          description: "Grade 10 students have shown a 12% improvement in mathematics test scores over the last month.",
          severity: "positive",
          timestamp: new Date().toISOString(),
          metric: {
            current: 78,
            previous: 66,
            unit: "%",
          },
        },
        {
          id: "2",
          type: "attendance",
          title: "Attendance drop on Fridays",
          description: "Friday attendance has decreased by 8% compared to other weekdays over the past 3 weeks.",
          severity: "warning",
          timestamp: new Date().toISOString(),
          metric: {
            current: 82,
            previous: 90,
            unit: "%",
          },
        },
        {
          id: "3",
          type: "behavior",
          title: "Reduced disciplinary incidents",
          description: "Disciplinary incidents have decreased by 15% since implementing the new mentoring program.",
          severity: "positive",
          timestamp: new Date().toISOString(),
          metric: {
            current: 12,
            previous: 14,
            unit: "incidents",
          },
        },
        {
          id: "4",
          type: "resource",
          title: "Library resources underutilized",
          description: "Only 30% of available library resources are being utilized by students.",
          severity: "neutral",
          timestamp: new Date().toISOString(),
          metric: {
            current: 30,
            previous: 28,
            unit: "%",
          },
        },
        {
          id: "5",
          type: "performance",
          title: "Science fair participation increased",
          description: "Student participation in the science fair increased by 25% compared to last year.",
          severity: "positive",
          timestamp: new Date().toISOString(),
          metric: {
            current: 75,
            previous: 60,
            unit: "students",
          },
        },
      ])
      setIsLoading(false)
    }, 1500)
  }

  const generateNewInsight = async () => {
    setIsGenerating(true)

    try {
      // In a real app, this would use actual school data
      // For demo purposes, we'll simulate AI generation

      // This would use the AI SDK in a real implementation
      // const prompt = `Generate an educational insight for a school administrator based on the following data points:
      // - Current average attendance: 88%
      // - Previous month average attendance: 92%
      // - Current average test scores: 76/100
      // - Previous month average test scores: 72/100
      // - Library usage: 45% of capacity
      // - Computer lab usage: 80% of capacity
      //
      // Format the insight with a title, description, and whether it's positive, neutral, or concerning.`

      // const { text } = await generateText({
      //   model: openai('gpt-4o'),
      //   prompt,
      // })

      // For demo, we'll simulate the AI response
      setTimeout(() => {
        const newInsight: Insight = {
          id: Date.now().toString(),
          type: "attendance",
          title: "Attendance patterns correlate with academic performance",
          description:
            "Analysis shows students with >90% attendance have 23% higher test scores on average. Consider targeted interventions for students with attendance below 85%.",
          severity: "neutral",
          timestamp: new Date().toISOString(),
          metric: {
            current: 88,
            previous: 92,
            unit: "%",
          },
        }

        setInsights((prev) => [newInsight, ...prev])
        setIsGenerating(false)
      }, 3000)
    } catch (error) {
      console.error("Error generating insight:", error)
      setIsGenerating(false)
    }
  }

  const filteredInsights = insights.filter((insight) =>
    activeTab === "performance" ? true : insight.type === activeTab,
  )

  const getSeverityColor = (severity: InsightSeverity) => {
    switch (severity) {
      case "positive":
        return "text-green-500"
      case "neutral":
        return "text-blue-500"
      case "warning":
        return "text-amber-500"
      case "critical":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getSeverityIcon = (severity: InsightSeverity) => {
    switch (severity) {
      case "positive":
        return <TrendingUp className="h-5 w-5" />
      case "neutral":
        return <Sparkles className="h-5 w-5" />
      case "warning":
        return <AlertTriangle className="h-5 w-5" />
      case "critical":
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <Sparkles className="h-5 w-5" />
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-amber-500" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>Intelligent analysis of school data to identify trends and opportunities</CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={loadInsights} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={generateNewInsight}
            disabled={isGenerating}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isGenerating ? "Generating..." : "Generate Insight"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="performance"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as InsightType)}
        >
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="performance">All Insights</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="resource">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredInsights.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No insights available for this category</p>
              </div>
            ) : (
              <AnimatePresence>
                {filteredInsights.map((insight) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden">
                      <div className={`h-1 ${getSeverityColor(insight.severity).replace("text-", "bg-")}`} />
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <div
                            className={`p-2 rounded-full ${getSeverityColor(insight.severity).replace("text-", "bg-")}/10 mr-4`}
                          >
                            {getSeverityIcon(insight.severity)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-lg">{insight.title}</h3>
                              <Badge variant="outline">{insight.type}</Badge>
                            </div>
                            <p className="text-muted-foreground mt-1">{insight.description}</p>

                            {insight.metric && (
                              <div className="mt-2 flex items-center">
                                <span className="font-medium text-lg">
                                  {insight.metric.current}
                                  {insight.metric.unit}
                                </span>
                                <span className="mx-2 text-muted-foreground">from</span>
                                <span className="font-medium">
                                  {insight.metric.previous}
                                  {insight.metric.unit}
                                </span>

                                {insight.metric.current > insight.metric.previous ? (
                                  <Badge variant="outline" className="ml-2 text-green-500">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    {(
                                      ((insight.metric.current - insight.metric.previous) / insight.metric.previous) *
                                      100
                                    ).toFixed(0)}
                                    %
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="ml-2 text-red-500">
                                    <TrendingDown className="h-3 w-3 mr-1" />
                                    {(
                                      ((insight.metric.previous - insight.metric.current) / insight.metric.previous) *
                                      100
                                    ).toFixed(0)}
                                    %
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <p className="text-sm text-muted-foreground">
          Insights are generated using AI analysis of attendance, performance, and resource utilization data.
        </p>
      </CardFooter>
    </Card>
  )
}

