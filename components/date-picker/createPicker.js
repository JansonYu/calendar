import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import 'rc-calendar/assets/index.css'
import RcDatePicker from 'rc-calendar/lib/Picker'
import MonthCalendar from 'rc-calendar/lib/MonthCalendar'
import zhCN from 'rc-calendar/lib/locale/zh_CN'
import moment from 'moment'
import Input from '../input/index'

const prefix = 'date-picker'
const inputPrefix = 'date-picker-input'

export default function CreatePicker(TheCalendar) {
    return class CalenderWrapper extends React.Component {
        static defaultProps = {
            // showToday: true,
            value: moment(),
            defaultValue: moment(),
            placeholder: '请选择日期',
            format: 'YYYY-MM-DD',
            size: 'default',
            renderExtraFooter: null,
            onChange: () => {},
            // onOk: () => {},
            showTime: false,
            disabled: false,
            disabledDate: () => {},
            disabledTime: () => {},
            className: '',
            style: {},
        }
        static propTypes = {
            // showToday: PropTypes.bool,
            value: PropTypes.date,
            defaultValue: PropTypes.date,
            placeholder: PropTypes.string,
            format: PropTypes.string,
            size: PropTypes.oneOf(['large', 'small', 'default']),
            renderExtraFooter: PropTypes.node,
            onChange: PropTypes.func,
            // onOk: PropTypes.func,
            showTime: PropTypes.bool,
            disabled: PropTypes.bool,
            disabledDate: PropTypes.func,
            disabledTime: PropTypes.func,
            className: PropTypes.string,
            style: PropTypes.shape,
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
                defaultValue,
                placeholder,
                // onOk,
                format,
                // showToday,
                showTime,
                disabledDate,
                style,
                disabled,
                className,
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
                        showOk={false}
                        format={format}
                        locale={zhCN}
                        showToday={false}
                        className={calendarClassName}
                        renderFooter={this.renderFooter}
                    />
                </span>
            )
            const inputClassName = classNames({
                [inputPrefix]: true,
                [`${inputPrefix}-lg`]: this.props.size === 'large',
                [`${inputPrefix}-sm`]: this.props.size === 'small',
            })
            const input = ({ value: inputValue }) => (
                <div>
                    <Input
                        readOnly={true}
                        disabled={disabled}
                        className={inputClassName}
                        placeholder={placeholder}
                        value={(inputValue && inputValue.format(this.props.format)) || ''}
                    />
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
