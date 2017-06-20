import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import styles from './style/button.less'

const prefix = 'btn'

class Button extends React.Component {
    static defaultProps = {
        onClick: () => {},
        type: 'important',
        size: 'normal',
        text: '',
        selected: false,
    }

    static propTypes = {
        onClick: PropTypes.func,
        type: PropTypes.string,
        size: PropTypes.oneOf(['big', 'normal', 'small']),
        text: PropTypes.string,
        selected: PropTypes.bool,
    }

    constructor(props) {
        super(props)
        this.state = {
            clicked: false,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
    }

    handleClick(e) {
        const { onClick } = this.props
        if (onClick) {
            onClick(e)
        }
    }

    handleMouseUp() {
        this.setState({
            clicked: false,
        })
    }

    handleMouseDown() {
        this.setState({
            clicked: true,
        })
    }

    render() {
        const {
            type = 'important',
            size = 'normal',
            text,
            selected,
        } = this.props
        const { clicked } = this.state
        const classname = classNames(prefix, {
            [`${prefix}--${type}`]: type,
            [`${prefix}--${size}`]: size,
            [`${prefix}--${type}-clicked`]: clicked,
            [`${prefix}--${type}-selected`]: selected,
        })
        const className = classNames(
            ...classname.split(' ').map(value => styles[value]),
        )
        return (
            <div
                className={className}
                onClick={this.handleClick}
                onMouseUp={this.handleMouseUp}
                onMouseDown={this.handleMouseDown}
            >
                {text || ''}
            </div>
        )
    }
}

export default Button
