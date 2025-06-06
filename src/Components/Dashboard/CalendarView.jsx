import React, { useState } from 'react'
import { Calendar } from './../../../src/components/ui/calendar'

const CalendarView = () => {
  const [date, setDate] = useState(new Date())
  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  )
}

export default CalendarView