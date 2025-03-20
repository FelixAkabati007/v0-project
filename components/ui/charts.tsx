import type React from "react"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { LineChart as RechartsLineChart, Line } from "recharts"
import { PieChart as RechartsPieChart, Pie, Cell } from "recharts"

interface ChartProps {
  data: any[] | undefined
  xAxis: string
  yAxis: string | string[]
}

interface PieChartProps {
  data: any[] | undefined
  category: string
  value: string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export const BarChart: React.FC<ChartProps> = ({ data, xAxis, yAxis }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip />
        {typeof yAxis === "string" ? (
          <Bar dataKey={yAxis} fill="#8884d8" />
        ) : (
          yAxis.map((axis, index) => <Bar key={axis} dataKey={axis} fill={COLORS[index % COLORS.length]} />)
        )}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export const LineChart: React.FC<ChartProps> = ({ data, xAxis, yAxis }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        <YAxis />
        <Tooltip />
        {typeof yAxis === "string" ? (
          <Line type="monotone" dataKey={yAxis} stroke="#8884d8" />
        ) : (
          yAxis.map((axis, index) => (
            <Line key={axis} type="monotone" dataKey={axis} stroke={COLORS[index % COLORS.length]} />
          ))
        )}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export const PieChart: React.FC<PieChartProps> = ({ data, category, value }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie data={data} dataKey={value} nameKey={category} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}

