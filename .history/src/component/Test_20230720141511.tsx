import React, { useEffect, useRef } from 'react'
import Calendar from './Calendar';
const CalendarComm = React.forwardRef(Calendar);
const Test = () => {
  const calendarRef = useRef<CalendarRef>(null);
  console.log(calendarRef.current?.getDate().toLocaleDateString())
  useEffect(() => {
    setTimeout(() => {
      calendarRef.current?.setDate(new Date(2024, 3, 1))
    }, 3000)
  }, [])
  return (
    <div>
      <CalendarComm ref={calendarRef} value={new Date(2024 - 8 - 15)}></CalendarComm>
    </div>
  )
}

export default Test
