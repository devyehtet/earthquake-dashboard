"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, BarChart3, LineChart, PieChart, Download, RefreshCw } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for earthquake analytics
const monthlyData = [
  { month: "Jan", count: 12, magnitude: 4.2 },
  { month: "Feb", count: 8, magnitude: 3.8 },
  { month: "Mar", count: 15, magnitude: 4.5 },
  { month: "Apr", count: 10, magnitude: 4.0 },
  { month: "May", count: 18, magnitude: 4.7 },
  { month: "Jun", count: 14, magnitude: 4.3 },
  { month: "Jul", count: 9, magnitude: 3.9 },
  { month: "Aug", count: 16, magnitude: 4.6 },
  { month: "Sep", count: 11, magnitude: 4.1 },
  { month: "Oct", count: 13, magnitude: 4.2 },
  { month: "Nov", count: 7, magnitude: 3.7 },
  { month: "Dec", count: 10, magnitude: 4.0 },
]

const regionData = [
  { name: "Sagaing", value: 35 },
  { name: "Mandalay", value: 25 },
  { name: "Magway", value: 18 },
  { name: "Bago", value: 12 },
  { name: "Yangon", value: 8 },
  { name: "Other", value: 2 },
]

const magnitudeData = [
  { range: "3.0-3.9", count: 45 },
  { range: "4.0-4.9", count: 32 },
  { range: "5.0-5.9", count: 18 },
  { range: "6.0-6.9", count: 5 },
  { range: "7.0+", count: 1 },
]

const impactData = [
  { name: "Buildings Damaged", value: 1245 },
  { name: "Roads Affected", value: 87 },
  { name: "Bridges Damaged", value: 23 },
  { name: "Power Outages", value: 156 },
  { name: "Water Systems", value: 42 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year")
  const [chartType, setChartType] = useState("earthquakes")

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="container mx-auto">
        <div className="py-6 space-y-6">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-4">
              <h1 className="text-3xl font-bold">Earthquake Analytics</h1>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  <span>Export Data</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold">101</div>
                  <p className="text-sm text-muted-foreground">Total Earthquakes</p>
                  <p className="text-xs text-muted-foreground mt-1">Past 12 months</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold">4.2</div>
                  <p className="text-sm text-muted-foreground">Average Magnitude</p>
                  <p className="text-xs text-muted-foreground mt-1">Past 12 months</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold">6.8</div>
                  <p className="text-sm text-muted-foreground">Highest Magnitude</p>
                  <p className="text-xs text-muted-foreground mt-1">Past 12 months</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold">35%</div>
                  <p className="text-sm text-muted-foreground">Sagaing Region</p>
                  <p className="text-xs text-muted-foreground mt-1">Highest concentration</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Tabs value={chartType} onValueChange={setChartType} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="earthquakes" className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  <span>Earthquakes</span>
                </TabsTrigger>
                <TabsTrigger value="regions" className="flex items-center gap-1">
                  <PieChart className="h-4 w-4" />
                  <span>Regions</span>
                </TabsTrigger>
                <TabsTrigger value="impact" className="flex items-center gap-1">
                  <LineChart className="h-4 w-4" />
                  <span>Impact</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Past Month</SelectItem>
                <SelectItem value="quarter">Past Quarter</SelectItem>
                <SelectItem value="year">Past Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {chartType === "earthquakes" && "Earthquake Frequency & Magnitude"}
                {chartType === "regions" && "Earthquakes by Region"}
                {chartType === "impact" && "Infrastructure Impact Analysis"}
              </CardTitle>
              <CardDescription>
                {chartType === "earthquakes" && "Monthly earthquake count and average magnitude"}
                {chartType === "regions" && "Distribution of earthquakes across regions"}
                {chartType === "impact" && "Damage assessment by infrastructure type"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                {chartType === "earthquakes" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="count" name="Earthquake Count" fill="#8884d8" />
                      <Bar yAxisId="right" dataKey="magnitude" name="Avg. Magnitude" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {chartType === "regions" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={regionData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {regionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} earthquakes`, "Count"]} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={magnitudeData}
                        layout="vertical"
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="range" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="Earthquake Count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {chartType === "impact" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={monthlyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="count"
                        name="Earthquake Count"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line type="monotone" dataKey="magnitude" name="Avg. Magnitude" stroke="#82ca9d" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Trend Analysis</CardTitle>
                <CardDescription>Year-over-year earthquake activity comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={monthlyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="count" name="This Year" stroke="#8884d8" />
                      <Line type="monotone" dataKey="count" name="Last Year" stroke="#82ca9d" strokeDasharray="5 5" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Infrastructure Impact</CardTitle>
                <CardDescription>Damage assessment by infrastructure type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={impactData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

