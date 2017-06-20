import 'react-hot-loader/patch'
import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Breadcrumb from '../index'
import styles from './index.less'
// npm run demo -- --component="Breadcrumb"
const Page = () => (
    <div className={styles['demo-box']}>
        <h1 className={styles['demo-name']}>面包屑</h1>
        <div className={styles['demo-item-title']}>
            默认间隔符
        </div>
        <div className={styles['demo-item-content']}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    一中
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    二班
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    三组
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
        <div className={styles['demo-item-title']}>
            自定义间隔符
        </div>
        <div className={styles['demo-item-content']}>
            <Breadcrumb separator="-">
                <Breadcrumb.Item>
                    一中
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    二班
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    三组
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
        <div className={styles['demo-item-content']}>
            <Breadcrumb separator="/">
                <Breadcrumb.Item>
                    一中
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    二班
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    三组
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
        <div className={styles['demo-item-title']}>
            加链接
        </div>
        <div className={styles['demo-item-content']}>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="http://www.baidu.com">一中</a>

                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="http://www.baidu.com">二班</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    三组
                </Breadcrumb.Item>
            </Breadcrumb>
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
    module.hot.accept(Page, () => {
        render(Page)
    })
}
