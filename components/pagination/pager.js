import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './style/pagination.less'

const prefixCls = 'pagination-item'

const Pager = props => {
    let cls = classnames(styles[`${prefixCls}`])

    if (props.active) {
        cls = classnames(cls, styles[`${prefixCls}-active`])
    }

    if (props.className) {
        cls = classnames(cls, props.className)
    }

    return (
        <li title={props.showTitle ? props.page : null} className={cls}>
            <a onClick={props.onPageClick}>{props.page}</a>
        </li>
    )
}

Pager.propTypes = {
    page: PropTypes.number,
    active: PropTypes.bool,
    className: PropTypes.string,
    showTitle: PropTypes.bool,
    onPageClick: PropTypes.func,
}
Pager.defaultProps = {
    page: 1,
    active: false,
    className: '',
    showTitle: true,
    onPageClick: () => {},
}

export default Pager
