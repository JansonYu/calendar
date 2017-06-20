import React from 'react'
import RcCalendar from 'rc-calendar'
import createPicker from './createPicker'

function DatePick() {
    return <div>{ createPicker(RcCalendar) }</div>
}

export default DatePick
