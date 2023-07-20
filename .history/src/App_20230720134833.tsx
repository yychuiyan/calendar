import React from 'react'
import Calendar from './component/Calendar'
const App = () => {
  return (
    <div>
      <Calendar value={new Date()} onChange={(date: Date) => {
        alert(date.toLocaleDateString())
      }}></Calendar>
    </div>
  )
}

export default App
