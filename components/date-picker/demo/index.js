import 'react-hot-loader/patch'
import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import styles from './index.less'

import { DatePicker, MonthPicker } from '../index'

const Page = () => (
    <div className={styles['demo-box']}>
        <h1 className={styles['demo-name']}>DatePick组件</h1>
        <div className={styles['demo-item-title']}>
            默认
        </div>
        <div className={styles['demo-item-content']}>
            <DatePicker />
        </div>
        <div className={styles['demo-item-title']}>
            月视图
        </div>
        <div className={styles['demo-item-content']}>
            <MonthPicker />
        </div>
    </div>
)

const rootEl = document.getElementById('app')

const render = Component => {
    ReactDom.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        rootEl,
    )
}

render(Page)

if (module.hot) {
    module.hot.accept(Page, () => { render(Page) })
}
