import React from 'react'
import PropTypes from 'prop-types'
import styles from './style/breadcrumb.less'

class BreadcrumbItem extends React.Component {
    static defaultProps = {
        children: '',
        separator: '>',
        index: 0,
        length: 0,
    }

    static propTypes = {
        separator: PropTypes.node,
        children: PropTypes.node,
        index: PropTypes.number,
        length: PropTypes.number,
    }
    render() {
        const { children, separator, index, length } = this.props
        const separatorTxt = index + 1 === length ? '' : separator
        return (
            <span className={styles['breadcrumb--item']}>
                <span className={styles['breadcrumb--link']}>
                    {children}
                </span>
                <span className={styles['breadcrumb--separator']}>
                    {separatorTxt}
                </span>
            </span>
        )
    }
}
export default BreadcrumbItem
