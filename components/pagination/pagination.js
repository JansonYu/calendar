import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Options from './options'
import Pager from './pager'
import styles from './style/pagination.less'

const KEYCODE = {
    ENTER: 13,
    ARROW_UP: 38,
    ARROW_DOWN: 40,
}

const locale = {
    prev_page: '上一页',
    next_page: '下一页',
}

const prefixCls = 'pagination'

const handleKeyDown = evt => {
    if (
        evt.keyCode === KEYCODE.ARROW_UP ||
        evt.keyCode === KEYCODE.ARROW_DOWN
    ) {
        evt.preventDefault()
    }
}

class Pagination extends React.Component {
    static defaultProps = {
        defaultCurrent: 1,
        current: 1,
        pageSize: 10,
        total: 0,
        defaultPageSize: 10,
        onChange: () => {},
        showQuickJumper: false,
        showSizeChanger: false,
        showTitle: true,
        pageSizeOptions: ['10', '20', '30', '40'],
        showTotal: () => {},
        onSizeChange: () => {},
        className: '',
        simple: false,
    }

    static propTypes = {
        defaultCurrent: PropTypes.number,
        current: PropTypes.number,
        pageSize: PropTypes.number,
        total: PropTypes.number,
        defaultPageSize: PropTypes.number,
        onChange: PropTypes.func,
        showSizeChanger: PropTypes.bool,
        onSizeChange: PropTypes.func,
        showQuickJumper: PropTypes.bool,
        showTitle: PropTypes.bool,
        pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
        showTotal: PropTypes.func,
        className: PropTypes.string,
        simple: PropTypes.bool,
    }

