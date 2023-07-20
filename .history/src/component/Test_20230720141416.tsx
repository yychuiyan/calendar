import React from 'react'
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
    <div></div>
  )
  return (
    <div>

    </div>
  )
}

export default Test
