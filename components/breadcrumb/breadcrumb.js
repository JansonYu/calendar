import React, { cloneElement } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import styles from './style/breadcrumb.less'

const prefix = 'breadcrumb'

class Breadcrumb extends React.Component {
    static defaultProps = {
        type: 'default',
        separator: '>',
        children: '',
    }

    static propTypes = {
        separator: PropTypes.node,
        type: PropTypes.string,
        children: PropTypes.node,
    }

    render() {
        const { children, type, separator } = this.props
        const classname = classNames(prefix, {
            [`${prefix}--${type}`]: type,
        })
        const className = classNames(
            ...classname.split(' ').map(value => styles[value]),
        )
        const crumbs = React.Children.map(children, (child, index) =>
            cloneElement(child, {
                separator,
                index,
                length: children.length,
            }),
        )
        return (
            <div className={className}>
                {crumbs}
            </div>
        )
    }
}

export default Breadcrumb
