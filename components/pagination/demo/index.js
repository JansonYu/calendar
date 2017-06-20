import React from 'react'
import ReactDom from 'react-dom'
import Pagination from '../index'
import styles from './index.less'

class AppComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 1,
            pageSize: 10,
        }
        this.onPageChange = this.onPageChange.bind(this)
        this.onSizeChange = this.onSizeChange.bind(this)
    }

    onPageChange(page) {
        this.setState({
            current: page,
        })
    }

    onSizeChange(current, pageSize) {
        this.setState({
            current,
            pageSize,
        })
    }

    render() {
        const { current, pageSize } = this.state
        return (
            <div className={styles['demo-pagination-wrap']}>
                <h3>Pagination 分页</h3>
                <div className={styles['demo-pagination-section']}>
                    <div className={styles.title}>基础分页</div>
                    <Pagination
                        current={current}
                        onChange={this.onPageChange}
                        total={260}
                    />
                </div>
                <div className={styles['demo-pagination-section']}>
                    <div className={styles.title}>改变每页条数</div>
                    <Pagination
                        showSizeChanger={true}
                        current={current}
                        pageSize={pageSize}
                        onSizeChange={this.onSizeChange}
                        onChange={this.onPageChange}
                        total={260}
                    />
                </div>
                <div className={styles['demo-pagination-section']}>
                    <div className={styles.title}>快速跳转</div>
                    <Pagination
                        showQuickJumper={true}
                        showSizeChanger={true}
                        current={current}
                        pageSize={pageSize}
                        onSizeChange={this.onSizeChange}
                        onChange={this.onPageChange}
                        total={260}
                    />
                </div>
                <div className={styles['demo-pagination-section']}>
                    <div className={styles.title}>显示总数</div>
                    <Pagination
                        showQuickJumper={true}
                        showSizeChanger={true}
                        current={current}
                        pageSize={pageSize}
                        onSizeChange={this.onSizeChange}
                        onChange={this.onPageChange}
                        total={260}
                        showTotal={total => `共 ${total} 条`}
                    />
                </div>
                <div className={styles['demo-pagination-section']}>
                    <div className={styles.title}>simple分页</div>
                    <Pagination
                        current={current}
                        simple={true}
                        onChange={this.onPageChange}
                        total={260}
                    />
                </div>
            </div>
        )
    }
}

const rootEl = document.getElementById('app')

ReactDom.render(<AppComponent />, rootEl)
