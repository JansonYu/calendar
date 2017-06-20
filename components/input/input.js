import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import styles from './style/input.less'

const prefix = 'input'

class Input extends React.Component {
    static defaultProps = {
        onEnter: () => {},
        onChange: () => {},
        type: 'text',
        style: {},
        className: '',
        disabled: false,
        placeholder: '请输入内容',
        value: '',
    }

    static propTypes = {
        onEnter: PropTypes.func,
        onChange: PropTypes.func,
        type: PropTypes.oneOf(['text', 'password']),
        style: PropTypes.Object,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        placeholder: PropTypes.string,
        value: PropTypes.string,
    }

    constructor(props) {
        super(props)
        let type = ''
        if (props.type !== 'text' || props.type !== 'password') {
            type = 'text'
        }
        this.state = {
            type,
            value: '',
        }
        this.handleEnter = this.handleEnter.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value })
    }

    handleEnter(e) {
        const { onEnter } = this.props
        if (onEnter) {
            if (e.keyCode === 13) {
                onEnter()
            }
        }
    }

    render() {
        const { placeholder, style, disabled, className, onChange } = this.props
        const { type, value } = this.state
        const classname = classNames({
            [`${prefix}`]: !disabled,
            [`${prefix}--disabled`]: disabled,
        })
        const inputClassName = classNames(
            ...classname.split(' ').map(val => styles[val]),
            className,
        )
        return (
            <div>
                <input
                    className={inputClassName}
                    type={type}
                    disabled={disabled}
                    style={style}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={e => this.handleEnter(e)}
                />
            </div>
        )
    }
}

export default Input
