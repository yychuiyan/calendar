import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import './index.css'
import { monthDate } from '../utils/month'
interface CalendarProps {
  value?: Date,
  onChange?: (date: Date) => void
}
// 暴露组件api
interface CalendarRef {
  getDate: () => Date,
  setDate: (date: Date) => void
}
const Calendar: React.ForwardRefRenderFunction<CalendarRef, CalendarProps> = (props, ref) => {
  const { value = new Date(), onChange } = props
  // 保存当前日期
  const [date, setDate] = useState(value)

  useImperativeHandle(ref, () => {
    return {
      getDate() {
        return date;
      },
      setDate(date: Date) {
        setDate(date)
      }
    }
  })
  // 点击左侧按钮
  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  };
  // 点击右侧按钮
  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }
  // 计算当前月有多少天
  const daysOfMonth = (year: number, month: number) => {
    // 当date传入0的时候默认取上个月的最后一天，-1则为上个月倒数第二天，以此类推
    return new Date(year, month + 1, 0).getDate()
  }
  // 计算当前月的第一天是星期几
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  }
  // 定义一个函数存储渲染的内容
  const renderDates = () => {
    // 定义一个数组存储恩日哦功能
    const days = []
    // 计算当前月有多少天
    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth())
    // 计算当前月的第一天是星期几
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth())
    // 已经知道从哪里开始渲染，渲染多少天后，进行循环遍历到初始天数在星期几
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }
    // 渲染日期
    for (let i = 1; i <= daysCount; i++) {
      const clickHandler = onChange?.bind(null, new Date(date.getFullYear(), date.getMonth(), i))
      // 添加选中样式
      if (i === date.getDate()) {
        days.push(<div key={i} className='day selected' onClick={clickHandler}>{i}</div>)
      } else {
        days.push(<div key={i} className='day' onClick={clickHandler}>{i}</div>)
      }
    }
    return days;
  }
  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>{date.getFullYear()}年{monthDate[date.getMonth()]}</div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
        {renderDates()}
      </div>
    </div>
  )
}


const InternalCalendar = React.forwardRef(Calendar);
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
      <InternalCalendar ref={calendarRef} value={new Date(2024 - 8 - 15)}></InternalCalendar>
    </div>
  )
}

export default Test