    constructor(props) {
        super(props)

        let current = props.defaultCurrent
        if ('current' in props) {
            current = props.current
        }

        let pageSize = props.defaultPageSize
        if ('pageSize' in props) {
            pageSize = props.pageSize
        }

        this.state = {
            current,
            currentCopy: current,
            pageSize,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.changePageSize = this.changePageSize.bind(this)
        this.isValid = this.isValid.bind(this)
        this.prev = this.prev.bind(this)
        this.next = this.next.bind(this)
        this.hasPrev = this.hasPrev.bind(this)
        this.hasNext = this.hasNext.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if ('current' in nextProps) {
            this.setState({
                current: nextProps.current,
                currentCopy: nextProps.current,
            })
        }

        if ('pageSize' in nextProps) {
            const newState = {}
            let current = this.state.current
            const newCurrent = this.calcPage(nextProps.pageSize)
            current = current > newCurrent ? newCurrent : current
            if (!('current' in nextProps)) {
                newState.current = current
                newState.currentCopy = current
            }
            newState.pageSize = nextProps.pageSize
            this.setState(newState)
        }
    }

    // private methods

    calcPage(p) {
        let pageSize = p
        if (typeof pageSize === 'undefined') {
            pageSize = this.state.pageSize
        }
        return Math.floor((this.props.total - 1) / pageSize) + 1
    }

    isValid(page) {
        return (
            typeof page === 'number' && page >= 1 && page !== this.state.current
        )
    }

    handleKeyUp(evt) {
        const evtVal = evt.target.value
        let val
        if (evtVal === '') {
            val = evtVal
        } else if (isNaN(Number(evtVal))) {
            val = this.state.currentCopy
        } else {
            val = Number(evtVal)
        }

        this.setState({
            currentCopy: val,
        })

        if (evt.keyCode === KEYCODE.ENTER) {
            this.handleChange(val)
        } else if (evt.keyCode === KEYCODE.ARROW_UP) {
            this.handleChange(val + 1)
        } else if (evt.keyCode === KEYCODE.ARROW_DOWN) {
            this.handleChange(val - 1)
        }
    }

    changePageSize(size) {
        let current = this.state.current
        const newCurrent = this.calcPage(size)
        current = current > newCurrent ? newCurrent : current
        if (typeof size === 'number') {
            if (!('pageSize' in this.props)) {
                this.setState({
                    pageSize: size,
                })
            }
            if (!('current' in this.props)) {
                this.setState({
                    current,
                    currentCopy: current,
                })
            }
        }
        this.props.onSizeChange(current, size)
    }

    handleChange(p) {
        let page = p
        if (this.isValid(page)) {
            if (page > this.calcPage()) {
                page = this.calcPage()
            }
            if (!('current' in this.props)) {
                this.setState({
                    current: page,
                    currentCopy: page,
                })
            }
            this.props.onChange(page)
        }
    }

    prev() {
        if (this.hasPrev()) {
            this.handleChange(this.state.current - 1)
        }
    }

    next() {
        if (this.hasNext()) {
            this.handleChange(this.state.current + 1)
        }
    }

    hasPrev() {
        return this.state.current > 1
    }

    hasNext() {
        return this.state.current < this.calcPage()
    }

    render() {
        const {
            total,
            showQuickJumper,
            showSizeChanger,
            showTitle,
            pageSizeOptions,
            showTotal,
            className,
            simple,
        } = this.props
        const { current } = this.state
        const allPages = this.calcPage()
        let pagerList = []
        let prevEllipsis = null
        let nextEllipsis = null
        let firstPager = null
        let secondPager = null
        let lastButOnePager = null
        let lastPager = null
        const classNameSim = classnames(styles[`${prefixCls}`], className)
        const classNamePrev = classnames(
            styles[`${prefixCls}-disabled`],
            styles[`${prefixCls}-simple-prev`],
        )
        const classNameNext = classnames(
            styles[`${prefixCls}-disabled`],
            styles[`${prefixCls}-simple-next`],
        )

        if (simple) {
            return (
                <ul className={classNameSim}>
                    <li
                        title={showTitle ? locale.prev_page : null}
                        className={
                            this.hasPrev()
                                ? styles[`${prefixCls}-simple-prev`]
                                : classNamePrev
                        }
                    >
                        <a onClick={this.prev}>‹</a>
                    </li>
                    <li
                        title={showTitle ? `${current}/${allPages}` : null}
                        className={styles[`${prefixCls}-simple-pager`]}
                    >
                        <input
                            type="text"
                            value={this.state.currentCopy}
                            onKeyDown={evt => handleKeyDown(evt)}
                            onKeyUp={this.handleKeyUp}
                            onChange={this.handleKeyUp}
                        />
                        <span className={styles[`${prefixCls}-slash`]}>／</span>
                        {allPages}
                    </li>
                    <li
                        title={showTitle ? locale.next_page : null}
                        className={
                            this.hasNext()
                                ? styles[`${prefixCls}-simple-next`]
                                : classNameNext
                        }
                    >
                        <a onClick={this.next}>›</a>
                    </li>
                </ul>
            )
        }

        if (allPages <= 10) {
            const pageArray = new Array(allPages)
                .toString()
                .split(',')
                .map((item, index) => index + 1)
            pagerList = pageArray.map(item => (
                <Pager
                    onPageClick={() => this.handleChange(item)}
                    key={item}
                    page={item}
                    active={current === item}
                    showTitle={showTitle}
                />
            ))
        } else {
            prevEllipsis = (
                <li key="prev" className={styles[`${prefixCls}-ellipsis`]}>
                    <span>• • •</span>
                </li>
            )
            nextEllipsis = (
                <li key="next" className={styles[`${prefixCls}-ellipsis`]}>
                    <span>• • •</span>
                </li>
            )
            firstPager = (
                <Pager
                    onPageClick={() => this.handleChange(1)}
                    key={1}
                    page={1}
                    active={current === 1}
                    showTitle={showTitle}
                />
            )
            secondPager = (
                <Pager
                    onPageClick={() => this.handleChange(2)}
                    key={2}
                    page={2}
                    active={current === 2}
                    showTitle={showTitle}
                />
            )
            lastButOnePager = (
                <Pager
                    last={true}
                    onPageClick={() => this.handleChange(allPages - 1)}
                    key={allPages - 1}
                    page={allPages - 1}
                    active={current === allPages - 1}
                    showTitle={showTitle}
                />
            )
            lastPager = (
                <Pager
                    last={true}
                    onPageClick={() => this.handleChange(allPages)}
                    key={allPages}
                    page={allPages}
                    active={current === allPages}
                    showTitle={showTitle}
                />
            )
            let left = Math.max(3, current - 2)
            let right = Math.min(current + 2, allPages - 2)
            if (current <= 5) {
                right = 7
            }
            if (allPages - current <= 2) {
                left = allPages - 4
            }
            const pageCutArray = new Array(allPages)
                .toString()
                .split(',')
                .map((item, index) => index + 1)
                .slice(left - 1, right)
            pagerList = pageCutArray.map(item => (
                <Pager
                    onPageClick={() => this.handleChange(item)}
                    key={item}
                    page={item}
                    active={current === item}
                    showTitle={showTitle}
                />
            ))
            if (current >= 6) {
                pagerList.unshift(prevEllipsis)
            }
            if (allPages - current >= 5) {
                pagerList.push(nextEllipsis)
            }
            pagerList.unshift(secondPager)
            pagerList.unshift(firstPager)
            pagerList.push(lastButOnePager)
            pagerList.push(lastPager)
        }

        let totalText = null

        if (showTotal) {
            totalText = (
                <span className={styles[`${prefixCls}-total-text`]}>
                    {showTotal(total)}
                </span>
            )
        }
        const classNameUl = classnames(styles[`${prefixCls}`], className)
        return (
            <ul className={classNameUl} unselectable="unselectable">
                <li
                    title={showTitle ? locale.prev_page : null}
                    className={
                        this.hasPrev()
                            ? styles[`${prefixCls}-prev`]
                            : classNamePrev
                    }
                >
                    <a onClick={this.prev}>‹</a>
                </li>
                {pagerList}
                <li
                    title={showTitle ? locale.next_page : null}
                    className={
                        this.hasNext()
                            ? styles[`${prefixCls}-next`]
                            : classNameNext
                    }
                >
                    <a onClick={this.next}>›</a>
                </li>
                <Options
                    rootPrefixCls={prefixCls}
                    changeSize={showSizeChanger ? this.changePageSize : null}
                    current={this.state.current}
                    pageSize={this.state.pageSize}
                    pageSizeOptions={pageSizeOptions}
                    quickGo={showQuickJumper ? this.handleChange : null}
                />
                {totalText}
            </ul>
        )
    }
}

export default Pagination
