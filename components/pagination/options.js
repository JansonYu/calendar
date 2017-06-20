import React from 'react'
import PropTypes from 'prop-types'
import styles from './style/pagination.less'

const KEYCODE = {
    ENTER: 13,
}

const locale = {
    items_per_page: '条/页',
    jump_to: '跳至',
}
const buildOptionText = value => `${value} ${locale.items_per_page}`

class Options extends React.Component {
    static propTypes = {
        changeSize: PropTypes.func,
        quickGo: PropTypes.func,
        current: PropTypes.number,
        pageSizeOptions: PropTypes.arrayOf(PropTypes.string),
        pageSize: PropTypes.number,
        rootPrefixCls: PropTypes.string,
    }

    static defaultProps = {
        changeSize: () => {},
        quickGo: () => {},
        current: 1,
        pageSizeOptions: ['10', '20', '30', '40'],
        pageSize: 10,
        rootPrefixCls: 'pagination',
    }

    constructor(props) {
        super(props)

        this.state = {
            current: props.current,
            currentCopy: props.current,
        }

        this.handleChange = this.handleChange.bind(this)
        this.changeSize = this.changeSize.bind(this)
        this.go = this.go.bind(this)
    }

    changeSize(e) {
        this.props.changeSize(Number(e.target.value))
    }

    handleChange(evt) {
        const valCopy = evt.target.value

        this.setState({
            currentCopy: valCopy,
        })
    }

    go(e) {
        const valCopy = e.target.value
        if (valCopy === '') {
            return
        }
        let val = Number(this.state.currentCopy)
        if (isNaN(val)) {
            val = this.state.current
        }
        if (e.keyCode === KEYCODE.ENTER) {
            const c = this.props.quickGo(val)
            this.setState({
                currentCopy: c,
                current: c,
            })
        }
    }

    render() {
        const {
            changeSize,
            quickGo,
            pageSizeOptions,
            pageSize,
            rootPrefixCls,
        } = this.props
        const state = this.state
        const prefixCls = `${rootPrefixCls}-options`
        let changeSelect = null
        let goInput = null

        if (!(changeSize || quickGo)) {
            return null
        }

        if (changeSize) {
            const selfPageSize = pageSize || pageSizeOptions[0]
            const options = pageSizeOptions.map(opt => (
                <option key={opt} value={opt}>{buildOptionText(opt)}</option>
            ))

            changeSelect = (
                <select
                    className={styles[`${prefixCls}-size-changer`]}
                    value={selfPageSize.toString()}
                    onChange={this.changeSize}
                >
                    {options}
                </select>
            )
        }

        if (quickGo) {
            goInput = (
                <div className={styles[`${prefixCls}-quick-jumper`]}>
                    <span>{locale.jump_to}</span>
                    <input
                        type="text"
                        min={1}
                        max={20}
                        value={state.currentCopy}
                        onChange={this.handleChange}
                        onKeyUp={this.go}
                    />
                    <a
                        onClick={() => {
                            quickGo(Number(state.currentCopy))
                        }}
                    >
                        GO
                    </a>
                </div>
            )
        }

        return (
            <div className={styles[`${prefixCls}`]}>
                {changeSelect}
                {goInput}
            </div>
        )
    }
}

export default Options
