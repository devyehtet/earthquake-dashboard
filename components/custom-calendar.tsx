"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CustomCalendarProps {
  month: number
  year: number
  onDateSelect: (date: Date) => void
  selectedDate?: Date
  onPrevMonth: () => void
  onNextMonth: () => void
}

export function CustomCalendar({
  month,
  year,
  onDateSelect,
  selectedDate,
  onPrevMonth,
  onNextMonth,
}: CustomCalendarProps) {
  // Get the first day of the month
  const firstDayOfMonth = new Date(year, month, 1)
  const firstDayOfWeek = firstDayOfMonth.getDay() // 0 = Sunday, 1 = Monday, etc.

  // Get the last day of the month
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()

  // Get the last day of the previous month
  const lastDayOfPrevMonth = new Date(year, month, 0)
  const daysInPrevMonth = lastDayOfPrevMonth.getDate()

  // Calculate days to show from previous month
  const daysFromPrevMonth = firstDayOfWeek

  // Calculate days to show from next month (to fill a 6-row calendar)
  const totalCells = 6 * 7 // 6 rows, 7 days per week
  const daysFromNextMonth = totalCells - daysInMonth - daysFromPrevMonth

  // Generate calendar days
  const calendarDays: { date: Date; isCurrentMonth: boolean }[] = []

  // Add days from previous month
  for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
    calendarDays.push({
      date: new Date(year, month - 1, i),
      isCurrentMonth: false,
    })
  }

  // Add days from current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    })
  }

  // Add days from next month
  for (let i = 1; i <= daysFromNextMonth; i++) {
    calendarDays.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    })
  }

  // Split days into weeks
  const weeks: (typeof calendarDays)[] = []
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7))
  }

  // Format month name
  const monthName = new Date(year, month, 1).toLocaleString("default", { month: "long" })

  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <div className="text-center font-medium mb-4">
        {monthName} {year}
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="flex">
          <Button variant="outline" size="icon" className="h-7 w-7 p-0 rounded-md" onClick={onPrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-7 w-7 p-0 rounded-md ml-1" onClick={onNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex">
          <div className="w-9 text-center font-medium text-sm">Su</div>
          <div className="w-9 text-center font-medium text-sm">Mo</div>
          <div className="w-9 text-center font-medium text-sm">Tu</div>
          <div className="w-9 text-center font-medium text-sm">We</div>
          <div className="w-9 text-center font-medium text-sm">Th</div>
          <div className="w-9 text-center font-medium text-sm">Fr</div>
          <div className="w-9 text-center font-medium text-sm">Sa</div>
        </div>
      </div>

      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex w-full mt-2">
          {week.map((day, dayIndex) => (
            <button
              key={dayIndex}
              className={`h-9 w-9 rounded-md flex items-center justify-center text-sm ${
                day.isCurrentMonth
                  ? selectedDate?.toDateString() === day.date.toDateString()
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                  : "text-muted-foreground opacity-50 hover:bg-accent/50"
              }`}
              onClick={() => onDateSelect(day.date)}
            >
              {day.date.getDate()}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

