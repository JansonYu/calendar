import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import RcDatePicker from 'rc-calendar/lib/Picker'
import MonthCalendar from 'rc-calendar/lib/MonthCalendar'
import moment from 'moment'

const prefix = 'date-picker'

function createPicker(TheCalendar) {
    return class CalenderWrapper extends React.Component {
        static defaultProps = {
            allowClear: true,
            showToday: true,
            value: moment(),
            defaultValue: moment(),
            placeholder: '请选择日期',
            format: 'YYYY-MM-DD HH:mm:ss',
            renderExtraFooter: null,
            onChange: () => {},
            onOk: () => {},
            showTime: false,
            disabled: false,
            disabledDate: () => {},
            disabledTime: () => {},
            inputClassName: '',
            className: '',
            style: {},
        }
        static propTypes = {
            allowClear: PropTypes.bool,
            showToday: PropTypes.bool,
            value: PropTypes.date,
            defaultValue: PropTypes.date,
            placeholder: PropTypes.string,
            format: PropTypes.string,
            renderExtraFooter: PropTypes.node,
            onChange: PropTypes.func,
            onOk: PropTypes.func,
            showTime: PropTypes.bool,
            disabled: PropTypes.bool,
            disabledDate: PropTypes.func,
            disabledTime: PropTypes.func,
            inputClassName: PropTypes.string,
            className: PropTypes.string,
            style: PropTypes.fun,
        }
        constructor(props) {
            super(props)
            const value = props.value || props.defaultValue
            if (value && !moment.isMoment(value)) {
                throw new Error(
                    'The value/defaultValue of DatePicker or MonthPicker must be a moment object',
                )
            }
            this.state = {
                value,
            }
            this.renderFooter = this.renderFooter.bind(this)
            this.clearSelection = this.clearSelection.bind(this)
            this.handleChange = this.handleChange.bind(this)
        }
        renderFooter(...args) {
            const { renderExtraFooter } = this.props
            return renderExtraFooter ? (
                <div className={`${prefix}-footer-extra`}>
                    {renderExtraFooter(...args)}
                </div>
            ) : null
        }
        clearSelection(e) {
            e.preventDefault()
            e.stopPropagation()
            this.handleChange(null)
        }
        handleChange(value) {
            const { onChange } = this.props
            this.setState({ value }) // if !('value' in props)
            if (onChange) {
                onChange(value)
            }
        }
        render() {
            const { value } = this.state
            const {
                allowClear,
                defaultValue,
                placeholder,
                onOk,
                format,
                showToday,
                showTime,
                disabledDate,
                style,
                disabled,
                className,
                inputClassName,
            } = this.props
            const disabledTime = this.props.showTime ? this.props.disabledTime : null
            const calendarClassName = classNames({
                [`${prefix}-time`]: showTime,
                [`${prefix}-month`]: MonthCalendar === TheCalendar,
            })
            const calendar = (
                <span>
                    <TheCalendar
                        disabledDate={disabledDate}
                        disabledTime={disabledTime}
                        defaultValue={defaultValue}
                        dateInputPlaceholder={placeholder}
                        showOk={!!onOk}
                        onOk={onOk}
                        format={format}
                        showToday={showToday}
                        className={calendarClassName}
                        renderFooter={this.renderFooter}
                    />
                </span>
            )
            const clearIcon = (!disabled && allowClear && value) ? (
                <span className={`${prefix}-picker-clear`} onClick={this.clearSelection} />
            ) : null
            const input = ({ value: inputValue }) => (
                <div>
                    <input
                        readOnly={true}
                        disabled={disabled}
                        className={inputClassName}
                        placeholder={placeholder}
                        value={(inputValue && inputValue.format(this.props.format)) || ''}
                    />
                    {clearIcon}
                    <span className={`${prefix}-picker-icon`} />
                </div>
            )
            const minWidth = showTime ? { width: (style && style.width) || 154 } : null
            return (
                <span className={className} style={Object.assign({}, style, minWidth)}>
                    <RcDatePicker
                        {...this.props}
                        value={value}
                        calendar={calendar}
                    >
                        {input}
                    </RcDatePicker>
                </span>
            )
        }
    }
}

export default createPicker
