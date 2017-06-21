import React from 'react'
import RcCalendar from 'rc-calendar'
import MonthCalendar from 'rc-calendar/lib/MonthCalendar'
import CreatePicker from './createPicker'

function DatePicker() {
    const Calendar = CreatePicker(RcCalendar)
    return <div><Calendar /></div>
}

function MonthPicker() {
    const Calendar = CreatePicker(MonthCalendar)
    return <div><Calendar /></div>
}

export { DatePicker, MonthPicker }
