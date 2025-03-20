"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, BookOpen, GraduationCap, Award, TrendingUp, TrendingDown } from "lucide-react"

interface StatItem {
  title: string
  value: number | string
  icon: React.ReactNode
  change: {
    value: number
    trend: "up" | "down"
  }
  color: string
}

interface QuickStatsProps {
  isLoading?: boolean
}

export function QuickStats({ isLoading = false }: QuickStatsProps) {
  const [stats, setStats] = useState<StatItem[]>([
    {
      title: "Total Students",
      value: 1250,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      change: {
        value: 12,
        trend: "up",
      },
      color: "blue",
    },
    {
      title: "Active Courses",
      value: 48,
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
      change: {
        value: 5,
        trend: "up",
      },
      color: "green",
    },
    {
      title: "Graduation Rate",
      value: "94%",
      icon: <GraduationCap className="h-6 w-6 text-purple-600" />,
      change: {
        value: 2,
        trend: "up",
      },
      color: "purple",
    },
    {
      title: "Academic Awards",
      value: 27,
      icon: <Award className="h-6 w-6 text-yellow-600" />,
      change: {
        value: 3,
        trend: "down",
      },
      color: "yellow",
    },
  ])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className={`border-l-4 border-l-${stat.color}-500`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold">{isLoading ? <Skeleton className="h-8 w-16" /> : stat.value}</h3>
              </div>
              <div className={`h-12 w-12 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              {stat.change.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={stat.change.trend === "up" ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                {stat.change.trend === "up" ? "+" : "-"}
                {stat.change.value}%
              </span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

