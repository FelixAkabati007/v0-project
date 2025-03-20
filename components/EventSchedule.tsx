"use client"

interface ScheduleItem {
  time: string
  activity: string
}

interface EventScheduleProps {
  items: ScheduleItem[]
}

export function EventSchedule({ items }: EventScheduleProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row border-l-4 border-primary pl-4 py-2 animate-fadeInUp"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="font-medium text-primary min-w-[180px] mb-1 sm:mb-0">{item.time}</div>
          <div>{item.activity}</div>
        </div>
      ))}
    </div>
  )
}

