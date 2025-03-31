"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({ config, className, children, ...props }: ChartContainerProps) {
  // Create CSS variables for each color in the config
  const style = React.useMemo(() => {
    return Object.entries(config).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [`--color-${key}`]: value.color,
      }
    }, {})
  }, [config])

  return (
    <div className={cn("chart-container", className)} style={style as React.CSSProperties} {...props}>
      {children}
    </div>
  )
}

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  payload?: any[]
  label?: string
}

export function ChartTooltip({ active, payload, label, className, children, ...props }: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className={cn("rounded-lg border bg-background p-2 shadow-sm", className)} {...props}>
      {children}
    </div>
  )
}

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  payload?: any[]
  label?: string
}

export function ChartTooltipContent({ active, payload, label, className, ...props }: ChartTooltipContentProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className={cn("flex flex-col gap-0.5 text-sm", className)} {...props}>
      <p className="font-medium">{label}</p>
      <div className="flex flex-col gap-0.5">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

