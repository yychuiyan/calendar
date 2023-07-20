import React from 'react'
import Calendar from './component/Calendar'
const App = () => {
  return (
    <div>
      <Calendar value={new Date('2023-3-1')} />
    </div>
  )
}

export default App
