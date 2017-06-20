import React from 'react'
import ReactDom from 'react-dom'
import Input from '../index'
import styles from './index.less'

class AppComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        this.setState({ value: e.target.value.trim() })
    }

    render() {
        const { value } = this.state
        return (
            <div className={styles['demo-pagination-wrap']}>
                <h3>Input 输入框</h3>
                <div className={styles['demo-pagination-section']}>
                    <div className={styles.title}>Input 常规</div>
                    <Input
                        value={value}
                        placeholder={'请输入'}
                        onChange={this.onChange}
                        onEnter={() => {
                            console.log('input')
                        }}
                    />
                </div>
                <div className={styles['demo-pagination-section']}>
                    <div className={styles.title}>Input 输入</div>
                    <Input
                        value="正在输入"
                        placeholder={'请输入'}
                        onChange={this.onChange}
                        onEnter={() => {
                            console.log('input')
                        }}
                    />
                </div>
                <div className={styles['demo-pagination-section']}>
                    <div className={styles.title}>Input 禁用</div>
                    <Input
                        value={value}
                        disabled={true}
                        placeholder={'请输入'}
                        onChange={this.onChange}
                        onEnter={() => {
                            console.log('input')
                        }}
                    />
                </div>
            </div>
        )
    }
}

const rootEl = document.getElementById('app')

ReactDom.render(<AppComponent />, rootEl)
